<script>
  import { Line, mixins } from 'vue-chartjs'

  export default {
    extends: Line,
    name: "financeChart",
    mixins: [mixins.reactiveProp],
    props: ['chartData', 'options'],
    mounted() {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>

