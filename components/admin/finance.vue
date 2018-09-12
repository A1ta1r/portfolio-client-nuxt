<template>
  <finance-chart class="Chart" :data="this.dataset" :options=this.options :height="100"></finance-chart>
</template>

<script>
  import FinanceChart from "./financeChart";

  export default {
    name: "finance",
    components: {FinanceChart},
    data() {
      return {
        dataset: {
          labels: [this.newDate(-6), this.newDate(-4), this.newDate(-2), this.newDate(0), this.newDate(2), this.newDate(4), this.newDate(6)],
          datasets: [{
            label: "Прибыль",
            data: [1, 3, 4, 2, 1, 4, 2],
            backgroundColor: [
              'rgba(64, 158, 225,.5)',
            ],
            borderColor: [
              'rgba(64, 158, 225,.8)',
            ],
            borderWidth: 3,
            pointSize: 50,
          }],
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "Доход, тыс. рублей"
          },
          scales: {
            xAxes: [{
              type: "time",
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
                labelString: 'Доход, тыс. рублей'
              },
              ticks: {
                beginAtZero: true,
                max: 5,
              }
            },]
          }
        }
      }
    },
    methods: {
      newDate: function (days) {
        return this.$moment().add(days, 'd');
      }
    }
  }
</script>

<style scoped>

</style>
