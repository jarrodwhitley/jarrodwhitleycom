<template>
    <a :href="link" class="language-card glow-container">
        <i v-if="icon" :class="'language-icon fab fa-' + icon + ' fa-3x'"></i>
        <img v-else class="language-image" :src="image" alt="Placeholder" />
        <div v-text="text" class="language-name"></div>
    </a>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
    link: {
        type: String,
        default: '',
        required: true
    },
    text: {
        type: String,
        default: '',
        required: true
    },
    icon: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    }
});

onMounted(() => {
    console.log('LanguageCard props:', props);
});
</script>

<style scoped lang="scss">
@import "../assets/scss/colors.scss";
@import "../assets/scss/mixins.scss";
@import "../assets/scss/animations.scss";

.glow-container {
    padding: 1rem;
    border-radius: 0.19rem;
    width: 20rem;
    height: 12rem;
    background-color: $darkestNight;
    overflow: hidden;
        
    @for $i from 1 through length($glowColors) {
        &:nth-child(#{$i}) {
            border: 3px solid nth($glowColors, $i);
            box-shadow: 0 0 .5rem 0 nth($glowColors, $i);
            background-image: linear-gradient(45deg, rgba(nth($glowColors, $i), .1), $darkestNight);
        }
    }
}

.language-card {
    display: grid;
    grid: auto / 1fr 2fr;
    align-items: center;
    justify-items: center;
    width: 250px;
    height: 100px;
    margin: 10px;
    padding: 0 1rem;
    border-radius: 10px;
    background-color: $night;
    // border: 2px solid $purple;
    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;

    &:hover {
         transform: scale(1.05);
         cursor: pointer;
     }

    .language-icon {
        grid-column: 1;
        grid-row: 1;
        font-size: 40px;
        color: $white;

        // &.fa-vuejs {
        //     color: #41B783;
        // }
        // &.fa-react {
        //     color: #61DBFB;
        // }
        // &.fa-flutter {
        //     color: #02569B;
        // }
        // &.fa-node {
        //     color: #8CC84B;
        // }

    }

    .language-image {
        grid-column: 1;
        grid-row: 1;
        max-width: 50px;
        border-radius: 50%;
        object-fit: cover;
        //make image white
        // filter: grayscale(100%);
        // filter: brightness(0) invert(1); //this ruins the image
        filter: brightness(0) saturate(100%) invert(100%); //this works
    }

    .language-name {
        grid-column: 2;
        grid-row: 1;
        font-size: 18px;
        text-align: left;
        justify-self: start;
        padding-left: 1rem;
        color: $white;
        font-weight: bold;
    }
}
</style>
