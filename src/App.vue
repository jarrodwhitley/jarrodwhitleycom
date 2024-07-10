<template>
    <header :class="{'fill': scrolling}">
        <img class="logo" width="80" src="/src/assets/images/jw-logo.svg" alt="logo"/>
        <div class="links">
            <a href="https://linkedin.com/jarrodwhitley"><i class="fa-brands fa-vuejs"></i></a>
            <a class="disabled" href="https://linkedin.com/jarrodwhitley"><i class="fa-brands fa-react"></i></a>
            <a href="https://linkedin.com/jarrodwhitley"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://linkedin.com/jarrodwhitley"><i class="fa-brands fa-soundcloud"></i></a>
            <a href="https://github.com/jarrodwhitley"><i class="fa-brands fa-github"></i></a>
        </div>
    </header>
    <section id="content" :class="{ 'no-animations': isLoading }">
        <section class="intro">
            <div class="text">
                <!-- <h1 class="page-title">I don't <span class="glitch" data-text="hack">hack</span>
                    mainframes</h1>
                <p class="page-subtitle">But I do listen to synthwave while building web apps</p> -->
                <div class="card-grid">
                    <div class="card">
                        <h3>Music</h3>
                        <div class="card__item">
                            <i class="fa-brands fa-apple"></i>
                            <span>Apple Music</span>
                        </div>
                        <div class="card__item">
                            <i class="fa-brands fa-spotify"></i>
                            <span>Spotify Music</span>
                        </div>
                    </div>
                    <div class="card">
                        <h3>Music</h3>
                        <div class="card__item">
                            <i class="fa-brands fa-apple"></i>
                            <span>Apple Music</span>
                        </div>
                        <div class="card__item">
                            <i class="fa-brands fa-spotify"></i>
                            <span>Spotify Music</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid-bg">
                <div class="grid-lines"></div>
            </div>
            <div class="crt-lines"></div>
            <div class="crt-darken"></div>
            <div class="crt-vignette"></div>
            <div class="circuit-board"></div>
        </section>
    </section>
    <footer>
        <h4>Acknowledgements</h4>
        <!-- <span>Circuit board animation by<a href="https://codepen.io/Temmer/full/ExjNJog" target="_blank">Temmer Péter</a></span> -->
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
            isLoading: true,
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
                {
                    id: 2,
                    name: 'BAMazon',
                    isActive: false,
                    data: 'bamazon',
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
                wordBank: ['heron', 'eagle', 'finch', 'robin', 'crane', 'goose', 'swift'],
                guess: "",
                attempts: [],
                modal: {
                    show: false,
                    notAWord: false,
                    guessRepeat: false,
                    minLetters: false,
                    gameOver: false,
                    gameLost: false,
                    gameWon: false,
                },
                linkCopied: false,
            },
            bamazon: {
                show: false,
                products: [],
            }
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
            if (event.keyCode === 13 && this.$refs.chatInput === document.activeElement ) {
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
                },500);
            }, 2000);

        },
        closeBamazon() {
            console.log('closing bamazon');
            this.bamazon.show = false;
        }
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
                return 'Tip: Try harder!';
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
// on keypress if key is "s" alert("s")
document.addEventListener('keydown', (event) => {
    if (event.keyCode === 83) {
        alert('s');
    }
});
</script>