<script>
import Birdle from './Birdle.vue';
export default {
    components: {
        Birdle
    },
    mounted() {
        this.$emit('fullscreen', true);
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
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 5;

        @include breakpoint(lg) {
            padding-top: 6rem;
        }
    }
</style>