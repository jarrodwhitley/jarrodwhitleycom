import jesusYoureEnoughArt from '../assets/images/album_art/jarrodwhitley/jesus_youre_enough.png'
import riversInTheDesertArt from '../assets/images/album_art/jarrodwhitley/rivers_in_the_desert.png'
import allThingsConsideredArt from '../assets/images/album_art/mtnfox/all_things_considered.jpg'
import goingThroughItArt from '../assets/images/album_art/mtnfox/going_through_it.jpg'
import goodbyeArt from '../assets/images/album_art/mtnfox/goodbye.jpg'
import mtnfoxEpArt from '../assets/images/album_art/mtnfox/mtnfox_ep.jpg'
import familiarPlacesArt from '../assets/images/album_art/mtnfox/mtnfox_familiar_places.png'

export const featuredRelease = {
    id: 'going-through-it',
    artistId: 'mtnfox',
    artistName: 'MTNfox',
    title: 'Going Through It',
    year: '2026',
    type: 'Single',
    blurb: 'Listen at the links below.',
    art: goingThroughItArt,
    accent: 'Melancholy unchained for your enjoyment.',
    links: {
        spotify: 'https://open.spotify.com/album/60nbSmtqtpgGOleKsxHPSm',
        appleMusic: 'https://music.apple.com/us/album/going-through-it-single/6775697658'
    },
}

export const musicArtists = [
    {
        id: 'jarrod-whitley',
        name: 'Jarrod Whitley',
        eyebrow: 'Storytelling and liturgy',
        intro: 'Original songs released under Jarrod Whitley, presented with full artwork and quick streaming links.',
        releases: [
            {
                id: 'jesus-youre-enough',
                title: "Jesus You're Enough",
                year: '2025',
                type: 'Single',
                art: jesusYoureEnoughArt,
                links: {
                    spotify: 'https://open.spotify.com/album/0OD8xrGcLbRfiUIYfTDsRZ',
                    appleMusic: 'https://music.apple.com/us/album/jesus-youre-enough-single/1812727402'
                }
            },
            {
                id: 'rivers-in-the-desert',
                title: 'Rivers in the Desert',
                year: '2024',
                type: 'Single',
                art: riversInTheDesertArt,
                links: {
                    spotify: 'https://open.spotify.com/album/4WetOSdI9G4Ulz1ZlSlefv',
                    appleMusic: 'https://music.apple.com/us/album/rivers-in-the-desert-single/1786815055'
                }
            },
        ],
    },
    {
        id: 'mtnfox',
        name: 'MTNfox',
        eyebrow: 'From the Appalachian foothills to your ears',
        intro: 'Lofi and instrumental releases',
        instagramHandle: '@mtnfoxmusic',
        instagramUrl: 'https://instagram.com/mtnfoxmusic',
        releases: [
            {
                id: 'going-through-it',
                title: 'Going Through It',
                year: '2026',
                type: 'Single',
                art: goingThroughItArt,
                links: {
                    spotify: 'https://open.spotify.com/album/60nbSmtqtpgGOleKsxHPSm',
                    appleMusic: 'https://music.apple.com/us/album/going-through-it-single/6775697658'
                },
            },
            {
                id: 'goodbye',
                title: 'Goodbye',
                year: '2026',
                type: 'Single',
                art: goodbyeArt,
                links: {
                    spotify: 'https://open.spotify.com/album/1PR3lYZrfJs5LF5EtsafkL',
                    appleMusic: 'https://music.apple.com/us/album/goodbye-single/1895506176'
                },
            },
            {
                id: 'all-things-considered',
                title: 'All Things Considered',
                year: '2026',
                type: 'Single',
                art: allThingsConsideredArt,
                links: {
                    spotify: '',
                    appleMusic: ''
                }
            },
            {
                id: 'familiar-places',
                title: 'Familiar Places',
                year: '2024',
                type: 'Single',
                art: familiarPlacesArt,
                links: {
                    spotify: 'https://open.spotify.com/album/6XOZcBRxzXvR8l82OFjpNv',
                    appleMusic: 'https://music.apple.com/us/album/familiar-places/1751160488'
                }
            },
            {
                id: 'mtnfox-ep',
                title: 'MTNfox EP',
                year: '2024',
                type: 'EP',
                art: mtnfoxEpArt,
                links: {
                    spotify: 'https://open.spotify.com/album/6IxOjK9RlAHqvX5wROcs84',
                    appleMusic: 'https://music.apple.com/us/album/mtnfox-ep/1732933633'
                }
            },
        ],
    },
]

export const musicSections = [
    {
        id: 'featured',
        label: 'Latest Release',
    },
    {
        id: 'jarrod-whitley',
        label: 'Jarrod Whitley',
    },
    {
        id: 'mtnfox',
        label: 'MTNfox',
    },
]
