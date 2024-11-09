<template>
    <div id="birdleApp" @click="birdleFocus">
        <div class="birdle-grid animate__animated" :class="{ 'fade': this.modal.show }">
            <div class="attempt row animate__animated"
                 :class="{ 'animate__heartBeat': attempt === this.bird }"
                 v-for="(attempt, index) in this.attempts"
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
        <div class="birdle-modal animate__animated" :class="this.modal.show ? 'animate__bounceIn' : 'animate__bounceOut'">
            <div class="birdle-modal__container">
                <div class="birdle-modal__title" v-text="modalHeading"></div>
                <div class="birdle-modal__content" v-text="modalContent"></div>
                <div v-if="this.modal.gameWon" class="share-link-btn" :class="{ 'copied': this.linkCopied }" @click="copyShareLink" v-text="this.linkCopied ? 'Link Copied!' : 'Copy Share Link'"></div>
                <em v-if="this.modal.gameLost">The answer was "{{ this.bird }}"</em>
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
        <div class="input" v-if="!this.modal.gameOver" onkeydown="return /[a-z]/i.test(event.key)">
            <input v-model="this.guess" ref="birdleInput" maxlength="5" type="text" @keydown.enter.prevent="enterPress"/>
            <button @click="checkWord">Submit</button>
        </div>
        <div class="restart button" v-if="this.modal.gameOver">
            <div @click="birdleReset">Play Again</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Birdle",
    data() {
        return {
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
            wordBank: [
                "eagle", "heron", "robin", "crane", "swift", "finch", "stork", "lark",
                "tern", "kite", "dove", "egret", "wren", "snipe", "quail", "scaup",
                "skua", "goose", "coot", "trogon", "pewee", "merle", "swan", "ouzel",
                "vireo", "knot", "ibis", "condor", "piper", "macaw", "puffin", "grebe",
                "junco", "heron", "eider", "saker", "finch", "serin", "corre", "owlet"
            ],
        }
    },
    mounted() {
        document.addEventListener('keydown', (event) => {
            if (event.keyCode === 13 && this.$refs.chatInput === document.activeElement) {
                this.createUserMessage();
            }
            if (this.modal.show) {
                this.closeBirdleModal();
            }
        });
        this.bird = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
    },
    methods: {
        copyShareLink() {
            navigator.clipboard.writeText('Check out this strangely niche and much worse version of Wordle! ' + window.location.href);
            this.linkCopied = true;
        },
        checkWord() {
            let guess = this.guess;
            this.axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`)
                .then(response => {
                    if (response.data[0].word === guess) this.makeGuess(guess);
                }).catch(error => {
                this.modal.notAWord = true;
                this.modal.show = true;
            });
        },
        enterPress() {
            if (!this.modal.show) {
                this.checkWord();
            } else {
                this.closeBirdleModal();
                return false;
            }
        },
        closeBirdleModal() {
            this.modal.show = false;
            setTimeout(() => {
                this.modal.show = false;
                this.modal.notAWord = false;
                this.modal.guessRepeat = false;
                this.modal.minLetters = false;
            }, 1000);
        },
        birdleFocus() {
            if (!this.modal.gameOver) this.$refs.birdleInput.focus();
        },
        letterCheck(letter, index) {
            if (letter === this.bird[index]) {
                return 'correct-position';
            } else if (this.bird.includes(letter)) {
                return 'correct-letter';
            } else {
                return 'wrong-letter';
            }
        },
        makeGuess() {
            // Make sure the user has entered a 5-letter word
            if (this.guess.length !== 5) {
                this.modal.minLetters = true;
                this.modal.show = true;
                return;
            }
            // Make sure the user hasn't already guessed this word
            if (this.attempts.includes(this.guess)) {
                this.modal.guessRepeat = true;
                this.modal.show = true;
                return;
            }
            // Add the guess to the attempts array
            this.attempts.push(this.guess);
            // Check if the user has won, lost, or still playing
            if (this.guess === this.bird) {
                this.modal.gameWon = true;
                this.modal.gameOver = true;
                this.modal.show = true;
            } else if (this.remainingGuesses === 0) {
                this.modal.gameLost = true;
                this.modal.gameOver = true;
                this.modal.show = true;
            }
            this.guess = "";
        },
        birdleReset() {
            // Reset the game but don't use the same word twice in a row
            let newWord = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
            console.log('currentWord', this.bird);
            console.log('newWord', newWord);
            while (newWord === this.bird) {
                newWord = this.props.wordBank[Math.floor(Math.random() * this.props.wordBank.length)];
            }
            this.bird = newWord;
            this.guess = "";
            this.attempts = [];
            this.modal.gameOver = false;
            this.modal.gameWon = false;
            this.modal.gameLost = false;
            this.linkCopied = false;
        }
    },
    computed: {
        guessLettersArray() {
            if (this.remainingGuesses > 0) return this.guess.split('').concat(Array(5 - this.guess.length).fill(''));
        },
        remainingGuesses() {
            return 5 - this.attempts.length;
        },
        modalHeading() {
            if (this.modal.guessRepeat) {
                return 'Oops!';
            } else if (this.modal.notAWord) {
                return 'Sorry!';
            } else if (this.modal.minLetters) {
                return 'Keep Typing!';
            } else if (this.modal.gameLost) {
                return 'You lost!!';
            } else if (this.modal.gameWon && this.remainingGuesses === 4) {
                return 'You...won?';
            } else if (this.modal.gameWon) {
                return 'You won!!';
            } else {
                return 'Keep Typing!';
            }
        },
        modalContent() {
            if (this.modal.guessRepeat) {
                return 'You\'ve already tried that word';
            } else if (this.modal.notAWord) {
                return 'That\'s not a word';
            } else if (this.modal.minLetters) {
                return 'Your guess must be a five letter word!';
            } else if (this.modal.gameLost) {
                return 'Tip: Try harder';
            } else if (this.modal.gameWon && this.remainingGuesses === 4) {
                return 'Wow, first try! Did you cheat? Tell your friends about your amazing luck!';
            } else if (this.modal.gameWon) {
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