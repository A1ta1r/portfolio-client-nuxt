<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8"><div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Состояние сервера: <span v-if="server_state">Работает.
            <br/>
              Задержка до сервера: {{ server_ping }}мс
            </span>
              <span v-else>Заболел</span>
            </span>
            <el-button style="float: right; padding: 3px 0" @click="update_ping" class="el-icon-refresh" type="text"> Обновить</el-button>
          </div>
          <el-table show-summary :summary-method="pings_average" :data="pings" :row-class-name="table_row_class" :default-sort="{prop: 'time', order: 'descending'}">
            <el-table-column prop="time" label="Время" sortable>
            </el-table-column>
            <el-table-column prop="ping" label="Задержка" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.ping+"мс"}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        pings: [],
        counts_pings: 6,
      }
    },
    created: function() {
      this.$options.interval = setInterval(this.update_ping, 3000)

      for (let i = 0; i < this.counts_pings; i++) {
        this.pings.push({ping: 0, time: 0})
      }
    },
    mounted () {
      this.$store.dispatch('check_server')
    },
    beforeDestroy() {
      clearInterval(this.$options.interval)
    },
    computed: {
      ...mapState(['server_state', 'server_ping'])
    },
    methods: {
      update_ping: function () {
        this.push_ping(this.server_ping)
        this.$store.dispatch('check_server')
      },
      push_ping(ping) {
        this.pings.push({
          ping: ping, time: new Date(Date.now()).toLocaleTimeString()
        })
        if (this.pings.length > this.counts_pings) this.pings.splice(0,1)
      },
      table_row_class({row, rowIndex}) {
        if (row.ping > 700) {
          return 'warning-row';
        } else if (row.ping <= 200) {
          return 'success-row';
        }
        return 'worthy-row';
      },
      pings_average(param) {
        const { columns, data } = param;
        const sums = [];
        let count = 0;
        let sum = 0;
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = 'Средняя задержка сети';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            for(let i = 0; i < values.length; i++) {
              if (values[i] > 0) {
                count++
                sum += values[i]
              }
            }
          } else {
            sums[index] = 'N/A';
          }
        });
        sums[1] = parseInt(sum / count) + "мс"
        return sums;
      }
    }
  }
</script>

<style>
  .el-table .warning-row {
    background: #f9ded1;
  }

  .el-table .worthy-row {
    background: #f6f9c3;
  }

  .el-table .success-row {
    background: #c6f9cb;
  }
</style>
