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
      <!--<el-row>-->
        <!--<user-chart class="Chart" :chartData="this.totalData" :options=this.options></user-chart>-->
      <!--</el-row>-->
      <el-row style="margin-top: 10px;" :gutter="20">
        <el-col :span="12"><user-chart class="Chart" :chartData="this.totalData" :options=this.options></user-chart></el-col>
        <el-col :span="12"><user-chart class="Chart" :chartData="this.totalData_registered" :options=this.options_registered></user-chart></el-col>
      </el-row>
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
                beginAtZero: true
              }
            },]
          }
        },
        totalData_deleted: {
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
        options_deleted: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "Удаленные пользователи"
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
                labelString: 'Количество удаленных пользователей'
              },
              ticks: {
                step: 1,
                beginAtZero: true
              }
            },]
          }
        },
        totalData_registered: {
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
        options_registered: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "Всего зарегистрированно пользователей"
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
                labelString: 'Количество зарегистрированных пользователей'
              },
              ticks: {
                step: 1,
                beginAtZero: true
              }
            },]
          }
        },
      }
    },
    computed: {
      ...mapState(['users_count', 'users_registered', 'users_deleted'])
    },
    mounted () {
      this.$store.dispatch('users_stat', this.date_range)
      this.$store.dispatch('users_deleted', this.date_range)
      this.$store.dispatch('users_registered', this.date_range)
    },
    methods: {
      load_users_count() {
        this.load_users_deleted()
        this.load_users_registered()
        this.load_users_active()
      },

      load_users_active() {
        this.$store.dispatch('users_stat', this.date_range)
          .then(this.map_chart())
      },

      map_chart() {
        this.totalData = {
          labels: this.users_count.map(x => new Date(x.date).toLocaleDateString()),
          datasets: [
            {
              label: '',
              data: this.users_count.map(x => x.count),
              backgroundColor: '#409EFF',
              borderColor: '#409EFF',
              borderWidth: 3,
              pointSize: 50,
            },
          ]
        }
      },

      load_users_registered: function () {
        this.$store.dispatch('users_stat_registered', this.date_range)
          .then(this.map_chart_registered())
      },
      map_chart_registered() {
        console.log(this.users_registered)
        this.totalData_registered = {

          labels: this.users_registered.map(x => new Date(x.date).toLocaleDateString()),
          datasets: [
            {
              label: 'Регистрации',
              data: this.users_registered.map(x => x.count),
              backgroundColor: '#67C23A',
              borderColor: '#67C23A',
              borderWidth: 3,
              pointSize: 50,
            },
            {
              label: 'Удаления',
              data: this.users_deleted.map(x => x.count),
              backgroundColor: '#F56C6C',
              borderColor: '#F56C6C',
              borderWidth: 3,
              pointSize: 50,
            },
          ]
        }
      },

      load_users_deleted: function () {
        this.$store.dispatch('users_stat_deleted', this.date_range)
          .then(this.map_chart_deleted())
      },
      map_chart_deleted()    {
        this.totalData_deleted = {
          labels: this.users_deleted.map(x => new Date(x.date).toLocaleDateString()),
          datasets: [
            {
              label: '',
              data: this.users_deleted.map(x => x.count),
              backgroundColor: '#F56C6C',
              borderColor: '#F56C6C',
              borderWidth: 3,
              pointSize: 50,
            },
          ]
        }
      },

    }
  }
</script>

<style scoped>

</style>
