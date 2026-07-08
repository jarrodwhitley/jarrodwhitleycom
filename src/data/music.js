const albumArtFiles = import.meta.glob('../assets/images/album_art/**/*.{png,jpg,jpeg,webp,avif,gif}', {
    eager: true,
    import: 'default',
})

const albumArtByFileName = Object.entries(albumArtFiles).reduce((result, [path, url]) => {
    const fileName = path.split('/').pop()
    if (fileName) {
        result[fileName.toLowerCase()] = url
    }
    return result
}, {})

export function getAlbumArt(fileName) {
    const normalizedFileName = String(fileName || '').trim().toLowerCase()
    if (!normalizedFileName) {
        return ''
    }

    if (albumArtByFileName[normalizedFileName]) {
        return albumArtByFileName[normalizedFileName]
    }

    const baseName = normalizedFileName.replace(/\.[^.]+$/, '')
    const fallbackKey = Object.keys(albumArtByFileName).find((key) => key.startsWith(`${baseName}.`))

    return fallbackKey ? albumArtByFileName[fallbackKey] : ''
}

export function getReleaseId(title) {
    return String(title || '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

function createRelease(release) {
    return {
        ...release,
        id: getReleaseId(release.title),
    }
}

export const musicArtists = [
    {
        id: 'jarrod-whitley',
        name: 'Jarrod Whitley',
        eyebrow: 'Storytelling and liturgy',
        intro: 'Original songs released under Jarrod Whitley, presented with full artwork and quick streaming links.',
        instagramHandle: '@jarrodwhitleymusic',
        instagramUrl: 'https://www.instagram.com/jarrodwhitleymusic/',
        youtubeUrl: 'https://youtube.com/@jarrodwhitley?si=F29W6R2QNzdmeaY1',
        releases: [
            createRelease({
                title: "Me As A Painting",
                releaseDate: '7/2/2026',
                type: 'Single',
                art: getAlbumArt('me_as_a_painting.jpg'),
                links: {
                    spotify: 'https://open.spotify.com/track/0lr37FyvKQk6rlE0kK2T1c?si=eb39f544682d49e9',
                    appleMusic: 'https://music.apple.com/us/album/me-as-a-painting/6786721217?i=6786721218'
                }
            }),
            createRelease({
                title: "Jesus You're Enough",
                releaseDate: '1/1/2025',
                type: 'Single',
                art: getAlbumArt('jesus_youre_enough.png'),
                links: {
                    spotify: 'https://open.spotify.com/album/0OD8xrGcLbRfiUIYfTDsRZ',
                    appleMusic: 'https://music.apple.com/us/album/jesus-youre-enough-single/1812727402'
                }
            }),
            createRelease({
                title: 'Rivers in the Desert',
                releaseDate: '1/1/2024',
                type: 'Single',
                art: getAlbumArt('rivers_in_the_desert.png'),
                links: {
                    spotify: 'https://open.spotify.com/album/4WetOSdI9G4Ulz1ZlSlefv',
                    appleMusic: 'https://music.apple.com/us/album/rivers-in-the-desert-single/1786815055'
                }
            }),
        ],
    },
    {
        id: 'mtnfox',
        name: 'MTNfox',
        eyebrow: 'From the Appalachian mountains to your ears',
        intro: 'Lofi and instrumental releases',
        instagramHandle: '@mtnfoxmusic',
        instagramUrl: 'https://instagram.com/mtnfoxmusic',
        youtubeUrl: 'https://youtube.com/@mtnfoxmusic?si=1mGITSD5lcXOnbpt',
        releases: [
            createRelease({
                title: 'Together Again',
                type: 'Album',
                releaseDate: '8/1/26',
                art: getAlbumArt('together_again_web.jpg'),
                links: {
                    spotify: '',
                    appleMusic: ''
                },
            }),
            createRelease({
                title: 'Satogokoro',
                type: 'Single',
                releaseDate: '9/1/26',
                art: getAlbumArt('satogokoro.jpg'),
                links: {
                    spotify: '',
                    appleMusic: ''
                },
            }),
            createRelease({
                title: 'Going Through It',
                releaseDate: '1/1/2026',
                type: 'Single',
                art: getAlbumArt('going_through_it.jpg'),
                links: {
                    spotify: 'https://open.spotify.com/album/60nbSmtqtpgGOleKsxHPSm',
                    appleMusic: 'https://music.apple.com/us/album/going-through-it-single/6775697658'
                },
            }),
            createRelease({
                title: 'Goodbye',
                releaseDate: '1/1/2026',
                type: 'Single',
                art: getAlbumArt('goodbye.jpg'),
                links: {
                    spotify: 'https://open.spotify.com/album/1PR3lYZrfJs5LF5EtsafkL',
                    appleMusic: 'https://music.apple.com/us/album/goodbye-single/1895506176'
                },
            }),
            createRelease({
                title: 'All Things Considered',
                type: 'Single',
                releaseDate: '7/1/26',
                art: getAlbumArt('all_things_considered.jpg'),
                links: {
                    spotify: 'https://open.spotify.com/album/03CfYHLeRwa0QAHpypeJdu?si=3iI4m7mATKa72HRjNrPn5g',
                    appleMusic: 'https://music.apple.com/us/album/all-things-considered/6773197276?i=6773197277'
                }
            }),
            createRelease({
                title: 'Familiar Places',
                releaseDate: '1/1/2024',
                type: 'Album',
                art: getAlbumArt('mtnfox_familiar_places.png'),
                links: {
                    spotify: 'https://open.spotify.com/album/6XOZcBRxzXvR8l82OFjpNv',
                    appleMusic: 'https://music.apple.com/us/album/familiar-places/1751160488'
                }
            }),
            createRelease({
                title: 'MTNfox EP',
                releaseDate: '1/1/2024',
                type: 'EP',
                art: getAlbumArt('mtnfox_ep.jpg'),
                links: {
                    spotify: 'https://open.spotify.com/album/6IxOjK9RlAHqvX5wROcs84',
                    appleMusic: 'https://music.apple.com/us/album/mtnfox-ep/1732933633'
                }
            }),
        ],
    },
]

function parseDateValue(releaseDate) {
    const rawDate = String(releaseDate || '').trim()
    const match = rawDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/)

    if (!match) {
        return Number.NEGATIVE_INFINITY
    }

    const month = Number(match[1])
    const day = Number(match[2])
    let year = Number(match[3])

    if (match[3].length === 2) {
        year += year >= 70 ? 1900 : 2000
    }

    const date = new Date(year, month - 1, day)
    return Number.isNaN(date.getTime()) ? Number.NEGATIVE_INFINITY : date.getTime()
}

function getMostRecentRelease() {
    const now = Date.now()
    let mostRecent = null
    let mostRecentTime = Number.NEGATIVE_INFINITY

    musicArtists.forEach((artist) => {
        if (!artist.releases || !Array.isArray(artist.releases)) {
            return
        }

        artist.releases.forEach((release) => {
            const releaseTime = parseDateValue(release.releaseDate)
            const hasSpotify = release.links?.spotify && String(release.links.spotify).trim()
            const hasAppleMusic = release.links?.appleMusic && String(release.links.appleMusic).trim()
            const isReleased = releaseTime <= now

            if (isReleased && hasSpotify && hasAppleMusic && releaseTime > mostRecentTime) {
                mostRecentTime = releaseTime
                mostRecent = {
                    ...release,
                    artistId: artist.id,
                    artistName: artist.name,
                    blurb: 'Listen at the links below.',
                    accent: 'Musical nostalgia with a hint of melancholy.',
                }
            }
        })
    })

    return mostRecent || {
        id: 'placeholder',
        artistId: 'unknown',
        artistName: 'Unknown',
        title: 'No releases yet',
        releaseDate: '1/1/2024',
        type: 'Single',
        blurb: 'Listen at the links below.',
        accent: 'Coming soon.',
        art: '',
        links: {},
    }
}

export const featuredRelease = getMostRecentRelease()

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
    {
        id: 'contact',
        label: 'Contact',
    },
]
