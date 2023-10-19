<template>
    <header :class="{'fill': scrolling}">
        <img class="logo" width="80" src="/src/assets/images/jw-logo.svg" alt="logo"/>
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
            <div class="sub-heading">using the
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
                <pre v-text="createUnderHoodArray(quotes.slice(1, 4))"></pre>
            </div>
            <div class="quotes" v-if="quotes">
                <div class="quotes__quote glow-container">
                    <div class="crt-lines"></div>
                    <div class="quotes__quote__text" v-text="sillyQuote.quote"></div>
                    <div class="quotes__quote__author" v-text="'-' + sillyQuote.author"></div>
                    <img class="quotes__quote__author-image animate__animated" src="/src/assets/images/scott.png"/>
                </div>
                <div class="quotes__quote glow-container" v-for="(quote, index) in quotes.slice(1, 4)">
                    <div class="crt-lines"></div>
                    <div class="quotes__quote__text" v-text="quote.quote"></div>
                    <div class="quotes__quote__author" v-text="'-' + quote.author"></div>
                    <img class="quotes__quote__author-image animate__animated" :src="'/src/assets/images/' + fetchAuthorImage(index)"/>
                </div>
            </div>
            <div class="btn btn-glow--neon" @click="toggleQuotesHood" v-text="underHood.quotes ? 'Close Hood' : 'See Under the Hood'"></div>
        </section>
        <section class="ai-friendly">
            <h2>Pair Programming</h2>
            <div class="sub-heading">with
                <a class="link"
                   :class="{ 'glitch': isHovering }"
                   @mouseover="isHovering = true"
                   @mouseleave="isHovering = false"
                   data-text="GitHub Copilot"
                   href="https://github.com/features/copilot"
                   target="_blank">GitHub Copilot</a></div>
            <div class="section-content">
                <img class="copilot animate__animated" :class="scrollPos > 2400 ? 'animate__fadeInUp' : 'animate__fadeOutDown'" src="/src/assets/images/github-copilot.png" alt="copilot"/>
                <div class="text">
                    <p>I consider myself to be an AI enthusiast.</p>
                    <p>I've dabbled in AI image generation with services like Midjourney and Adobe's new generative fill. Most of my time has been spent working with Github's new AI-pair programming tool, Copilot. It's certainly a mixed bag in terms of what it does well and not so well, but I have high hopes for Copilot.</p>
                    <p>Most importantly, I believe the furture of programming will be AI-assisted programming. As these tools get better and better over time they will help software engineers to become more efficient.</p>
                </div>
            </div>
            <div class="circuit-board"></div>
        </section>
    </div>
    <footer>
        <h3>Acknowledgements</h3>
        <span>Circuit board animation by<a href="https://codepen.io/Temmer/full/ExjNJog" target="_blank">Temmer Péter</a></span>
        <span>Synthwave Grid by<a href="https://codepen.io/pierredarrieutort/pen/Vwaoqqe" target="_blank">Pierre Darrieutort</a></span>
        <span>Glitch text by<a href="https://codepen.io/lbebber/pen/nqwBKK" target="_blank">Lucas Bebber</a></span>
    </footer>
    <AudioPlayer :scroll-shrink="scrollPos > 10"/>
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
            scrollPos: 0,
            users: undefined,
            comments: undefined,
            quotes: undefined,
            products: undefined,
            sillyQuote: {
                "id": 0,
                "quote": "You miss 100% of the shots you don't take. - Wayne Gretzky",
                "author": "Michael Scott"
            },
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
        createUnderHoodArray(array) {
            return JSON.stringify([this.sillyQuote, ...array], null, 2);
        },
        fetchAuthorImage(index) {
            switch (index) {
                case 0:
                    return 'hill.png';
                case 1:
                    return 'einstein.png';
                case 2:
                    return 'frost.png';
                default:
                    return '';
            }
        },
        handleScroll(event) {
            this.scrollPos = window.scrollY;
        },
        toggleQuotesHood() {
            this.underHood.quotes= !this.underHood.quotes;
        }
    },

}
</script>
