<script>
  import { Bar, mixins } from 'vue-chartjs'

  export default {
    extends: Bar,
    name: "usersChart",
    mixins: [mixins.reactiveProp],
    props: ['chartdata', 'options'],
    mounted () {
      this.renderChart(this.chartdata, this.options)
    }
  }
</script>
