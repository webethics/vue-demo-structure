<script>
    //Importing Line class from the vue-chartjs wrapper
    import { Line } from 'vue-chartjs'

    //Exporting this so it can be used in other components
    export default {
      extends: Line,
      data () {
        return {
          datacollection: {
            //Data to be represented on x-axis
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                label: '7 Days Score',
                pointBackgroundColor: '#09bd3e',
                borderWidth: 1,
                borderColor: '#09bd3e',
                pointRadius: 5,
                pointBorderColor: '#249EBF',
          //Data to be represented on y-axis
                data: [0, 0.5, 0, 1.5, 2.6, 0, 1]
              }
            ]
          },
          //Chart.js options that controls the appearance of the chart
          options: {
            scales: {
              yAxes: [
                  {
                    gridLines: {
                       zeroLineColor: '#09bd3e'
                    },
                    ticks: {
                       display: false,
                       beginAtZero: true,
                    }
                 }
              ],
              xAxes: [
                {
                    gridLines: {
                      zeroLineColor: '#09bd3e'
                    },
                    ticks: {
                      fontSize: 14,
                      fontColor: '#ffffff'
                    }
                }
              ]
            },
            legend: {
              display: false,
            },
            responsive: true,
            maintainAspectRatio: false
          }
        }
      },
      mounted () {
        //renderChart function renders the chart with the datacollection and options object.
        this.renderChart(this.datacollection, this.options)
      }
    }
</script>
