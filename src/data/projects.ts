import wakeImg from '../assets/WakeOutOfTwilightPhoto.png'
import nflImg from '../assets/NFLToolPhoto.png'
import rumblingsImg from '../assets/RumblingsPhoto.png'
import homeserverImg from '../assets/HomeserverPhoto.png'
import odinImg from '../assets/OdinPhoto.png'

export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  image?: string
  links?: { github?: string; live?: string }
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Wake out of Twilight',
    description: `2D platforming game built with Unity and C# scripts. The game was developed solo.
        It ended up being released on the Steam marketplace.`,
    tags: ['Unity', 'C#'],
    image: wakeImg,
    links: { live: 'https://store.steampowered.com/app/1562830/Wake_out_of_Twilight/' },
  },
  {
    id: 2,
    title: 'NFL Game outcome guesser',
    description: `Console tool created in Go to attempt a low effort estimation of NFL winners for a week with 76% accuracy.
            The goal is to explore algorithms that take as few parameters as possible. In this case, was able to come within 2-3% of
            other major prediction algorithms using only turnover differential, big plays, and home team advantage as calculation
            factors.`,
    tags: ['Go', 'API', 'CLI'],
    image: nflImg,
    links: { github: 'https://github.com/FunkyGeorge/NFL-game-predictions' },
  },
  {
    id: 3,
    title: 'Rumblings',
    description: `Asymmetrical multiplayer game developed in Unity. This game is under development,
        it includes a peer to peer networking stack, AI controlled computer players, and in-game 
        puzzles.`,
    tags: ['Unity', 'C#', 'Networking'],
    image: rumblingsImg,
    links: { live: 'https://dogma-games.itch.io/rumblings' },
  },
  {
    id: 4,
    title: 'Homeserver',
    description: `Built a homeserver replacement for my image, media, cloud storage service needs.
            This was an effort break away from big tech and decentralize my data. I now buy my 
            own media to store on a Jellyfin docker container to eventually remove the need for the
            rising prices of streaming services. I've also set up an Immich docker container to
            backup my own photos from my phone instead of allowing other cloud services to use my
            photos for data. This started as a personal project and has now turned into a mini
            production environment where I try to maximize uptime for my family that also uses it.`,
    tags: ['VPS', 'Cloud Servers', 'Docker'],
    image: homeserverImg,
    // links: { github: 'https://github.com/user/delta' },
  },
  {
    id: 5,
    title: 'Odin shader project',
    description: `Coming soon. I've discovered an interest in learning Odin, a C like language, 
        which turns out to be great for graphics programming. I'm also using this opportunity to
        learn more about shaders and OpenGL. I'm currently working on creating some shader art. I 
        look forward to posting here soon.`,
    tags: ['Shaders', 'Raylib', 'Odin', 'OpenGL'],
    image: odinImg,
    links: { github: 'https://github.com/FunkyGeorge/Shaders' },
  },
]
