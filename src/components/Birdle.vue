<template>
    <div id="birdleApp" v-show="showApp" @click="birdleFocus" class="animate__animated" :class="[
        { 'animate__animated': isMobile },
        { 'show': showApp }
        ]">
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
        <div class="keyboard">
            <div class="keyboard-row" v-for="row in keyboardLayout" :key="row">
                <button v-for="key in row" :key="key" @click="handleKeyPress(key)" :class="keyClass(key)">
                    {{ key }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Birdle",
    data() {
        return {
            isMobile: window.innerWidth < 768,
            showApp: true,
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
            keyboardLayout: [
                ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
            ],
            guessedLetters: {}
        }
    },
    mounted() {
        if (window.innerWidth < 768) {
            // this.showApp = false;
        }
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
            console.log('checking word');
            let guess = this.guess.toLowerCase();
            console.log('guess', guess);
            this.axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`)
                .then(response => {
                    if (response.data[0].word === guess) this.makeGuess(guess);
                }).catch(error => {
                    console.log('error', error);
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
        handleKeyPress(key) {
            if (this.guess.length < 5) {
                this.guess += key;
            }
        },
        keyClass(key) {
            if (this.guessedLetters[key] === 'correct-position') {
                return 'correct-position';
            } else if (this.guessedLetters[key] === 'correct-letter') {
                return 'correct-letter';
            } else if (this.guessedLetters[key] === 'wrong-letter') {
                return 'wrong-letter';
            } else {
                return '';
            }
        },
        makeGuess() {
            console.log('making guess');
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

            this.guess.split('').forEach((letter, index) => {
                if (letter === this.bird[index]) {
                    this.$set(this.guessedLetters, letter, 'correct-position');
                } else if (this.bird.includes(letter)) {
                    this.$set(this.guessedLetters, letter, 'correct-letter');
                } else {
                    this.$set(this.guessedLetters, letter, 'wrong-letter');
                }
            });
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

<style lang="scss">
    @import "../assets/scss/breakpoints.scss";
    @import "../assets/scss/colors.scss";

    #birdleApp {
        width: 100%;
        justify-self: center;
        display: grid;
        background-color: $darkestNight;
        z-index: 10;

        &.show {
            animation: bounceIn .5s;
        }

        @include breakpoint(lg) {
            position: relative;
            width: 25rem;
        }

        .birdle-grid {
            display: grid;
            grid: repeat(5, 1fr) / 1fr;
            grid-gap: .5rem;
            margin-top: 1rem;
            grid-row: 1 / -1;
            grid-column: 1 / -1;
            padding: 2rem;

            @include breakpoint(lg) {
                padding: 0;
            }

            &.fade {
                opacity: .2;
                transition: opacity .4s;
            }

            .row {
                //height: 5rem;
                display: grid;
                grid: auto / repeat(5, 1fr);
                grid-gap: .5rem;
                justify-items: center;
                align-items: center;
                text-transform: uppercase;
                font-weight: 600;
                font-size: 2rem;

                .letter {
                    border: 2px solid gray;
                    height: 100%;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    aspect-ratio: 1/1;

                    &.correct-position {
                        background: $purple;
                        color: $white;
                    }

                    &.correct-letter {
                        background: $blue;
                        color: $white;
                    }

                    &.wrong-letter {
                        background: $darkNight;
                        color: $white;
                    }
                }
            }
        }

        .birdle-modal {
            background: $darkNight;
            grid-column: 1 / -1;
            grid-row: 1 / -1;
            height: 50%;
            align-self: center;
            z-index: 10;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 1rem;
            border-radius: 3px;
            border: 3px solid $purple;

            &__container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: .5rem;
                padding: 1rem;

                .share-link-btn {
                    background: $purple;
                    color: $white;
                    border-radius: .19rem;
                    width: fit-content;
                    padding: .5rem 1rem;
                    font-size: .8rem;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: .5rem;

                    &.copied {
                        background: darken($gray, 20%);
                        color: $gray;
                    }
                }
            }

            &__title {
                font-size: 2rem;
                font-weight: bold;
            }


            .modal-close {
                pointer-events: all;
                cursor: pointer;
                position: absolute;
                top: .3rem;
                right: .5rem;
            }
        }

        .legend-row {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            margin-top: 1rem;

            .legend-item {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: start;

                &__color {
                    height: .5rem;
                    width: .5rem;

                    &.correct-position {
                        background: $purple;
                    }

                    &.correct-letter {
                        background: $blue;
                    }

                    &.wrong-letter {
                        background: $darkNight;
                    }
                }

                &__text {
                    font-size: .7rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    margin-left: .5rem;
                }
            }
        }

        .input {
            display: flex;
            gap: 1rem;

            input {
                margin-top: 3rem;
                background: transparent;
                border: none;
                border-bottom: 2px solid $neon;
                border-radius: 0;
                width: 100%;
                height: 5rem;
                font-size: 2rem;
                outline: none;
                text-transform: uppercase;
                letter-spacing: 1rem;
                font-weight: 400;

                &:focus {
                    border-bottom: 2px solid $white;
                }
            }

            button {
                margin-top: 3rem;
                background: transparent;
                border: 2px solid $neon;
                color: $neon;
                height: fit-content;
                align-self: end;
                border-radius: .19rem;
                width: fit-content;
                padding: .5rem 1rem;
                font-size: .8rem;
                font-weight: 600;
                cursor: pointer;

                &:hover {
                    color: $white;
                    border-color: $white;
                    transition: .4s;
                }
            }
        }

        .restart {
            margin-top: 3rem;
            background: transparent;
            border: 2px solid $neon;
            color: $neon;
            height: fit-content;
            align-self: end;
            border-radius: .19rem;
            width: fit-content;
            padding: .5rem 1rem;
            font-size: .8rem;
            font-weight: 600;
            cursor: pointer;
            margin: 1rem auto;

            &:hover {
                color: $white;
                border-color: $white;
                transition: .4s;
            }
        }

        .keyboard {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
        }
        .keyboard-row {
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
        }
        .keyboard-row button {
            margin: 0 5px;
            padding: 10px;
            font-size: 16px;
            cursor: pointer;
        }
        .correct-position {
            background-color: green;
        }
        .correct-letter {
            background-color: yellow;
        }
        .wrong-letter {
            background-color: gray;
        }
    }
</style>