<template>
    <div id="birdleApp"
         ref="birdleApp"
         tabindex="0"
         class="animate__animated"
         :class="{ 'game-over': this.modal.gameOver }">
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
        <div class="birdle-modal animate__animated" :class="[
            { 'hide': !this.modal.cycleStarted },
            { 'animate__bounceIn' : this.modal.show },
            { 'animate__bounceOut' : !this.modal.show && this.modal.cycleStarted}
            ]">
            <div class="birdle-modal__container">
                <div class="birdle-modal__title" v-text="modalHeading"></div>
                <div class="birdle-modal__content" v-text="modalContent"></div>
                <div class="birdle-modal__button-wrapper" v-if="this.modal.gameWon">
                    <div class="outline-button blue" :class="{ 'copied': this.linkCopied }" @click="copyShareLink" v-text="this.linkCopied ? 'Link Copied!' : 'Copy Share Link'"></div>
                    <div class="outline-button neon" @click="birdleReset">
                        Play Again
                    </div>
                </div>

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
        <div class="keyboard">
            <div class="keyboard-row" v-for="row in keyboardLayout" :key="row">
                <button v-for="key in row" :key="key" @click="handleScreenPress(key)" :class="keyClass(key)">
                    {{ key }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoaded: false,
            userInteraction: false,
            isMobile: window.innerWidth < 768,
            bird: '',
            guess: '',
            attempts: [],
            modal: {
                show: false,
                notAWord: false,
                guessRepeat: false,
                minLetters: false,
                gameOver: false,
                gameLost: false,
                gameWon: false,
                cycleStarted: false
            },
            canCloseModal: false,
            linkCopied: false,
            wordBank: [
                "EAGLE", "HERON", "ROBIN", "CRANE", "SWIFT", "FINCH", "STORK", "EGRET", "SNIPE", "QUAIL", "SCAUP",
                "GOOSE", "PEWEE", "MERLE", "OUZEL", "VIREO", "PIPER", "MACAW", "GREBE", "JUNCO", "HERON", "EIDER",
                "SAKER", "FINCH", "SERIN", "CORRE", "OWLET", "RAVEN"
            ],
            keyboardLayout: [
                ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                ['ENTER','Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
            ],
            guessedLetters: {},
            tips: [
                'Try harder!',
                'Have you tried NOT getting pwned?',
                'You were so close! Ha, just kidding.',
                'It\'s never too late to go back to school',
                'Sucks to suck',
                ]
        }
    },
    mounted() {
        this.bird = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
        this.$nextTick(() => {
            this.$refs.birdleApp.focus();
        });
        console.log('bird', this.bird);

        document.addEventListener('keydown', this.handleKeyPress);
    },
    methods: {
        copyShareLink() {
            navigator.clipboard.writeText('Check out this strangely niche and much worse version of Wordle! ' + window.location.href);
            this.linkCopied = true;
        },
        checkWord() {
            // FIXME: overriding this temporarily to avoid API call limit
            // let guess = this.guess.toLowerCase();
            // this.axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`)
            //     .then(response => {
            //         if (response.data[0].word === guess) this.makeGuess(guess);
            //     }).catch(error => {
            //         console.log('error', error);
            //         this.modal.notAWord = true;
            //         this.showModal();
            // });

            this.makeGuess(this.guess.toLowerCase())
        },
        showModal() {
            this.modal.show = true;
            this.canCloseModal = false; // Disable closing
            setTimeout(() => {
                this.canCloseModal = true; // Enable closing after 2 seconds
            }, 1000);
        },
        enterPress() {
            if (this.modal.gameOver) return

            if (!this.modal.show && this.guess.length === 5) {
                this.checkWord();
            } else if (this.guess.length !== 5) {
                this.showModal();
                this.modal.minLetters = true;
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
        letterCheck(letter, index) {
            if (letter === this.bird[index]) {
                return 'correct-position';
            } else if (this.bird.includes(letter)) {
                return 'correct-letter';
            } else {
                return 'wrong-letter';
            }
        },
        handleKeyPress(event) {
            if (event.key.match(/^[a-z]$/i)) {
                if (this.guess.length < 5) {
                    this.guess += event.key.toUpperCase();
                }
                if (this.canCloseModal) {
                    this.closeBirdleModal();
                }
            }

            if (event.key === 'Enter') {
                this.enterPress();
            } else if (event.key === 'Backspace') {
                this.guess = this.guess.slice(0, -1);
            } else if (event.key === 'Escape') {
                this.closeBirdleModal();
            }
        },
        handleScreenPress(key) {
            if (key.match(/^[a-z]$/i)) {
                if (this.guess.length < 5) {
                    this.guess += key.toUpperCase();
                }
            }

            if (key === 'ENTER') {
                this.enterPress();
            } else if (key === 'BACK') {
                this.guess = this.guess.slice(0, -1);
            }

            const button = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent === key);
            if (button) {
                button.classList.add('flash');
                setTimeout(() => {
                    button.classList.remove('flash');
                }, 100);
            }
        },
        keyClass(key) {
            // key = key.toLowerCase();
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
            // Make sure the user has entered a 5-letter word
            if (this.guess.length !== 5) {
                this.modal.minLetters = true;
                this.showModal();
                return;
            }
            // Make sure the user hasn't already guessed this word
            if (this.attempts.includes(this.guess)) {
                this.modal.guessRepeat = true;
                this.showModal();
                return;
            }
            // Add the guess to the attempts array
            this.attempts.push(this.guess);
            // Check if the user has won, lost, or still playing
            if (this.guess === this.bird) {
                this.modal.gameWon = true;
                this.modal.gameOver = true;
                this.modal.show = true;
                // this.showModal();
            } else if (this.remainingGuesses === 0) {
                this.modal.gameLost = true;
                this.modal.gameOver = true;
                this.showModal();
            }

            for (let i = 0; i < this.bird.length; i++) {
                if (this.bird[i] === this.guess[i]) {
                    this.guessedLetters[this.bird[i]] = 'correct-position';
                } else if (this.bird.includes(this.guess[i])) {
                    this.guessedLetters[this.guess[i]] = 'correct-letter';
                } else {
                    this.guessedLetters[this.guess[i]] = 'wrong-letter';
                }
            }

            this.guess = "";

        },
        birdleReset() {
            this.modal.show = false;
            // Reset the game but don't use the same word twice in a row
            let newWord = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
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
        },
        getRandomTip() {
            const randomIndex = Math.floor(Math.random() * this.tips.length);
            return 'Tip: ' + this.tips[randomIndex];
        }
    },
    computed: {
        guessLettersArray() {
            if (this.remainingGuesses > 0) {
                return this.guess.split('').concat(Array(5 - this.guess.length).fill(''));
            }
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
            } else if (this.guess.length < 5 && this.modal.gameOver) {
                return 'Keep Typing!';
            } else {
                return ''
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
                return this.getRandomTip()
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
    outline: 0;

    &.show {
        animation: bounceIn .5s;
    }

    &.game-over {
        .keyboard {
            pointer-events: none;
            opacity: .5;
        }
    }

    @include breakpoint(lg) {
        position: relative;
        width: 400px;
    }

    .birdle-grid {
        //display: grid;
        grid: repeat(5, 1fr) / 1fr;
        grid-gap: .5rem;
        //margin-top: 1rem;
        grid-row: 1 / -1;
        grid-column: 1 / -1;
        padding: 1rem 2rem;

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
            margin-bottom: 10px;

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
        min-height: 30vh;
        align-self: center;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1rem;
        border-radius: 3px;
        border: 3px solid $purple;

        &.hide  {
            opacity: 0;
        }

        &__container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: .5rem;
            padding: 1rem;
            width: 100%;

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

        &__button-wrapper {
            width: 100%;
            display: grid;
            grid: auto / 1fr 1fr;
            justify-items: center;
            align-items: center;
            grid-gap: 1rem;
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
        max-width: fit-content;
        gap: 10px;
        align-items: center;
        justify-self: center;
        font-size: 8px;

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
                font-size: .6rem;
                font-weight: 600;
                text-transform: uppercase;
                margin-left: .5rem;

                @include breakpoint(lg) {
                    font-size: .7rem;
                }
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

    .outline-button {
        background: transparent;
        border: 2px solid $neon;
        color: $neon;
        height: fit-content;
        align-self: end;
        border-radius: .19rem;
        padding: .5rem 1rem;
        font-size: .8rem;
        font-weight: 600;
        cursor: pointer;
        margin: 1rem auto;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            color: $white;
            background-color: $neon;
            border-color: $neon;
            transition: .4s;
        }

        &.neon {
            background: transparent;
            color: $neon;
            border: 2px solid $neon;

            &:hover {
                background: $neon;
                color: white;
            }
        }

        &.blue {
            background: transparent;
            color: $blue;
            border: 2px solid $blue;

            &:hover {
                background: $blue;
                color: white;
            }
        }
    }

    .keyboard {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
        max-width: 100vw;
    }

    .keyboard-row {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
    }

    .keyboard-row button {
        margin: 0 4px;
        padding: 14px 10px;
        //font-size: 16px;
        min-width: 30px;
        //max-width: max-content;
        cursor: pointer;
        --webkit-appearance: none;
        border: 0;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $darkNight;
        color: whitesmoke;

        &.flash {
            background-color: $neon;
            transition: background-color 100ms;
        }

        //&.correct-position {
        //    background-color: $purple;
        //}
        //
        //&.correct-letter {
        //    background-color: $blue;
        //}

        &.wrong-letter {
            opacity: .3;
            cursor: default;
            pointer-events: none;
        }
    }
}
</style>