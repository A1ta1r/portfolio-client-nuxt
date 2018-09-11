<template>
  <finance-chart :data="this.dataset" :options=this.options :height="100"></finance-chart>
</template>

<script>
  import FinanceChart from "./financeChart";

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
              }
            }]
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
