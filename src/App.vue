<template>
    <nav :class="[{'fill': scrolling}, {'professional-mode': !radMode}]">
        <RouterLink to="/">
            <div class="logo">
                <img src="/src/assets/images/jw-logo.svg" alt="Jarrod Whitley"/>
            </div>
        </RouterLink>
        <div class="links">
            <a class="portfolio" @click="togglePortfolioModal" title="See UI/UX portfolio">
                <i class="fa-brands fa-sketch"></i>
            </a>
            <span class="divider">|</span>
            <a title="Display page in Vue"><i class="fa-brands fa-vuejs"></i></a>
            <a class="disabled" href="#" title="Display page in React (Under Construction)"><i class="fa-brands fa-react"></i></a>
            <a href="https://linkedin.com/in/jarrodwhitley"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://github.com/jarrodwhitley"><i class="fa-brands fa-github"></i></a>
        </div>
    </nav>
    <main>
        <RouterView/>
    </main>
    <footer>
        <h4>Acknowledgements</h4>
        <span>Mac OS 9 window by<a href="https://codepen.io/perragnar/pen/wrJzqO" target="_blank">Per Ragnar Edin</a></span>
        <span>Circuit board animation by<a href="https://codepen.io/Temmer/full/ExjNJog" target="_blank">Temmer Péter</a></span>
        <span>Synthwave Grid by<a href="https://codepen.io/pierredarrieutort/pen/Vwaoqqe" target="_blank">Pierre Darrieutort</a></span>
        <span>Glitch text by<a href="https://codepen.io/lbebber/pen/nqwBKK" target="_blank">Lucas Bebber</a></span>
    </footer>
</template>

<script>
    export default {
        data() {
            return {
                radMode: true,
                scrolling: false
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll);
        },
        methods: {
            handleScroll(event) {
                this.scrollPos = window.scrollY;
                this.scrolling = this.scrollPos > 10;
            },
        }
    }
</script>

<style src="./style.scss" rel="stylesheet"></style>