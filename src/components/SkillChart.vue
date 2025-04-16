<template>
    <BarChart :chartData="chartData" :options="chartOptions"/>
</template>

<script lang="ts">
import {BarChart} from 'vue-chart-3';
import {Chart, registerables} from "chart.js";
import ChartDeferred from 'chartjs-plugin-deferred';

Chart.register(...registerables);
Chart.register(ChartDeferred);

export default {
    name: 'SkillChart',
    components: {BarChart},
    data() {
        return {
            chartData: {
                labels: ['Vue', 'React', 'SCSS', 'JS/jQuery', 'Flutter/Dart', 'Ruby on Rails', 'Node.js', 'Nativescript-vue'],
                datasets: [
                    {
                        data: [100, 80, 90, 80, 40, 30, 30, 70],
                        backgroundColor: ['#71DBD4', '#C724B1', '#3A3A59', '#58A7AF', '#401e45', '#642F6C', '#71DBD4'],
                    },
                ]
            },
            chartOptions: {
                events: [],
                responsive: true,
                indexAxis: 'y',
                scale: {
                    pointLabels: {
                        fontStyle: 'bold',
                    }
                },
                scales: {
                  x: {
                      display: false,
                      min: 0,
                      max: 100
                  }
                },
                plugins: {
                    deferred: {
                      yOffset: '50%',
                      delay: 500
                    },
                    legend: {
                        display: false
                    },
                    dataLabels: {
                        display: false
                    }
                }
            }
        }
    }
}
</script>