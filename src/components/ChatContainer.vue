<script>
export default {
    name: "ChatContainer",
    data() {
        return {
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
            ]
        }
    },
    mounted() {
        this.$emit('fullscreen');
        document.addEventListener('keydown', this.handleKeyPress);
    },
    methods: {
        handleKeyPress(event) {
            if (event.key === 'Enter') {
                this.createUserMessage();
            }
        },
        createBotMessage() {
            this.botThinking = true;
            setTimeout(() => {
                this.botThinking = false;
                this.chatLog.push({
                    user: false,
                    message: this.botResponses[Math.floor(Math.random() * this.botResponses.length)]
                });
                this.$nextTick(() => {
                    this.scrollToBottom();
                });
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
            this.$nextTick(() => {
                this.scrollToBottom();
            });
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const chatBody = this.$refs.chatBody;
                chatBody.scrollTop = chatBody.scrollHeight;
                // chatBody.scrollIntoView({ behavior: 'smooth', block: 'end' });
            });
        }
    }
}
</script>

<template>
    <div class="chat">
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
            <div class="chat-container__body" ref="chatBody">
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
</template>

<style scoped lang="scss">
@import '../assets/scss/colors';
@import '../assets/scss/breakpoints';

.chat {
    height: 100vh;
    background-color: $darkestNight;
    overflow: hidden;
    padding-top: 3rem;
    display: grid;
    grid: auto 1fr / 1fr;
    justify-items: center;
    align-items: start;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;

    @include breakpoint(lg) {
        padding-top: 6rem;
    }

    .chat-container {
        height: 35rem;
        width: 30rem;
        background: darken($darkestNight, 5%);
        color: $white;
        border-radius: 0.19rem;
        align-self: start;
        display: grid;
        grid: auto 1fr auto / 1fr;

        &__header {
            grid-row: 1;
            grid-column: 1;
            align-self: start;
            padding: .5rem 1rem;
            background: $darkerNight;
            display: flex;
            align-items: center;
            box-shadow: 0 5px 3px -2px black;
            z-index: 1;

            &__avatar {
                background-image: linear-gradient(180deg, $purple, $darkPurple);
                border-radius: 100%;
                width: 2.3rem;
                height: 2.3rem;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: .5rem;
            }

            &__username {

            }

            &__status {

            }
        }

        &__body {
            width: 100%;
            grid-row: 2;
            padding: 1rem;
            display: grid;
            grid-auto-rows: min-content;
            gap: 0.5rem;
            grid-column: 1;
            overflow-y: auto;
            overflow-x: hidden;

            &__message {
                padding: .5rem;
                color: $white;
                width: fit-content;
                max-width: 100%;
                height: fit-content;
                border-radius: .8rem;
                position: relative;

                &::before {
                    content: "\00a0";
                    display: block;
                    height: 16px;
                    width: 9px;
                    position: absolute;
                    bottom: -4.5px;
                }

                &.user {
                    background-image: linear-gradient(180deg, $blue, darken($blue, 20%));
                    justify-self: end;
                    margin-left: 10%;

                    &::before {
                        background-image: linear-gradient(40deg, darken($blue, 17%), darken($blue, 20%));
                        right: 10px;
                        -webkit-transform: rotate(118deg) skew(-5deg);
                    }
                }

                &.bot {
                    background-image: linear-gradient(180deg, $purple, $darkPurple);
                    justify-self: start;

                    &::before {
                        background-image: linear-gradient(40deg, darken($purple, 8%), $darkPurple);
                        left: 10px;
                        -webkit-transform: rotate(70deg) skew(5deg);
                    }
                }

                &.animate__fadeInLeft {
                    animation-delay: .5s;
                }

                &.animate__fadeInRight {
                    animation-delay: 1s;
                }
            }
        }

        &__loading-dots {
            grid-column: 1;
            grid-row: 2;
            align-self: end;
            padding-left: 1rem;

            #dots {
                fill: $night;
            }
        }

        &__footer {
            display: flex;
            padding: 1rem;
            gap: .5rem;
            grid-row: 3;
            grid-column: 1;

            input {
                width: 100%;
                background: $darkestNight;
                border: 2px solid $night;
                border-radius: .19rem;
                margin: 0;
                font-size: 1rem;
                text-indent: 0.5rem;
            }

            &__send {
                background: $purple;
                color: $white;
                border-radius: .19rem;
                width: fit-content;
                padding: .5rem 1rem;
                font-size: .8rem;
                font-weight: 600;
                cursor: pointer;

                &:hover {
                    background: darken($purple, 10%);
                }
            }
        }
    }
}
</style>