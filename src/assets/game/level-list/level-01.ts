import { Level } from '../../../game-engine/Level'
import { Room } from '../../../game-engine/Room'
import { SpriteSheet } from '../../../game-engine/SpriteSheet'
import { legend } from '../sprite-sheets/map/legend'

export const mapBlueprint = `
..........
..........
..........
..........
..........
..........
..........
..........
....↑.....
....↓.....
`

const room0 = new Room(
    {
        actors: `
↘↓↓↓↓↓↓.↓↙
→...00...←
→....0...←
→....00..←
→........←
→.0.....*←
→.00..0..←
→........←
→..**...0←
↗↑↑↑↑↑↑↑↑↖
    `,
        background: `
░░░░░░░░░░
░░░░░░░░░░
░░░░░░░░░░
░░░▒▒▒▒░░░
░░░▒░░▒░░░
░░░▒░░▒░░░
░░░▒▒▒▒░░░
░░░░░░░░░░
░░░░░░░░░░
░░░░░░░░░░
    `,
    },
    [4, 9],
    {
        no: 1,
        ea: null,
        we: null,
        so: null,
    }
)

const room1 = new Room(
    {
        actors: `
↘↓↓↓↓↓↓↓↓↙
→..**....←
→....0...←
→........←
→........←
→.0.....*←
→....0...←
→........←
→.......0←
↗↑↑↑↑↑↑.↑↖
    `,
        background: `
▒▒▒▒▒▒▒▒▒▒
░░░░░░░░░░
░░░░░░░░░░
░░░░░▒░░░░
░░░▒▒▒░░░░
░░░░░▒░░░░
░░░▒▒▒▒░░░
░░░░░░░░░░
░░░░░░░░░░
▒▒▒▒▒▒▒▒▒▒
    `,
    },
    [4, 8],
    {
        no: null,
        ea: null,
        we: null,
        so: 0,
    }
)

export const level01 = new Level(
    [room0, room1],
    new SpriteSheet('map-sprite-sheet', legend),
    mapBlueprint
)
