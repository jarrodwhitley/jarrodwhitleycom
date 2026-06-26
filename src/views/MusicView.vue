<template>
    <div class="music-page">

        <div class="music-layout">
            <aside class="music-sidebar">
                <div class="sidebar-shell">
                    <p class="sidebar-label">Jump to</p>
                    <nav class="section-nav" aria-label="Music sections">
                        <button
                            v-for="section in musicSections"
                            :key="section.id"
                            type="button"
                            class="section-link"
                            :class="{ active: activeSection === section.id }"
                            @click="jumpToSection(section.id)"
                        >
                            <span class="section-index">{{ sectionIndex(section.id) }}</span>
                            <span>{{ section.label }}</span>
                        </button>
                    </nav>
                </div>
            </aside>

            <div class="music-content">
                <section id="featured" class="music-section featured-release" data-music-section>
                    <div class="section-heading">
                        <p class="section-kicker">Most Recent Release</p>
                        <h2>{{ featuredRelease.title }}</h2>
                    </div>

                    <article class="featured-card">
                        <figure class="featured-art">
                            <img :src="featuredRelease.art" :alt="`${featuredRelease.title} album art`"/>
                        </figure>

                        <div class="featured-copy">
                            <div class="featured-meta">
                                <span>{{ featuredRelease.artistName }}</span>
                                <span>{{ releaseYear(featuredRelease) }}</span>
                                <span>{{ featuredRelease.type }}</span>
                            </div>
                            <p class="featured-accent">{{ featuredRelease.accent }}</p>
                            <p class="featured-blurb">{{ featuredRelease.blurb }}</p>
                            <div class="listen-links featured-links">
                                <a
                                    v-for="link in normalizedLinks(featuredRelease.links)"
                                    :key="link.label"
                                    class="listen-link"
                                    :href="link.url"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <i :class="link.icon"></i>
                                    <span>{{ link.label }}</span>
                                </a>
                                <span v-if="isComingSoon(featuredRelease.links)" class="listen-link is-disabled">
                                    <i class="fa-solid fa-clock"></i>
                                    <span>{{ upcomingReleaseLabel(featuredRelease) }}</span>
                                </span>
                            </div>
                        </div>
                    </article>
                </section>

                <section
                    v-for="artist in musicArtists"
                    :id="artist.id"
                    :key="artist.id"
                    class="music-section artist-section"
                    data-music-section
                >
                    <div class="section-heading artist-heading">
                        <div class="artist-title-row">
                            <h2>{{ artist.name }}</h2>
                            <a
                                v-if="artist.instagramUrl"
                                class="artist-social-link"
                                :href="artist.instagramUrl"
                                target="_blank"
                                rel="noreferrer"
                                :aria-label="`Open Instagram profile for ${artist.name}`"
                                :title="artist.instagramHandle || 'Instagram'"
                            >
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                        </div>
                        <p class="section-kicker">{{ artist.eyebrow }}</p>
                        <!-- <p class="section-intro">{{ artist.intro }}</p> -->
                    </div>

                    <div class="release-grid">
                        <article v-for="release in sortedReleasesForArtist(artist)" :key="release.id" class="release-card">
                            <figure class="release-art">
                                <img :src="release.art" :alt="`${release.title} album art`"/>
                            </figure>
                            <div class="release-copy">
                                <div class="release-topline">
                                    <span>{{ release.type }}</span>
                                    <span>{{ releaseYear(release) }}</span>
                                </div>
                                <span><h3>{{ release.title }}</h3>
                                <p>{{ artist.name }}</p></span>
                                <div class="listen-links">
                                    <a
                                        v-for="link in normalizedLinks(release.links)"
                                        :key="`${release.id}-${link.label}`"
                                        class="listen-link"
                                        :href="link.url"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i :class="link.icon"></i>
                                        <span>{{ link.label }}</span>
                                    </a>
                                    <span v-if="isComingSoon(release.links)" class="listen-link is-disabled">
                                        <i class="fa-solid fa-clock"></i>
                                        <span>{{ upcomingReleaseLabel(release) }}</span>
                                    </span>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>

                <section id="contact" class="music-section contact-section" data-music-section>
                    <div class="section-heading">
                        <p class="section-kicker">Contact</p>
                        <h2>Get in Touch</h2>
                        <p class="section-intro">Send a message about bookings, features, or collaborations.</p>
                    </div>

                    <form class="contact-form" @submit.prevent="submitContactForm">
                        <div class="form-field">
                            <label for="contact-artist">Artist</label>
                            <select
                                id="contact-artist"
                                v-model="contactForm.artist"
                                name="artist"
                                required
                            >
                                <option disabled value="">Choose an artist</option>
                                <option value="Jarrod Whitley">Jarrod Whitley</option>
                                <option value="MTNfox">MTNfox</option>
                            </select>
                        </div>

                        <div class="form-field">
                            <label for="contact-name">Name</label>
                            <input id="contact-name" v-model="contactForm.name" name="name" type="text" required />
                        </div>

                        <div class="form-field">
                            <label for="contact-email">Email</label>
                            <input id="contact-email" v-model="contactForm.email" name="email" type="email" required />
                        </div>

                        <div class="form-field">
                            <label for="contact-message">Message</label>
                            <textarea
                                id="contact-message"
                                v-model="contactForm.message"
                                name="message"
                                rows="5"
                                required
                            ></textarea>
                        </div>

                        <div class="captcha-wrap" aria-live="polite">
                            <div ref="recaptchaContainer" class="recaptcha-container"></div>
                        </div>

                        <button type="submit" class="contact-submit" :disabled="isSubmitting">
                            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                        </button>
                        <p v-if="contactError" class="contact-error">{{ contactError }}</p>
                        <p v-if="contactSuccess" class="contact-success">Thanks for reaching out. Your message has been sent.</p>
                    </form>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import emailjs from '@emailjs/browser'
import { featuredRelease, musicArtists, musicSections } from '../data/music'

const CONTACT_API_BASE_URL = import.meta.env.VITE_CONTACT_API_BASE_URL
const DEFAULT_RECAPTCHA_SITE_KEY = '6LcttjYtAAAAAPzKs2pNieTgajSFXvhRIy7uTy0f'
const RECAPTCHA_SITE_KEY = String(import.meta.env.VITE_RECAPTCHA_SITE_KEY || DEFAULT_RECAPTCHA_SITE_KEY).trim()
const EMAILJS_SERVICE_ID = String(import.meta.env.VITE_EMAILJS_SERVICE_ID || '').trim()
const EMAILJS_TEMPLATE_ID = String(import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '').trim()
const EMAILJS_TO_EMAIL = String(import.meta.env.VITE_EMAILJS_TO_EMAIL || '').trim()

function buildContactApiUrl() {
    const baseUrl = String(CONTACT_API_BASE_URL || '').trim()

    if (!baseUrl) {
        return '/api/contact'
    }

    return new URL('/api/contact', baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`).toString()
}

function getContactErrorMessage(error) {
    if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.message
        if (serverMessage && String(serverMessage).trim()) {
            return String(serverMessage).trim()
        }

        if (error.response?.status === 429) {
            return 'Too many requests. Please wait a moment and try again.'
        }

        if (error.response?.status === 403) {
            return 'Captcha verification failed. Please try again.'
        }

        if (error.response?.status && error.response.status >= 500) {
            return 'The contact service is unavailable right now. Please try again later.'
        }

        if (error.request) {
            return 'Could not reach the contact service. Please try again in a moment.'
        }
    }

    return 'Could not send right now. Please try again in a moment.'
}

function isEmailJsConfigured() {
    return Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_TO_EMAIL)
}

let recaptchaScriptPromise = null
const RECAPTCHA_SCRIPT_ID = 'music-page-recaptcha-script'
const RECAPTCHA_ONLOAD_CALLBACK = '__musicPageRecaptchaOnload'

function resolveRecaptchaApi(grecaptchaGlobal) {
    if (!grecaptchaGlobal) {
        return null
    }

    if (typeof grecaptchaGlobal.render === 'function') {
        return grecaptchaGlobal
    }

    if (grecaptchaGlobal.enterprise && typeof grecaptchaGlobal.enterprise.render === 'function') {
        return grecaptchaGlobal.enterprise
    }

    return null
}

function loadRecaptchaScript() {
    if (typeof window === 'undefined') {
        return Promise.reject(new Error('reCAPTCHA requires a browser environment.'))
    }

    if (resolveRecaptchaApi(window.grecaptcha)) {
        return Promise.resolve(window.grecaptcha)
    }

    if (recaptchaScriptPromise) {
        return recaptchaScriptPromise
    }

    recaptchaScriptPromise = new Promise((resolve, reject) => {
        const existingScript = document.getElementById(RECAPTCHA_SCRIPT_ID)
        if (existingScript) {
            existingScript.remove()
        }

        window[RECAPTCHA_ONLOAD_CALLBACK] = () => {
            if (resolveRecaptchaApi(window.grecaptcha)) {
                resolve(window.grecaptcha)
            } else {
                reject(new Error('reCAPTCHA loaded but render API was unavailable.'))
            }
        }

        const script = document.createElement('script')
        script.id = RECAPTCHA_SCRIPT_ID
        script.src = `https://www.google.com/recaptcha/api.js?onload=${RECAPTCHA_ONLOAD_CALLBACK}&render=explicit`
        script.async = true
        script.defer = true
        script.dataset.recaptcha = 'true'
        script.onerror = () => reject(new Error('Could not load reCAPTCHA.'))
        document.head.appendChild(script)
    })

    return recaptchaScriptPromise
}

export default {
    name: 'MusicView',
    data() {
        return {
            activeSection: 'featured',
            featuredRelease,
            musicArtists,
            musicSections,
            sectionObserver: null,
            isSubmitting: false,
            contactError: '',
            contactSuccess: false,
            recaptchaToken: '',
            recaptchaWidgetId: null,
            recaptchaApi: null,
            recaptchaReady: false,
            contactForm: {
                artist: '',
                name: '',
                email: '',
                message: '',
            },
        }
    },
    mounted() {
        this.sectionObserver = new IntersectionObserver(
            (entries) => {
                const visibleSection = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0]

                if (visibleSection?.target?.id) {
                    this.activeSection = visibleSection.target.id
                }
            },
            {
                rootMargin: '-20% 0px -45% 0px',
                threshold: [0.2, 0.35, 0.5, 0.7],
            }
        )

        this.$nextTick(() => {
            this.observeSections()

            if (this.$route.hash) {
                this.activeSection = this.$route.hash.replace('#', '')
            }

            this.setupRecaptcha()
        })
    },
    beforeUnmount() {
        this.sectionObserver?.disconnect()
    },
    methods: {
        getScrollOffset() {
            const nav = document.querySelector('.site-nav')
            const navHeight = nav ? Math.ceil(nav.getBoundingClientRect().height) : 0
            return navHeight + 20
        },
        observeSections() {
            const sections = this.$el.querySelectorAll('[data-music-section]')
            sections.forEach((section) => this.sectionObserver?.observe(section))
        },
        sectionIndex(sectionId) {
            const index = this.musicSections.findIndex((section) => section.id === sectionId)
            return String(index + 1).padStart(2, '0')
        },
        jumpToSection(sectionId) {
            const sectionElement = document.getElementById(sectionId)

            if (!sectionElement) {
                return
            }

            this.activeSection = sectionId

            const targetY = sectionElement.getBoundingClientRect().top + window.scrollY - this.getScrollOffset()
            window.scrollTo({
                top: Math.max(targetY, 0),
                behavior: 'smooth',
            })

            if (this.$route.hash !== `#${sectionId}`) {
                this.$router.replace({
                    name: 'music',
                    hash: `#${sectionId}`,
                })
            }
        },
        normalizedLinks(rawLinks) {
            if (Array.isArray(rawLinks)) {
                return rawLinks
                    .filter((link) => link?.url && String(link.url).trim())
                    .map((link) => ({
                        label: link.label,
                        icon: link.icon,
                        url: String(link.url).trim(),
                    }))
            }

            if (!rawLinks || typeof rawLinks !== 'object') {
                return []
            }

            const sources = [
                {
                    key: 'spotify',
                    label: 'Spotify',
                    icon: 'fa-brands fa-spotify',
                },
                {
                    key: 'appleMusic',
                    label: 'Apple Music',
                    icon: 'fa-brands fa-apple',
                },
            ]

            return sources
                .map((source) => {
                    const url = rawLinks[source.key]
                    if (!url || !String(url).trim()) {
                        return null
                    }

                    return {
                        label: source.label,
                        icon: source.icon,
                        url: String(url).trim(),
                    }
                })
                .filter(Boolean)
        },
        isComingSoon(rawLinks) {
            return this.normalizedLinks(rawLinks).length === 0
        },
        parseReleaseDateParts(releaseDate) {
            const rawDate = String(releaseDate || '').trim()
            const match = rawDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/)

            if (!match) {
                return null
            }

            const month = Number(match[1])
            const day = Number(match[2])
            let year = Number(match[3])

            if (match[3].length === 2) {
                year += year >= 70 ? 1900 : 2000
            }

            return { month, day, year }
        },
        parseReleaseDateValue(release) {
            const parts = this.parseReleaseDateParts(release?.releaseDate)
            if (parts) {
                const parsedDate = new Date(parts.year, parts.month - 1, parts.day)
                if (!Number.isNaN(parsedDate.getTime())) {
                    return parsedDate.getTime()
                }
            }

            return Number.NEGATIVE_INFINITY
        },
        releaseYear(release) {
            const parts = this.parseReleaseDateParts(release?.releaseDate)
            return parts ? String(parts.year) : 'TBD'
        },
        sortedReleasesForArtist(artist) {
            if (!artist?.releases || !Array.isArray(artist.releases)) {
                return []
            }

            return [...artist.releases].sort((left, right) => {
                return this.parseReleaseDateValue(right) - this.parseReleaseDateValue(left)
            })
        },
        upcomingReleaseLabel(release) {
            if (release?.releaseDate && String(release.releaseDate).trim()) {
                return `Release Date ${String(release.releaseDate).trim()}`
            }

            return 'Coming Soon'
        },
        async setupRecaptcha() {
            if (!RECAPTCHA_SITE_KEY || !this.$refs.recaptchaContainer) {
                return
            }

            try {
                const grecaptchaGlobal = await loadRecaptchaScript()
                const recaptchaApi = resolveRecaptchaApi(grecaptchaGlobal)
                const renderFn = recaptchaApi?.render

                if (this.recaptchaWidgetId !== null) {
                    return
                }

                if (typeof renderFn !== 'function') {
                    throw new Error('reCAPTCHA render function is unavailable.')
                }

                this.recaptchaApi = recaptchaApi
                this.recaptchaWidgetId = renderFn.call(recaptchaApi, this.$refs.recaptchaContainer, {
                    sitekey: RECAPTCHA_SITE_KEY,
                    callback: (token) => {
                        this.recaptchaToken = token
                        this.contactError = ''
                    },
                    'expired-callback': () => {
                        this.recaptchaToken = ''
                    },
                    'error-callback': () => {
                        this.recaptchaToken = ''
                        this.contactError = 'Captcha failed to load. Please refresh and try again.'
                    },
                })

                this.recaptchaReady = true
            } catch (error) {
                this.contactError = 'Captcha could not be initialized. Please refresh and try again.'
                console.error('reCAPTCHA setup failed', error)
            }
        },
        resetRecaptcha() {
            if (typeof window === 'undefined') {
                return
            }

            if (this.recaptchaApi && this.recaptchaWidgetId !== null && typeof this.recaptchaApi.reset === 'function') {
                this.recaptchaApi.reset(this.recaptchaWidgetId)
            }

            this.recaptchaToken = ''
        },
        async submitContactForm() {
            this.contactError = ''
            this.contactSuccess = false

            if (!RECAPTCHA_SITE_KEY) {
                this.contactError = 'Captcha is not configured yet. Please refresh and try again.'
                return
            }

            if (!this.recaptchaReady || !this.recaptchaToken) {
                this.contactError = 'Please complete the captcha checkbox before sending.'
                return
            }

            if (!isEmailJsConfigured()) {
                this.contactError = 'Email delivery is not configured yet. Please try again later.'
                return
            }

            this.isSubmitting = true

            try {
                const formPayload = {
                    artist: this.contactForm.artist,
                    name: this.contactForm.name,
                    email: this.contactForm.email,
                    message: this.contactForm.message,
                }

                try {
                    const response = await axios.post(buildContactApiUrl(), {
                        ...formPayload,
                        captchaToken: this.recaptchaToken,
                    })

                    if (!response?.data?.success) {
                        throw new Error(response?.data?.message || 'Captcha verification failed. Please try again.')
                    }
                } catch (error) {
                    this.contactError = getContactErrorMessage(error)
                    return
                }

                try {
                    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                        ...formPayload,
                        to_email: EMAILJS_TO_EMAIL,
                    })
                } catch (error) {
                    this.contactError = 'Could not send email. Please try again later.'
                    console.error('EmailJS send failed', error)
                    return
                }

                this.contactSuccess = true
                this.contactForm = {
                    artist: '',
                    name: '',
                    email: '',
                    message: '',
                }
                this.resetRecaptcha()
            } catch (error) {
                this.contactError = 'Could not send right now. Please try again in a moment.'
                console.error('Contact form submission failed', error)
            } finally {
                this.isSubmitting = false
            }
        },
    },
}
</script>

<style scoped lang="scss">
@import '../assets/scss/colors';
@import '../assets/scss/breakpoints';

:global(#app) {
    overflow-x: visible;
}

.music-page {
    min-height: 100vh;
    padding: 7rem 1.25rem 4rem;
    background:
        radial-gradient(circle at top, rgba($andes, 0.2), transparent 25%),
        radial-gradient(circle at right top, rgba($neon, 0.14), transparent 30%),
        linear-gradient(180deg, $darkNight 0%, $darkestNight 55%, darken($darkestNight, 2%) 100%);
    color: $white;

    @include breakpoint(md) {
        padding: 8rem 1.5rem 5rem;
    }
}

.music-hero {
    max-width: 78rem;
    margin: 0 auto;
    display: grid;
    gap: 2rem;

    @include breakpoint(lg) {
        grid-template-columns: minmax(0, 1.6fr) minmax(18rem, 0.8fr);
        align-items: end;
    }

    .hero-summary {
        padding: 1.25rem;
        border: 1px solid rgba($andes, 0.3);
        border-radius: 1.5rem;
        background: linear-gradient(180deg, rgba($darkerNight, 0.92) 0%, rgba($darkestNight, 0.9) 100%);
        box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.25);
        display: grid;
        gap: 0.35rem;

        .summary-label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.25rem;
            color: $andes;
        }

        strong {
            font-size: 1.5rem;
        }

        span:last-child {
            color: rgba(255, 255, 255, 0.66);
        }
    }

    .eyebrow {
        margin: 0 0 1rem;
        text-transform: uppercase;
        letter-spacing: 0.4rem;
        color: $andes;
        font-size: 0.75rem;
    }

    h1 {
        margin: 0;
        font-size: clamp(3rem, 8vw, 5.5rem);
        line-height: 0.95;
    }

    .lede {
        max-width: 36rem;
        margin: 1.5rem 0 0;
        color: rgba(255, 255, 255, 0.72);
        font-size: 1.125rem;
    }
}

.music-layout {
    max-width: 78rem;
    margin: 3rem auto 0;
    display: grid;
    gap: 2rem;
    overflow: visible;

    @include breakpoint(lg) {
        display: flex;
        align-items: start;
    }
}

.music-sidebar {
    @include breakpoint(lg) {
        position: -webkit-sticky;
        position: sticky;
        top: 7.5rem;
        align-self: start;
        flex: 0 0 17rem;
        max-width: 17rem;
    }

    .sidebar-shell {
        display: grid;
        gap: 0.9rem;
    }

    .sidebar-label {
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.25rem;
        font-size: 0.78rem;
        color: rgba(255, 255, 255, 0.55);
    }
}

.section-nav {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    height: auto;
    padding: 0;
    z-index: auto;
    align-items: stretch;
    transition: none;
    display: grid;
    grid: auto / 1fr;
    grid-auto-flow: column;
    grid-auto-columns: minmax(13rem, 1fr);
    gap: 0.75rem;
    overflow-x: auto;
    overflow-y: visible;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;

    @include breakpoint(lg) {
        grid-auto-flow: row;
        grid-auto-columns: auto;
        overflow: visible;
    }
}

.section-link {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.85rem;
    align-items: center;
    padding: 0.95rem 1rem;
    width: 100%;
    text-align: left;
    font: inherit;
    cursor: pointer;
    border-radius: 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba($darkestNight, 0.7);
    color: rgba(255, 255, 255, 0.74);
    transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease, background 0.2s ease;

    &:hover,
    &.active {
        color: $white;
        border-color: rgba($andes, 0.4);
        background: linear-gradient(135deg, rgba($andes, 0.18) 0%, rgba($neon, 0.18) 100%);
        transform: none;
    }

    .section-index {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.42);
        letter-spacing: 0.18rem;
    }
}

@include breakpoint(lg) {
    .section-link {
        &:hover,
        &.active {
            transform: translateY(-2px);
        }
    }
}

.music-content {
    display: grid;
    gap: 2rem;

    @include breakpoint(lg) {
        flex: 1 1 auto;
        min-width: 0;
    }
}

.music-section {
    padding: 1.5rem;
    border-radius: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: linear-gradient(180deg, rgba($darkerNight, 0.94) 0%, rgba($darkestNight, 0.92) 100%);
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.25);
    scroll-margin-top: 7rem;

    @include breakpoint(md) {
        padding: 2rem;
    }
}

.section-heading {
    display: grid;
    gap: 0.5rem;
    margin-bottom: 1.5rem;

    h2 {
        margin: 0;
        font-size: clamp(2rem, 4vw, 3.2rem);
        line-height: 0.95;
        text-align: left;
        justify-self: start;
    }

    .section-kicker {
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.25rem;
        font-size: 0.8rem;
        color: $andes;
    }

    .section-intro {
        margin: 0;
        max-width: 40rem;
        color: rgba(255, 255, 255, 0.68);
    }
}

.artist-title-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: nowrap;
}

.artist-social-link {
    width: 2.4rem;
    height: 2.4rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0;
    border-radius: 50%;
    border: 1px solid rgba($neon, 0.38);
    color: rgba(255, 255, 255, 0.86);
    background: rgba($neon, 0.1);
    flex: 0 0 auto;
    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;

    &:hover {
        color: $white;
        border-color: rgba($neon, 0.62);
        background: rgba($neon, 0.2);
    }
}

.featured-card {
    display: grid;
    gap: 1.5rem;

    @include breakpoint(lg) {
        grid-template-columns: minmax(16rem, 22rem) minmax(0, 1fr);
        align-items: center;
    }
}

.featured-art,
.release-art {
    margin: 0;
    overflow: hidden;
    border-radius: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba($darkestNight, 0.8);
    aspect-ratio: 1;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
}

.featured-copy {
    display: grid;
    gap: 1rem;
}

.featured-meta,
.release-topline {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;

    span {
        padding: 0.35rem 0.7rem;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.06);
        color: rgba(255, 255, 255, 0.78);
        font-size: 0.85rem;
    }
}

.featured-accent {
    margin: 0;
    color: $andes;
    font-size: 1.2rem;
    font-weight: 600;
}

.coming-soon-pill {
    width: fit-content;
    margin: 0;
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.08rem;
    border: 1px solid rgba($neon, 0.4);
    color: rgba(255, 255, 255, 0.9);
    background: rgba($neon, 0.2);
}

.featured-blurb {
    margin: 0;
    max-width: 40rem;
    color: rgba(255, 255, 255, 0.72);
    font-size: 1rem;
}

.release-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15.5rem, 1fr));
    gap: 1.25rem;
}

.release-card {
    display: grid;
    gap: 1rem;
    align-content: start;
    padding: 1rem;
    border-radius: 1.5rem;
    background: linear-gradient(180deg, rgba($darkNight, 0.6) 0%, rgba($darkestNight, 0.8) 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-4px);
        border-color: rgba($neon, 0.28);
        box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.25);
    }

    h3 {
        margin: 0;
        font-size: 1.35rem;
    }

    p {
        margin: 0;
        color: rgba(255, 255, 255, 0.66);
    }
}

.release-copy {
    display: grid;
    gap: 0.75rem;
    align-content: start;
}

.listen-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.listen-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    min-width: 9.5rem;
    padding: 0.85rem 1rem;
    border-radius: 999px;
    border: 1px solid rgba($andes, 0.28);
    background: rgba($darkestNight, 0.7);
    color: $white;
    font-size: 0.95rem;
    transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;

    &:hover {
        border-color: rgba($andes, 0.5);
        background: rgba($andes, 0.12);
        transform: translateY(-2px);
    }

    &.is-disabled {
        border-color: rgba(255, 255, 255, 0.18);
        background: rgba(255, 255, 255, 0.06);
        color: rgba(255, 255, 255, 0.7);
        cursor: default;
        pointer-events: none;
    }
}

.featured-links .listen-link {
    min-width: 10.5rem;
}

.contact-section {
    .contact-form {
        display: grid;
        gap: 1rem;
        max-width: 42rem;
    }

    .form-field {
        display: grid;
        gap: 0.45rem;
    }

    label {
        font-size: 0.9rem;
        letter-spacing: 0.04rem;
        color: rgba(255, 255, 255, 0.82);
    }

    input,
    textarea,
    select {
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 0.85rem;
        background: rgba($darkestNight, 0.72);
        color: $white;
        height: 2.75rem;
        padding: 0.65rem 0.95rem;
        font: inherit;
    }

    select {
        box-sizing: border-box;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        border-radius: 0.85rem;
        padding-right: 2.6rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='%23d7d8e2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 0.9rem center;
        background-size: 1rem;
    }

    textarea {
        min-height: 2.75rem;
        resize: vertical;
    }

    .contact-submit {
        width: fit-content;
        border: 1px solid rgba($andes, 0.45);
        border-radius: 999px;
        background: rgba($andes, 0.16);
        color: $white;
        font: inherit;
        font-weight: 600;
        letter-spacing: 0.06rem;
        text-transform: uppercase;
        padding: 0.8rem 1.25rem;
        cursor: pointer;
        transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

        &:hover {
            background: rgba($andes, 0.24);
            border-color: rgba($andes, 0.7);
            transform: translateY(-1px);
        }

        &:disabled {
            opacity: 0.7;
            cursor: wait;
            transform: none;
        }
    }

    .captcha-wrap {
        display: grid;
        justify-content: start;
    }

    .recaptcha-container {
        min-height: 78px;
    }

    .contact-error {
        margin: 0;
        color: #ff9c9c;
        font-size: 0.95rem;
    }

    .contact-success {
        margin: 0;
        color: rgba($neon, 0.9);
        font-size: 0.95rem;
    }
}
</style>
