<script>
import Birdle from './Birdle.vue';
export default {
    components: {
        Birdle
    },
    mounted() {
        document.body.classList.add('fullscreen');
    },
    beforeDestroy() {
        document.body.classList.remove('fullscreen');
    }
}
</script>

<template>
    <div class="birdle-container">
        <Birdle/>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/colors';
@import '../assets/scss/breakpoints';
    .birdle-container {
        height: 100vh;
        background-color: $darkestNight;
        overflow: hidden;
        padding-top: 3rem;
        display: grid;
        grid: auto 1fr / 1fr;
        justify-items: center;
        align-items: start;

        @include breakpoint(lg) {
            margin-top: 3rem;
        }
    }
</style>