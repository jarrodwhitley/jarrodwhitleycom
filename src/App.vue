<template>
    <header>
        <img class="logo" width="80" src="/src/assets/jw-logo.svg" alt="logo"/>
        <div class="links">
            <a href="https://linkedin.com/jarrodwhitley"><i class="fa-brands fa-linkedin"></i></a>
        </div>
    </header>
    <div id="content">
        <section class="intro">
            <div class="text">
                <h1 class="page-title">I don't <span class="glitch" data-text="hack">hack</span>
                    mainframes</h1>
                <p class="page-subtitle">But I <em>do</em> listen to synthwave while building web apps</p>
                <div class="btn">View in style</div>
            </div>
            <div class="grid-bg">
                <div class="grid-lines"></div>
            </div>
            <div class="crt-lines"></div>
            <div class="crt-darken"></div>
            <div class="crt-vignette"></div>
        </section>
        <section class="experience" height="500" width="100%">
            <h2>A little about me</h2>
        </section>
    </div>
    <AudioPlayer @playing="hello"/>
</template>

<script>
import AudioPlayer from './components/AudioPlayer.vue'

export default {
    components: {
        AudioPlayer
    },
    setup() {
        return {  }
    },
    methods: {
        hello() {
            alert('hello');
        }
    }

}
</script>



<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
</style>
