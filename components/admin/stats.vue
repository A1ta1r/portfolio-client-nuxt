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
      <user-chart class="Chart" :chartData="this.totalData" :options=this.options></user-chart>
    </el-card>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import userChart from './usersChart'

  export default {
    name: "stats",
    components: { userChart },
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
        totalData: {
          labels: [],
          datasets: [
            {
              label: 'Задержка',
              data: [],
              backgroundColor: [
                'rgba(207, 255, 207, 0.5)',
              ],
              borderColor: [
                'rgba(190, 255, 200, 0.9)',
              ],
              borderWidth: 3,
              pointSize: 50,
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "Активных пользователей"
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Дата'
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Количество активных пользователей'
              },
              ticks: {
                step: 1,
                max: 10,
                beginAtZero: true
              }
            },]
          }
        },
      }
    },
    computed: {
      ...mapState(['users_count'])
    },
    methods: {
      load_users_count: function() {
        this.$store.dispatch('users_stat', this.date_range)
          .then(this.map_chart())
      },
      map_chart: function () {
        console.log(this.users_count)
        this.totalData = {
          labels: this.users_count.map(x => new Date(x.date).toLocaleDateString()),
          datasets: [
            {
              label: '',
              data: this.users_count.map(x => x.count),
              backgroundColor: '#e4ffc8',
              borderColor: '#c1ffbf',
              borderWidth: 3,
              pointSize: 50,
            },
          ]
        }
      }
    }
  }
</script>

<style scoped>

</style>
