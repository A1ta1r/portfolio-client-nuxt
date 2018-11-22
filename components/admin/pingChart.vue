<script>
  import { Line, mixins } from 'vue-chartjs'

  export default {
    extends: Line,
    name: "pingChart",
    mixins: [mixins.reactiveProp],
    props: ['chartdata', 'options'],
    mounted () {
      this.renderChart(this.chartdata, this.options)
    }
  }
</script>
