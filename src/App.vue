<template>
    <header :class="[{'fill': scrolling}, {'professional-mode': !radMode}]">
        <img class="logo" width="80" src="/src/assets/images/jw-logo.svg" alt="logo"/>
        <div class="links">
            <a class="portfolio" @click="togglePortfolioModal" title="See UI/UX portfolio">
                <i class="fa-brands fa-sketch"></i>
            </a>
            <span class="divider">|</span>
            <a title="Display page in Vue"><i class="fa-brands fa-vuejs"></i></a>
            <a class="disabled" href="#" title="Display page in React (Under Construction)"><i class="fa-brands fa-react"></i></a>
            <a href="https://linkedin.com/in/jarrodwhitley"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://github.com/jarrodwhitley"><i class="fa-brands fa-github"></i></a>
            <!--            <span class="divider">|</span>-->
            <!--            <a class="mode&#45;&#45;fun" title="Rad Mode!" v-if="!radMode" @click="toggleRadMode">-->
            <!--                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="" height="40px" width="40px" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve">-->
            <!--                <g>-->
            <!--                        <path d="M483.983,167.477c-32.82-35.047-84-35.047-108.599-35.047c-0.02,0-0.042,0-0.062,0H136.619c-0.001,0-0.002,0-0.003,0    c-24.596,0-75.776,0-108.596,35.047c-21.01,22.435-30.28,54.841-27.555,96.319c2.226,33.874,14.411,62.702,35.241,83.37    c21.364,21.199,50.394,32.405,83.95,32.405c34.529,0,69.87-17.448,99.513-49.13c15.052-16.088,27.626-34.818,36.831-54.048    c9.205,19.231,21.779,37.96,36.831,54.048c29.643,31.682,64.984,49.13,99.513,49.13c33.555,0,62.586-11.205,83.95-32.405    c20.83-20.668,33.014-49.498,35.241-83.37C514.261,222.317,504.992,189.912,483.983,167.477z M136.619,165.822    c12.154,0,43.181,0.904,68.747,9.271c8.192,2.681,14.924,5.807,20.185,9.36H58.757C82.135,165.833,117.06,165.822,136.619,165.822    z M119.657,346.179c-21.066,0-39.426-5.797-53.677-16.822h103.571C153.195,340.335,136.107,346.179,119.657,346.179z     M204.766,295.965H41.292c-2.78-6.898-4.828-14.383-6.128-22.365h184.662C215.405,281.307,210.351,288.843,204.766,295.965z     M234.567,240.208H33.722c0.542-8.14,1.791-15.594,3.724-22.365h201.789C238.546,224.953,236.955,232.488,234.567,240.208z     M306.636,175.092c25.566-8.367,56.592-9.271,68.749-9.271c19.555,0,54.48,0.011,77.859,18.63H286.451    C291.711,180.899,298.444,177.774,306.636,175.092z M392.345,346.179c-16.451,0-33.539-5.844-49.894-16.822h103.571    C431.771,340.382,413.411,346.179,392.345,346.179z M470.71,295.965H307.235c-5.585-7.122-10.64-14.658-15.059-22.365h184.662    C475.539,281.582,473.491,289.067,470.71,295.965z M277.435,240.208c-2.389-7.72-3.979-15.256-4.668-22.365h201.789    c1.933,6.771,3.182,14.225,3.724,22.365H277.435z"/>-->
            <!--                    </g>-->
            <!--                </svg>-->
            <!--            </a>-->
            <!--            <a class="mode&#45;&#45;professional" title="Professional Mode" v-else @click="toggleRadMode"><i class="fa-solid fa-user-tie"></i></a>-->
        </div>
    </header>
    <div id="content" :class="[{ 'no-animations': isLoading }, {'professional-mode': !radMode}]">
        <section class="intro">
            <div class="text">
                <h1 v-if="radMode" class="page-title">I don't <span class="glitch" data-text="hack">hack</span>mainframes
                </h1>
                <h1 v-else class="page-title--pro">Cool things said here</h1>
                <p v-if="radMode" class="page-subtitle">But I <em>do</em> listen to synthwave while building web apps
                </p>
                <p v-else class="page-subtitle--pro">subtitley thing here</p>
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
                     :id="tab.data"
                     :class="{ 'glitch': tab.isHovering, 'active': tab.isActive }"
                     @mouseover="mouseOverHandler(tab)"
                     @mouseleave="mouseLeaveHandler(tab)"
                     @click="changeDataTab(tab)"
                     :data-text="tab.name"
                     v-text="tab.name"></div>
            </div>
            <div class="birdle carousel-item animate__animated" :class="dataCarouselClasses('birdle')">
                <Birdle :word-bank="wordBank"/>
            </div>
            <div class="chat carousel-item animate__animated" :class="dataCarouselClasses('chat')">
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
                    <svg class="chat-container__loading-dots animate__animated" :class="botThinking ? 'animate__fadeIn' : 'animate__fadeOut'" id="dots" width="4rem" height="1rem" viewBox="0 0 132 58" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
            <div class="bamazon carousel-item animate__animated" :class="dataCarouselClasses('bamazon')">

            </div>
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
                <div class="icons">
                    <img class="copilot animate__animated" :class="aiSectionIsVisible ? 'animate__fadeInUp' : 'animate__fadeOutDown'" src="/src/assets/images/github-copilot.png" alt="copilot"/>
                    <img class="chatgpt animate__animated" :class="aiSectionIsVisible ? 'animate__fadeInUp' : 'animate__fadeOutDown'" src="/src/assets/images/chatgpt.jpg" alt="chatgpt"/>
                    <img class="midjourney animate__animated" :class="aiSectionIsVisible ? 'animate__fadeInUp' : 'animate__fadeOutDown'" src="/src/assets/images/midjourney.png" alt="midjourney"/>
                </div>
                <div class="text">
                    <h3>I consider myself to be an AI enthusiast</h3>
                    <p>I've dabbled in AI image generation with services like Midjourney and Adobe's new generative fill. I've used ChatGPT to create a JSON schema from a block of HTML data. Most of my time has been spent working with Github's new AI-pair programming tool, Copilot. It's certainly a mixed bag in terms of what it does well and not so well, but I have high hopes for Copilot.</p>
                    <p>Most importantly, I believe the future of programming will be AI-assisted programming. As these tools get better and better over time they will help software engineers to become more efficient.</p>
                </div>
            </div>
            <div class="circuit-board"></div>
        </section>
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
    </div>
    <footer>
        <h4>Acknowledgements</h4>
        <span>Mac OS 9 window by<a href="https://codepen.io/perragnar/pen/wrJzqO" target="_blank">Per Ragnar Edin</a></span>
        <span>Circuit board animation by<a href="https://codepen.io/Temmer/full/ExjNJog" target="_blank">Temmer Péter</a></span>
        <span>Synthwave Grid by<a href="https://codepen.io/pierredarrieutort/pen/Vwaoqqe" target="_blank">Pierre Darrieutort</a></span>
        <span>Glitch text by<a href="https://codepen.io/lbebber/pen/nqwBKK" target="_blank">Lucas Bebber</a></span>
    </footer>
    <AudioPlayer v-if="radMode" :scroll-shrink="scrollPos > 10"/>
</template>

<script>
import AudioPlayer from './components/AudioPlayer.vue';
import SkillChart from "./components/SkillChart.vue";
import HobbyChart from "./components/HobbyChart.vue";
import Birdle from "./components/Birdle.vue";
import {ObserveVisibility} from "vue-observe-visibility";

export default {
    directives: {
        ObserveVisibility
    },
    components: {
        AudioPlayer, SkillChart, HobbyChart, Birdle
    },
    data() {
        return {
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
            bamazon: {
                products: [],
            },
            radTextHide: false,
        }
    },
    created() {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(json => this.bamazon.products = json.products);
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
        window.addEventListener('load', () => {
            this.isLoading = false;
        });
        window.addEventListener('scroll', this.handleScroll);
        document.addEventListener('keydown', (event) => {
            if (event.keyCode === 13 && this.$refs.chatInput === document.activeElement) {
                this.createUserMessage();
            }
            if (this.birdle.modal.show) {
                this.closeBirdleModal();
            }
        });
        this.birdle.bird = this.birdle.wordBank[Math.floor(Math.random() * this.birdle.wordBank.length)];
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        togglePortfolioModal() {
            this.showPortfolioModal = !this.showPortfolioModal;
        },
        toggleRadMode() {
            this.radMode = !this.radMode;
        },
        copyShareLink() {
            navigator.clipboard.writeText('Check out this strangely niche and much worse version of Wordle! ' + window.location.href);
            this.birdle.linkCopied = true;
        },
        checkWord() {
            let guess = this.birdle.guess;
            this.axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`)
                .then(response => {
                    if (response.data[0].word === guess) this.makeGuess(guess);
                }).catch(error => {
                this.birdle.modal.notAWord = true;
                this.birdle.modal.show = true;
            });
        },
        enterPress() {
            if (!this.birdle.modal.show) {
                this.checkWord();
            } else {
                this.closeBirdleModal();
                return false;
            }
        },
        closeBirdleModal() {
            this.birdle.modal.show = false;
            setTimeout(() => {
                this.birdle.modal.show = false;
                this.birdle.modal.notAWord = false;
                this.birdle.modal.guessRepeat = false;
                this.birdle.modal.minLetters = false;
            }, 1000);
        },
        birdleFocus() {
            if (!this.birdle.gameOver) this.$refs.birdleInput.focus();
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
                this.birdle.modal.minLetters = true;
                this.birdle.modal.show = true;
                return;
            }
            // Make sure the user hasn't already guessed this word
            if (this.birdle.attempts.includes(this.birdle.guess)) {
                this.birdle.modal.guessRepeat = true;
                this.birdle.modal.show = true;
                return;
            }
            // Add the guess to the attempts array
            this.birdle.attempts.push(this.birdle.guess);
            // Check if the user has won, lost, or still playing
            if (this.birdle.guess === this.birdle.bird) {
                this.birdle.gameWon = true;
                this.birdle.gameOver = true;
                this.birdle.modal.show = true;
            } else if (this.remainingGuesses === 0) {
                this.birdle.gameLost = true;
                this.birdle.gameOver = true;
                this.birdle.modal.show = true;
            }
            this.birdle.guess = "";
        },
        birdleReset() {
            // Reset the game but don't use the same word twice in a row
            let newWord = this.birdle.wordBank[Math.floor(Math.random() * this.birdle.wordBank.length)];
            console.log('currentWord', this.birdle.bird);
            console.log('newWord', newWord);
            while (newWord === this.birdle.bird) {
                newWord = this.birdle.wordBank[Math.floor(Math.random() * this.birdle.wordBank.length)];
            }
            this.birdle.bird = newWord;
            this.birdle.guess = "";
            this.birdle.attempts = [];
            this.birdle.gameOver = false;
            this.birdle.gameWon = false;
            this.birdle.gameLost = false;
            this.birdle.linkCopied = false;
        },
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
                }, 500);
            }, 2000);

        },
    },
    computed: {
        activeDataTab() {
            return this.dataTabs.find(t => t.isActive);
        },
        guessLettersArray() {
            if (this.remainingGuesses > 0) return this.birdle.guess.split('').concat(Array(5 - this.birdle.guess.length).fill(''));
        },
        remainingGuesses() {
            return 5 - this.birdle.attempts.length;
        },
        modalHeading() {
            if (this.birdle.modal.guessRepeat) {
                return 'Oops!';
            } else if (this.birdle.modal.notAWord) {
                return 'Sorry!';
            } else if (this.birdle.modal.minLetters) {
                return 'Keep Typing!';
            } else if (this.birdle.gameLost) {
                return 'You lost!!';
            } else if (this.birdle.gameWon && this.remainingGuesses === 4) {
                return 'You...won?';
            } else if (this.birdle.gameWon) {
                return 'You won!!';
            } else {
                return 'Keep Typing!';
            }
        },
        modalContent() {
            if (this.birdle.modal.guessRepeat) {
                return 'You\'ve already tried that word';
            } else if (this.birdle.modal.notAWord) {
                return 'That\'s not a word';
            } else if (this.birdle.modal.minLetters) {
                return 'Your guess must be a five letter word!';
            } else if (this.birdle.gameLost) {
                return 'Tip: Try harder';
            } else if (this.birdle.gameWon && this.remainingGuesses === 4) {
                return 'Wow, first try! Did you cheat? Tell your friends about your amazing luck!';
            } else if (this.birdle.gameWon) {
                return 'Be sure to brag to your friends!';
            } else {
                return '';
            }
        }
    },
    watch: {
        // if this.birdle.linkCopied is true, set it to false after 5 seconds
        // 'birdle.linkCopied': function (val) {
        //     if (val) {
        //         setTimeout(() => {
        //             this.birdle.linkCopied = false;
        //         }, 2000);
        //     }
        // }
    }
}
</script>
