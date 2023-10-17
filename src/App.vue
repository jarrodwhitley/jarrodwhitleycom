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
        <section class="experience">
            <h2 class="skillset">My Skillset</h2>
            <SkillChart></SkillChart>
            <h2 class="hobbies">My Hobbies</h2>
            <HobbyChart></HobbyChart>
        </section>
        <section class="data-driven" v-if="quotes" :class="{ 'hood-open': underHood.quotes }">
            <h2>Data-driven Applications</h2>
            <div class="sub-heading">Using the
                <a class="link"
                   :class="{ 'glitch': isHovering }"
                   @mouseover="isHovering = true"
                   @mouseleave="isHovering = false"
                   data-text="DummyJSON API"
                   href="https://github.com/Ovi/DummyJSON"
                   target="_blank">DummyJSON API</a></div>
            <div class="quotes-engine" :class="{ 'show': underHood.quotes }">
                <div class="crt-vignette"></div>
                <div class="crt-lines"></div>
                <pre v-text="quotes.slice(0, 4)"></pre>
            </div>
            <div class="quotes" v-if="quotes">
                <div class="quotes__quote glow-container" v-for="quote in quotes.slice(0, 4)">
                    <div class="crt-lines"></div>
                    <div class="quotes__quote__text" v-text="quote.quote"></div>
                    <div class="quotes__quote__author" v-text="'-' + quote.author"></div>
                </div>
            </div>
            <div class="btn btn-glow--neon" @click="toggleQuotesHood" v-text="underHood.quotes ? 'Close Hood' : 'See Under the Hood'"></div>
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
            isHovering: false,
            scrolling: false,
            users: undefined,
            comments: undefined,
            quotes: undefined,
            products: undefined,
            underHood: {
                users: false,
                comments: false,
                quotes: false,
                products: false
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(json => this.products = json.products);
        fetch('https://dummyjson.com/users')
        .then(res => res.json())
        .then(json => this.users = json.users);
        fetch('https://dummyjson.com/comments')
        .then(res => res.json())
        .then(json => this.comments = json.comments);
        fetch('https://dummyjson.com/quotes')
        .then(res => res.json())
        .then(json => this.quotes = json.quotes);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll(event) {
            this.scrolling = window.scrollY > 0;
        },
        toggleQuotesHood() {
            this.underHood.quotes= !this.underHood.quotes;
        }
    }

}
</script>
