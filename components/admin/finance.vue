<template>
  <finance-chart :data="this.dataset" :options=this.options :height="100"></finance-chart>
</template>

<script>
  import FinanceChart from "./financeChart";
  import moment from 'moment';

  export default {
    name: "finance",
    components: {FinanceChart},
    data() {
      return {
        dataset: {
          labels: [this.newDate(-4), this.newDate(-3), this.newDate(2), this.newDate(3), this.newDate(4), this.newDate(5), this.newDate(6)],
          datasets: [{
            label: "My First dataset",
            data: [1, 3, 4, 2, 1, 4, 2],
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }],
            xAxes: [{
              time: {
                unit: 'time',
                displayFormats: {
                  'millisecond': 'MM DD',
                  'second': 'MM DD',
                  'minute': 'MM DD',
                  'hour': 'MM DD',
                  'day': 'MM DD',
                  'week': 'MM DD',
                  'month': 'MM DD',
                  'quarter': 'MM DD',
                  'year': 'MM DD'
                }
              }
            }]
          }
        }
      }
    },
    methods: {
      newDate: function (days) {
        return moment().add(days, 'd');
      }
    }
  }
</script>

<style scoped>

</style>
