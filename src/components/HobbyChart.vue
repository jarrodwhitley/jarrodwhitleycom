<template>
    <DoughnutChart :chartData="chartData" :options="chartOptions"/>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {DoughnutChart} from 'vue-chart-3';
import {Chart, registerables} from "chart.js";
import ChartDeferred from 'chartjs-plugin-deferred';

Chart.register(...registerables);
Chart.register(ChartDeferred);

export default {
    name: 'HobbyChart',
    components: {DoughnutChart},
    data() {
        return {
            chartData: {
                labels: ['Crushing my children in Mariokart', 'Hiking', 'Finding new hobbies', 'Craft Coffee', 'Making Music', 'Making Charts'],
                datasets: [
                    {
                        data: [30, 40, 60, 70, 90, 10],
                        backgroundColor: ['#3A3A59', '#401e45', '#642F6C', '#58A7AF', '#71DBD4', '#232336'],
                    },
                ],
            },
            chartOptions: {
                responsive: true,
                borderWidth: 0,
                scale: {
                    pointLabels: {
                        fontStyle: 'bold',
                    }
                },
                plugins: {
                    deferred: {
                        yOffset: '50%',
                        delay: 500
                    },
                    legend: {
                        display: false
                    }
                },
                animation: {
                    animateScale: true
                }
            }
        }
    }
}
</script>