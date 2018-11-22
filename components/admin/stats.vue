<template>
  <div>
    <el-card class="box-card">
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
    name: "stats",
    data() {
      return {
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
    computed: {
      ...mapState(['users_count'])
    },
    methods: {
      load_users_count: function() {
        this.$store.dispatch('users_stat', this.date_range)
      },
    }
  }
</script>

<style scoped>

</style>
