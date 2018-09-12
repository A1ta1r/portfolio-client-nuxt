<script>
  import {Line} from 'vue-chartjs'

  export default {
    extends: Line,
    name: "financeChart",
    props: ['data', 'options'],
    mounted() {
      this.renderChart(this.data, this.options)
    }
  }
</script>

