<template>
    <nav :class="[{'mobile': isMobile},{'hide': showChat && isMobile},{'fill': scrolling && !fullscreen},{'professional-mode': !radMode}]">
        <div class="logo" @click="exitFullscreen">
            <img src="/src/assets/images/jw-logo.svg" alt="Jarrod Whitley"/>
        </div>
        <div class="nav-title" v-text="navHeaderText"></div>
        <div class="links animate__animated" :class="{'show': showMobileMenu}" v-if="!fullscreen">
            <a class="portfolio" @click="togglePortfolioModal" title="See UI/UX portfolio">
                <i class="fa-brands fa-sketch"></i>
            </a>
            <span class="divider">|</span>
            <a title="Display page in Vue"><i class="fa-brands fa-vuejs"></i></a>
            <a class="disabled" href="#" title="Display page in React (Under Construction)"><i class="fa-brands fa-react"></i></a>
            <a href="https://linkedin.com/in/jarrodwhitley"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://github.com/jarrodwhitley"><i class="fa-brands fa-github"></i></a>
        </div>
        <div class="uc-message" @click="toggleNoneSense">
            <span>🚧 Under Construction 🚧</span>
            <div class="slide-down" :class="{'show': showNonsense}">
                <figure>
                    <img src="/src/assets/images/sweaty-speedrunner.gif" alt="Under Construction"/>
                </figure>
            </div>
        </div>
        <div class="mobile-menu-btn" @click="toggleMobileMenu" v-if="isMobile && !fullscreen">
            <i v-if="!showMobileMenu" class="fa-solid fa-bars"></i>
            <i v-else class="fa-solid fa-times"></i>
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
        <Home @show-birdle="toggleShowBirdle" @show-chat="toggleShowChat" @scrolling="scrolling = true"/>
        <BirdleContainer v-if="showBirdle" @fullscreen="handleFullscreen" @remove-hash="removeHash"/>
        <ChatContainer v-if="showChat" @fullscreen="handleFullscreen" @remove-hash="removeHash"/>
        <AudioPlayer v-if="radMode" :audio-scroll-stop="audioScrollStop" :scroll-shrink="scrollPos > 10"/>
    </main>
    <footer>
        <div class="footer__left">
            <h4>Acknowledgements</h4>
            <span>Mac OS 9 window by<a href="https://codepen.io/perragnar/pen/wrJzqO" target="_blank">Per Ragnar Edin</a></span>
            <span>Circuit board animation by<a href="https://codepen.io/Temmer/full/ExjNJog" target="_blank">Temmer Péter</a></span>
            <span>Synthwave Grid by<a href="https://codepen.io/pierredarrieutort/pen/Vwaoqqe" target="_blank">Pierre Darrieutort</a></span>
            <span>Glitch text by<a href="https://codepen.io/lbebber/pen/nqwBKK" target="_blank">Lucas Bebber</a></span>
        </div>
        <div class="footer__right">
            <h4>Contact</h4>
            <a href="mailto:hello@jarrodwhitley"><i class="fa-solid fa-envelope"></i>hello@jarrodwhitley</a>
            <span>For free web development work click <a href="https://youtu.be/oHg5SJYRHA0?feature=shared" target="_blank">here</a></span>
            <span>© 2024 Jarrod Whitley</span>
        </div>
    </footer>
</template>

<script>
import Home from "./components/Home.vue";
import AudioPlayer from "./components/AudioPlayer.vue";
import BirdleContainer from "./components/BirdleContainer.vue";
import ChatContainer from "./components/ChatContainer.vue";

export default {
    components: {BirdleContainer, Home, AudioPlayer, ChatContainer},
    data() {
        return {
            isMobile: window.innerWidth < 768,
            showMobileMenu: false,
            radMode: true,
            scrolling: false,
            showPortfolioModal: false,
            scrollPos: 0,
            audioScrollStop: false,
            showBirdle: false,
            showChat: false,
            fullscreen: false,
            showNonsense: false
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        toggleMobileMenu() {
            this.showMobileMenu = !this.showMobileMenu;
        },
        toggleNoneSense() {
            this.showNonsense = !this.showNonsense;
        },
        handleFullscreen(value) {
            this.fullscreen = value;

            if (!value) {
                this.fullscreen = false;
                this.showBirdle = false;
                this.showChat = false;
                this.removeHash();
            }
        },
        exitFullscreen() {
            this.fullscreen = false;
            this.showBirdle = false;
            this.showChat = false;
            this.removeHash();
        },
        removeHash() {
            if (window.location.hash) {
                history.replaceState(null, null, window.location.pathname);
            }
        },
        handleScroll(event) {
            this.scrollPos = window.scrollY;
            this.scrolling = this.scrollPos > 10;
            // if user has scrolled to 100px from the bottom of the page then set audioScrollStop to true
            this.audioScrollStop = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100;
        },
        togglePortfolioModal() {
            this.showPortfolioModal = !this.showPortfolioModal;
        },
        toggleShowBirdle() {
            this.showChat = false;
            this.showBirdle = !this.showBirdle;
        },
        toggleShowChat() {
            this.showBirdle = false;
            this.showChat = !this.showChat;
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
        background-color: $darkestNight;
        overflow: visible;
    }
}
</style>