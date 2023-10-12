<template>
    <BarChart :chartData="chartData" :options="chartOptions"/>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
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
                labels: ['HTML5', 'CSS3', 'SCSS', 'JS', 'jQuery', 'Vue', 'React', 'Nuxt', 'PHP'],
                datasets: [
                    {
                        data: [100, 90, 50, 70, 90, 80, 10, 5, 20],
                        backgroundColor: ['#3A3A59', '#401e45', '#642F6C', '#58A7AF', '#71DBD4', '#C724B1'],
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