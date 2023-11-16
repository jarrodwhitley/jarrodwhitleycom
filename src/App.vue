<template>
    <header :class="{'fill': scrolling}">
        <img class="logo" width="80" src="/src/assets/images/jw-logo.svg" alt="logo"/>
        <div class="links">
            <a href="https://linkedin.com/jarrodwhitley"><i class="fa-brands fa-vuejs"></i></a>
            <a class="disabled" href="https://linkedin.com/jarrodwhitley"><i class="fa-brands fa-react"></i></a>
            <a href="https://linkedin.com/jarrodwhitley"><i class="fa-brands fa-linkedin"></i></a>
        </div>
    </header>
    <section id="content">
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
        <section class="data-driven" v-if="quotes" :class="{ 'hood-open': hoodOpen }">
            <h2>Data-driven Applications</h2>
<!--            <div class="sub-heading" v-observe-visibility="dataSectionOptions">using the<a class="link"-->
<!--                   :class="{ 'glitch': isHovering }"-->
<!--                   @mouseover="isHovering = true"-->
<!--                   @mouseleave="isHovering = false"-->
<!--                   data-text="DummyJSON API"-->
<!--                   href="https://github.com/Ovi/DummyJSON"-->
<!--                   target="_blank">DummyJSON API</a></div>-->
            <div class="data-tabs" v-observe-visibility="dataSectionOptions">
                <div class="data-tab" v-for="tab in dataTabs"
                     :class="{ 'glitch': tab.isHovering, 'active': tab.isActive }"
                     @mouseover="mouseOverHandler(tab)"
                     @mouseleave="mouseLeaveHandler(tab)"
                     @click="changeDataTab(tab)"
                     :data-text="tab.name"
                     v-text="tab.name"></div>
            </div>
            <div class="chat carousel-item animate__animated" :class="dataCarouselClasses('Chat')">
                <div class="chat-container">
                    <div class="chat-container__header">
                        <div class="chat-container__header__avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" id="svg2">
                                <defs id="defs4"/>
                                <g transform="translate(-158.23886,-935.57002)" id="layer1">
                                    <g id="g2171">
                                        <path d="M 411.42102 938.01221 A 91.061981 91.061981 0 1 1  229.29706,938.01221 A 91.061981 91.061981 0 1 1  411.42102 938.01221 z" transform="matrix(0.1757045,0,0,0.1757045,117.95033,786.75706)" style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" id="path2162"/>
                                        <path d="M 217.95163 911.14148 A 38.51474 38.51474 0 1 1  140.92215,911.14148 A 38.51474 38.51474 0 1 1  217.95163 911.14148 z" transform="matrix(0.1757045,0,0,0.1757045,143.02574,786.12755)" style="fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" id="path3136"/>
                                        <path d="M 74.226563,890.49332 C 71.601552,889.53241 69.656242,888.16132 68.390625,886.38004 C 67.124994,884.59882 66.492183,882.46601 66.492188,879.9816 C 66.492183,876.23165 67.839837,873.0793 70.535156,870.52457 C 73.230457,867.96993 76.816391,866.69259 81.292969,866.69254 C 85.792944,866.69259 89.414035,867.99923 92.15625,870.61246 C 94.898404,873.22579 96.269496,876.40743 96.269531,880.15738 C 96.269496,882.54804 95.642544,884.62812 94.388672,886.39762 C 93.134734,888.16718 91.230439,889.53241 88.675781,890.49332 C 91.839813,891.5246 94.248014,893.18866 95.900391,895.48551 C 97.552698,897.7824 98.378869,900.52459 98.378906,903.71207 C 98.378869,908.11833 96.820277,911.82145 93.703125,914.82145 C 90.585908,917.82145 86.48435,919.32145 81.398438,919.32145 C 76.312485,919.32145 72.210927,917.81559 69.09375,914.80387 C 65.976558,911.79216 64.417966,908.0363 64.417969,903.53629 C 64.417966,900.18475 65.267574,897.37811 66.966797,895.11637 C 68.666008,892.85468 71.085928,891.31366 74.226563,890.49332 L 74.226563,890.49332 z M 72.960938,879.77067 C 72.960926,882.2082 73.746082,884.20039 75.316406,885.74723 C 76.886703,887.29413 78.925764,888.06757 81.433594,888.06754 C 83.871071,888.06757 85.869116,887.29999 87.427734,885.76481 C 88.986301,884.22968 89.765597,882.34883 89.765625,880.12223 C 89.765597,877.80196 88.962863,875.85079 87.357422,874.26871 C 85.751929,872.68673 83.753884,871.89571 81.363281,871.89567 C 78.949201,871.89571 76.945297,872.66915 75.351563,874.21598 C 73.7578,875.7629 72.960926,877.61446 72.960938,879.77067 L 72.960938,879.77067 z M 70.921875,903.57145 C 70.921866,905.37615 71.3496,907.12224 72.205078,908.80973 C 73.060535,910.49724 74.332018,911.80388 76.019531,912.72965 C 77.707015,913.65544 79.523419,914.11833 81.46875,914.11832 C 84.492165,914.11833 86.988256,913.14567 88.957031,911.20035 C 90.925752,909.25505 91.910126,906.7824 91.910156,903.78238 C 91.910126,900.73553 90.896455,898.216 88.869141,896.22379 C 86.841772,894.23163 84.304665,893.23553 81.257813,893.23551 C 78.281233,893.23553 75.814439,894.21991 73.857422,896.18863 C 71.90038,898.1574 70.921866,900.61834 70.921875,903.57145 L 70.921875,903.57145 z " transform="matrix(0.1739794,2.4560695e-2,-2.4560695e-2,0.1739794,182.20067,788.39671)" style="font-size:72px" id="flowRoot4206"/>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div class="chat-container__header__username">8 Ball Chat</div>
                        <div class="chat-container__header__status"></div>
                    </div>
                    <div class="chat-container__body">
                        <div class="chat-container__body__message" :class="chat.user ? 'user' : 'bot'" v-for="chat in chatLog">
                            <div class="chat-container__body__message__avatar"></div>
                            <div class="chat-container__body__message__text" v-text="chat.message"></div>
                        </div>
                    </div>
                    <svg class="chat-container__loading-dots animate__animated" :class="botThinking ? 'animate__fadeIn' : 'animate__fadeOut'" id="dots" width="4rem" height="1rem" viewBox="0 0 132 58" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                            <g id="dots" sketch:type="MSArtboardGroup" fill="#A3A3A3">
                                <circle id="dot1" sketch:type="MSShapeGroup" cx="25" cy="30" r="13"></circle>
                                <circle id="dot2" sketch:type="MSShapeGroup" cx="65" cy="30" r="13"></circle>
                                <circle id="dot3" sketch:type="MSShapeGroup" cx="105" cy="30" r="13"></circle>
                            </g>
                        </g>
                    </svg>
                    <div class="chat-container__footer">
                        <input type="text" ref="chatInput" v-model="userInput" placeholder="Type a message..."/>
                        <div class="chat-container__footer__send" @click="createUserMessage">Send</div>
                    </div>
                </div>
            </div>
            <div class="birdle carousel-item animate__animated" :class="dataCarouselClasses('Birdle')">
                <div id="birdleApp" @click="birdleFocus">
                    <div class="birdle-grid animate__animated" :class="birdle.gameLost ? 'animate__hinge' : 'animate__fadeIn'">
                        <div class="attempt row" v-for="(attempt, index) in birdle.attempts" :key="index">
                            <div class="letter" :class="letterCheck(letter, index)" v-for="(letter, index) in attempt.split('')" :key="index" v-text="letter"></div>
                        </div>
                        <div class="guess row" v-if="remainingGuesses">
                            <div class="guess letter" v-for="(letter, index) in guessLettersArray" v-text="letter"></div>
                        </div>
                        <div class="empty row" v-if="remainingGuesses" v-for="guess in (remainingGuesses - 1)">
                            <div class="empty letter" v-for="letter in 5"></div>
                        </div>
                    </div>
                    <div class="legend-row">
                        <div class="legend-item">
                            <div class="legend-item__color correct-position"></div>
                            <div class="legend-item__text">Correct Position</div>
                        </div>
                        <div class="legend-item">
                            <div class="legend-item__color correct-letter"></div>
                            <div class="legend-item__text">Correct Letter</div>
                        </div>
                        <div class="legend-item">
                            <div class="legend-item__color wrong-letter"></div>
                            <div class="legend-item__text">Wrong Letter</div>
                        </div>
                    </div>
                    <div class="input" v-if="!birdle.gameOver" onkeydown="return /[a-z]/i.test(event.key)">
                        <input v-model="birdle.guess" ref="birdleInput" maxlength="5" type="text" @keyup.enter="makeGuess"/>
                        <button @click="makeGuess">Submit</button>
                    </div>
                    <div class="restart button" v-if="birdle.gameOver">
                        <div @click="birdleReset">Play Again</div>
                    </div>
                </div>
            </div>
            <div class="quotes carousel-item animate__animated" :class="dataCarouselClasses('Quotes')" v-if="quotes">
                <div class="quotes__quote glow-container">
                    <div class="crt-lines"></div>
                    <div class="quotes__quote__text" v-text="sillyQuote.quote"></div>
                    <div class="quotes__quote__author" v-text="'-' + sillyQuote.author"></div>
                    <img class="quotes__quote__author-image animate__animated" src="/src/assets/images/scott.png"/>
                </div>
                <div class="quotes__quote glow-container"
                     v-for="(quote, index) in quotes.slice(1, 4)">
                    <div class="crt-lines"></div>
                    <div class="quotes__quote__text" v-text="quote.quote"></div>
                    <div class="quotes__quote__author" v-text="'-' + quote.author"></div>
                    <img class="quotes__quote__author-image animate__animated" :src="'/src/assets/images/' + fetchAuthorImage(index)" alt=""/>
                </div>
            </div>
            <div class="products carousel-item animate__animated" :class="dataCarouselClasses('Products')">lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </div>
            <div class="next-btn"></div>
<!--            <div class="btn btn-glow&#45;&#45;neon" @click="toggleQuotesHood" v-text="hoodOpen ? 'Close Hood' : 'See Under the Hood'"></div>-->
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
            <div class="section-content" v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 'aiSectionIsVisible')">
                <img class="copilot animate__animated" :class="aiSectionIsVisible ? 'animate__fadeInUp' : 'animate__fadeOutDown'" src="/src/assets/images/github-copilot.png" alt="copilot"/>
                <div class="text">
                    <h3>I consider myself to be an AI enthusiast.</h3>
                    <p>I've dabbled in AI image generation with services like Midjourney and Adobe's new generative fill. I've used ChatGPT to create a JSON schema from a block of HTML data. Most of my time has been spent working with Github's new AI-pair programming tool, Copilot. It's certainly a mixed bag in terms of what it does well and not so well, but I have high hopes for Copilot.</p>
                    <p>Most importantly, I believe the future of programming will be AI-assisted programming. As these tools get better and better over time they will help software engineers to become more efficient.</p>
                </div>
            </div>
            <div class="circuit-board"></div>
        </section>
    </section>
    <footer>
        <h4>Acknowledgements</h4>
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
import { ObserveVisibility } from "vue-observe-visibility";

export default {
    directives: {
        ObserveVisibility
    },
    components: {
        AudioPlayer, SkillChart, HobbyChart
    },
    data() {
        return {
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
                    name: 'Chat',
                    isActive: false,
                    data: 'chat',
                    isHovering: false
                },
                {
                    id: 1,
                    name: 'Birdle',
                    isActive: true,
                    data: 'birdle',
                    isHovering: false
                },
                {
                    id: 2,
                    name: 'Quotes',
                    isActive: false,
                    data: 'quotes',
                    isHovering: false
                },
                {
                    id: 3,
                    name: 'Products',
                    isActive: false,
                    data: 'products',
                    isHovering: false
                }
            ],
            dataSectionOptions: {
                callback: (isVisible, entry) => this.visibilityChanged(isVisible, entry, 'dataSectionIsVisible'),
                once: true,
            },
            dataSectionIsVisible: false,
            aiSectionIsVisible: false,
            scrolling: false,
            birdle: {
                bird: '',
                wordBank: ['heron','eagle', 'finch', 'robin'],
                guess: "",
                attempts: [],
                gameWon: false,
            },
        }
    },
    created() {
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
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        document.addEventListener('keypress', (event) => {
            if (event.keyCode === 13 && this.$refs.chatInput === document.activeElement ) {
                this.createUserMessage();
            }
        });
        this.birdle.bird = this.birdle.wordBank[Math.floor(Math.random() * this.birdle.wordBank.length)];
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        birdleFocus() {
            this.$refs.birdleInput.focus();
        },
        letterCheck(letter, index) {
            if (letter === this.birdle.bird[index]) {
                return 'correct-position';
            } else if (this.birdle.bird.includes(letter)) {
                return 'correct-letter';
            } else {
                return 'wrong-letter';
            }
        },
        makeGuess() {
            // Make sure the user has entered a 5-letter word
            if (this.birdle.guess.length !== 5) {
                alert("You must guess a 5 letter word!");
                return;
            }
            // Make sure the user hasn't already guessed this word
            if (this.birdle.attempts.includes(this.birdle.guess)) {
                alert("You've already guessed that word!");
                return;
            }
            // Add the guess to the attempts array
            this.birdle.attempts.push(this.birdle.guess);
            // Check if the user has won, lost, or still playing
            if (this.birdle.guess === this.birdle.bird) {
                this.birdle.gameOver = true;
            } else if (this.remainingGuesses === 0) {
                this.birdle.gameOver = true;
            } else {
                console.log('guess again');
            }
            this.birdle.guess = "";
        },
        birdleReset() {
            this.birdle.bird = this.birdle.wordBank[Math.floor(Math.random() * this.birdle.wordBank.length)];
            this.birdle.guess = "";
            this.birdle.attempts = [];
            this.birdle.gameOver = false;
            this.birdle.gameLost = false;
            this.birdle.gameWon = false;
        },
        dataCarouselClasses(name) {
            let classArray = [];
            if (this.dataTabs.find(t => t.isActive).name === name || (this.dataSectionIsVisible && this.dataTabs.find(t => t.isActive).name === name)) {
                classArray.push('animate__fadeIn');
            }if (this.dataTabs.find(t => t.isActive).name !== name) {
                classArray.push('animate__fadeOut animate__faster');
            }
            return classArray;
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
        },
        toggleQuotesHood() {
            this.hoodOpen = !this.hoodOpen;
        },
        changeDataTab(tab) {
            this.dataTabs.forEach(t => t.isActive = false);
            tab.isActive = true;
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
        createBotMessage() {
            this.botThinking = true;
            setTimeout(() => {
                this.botThinking = false;
                setTimeout(() => {
                    this.chatLog.push({
                        user: false,
                        message: this.botResponses[Math.floor(Math.random() * this.botResponses.length)]
                    });
                },500);
            }, 2000);

        },
    },
    computed: {
        guessLettersArray() {
            if (this.remainingGuesses > 0) return this.birdle.guess.split('').concat(Array(5 - this.birdle.guess.length).fill(''));
        },
        remainingGuesses() {
            return 5 - this.birdle.attempts.length;
        },
        birdleGameWon() {
            return this.birdle.attempts.length === 5 || this.birdle.gameWon;
        }
    }
}
</script>
