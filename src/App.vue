<template>
    <nav :class="[{'fill': scrolling && !showBirdle},{'professional-mode': !radMode}]">
        <a @click="exitFullscreen">
            <div class="logo">
                <img src="/src/assets/images/jw-logo.svg" alt="Jarrod Whitley"/>
            </div>
        </a>
        <div class="nav-title" v-text="navHeaderText"></div>
        <div class="links animate__animated" :class="fullscreen ? 'animate__fadeOut': 'animate__fadeIn'">
            <a class="portfolio" @click="togglePortfolioModal" title="See UI/UX portfolio">
                <i class="fa-brands fa-sketch"></i>
            </a>
            <span class="divider">|</span>
            <a title="Display page in Vue"><i class="fa-brands fa-vuejs"></i></a>
            <a class="disabled" href="#" title="Display page in React (Under Construction)"><i class="fa-brands fa-react"></i></a>
            <a href="https://linkedin.com/in/jarrodwhitley"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://github.com/jarrodwhitley"><i class="fa-brands fa-github"></i></a>
        </div>
        <div @click="exitFullscreen"
             class="exit-fullscreen animate__animated"
             :class="fullscreen ? 'animate__fadeIn': 'animate__fadeOut'"
             v-if="fullscreen">
            <i class="fa-solid fa-times"></i>
        </div>
        <div v-show="showPortfolioModal" id="portfolioModal" class="mos9">
            <div class="mos9-window">
                <div class="mos9-window__header">
                    <div class="mos9-window__tools">
                        <a href="#" @click="togglePortfolioModal()" class="mos9-window__close mos9-button"></a>
                    </div>
                    <div class="mos9-window__title">Mac OS</div>
                    <div class="mos9-window__tools">
                        <a href="#" @click="togglePortfolioModal()" class="mos9-window__tool--1 mos9-button"></a>
                        <a href="#" @click="togglePortfolioModal()" class="mos9-window__tool--2 mos9-button"></a>
                    </div>
                </div>
                <div class="mos9-window__content">
                    <h2>UI/UX Portfolio Coming Soon!</h2>
                    <div class="mos9-window__content__img-container">
                        <img src="/src/assets/images/no-image-icon.png" alt="Coming Soon"/>
                    </div>
                    <div class="mos9-window__content__img-container">
                        <img src="/src/assets/images/no-image-icon.png" alt="Coming Soon"/>
                    </div>
                    <div class="mos9-window__content__img-container">
                        <img src="/src/assets/images/no-image-icon.png" alt="Coming Soon"/>
                    </div>
                    <div class="mos9-window__content__img-container">
                        <img src="/src/assets/images/no-image-icon.png" alt="Coming Soon"/>
                    </div>
                    <div class="mos9-window__content__img-container">
                        <img src="/src/assets/images/no-image-icon.png" alt="Coming Soon"/>
                    </div>
                    <div class="mos9-window__content__img-container">
                        <img src="/src/assets/images/no-image-icon.png" alt="Coming Soon"/>
                    </div>
                    <div class="mos9-window__content__img-container">
                        <img src="/src/assets/images/no-image-icon.png" alt="Coming Soon"/>
                    </div>
                    <div class="mos9-window__content__img-container">
                        <img src="/src/assets/images/no-image-icon.png" alt="Coming Soon"/>
                    </div>
                    <div class="mos9-window__content__img-container">
                        <img src="/src/assets/images/no-image-icon.png" alt="Coming Soon"/>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <main>
        <Home @show-birdle="toggleShowBirdle" />
        <BirdleContainer v-if="showBirdle" @fullscreen="fullscreen = true"/>
    </main>
    <AudioPlayer v-if="radMode" :scroll-shrink="scrollPos > 10"/>
    <footer>
        <h4>Acknowledgements</h4>
        <span>Mac OS 9 window by<a href="https://codepen.io/perragnar/pen/wrJzqO" target="_blank">Per Ragnar Edin</a></span>
        <span>Circuit board animation by<a href="https://codepen.io/Temmer/full/ExjNJog" target="_blank">Temmer Péter</a></span>
        <span>Synthwave Grid by<a href="https://codepen.io/pierredarrieutort/pen/Vwaoqqe" target="_blank">Pierre Darrieutort</a></span>
        <span>Glitch text by<a href="https://codepen.io/lbebber/pen/nqwBKK" target="_blank">Lucas Bebber</a></span>
    </footer>
</template>

<script>
import Home from "./components/Home.vue";
import AudioPlayer from "./components/AudioPlayer.vue";
import BirdleContainer from "./components/BirdleContainer.vue";

export default {
    components: {BirdleContainer, Home, AudioPlayer},
    data() {
        return {
            radMode: true,
            scrolling: false,
            showPortfolioModal: false,
            scrollPos: 0,
            showBirdle: false,
            fullscreen: false
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        exitFullscreen() {
            this.fullscreen = false;
            this.showBirdle = false;
        },
        handleScroll(event) {
            this.scrollPos = window.scrollY;
            this.scrolling = this.scrollPos > 10;
        },
        togglePortfolioModal() {
            this.showPortfolioModal = !this.showPortfolioModal;
        },
        toggleShowBirdle() {
            this.showBirdle = !this.showBirdle;
        }
    },
    computed: {
        navHeaderText() {
            return this.showBirdle ? 'Birdle' : '';
        }
    }
}
</script>

<style src="./style.scss" rel="stylesheet"></style>
<style lang="scss">
@import './assets/scss/colors';

html {
    touch-action: manipulation;
}

body {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;

    &.fullscreen {
        overflow: hidden;
    }
}

#app {
    display: grid;
    grid: auto / 1fr;
    min-height: 100vh;

    main {
        height: 100%;
        background-color: $darkestNight;
    }
}
</style>