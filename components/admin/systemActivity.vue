<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Состояние сервера: <span v-if="server_state">Работает.
      <span>Задержка до сервера: {{ server_ping }}мс</span>
    </span>
      <span v-else>Заболел</span></span>
        <el-button style="float: right; padding: 3px 0" @click="update_ping" class="el-icon-refresh" type="text"> Обновить</el-button>
      </div>
      <el-table :data="pings" :row-class-name="table_row_class">
        <el-table-column prop="time" label="Время">
        </el-table-column>
        <el-table-column prop="ping" label="Задержка">
          <template slot-scope="scope">
            <span>{{scope.row.ping+"мс"}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card" style="margin-top: 16px">
      <div slot="header" class="clearfix">
        <span>Статистика по пользователям</span>
      </div>
      <el-date-picker
        v-model="date_range"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="По"
        start-placeholder="Дата начала"
        end-placeholder="Дата окончания"
        :picker-options="quickDateRanges">
      </el-date-picker>
      <el-button style="float: right; padding: 3px 0" @click="load_users_count" class="el-icon-refresh" type="text"> Обновить</el-button>
      <div>
        <p>Пользователей за выбранный период: {{users_count}}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        pings: [],
        counts_pings: 10,
        date_range: '',
        date_from: 0,
        date_to: 0,
        quickDateRanges: {
          shortcuts: [{
            text: 'Неделя',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'Месяц',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'Три месяца',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    mounted () {
      this.$store.dispatch('check_server')
    },
    computed: {
      ...mapState(['server_state', 'server_ping',  'users_count'])
    },
    methods: {
      load_users_count: function() {
        this.$store.dispatch('users_stat', this.date_range)
      },

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
