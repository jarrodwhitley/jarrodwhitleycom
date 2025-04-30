<template>
    <div id="content" :class="[{ 'no-animations': isLoading }, {'professional-mode': !radMode}]">
        <section class="intro">
            <div class="text">
                <h1 v-if="radMode" class="page-title">Frontend{{!isMobile ? '&nbsp;' : ''}}<span class="glitch" data-text="Hacker">Hacker</span></h1>
                <h1 v-else class="page-title--pro">Cool things said here</h1>
                <p v-if="radMode" class="page-subtitle">
                    Creative Developer
                    <span v-if="!isMobile">|</span>
                    <br v-else/>
                    Rapid Prototyper
                    <span v-if="!isMobile">|</span>
                    <br v-else/>
                    Problem Solver</p>
                <p v-else class="page-subtitle--pro">&&&&&</p>
            </div>
            <div class="grid-bg">
                <div class="grid-lines"></div>
            </div>
            <div class="crt-lines" v-show="!radTextHide"></div>
            <div class="crt-darken" v-show="!radTextHide"></div>
            <div class="crt-vignette" v-show="!radTextHide"></div>
        </section>
        <section class="experience">
            <h2 class="skillset">My Skillset</h2>
            <div class="language-card-wrapper">
                <LanguageCard :icon="'vuejs'" :text="'Vue'"></LanguageCard>
                <LanguageCard link="https://bamazon.jarrodwhitley.com" :icon="'react'" :text="'React'"></LanguageCard>
                <LanguageCard link="https://github.com/jarrodwhitley/flutter_m_e" :icon="'flutter'" :text="'Flutter/Dart'"></LanguageCard>
                <LanguageCard link="https://bamazon.jarrodwhitley.com" :icon="'node'" :text="'Node.js'"></LanguageCard>
                <LanguageCard image="../assets/images/nativescript-vue.png" :text="'Nativescript'"></LanguageCard>
                <LanguageCard link="https://ruby.jarrodwhitley.com" image="../assets/images/rails.png" :text="'Ruby on Rails'"></LanguageCard>
            </div>
            <!-- 
            <div class="skill-chart-wrapper">
                <SkillChart></SkillChart>
            </div>
            <h2 class="hobbies">My Hobbies</h2>
            <div class="hobby-chart-wrapper">
                <HobbyChart></HobbyChart>
            </div> -->
        </section>
        <section class="data-driven">
            <h2>Data-driven Applications</h2>
            <div class="app-scroll-container">
                <div class="app-wrap-container birdle" @click="showBirdle()">
                    <h3><i class="fa-brands fa-vuejs"></i> Birdle</h3>
                    <div class="figure-wrap">
                        <figure class="app-wrap">
                        <img src="../assets/images/birdle_screenshot.png" alt="Birdle preview image"/>
                    </figure>
                    </div>
                </div>
                <a class="app-wrap-container bamazon" href="https://bamazon.jarrodwhitley.com">
                    <h3><i class="fa-brands fa-react"></i> BAMazon</h3>
                    <div class="figure-wrap">
                        <figure class="app-wrap">
                        <img src="../assets/images/bamazon_screenshot.png" alt="Bamazon preview image"/>
                    </figure>
                    </div>
                </a>
                <a class="app-wrap-container twitter" href="https://ruby.jarrodwhitley.com/twitter">
                    <h3><img class="sticker" alt="rails logo sticker" src="../assets/images/rails.png"/> Twitter Clone</h3>
                    <div class="figure-wrap">
                        <figure class="app-wrap">
                        <img class="twitter" src="../assets/images/twitter_screenshot.png" alt="twitter preview image"/>
                    </figure>
                    </div>
                </a>
                <a class="app-wrap-container twitter" href="https://ruby.jarrodwhitley.com/aqi">
                    <h3><img class="sticker" alt="rails logo sticker" src="../assets/images/rails.png"/> Air Quality Checker</h3>
                    <div class="figure-wrap">
                        <figure class="app-wrap">
                        <img class="twitter" src="../assets/images/aqi_screenshot.png" alt="twitter preview image"/>
                    </figure>
                    </div>
                </a>
                <div class="app-wrap-container chat" @click="showChat()">
                    <h3><i class="fa-brands fa-vuejs"></i> Chat</h3>
                    <div class="figure-wrap">
                        <figure class="app-wrap">
                        <img src="../assets/images/chat_screenshot.png" alt="Birdle preview image"/>
                    </figure>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import SkillChart from "../components/SkillChart.vue";
import HobbyChart from "../components/HobbyChart.vue";
import {ObserveVisibility} from "vue-observe-visibility";
import LanguageCard from "./LanguageCard.vue"

export default {
    directives: {
        ObserveVisibility
    },
    components: {
        SkillChart, HobbyChart, LanguageCard
    },
    data() {
        return {
            isMobile: window.innerWidth < 768,
            isLoading: true,
            radMode: true,
            showPortfolioModal: false,
            isHovering: false,
            scrollPos: 0,
            quotes: undefined,
            products: undefined,
            sillyQuote: {
                "id": 0,
                "quote": "You miss 100% of the shots you don't take. - Wayne Gretzky",
                "author": "Michael Scott"
            },
            hoodOpen: false,
            userInput: '',
            botThinking: false,
            botResponses: [
                'It is certain.',
                'It is decidedly so.',
                'Without a doubt.',
                'Yes - definitely.',
                'You may rely on it.',
                'As I see it, yes.',
                'Most likely.',
                'Outlook good.',
                'Yes.',
                'Signs point to yes.',
                'Reply hazy, try again.',
                'Ask again later.',
                'Better not tell you now.',
                'Cannot predict now.',
                'Concentrate and ask again.',
                "Don't count on it.",
                'My reply is no.',
                'My sources say no.',
                'Outlook not so good.',
                'Very doubtful.'
            ],
            chatLog: [
                {
                    user: false,
                    message: 'Ask me anything!'
                },
            ],
            dataTabs: [
                {
                    id: 0,
                    name: 'Birdle',
                    isActive: true,
                    data: 'birdle',
                    isHovering: false
                },
                {
                    id: 1,
                    name: '8 Ball Chat',
                    isActive: false,
                    data: 'chat',
                    isHovering: false
                },
                // {
                //     id: 2,
                //     name: 'BAMazon',
                //     isActive: false,
                //     data: 'bamazon',
                //     isHovering: false
                // }
            ],
            dataSectionOptions: {
                callback: (isVisible, entry) => this.visibilityChanged(isVisible, entry, 'dataSectionIsVisible'),
                once: true,
            },
            dataSectionIsVisible: false,
            aiSectionIsVisible: false,
            scrolling: false,
            radTextHide: false,
        }
    },
    created() {
        // fetch('https://dummyjson.com/products')
        //     .then(res => res.json())
        //     .then(json => this.bamazon.products = json.products);
        // fetch('https://dummyjson.com/users')
        //     .then(res => res.json())
        //     .then(json => this.users = json.users);
        // fetch('https://dummyjson.com/comments')
        //     .then(res => res.json())
        //     .then(json => this.comments = json.comments);
        // fetch('https://dummyjson.com/quotes')
        //     .then(res => res.json())
        //     .then(json => this.quotes = json.quotes);
    },
    mounted() {
        window.addEventListener('load', () => {
            this.isLoading = false;
        });
        window.addEventListener('scroll', this.handleScroll);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.createUserMessage();
            }
        });
        if (window.location.hash === '#birdle') {
            this.showBirdle();
        }
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        dataCarouselClasses(data) {
            if (!this.isLoading) {
                let classArray = [];
                if (this.dataTabs.find(t => t.isActive).data === data) {
                    classArray.push('animate__fadeIn');
                } else {
                    classArray.push('animate__fadeOut animate__faster');
                }
                return classArray;
            }
        },
        mouseOverHandler(tab) {
            if (tab.isActive) return;
            this.dataTabs.forEach(t => t.isHovering = false);
            tab.isHovering = true;
        },
        mouseLeaveHandler(tab) {
            tab.isHovering = false;
        },
        visibilityChanged(isVisible, entry, id) {
            this[id] = isVisible;
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
            this.scrolling = this.scrollPos > 10;
            if (this.scrolling) {
                this.$emit('scrolling');
            }
        },
        toggleQuotesHood() {
            this.hoodOpen = !this.hoodOpen;
        },
        changeDataTab(tab) {
            this.dataTabs.forEach(t => t.isActive = false);
            tab.isActive = true;
        },
        createBotMessage() {
            this.botThinking = true;
            setTimeout(() => {
                this.botThinking = false;
                setTimeout(() => {
                    this.chatLog.push({
                        user: false,
                        message: this.botResponses[Math.floor(Math.random() * this.botResponses.length)]
                    });
                }, 500);
            }, 2000);

        },
        createUserMessage() {
            if (this.userInput) {
                this.chatLog.push({
                    user: true,
                    message: this.userInput
                });
                this.userInput = '';
                this.createBotMessage();
            } else {
                this.chatLog.push({
                    user: false,
                    message: 'You need to type something first...'
                });
            }
        },
        showBirdle() {
            this.$emit('show-birdle');
        },
        showChat() {
            this.$emit('show-chat');
        }
    },
    computed: {
        activeDataTab() {
            return this.dataTabs.find(t => t.isActive);
        },
    }
}
</script>

<style lang="scss">
@import '../assets/scss/colors';
@import '../assets/scss/breakpoints';

#content {
    display: grid;
    grid: auto / 1fr;
    justify-items: center;
    align-items: center;
    height: 100%;

    &.no-animations * {
        animation: none !important;
        transition: none !important;
    }
}

.card-grid {
    .card {
        background-color: $darkNight;
        padding: 10px;
        border-radius: 5px;

        .card__item {
            display: grid;
            grid: auto / 30px 1fr;
            grid-gap: 10px;
            align-items: center;
            justify-items: center;
            margin-top: 10px;

            i {
                font-size: 30px;
            }

            span {
                justify-self: start;
            }
        }
    }
}

section {
    padding: 3rem 0;
    width: 100%;
    max-width: 100vw;
    height: 100%;
}

h2 {
    grid-row: 1;
    grid-column: 1 / -1;
    justify-self: center;
    margin: 0;
    font-size: 2rem;
    align-self: start;
    position: relative;
    line-height: 1;
    text-align: center;

    @include breakpoint(lg) {
        margin: 0 0 1rem;
        font-size: 3rem;
    }
}

h3 {
    margin: 0;
}

.sub-heading {
    grid-row: 2;
    grid-column: 1 / -1;
    justify-self: center;
    font-size: 1rem;
    font-weight: 300;
    margin-bottom: 2rem;

    .glitch:hover {
        -webkit-text-stroke: 1px $white;
    }
}

.intro {
    height: 100vh;
    display: grid;
    grid: auto / 1fr;
    justify-items: center;
    align-items: center;
    position: relative;
    padding: 0;

    .text, .grid-bg {
        grid-row: 1;
        grid-column: 1;
    }

    .text {
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .page-title {
            font-size: 5rem;
            margin: 0;
            font-family: 'VT323', monospace;
            display: flex;
            grid: auto / auto 14rem auto;
            justify-items: center;
            align-items: center;
            width: fit-content;
            flex-direction: column;
            line-height: .9;

            @include breakpoint(lg) {
                display: grid;
                font-size: 6rem;
                flex-direction: row;
                line-height: 1;
            }

            .glitch {
                margin: 0 1rem;

                @include breakpoint(lg) {
                    margin: 0;
                }
            }
        }

        .page-subtitle {
            margin: 2rem 3rem;
            text-align: center;
            font-weight: 500;
            font-size: 1.5rem;
            line-height: 1.2;
            transform: translateY(-1rem);

            @include breakpoint(lg) {
                margin-top: 1rem;
                font-size: 1.5rem;
            }
        }
    }

    .grid-bg {
        z-index: 0;
    }

    .crt-lines, .crt-darken, .crt-vignette {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
    }

    .crt-lines {
        z-index: 3;
    }

    .crt-darken {
        z-index: 4;
    }

    .crt-vignette {
        z-index: 5;
    }

    .professional-mode & {
        background-color: #fafafa;
        display: grid;
        grid: auto / repeat(2, 50vw);
        grid-gap: 20px;

        figure {
            grid-row: 1;
            grid-column: 1;
            width: 100%;
        }

        .text {
            grid-row: 1;
            grid-column: 2;
            color: $darkNight;
            text-align: left;
            justify-self: start;

            .page-title--pro {
                font-size: 40px;
            }

            .page-subtitle--pro {
                font-size: 20px;
            }
        }

        .grid-bg, [class^="crt-"] {
            opacity: 0;
        }
    }
}

.experience {
    max-width: 100%;
    padding: 3rem 1rem;
    background-color: $darkerNight;
    background-image: linear-gradient(45deg, $darkestNight, rgba($purple, .2) 60%, darken($purple, 20%));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .language-card-wrapper {
        grid: auto / repeat(1, 2fr);
        grid-gap: 2rem;
        display: grid;
        width: fit-content;
        padding: 3rem 0;

        @include breakpoint(lg) {
            display: grid;
            grid: auto / repeat(3, 1fr);
            padding: 3rem 2rem;
        }
    }

    h2 {
        grid-row: 1;
        justify-self: center;
        font-size: 2rem;
        margin: 0 auto;

        @include breakpoint(lg) {

        }

        &.skillset {
            grid-column: 1;
        }

        &.hobbies {
            grid-column: 2;
        }
    }

    .skill-chart-wrapper {
        padding: 1rem 1rem 2rem 0;
    }

    .hobby-chart-wrapper {
        padding: 1rem 3rem;
    }
}

.data-driven {
    padding: 1rem 0 0 0;
    background: $darkestNight;
    display: grid;
    grid: auto / 1fr 1fr;
    grid-column-gap: 1rem;

    @include breakpoint(lg) {
        padding: 7rem 2rem;

    }

    &.hood-open {
        .quotes {
            position: relative;

            &__quote {
                transition: all ease-in-out .5s;

                &:nth-child(1) {
                    transform: translate(44rem, -8rem);
                }

                &:nth-child(2) {
                    transform: translate(26rem, -3rem);
                }

                &:nth-child(3) {
                    transform: translate(8rem, 3rem);
                }

                &:nth-child(4) {
                    transform: translate(-10rem, 8rem);
                }
            }
        }

        .comments {
            .comment {
                transition: transform ease-in-out .5s;

                &:nth-child(1) {
                    transform: translate(42rem, -7.5rem);
                }

                &:nth-child(2) {
                    transform: translate(42rem, -7.5rem);
                }

                &:nth-child(3) {
                    transform: translate(0, 6.7rem);
                }

                &:nth-child(4) {
                    transform: translate(0, 6.7rem);
                }

                &:nth-child(5) {
                    transform: translate(42rem, -7.4rem);
                }

                &:nth-child(6) {
                    transform: translate(42rem, -7.4rem);
                }

                &:nth-child(7) {
                    transform: translate(0, 6.8rem);
                }

                &:nth-child(8) {
                    transform: translate(0, 6.8rem);
                }
            }
        }
    }

    h2 {
        grid-row: 1;
        grid-column: 1 / -1;
        justify-self: center;
        margin: 2rem;
        align-self: start;
        position: relative;
        line-height: 1;
        text-align: center;

        &::after {
            content: 'Reactive';
            font-family: 'Qwitcher Grypen', cursive;
            color: $neon;
            position: absolute;
            font-size: 3rem;
            top: -2rem;
            left: 2rem;
            transform: rotate(-15deg);
            text-shadow: 0 0 1rem $neon;

            @include breakpoint(lg) {
                font-size: 4rem;
                top: -3rem;
                left: -3rem;
            }
        }

        @include breakpoint(lg) {
            margin: 0 0 1rem;
        }
    }

    .app-scroll-container {
        grid-column: 1 / -1;
        display: flex;
        overflow-x: scroll;
        overflow-y: hidden;
        scroll-snap-type: x mandatory;
        gap: 1rem;
        margin-top: 1rem;

        @include breakpoint(lg) {
            overflow: auto;
            justify-content: center;
            gap: 2rem;
            display: grid;
            grid: auto / repeat(3, 1fr);
            max-width: 1200px;
            margin: 2rem auto;
        }
    }

    .app-wrap-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        h3 {
            margin-bottom: 1rem;
        }

        .figure-wrap {
            position: relative;
            margin: .5rem;
            padding: .5rem;
            border-radius: 5px;
            border: 1px solid transparent;
            cursor: pointer;

            &.birdle {
                justify-self: end;
            }

            &:hover {
                border: 1px solid $neon;
                box-shadow: 0 0 3px 2px $neon;
            }

            &:hover::after {
                background: $neon;
                color: white;
            }

            // Overlay
            &::before {
                content: '';
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                font-size: 1.5rem;
                font-weight: 600;
                color: white;
                background-color: rgba($darkNight, .5);
                padding: .5rem 1rem;
                border-radius: 5px;
                z-index: 2;
            }

            // Button
            &::after {
                content: 'LAUNCH';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1rem;
                font-weight: 600;
                color: $neon;
                border: 2px solid $neon;
                background: rgba($neon, .2);
                padding: .5rem 1rem;
                border-radius: 5px;
                z-index: 3;
            }
        }

        figure.app-wrap {
            width: 20rem;
            aspect-ratio: 1 / 1.2;
            box-shadow: 0 3px 3px black;
            margin: 0;
            padding: 0;
            cursor: pointer;
            scroll-snap-align: center;
            z-index: 1;

            @include breakpoint(lg) {
                width: 20rem;
                aspect-ratio: 1 / 1;
            }

            &.birdle {
                justify-self: end;

                @include breakpoint(lg) {
                    justify-self: end;
                }
            }

            &.chat {

                @include breakpoint(lg) {
                    justify-self: start;
                }
            }

            img {
                height: 100%;
                object-fit: cover;
            }
        }
    }

    .sub-heading {
        margin-bottom: .5rem;
    }

    .data-tabs {
        display: flex;
        gap: 2rem;
        height: fit-content;
        grid-column: 1 / -1;
        grid-row: 3;
        justify-self: center;
        align-self: start;
        margin-bottom: 1rem;

        .data-tab {
            cursor: pointer;
            position: relative;

            &.active {
                &::after {
                    content: '';
                    position: absolute;
                    bottom: -.3rem;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background-color: $neon;
                }

                &.glitch {
                    &::before {
                        display: none;
                    }

                    &::after {
                        animation: none;
                        top: 1.7rem;
                    }

                    @include breakpoint(lg) {
                        display: none;
                    }
                }
            }
        }
    }

    .json-view {
        opacity: 0;
        font-size: .6rem;
        position: relative;
        transition: all ease-out .2s;
        grid-column: 1;
        width: fit-content;
        justify-self: end;
        align-self: center;
        grid-row: 4 /span 1;
        overflow: hidden;
        height: 87%;

        &.show {
            opacity: 1;
            transition: opacity ease-in-out .5s;
        }

        pre {
            width: 40rem;
            height: 100%;
            $white-space: pre-wrap;
            background: darken($darkestNight, 3%);
            padding: 1rem;
            color: $white;
            font-size: .7rem;
        }

        .crt-lines, .crt-vignette {
            opacity: 0.7;
            height: auto;
            top: 1rem;
            bottom: 1rem;
            background-size: 3px auto;
        }
    }

    .carousel-item {
        grid-column: 1 / -1;
        grid-row: 4;

        &.animate__fadeOut {
            pointer-events: none;
        }

        &.birdle {
            justify-self: center;

            figure {
                width: 20rem;
                cursor: pointer;
                position: relative;

                &:hover {
                    &::after {
                        opacity: 1;
                    }
                }

                &::after {
                    content: 'PLAY BIRDLE';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 1rem;
                    font-weight: 600;
                    color: white;
                    background: $neon;
                    padding: .5rem 1rem;
                    width: max-content;
                    border-radius: 5px;
                    opacity: 0;
                }
            }
        }

        &.bamazon {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: whitesmoke;
            opacity: 1;
            z-index: 15;

            // .content {
            //     .modal-close {

            //     }
            // }
        }
    }

    .quotes {
        display: grid;
        grid: auto/ repeat(4, 1fr);
        width: fit-content;
        height: fit-content;
        justify-items: center;
        align-items: center;
        justify-self: center;
        align-self: center;
        grid-gap: 2rem;
        margin: 4rem 0;

        .glow-container {
            padding: 1rem;
            border-radius: 0.19rem;
            width: 20rem;
            height: 12rem;
            background-color: $darkestNight;
            overflow: hidden;

            &:nth-child(1) {
                animation-delay: .4s;
                z-index: 4;
            }

            &:nth-child(2) {
                animation-delay: .5s;
                z-index: 3;
            }

            &:nth-child(3) {
                animation-delay: .6s;
                z-index: 2;
            }

            &:nth-child(4) {
                animation-delay: .7s;
                z-index: 1;
            }

            .quotes__quote__author-image {
                animation: fadeOutDown .1s ease-in-out forwards;
                filter: grayscale(1);
            }

            @for $i from 1 through length($glowColors) {
                &:nth-child(#{$i}) {
                    border: 3px solid nth($glowColors, $i);
                    box-shadow: 0 0 .5rem 0 nth($glowColors, $i);
                    background-image: linear-gradient(45deg, rgba(nth($glowColors, $i), .1), $darkestNight);
                }
            }
        }

        &__quote {
            display: grid;
            grid: auto 1fr / 1fr;
            position: relative;
            transition: all ease-in-out .3s;

            &.glow-container {
                .crt-lines {
                    background-size: 2px auto;
                    opacity: 0;
                }

                &:hover {
                    .crt-lines {
                        opacity: .5;
                    }

                    .quotes__quote__author-image {
                        animation: fadeInUp .2s ease-in-out forwards;
                    }
                }
            }

            &__text {
                font-weight: 600;
            }

            &__author {
                font-weight: 700;
                align-self: end;

                &-image {
                    height: 60%;
                    width: auto;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                }
            }
        }
    }

    .btn {
        grid-column: 1 / -1;
        grid-row: 5;
        align-self: end;
        justify-self: center;
        transition: transform ease-in-out .3s;
        z-index: 2;
    }
}

.sticker {
    height: 30px;
    width: auto;
    padding-top: 10px;
}
</style>