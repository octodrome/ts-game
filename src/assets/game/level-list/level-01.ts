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
↘↓↓↓↓↓..↓↙
→...00...←
→....0...←
→....00..←
..........
..0.......
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
        NORTH: 1,
        EAST: 2,
        WEST: 3,
        SOUTH: null,
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
↗↑↑↑↑↑..↑↖
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
        NORTH: null,
        EAST: null,
        WEST: null,
        SOUTH: 0,
    }
)

const room2 = new Room(
    {
        actors: `
↘↓↓↓↓↓↓↓↓↙
→...00...←
→....0...←
→....00..←
.........←
.........←
→.00..0..←
→........←
→..**...0←
↗↑↑↑↑↑↑↑↑↖
    `,
        background: `
░░░░░░░░░░
░░░░░░░░░░
░░░░░░░░░░
░░░▒▒▒░░░░
░░░░░░▒░░░
░░░░▒▒░░░░
░░░▒▒▒▒░░░
░░░░░░░░░░
░░░░░░░░░░
░░░░░░░░░░
    `,
    },
    [4, 9],
    {
        NORTH: null,
        EAST: null,
        WEST: 0,
        SOUTH: null,
    }
)

const room3 = new Room(
    {
        actors: `
↘↓↓↓↓↓↓↓↓↙
→..**....←
→....0...←
→........←
→.........
→.0.......
→....0...←
→........←
→.......0←
↗↑↑↑↑↑↑↑↑↖
    `,
        background: `
▒▒▒▒▒▒▒▒▒▒
░░░░░░░░░░
░░░░░░░░░░
░░░▒▒▒▒░░░
░░░░░▒▒░░░
░░░░░░▒░░░
░░░▒▒▒▒░░░
░░░░░░░░░░
░░░░░░░░░░
▒▒▒▒▒▒▒▒▒▒
    `,
    },
    [4, 8],
    {
        NORTH: null,
        EAST: 0,
        WEST: null,
        SOUTH: null,
    }
)

export const level01 = new Level(
    [room0, room1, room2, room3],
    new SpriteSheet('map-sprite-sheet', legend),
    mapBlueprint
)
