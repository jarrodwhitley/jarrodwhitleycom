<template>
    <header :class="{'fill': scrolling}">
        <img class="logo" width="80" src="/src/assets/jw-logo.svg" alt="logo"/>
        <div class="links">
            <a href="https://linkedin.com/jarrodwhitley"><i class="fa-brands fa-vuejs"></i></a>
            <a class="disabled" href="https://linkedin.com/jarrodwhitley"><i class="fa-brands fa-react"></i></a>
            <a href="https://linkedin.com/jarrodwhitley"><i class="fa-brands fa-linkedin"></i></a>
        </div>
    </header>
    <div id="content">
        <section class="intro">
            <div class="text">
                <h1 class="page-title">I don't <span class="glitch" data-text="hack">hack</span>
                    mainframes</h1>
                <p class="page-subtitle">But I do listen to synthwave while building web apps</p>
            </div>
            <div class="grid-bg">
                <div class="grid-lines"></div>
            </div>
            <div class="crt-lines"></div>
            <div class="crt-darken"></div>
            <div class="crt-vignette"></div>
        </section>
        <section class="experience" height="500" width="100%">
            <h2 class="skillset">My Skillset</h2>
            <SkillChart></SkillChart>
            <h2 class="hobbies">My Hobbies</h2>
            <HobbyChart></HobbyChart>
        </section>
        <section style="height: 50rem;">
            New section
        </section>
    </div>
    <AudioPlayer :scroll-shrink="scrolling"/>
</template>

<script>
import AudioPlayer from './components/AudioPlayer.vue';
import SkillChart from "./components/SkillChart.vue";
import HobbyChart from "./components/HobbyChart.vue";

export default {
    components: {
        AudioPlayer, SkillChart, HobbyChart
    },
    data() {
        return {
            scrolling: false
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll(event) {
            this.scrolling = window.scrollY > 0;
        }
    }

}
</script>
