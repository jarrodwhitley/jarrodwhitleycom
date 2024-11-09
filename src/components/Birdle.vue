<template>
    <div id="birdleApp" @click="birdleFocus">
        <div class="birdle-grid animate__animated" :class="{ 'fade': birdle.modal.show }">
            <div class="attempt row animate__animated"
                 :class="{ 'animate__heartBeat': attempt === birdle.bird }"
                 v-for="(attempt, index) in birdle.attempts"
                 :key="index">
                <div class="letter"
                     :class="letterCheck(letter, index)"
                     v-for="(letter, index) in attempt.split('')"
                     :key="index"
                     v-text="letter">
                </div>
            </div>
            <div class="guess row" v-if="remainingGuesses">
                <div class="guess letter animate__animated animate__faster"
                     :class="{ 'animate__pulse': letter }"
                     v-for="(letter, index) in guessLettersArray" v-text="letter"></div>
            </div>
            <div class="empty row"
                 v-if="remainingGuesses"
                 v-for="guess in (remainingGuesses - 1)">
                <div class="empty letter" v-for="letter in 5"></div>
            </div>
        </div>
        <div class="birdle-modal animate__animated" :class="this.birdle.modal.show ? 'animate__bounceIn' : 'animate__bounceOut'">
            <div class="birdle-modal__container">
                <div class="birdle-modal__title" v-text="modalHeading"></div>
                <div class="birdle-modal__content" v-text="modalContent"></div>
                <div v-if="birdle.gameWon" class="share-link-btn" :class="{ 'copied': birdle.linkCopied }" @click="copyShareLink" v-text="birdle.linkCopied ? 'Link Copied!' : 'Copy Share Link'"></div>
                <em v-if="birdle.gameLost">The answer was "{{ birdle.bird }}"</em>
            </div>
            <div class="modal-close" @click="closeBirdleModal">
                <i class="fa-solid fa-times"></i>
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
            <input v-model="birdle.guess" ref="birdleInput" maxlength="5" type="text" @keydown.enter.prevent="enterPress"/>
            <button @click="checkWord">Submit</button>
        </div>
        <div class="restart button" v-if="birdle.gameOver">
            <div @click="birdleReset">Play Again</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Birdle",
    data() {
        return {
            birdle: {
                bird: '',
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
        }
    },
    props: {
        wordBank: Array
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
            let newWord = this.props.wordBank[Math.floor(Math.random() * this.props.wordBank.length)];
            console.log('currentWord', this.birdle.bird);
            console.log('newWord', newWord);
            while (newWord === this.birdle.bird) {
                newWord = this.props.wordBank[Math.floor(Math.random() * this.props.wordBank.length)];
            }
            this.birdle.bird = newWord;
            this.birdle.guess = "";
            this.birdle.attempts = [];
            this.birdle.gameOver = false;
            this.birdle.gameWon = false;
            this.birdle.gameLost = false;
            this.birdle.linkCopied = false;
        }
    },
    computed: {
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
    }
}
</script>

<style scoped>

</style>