import { Level } from '../../../game-engine/Level'
import { Room } from '../../../game-engine/Room'
import { SpriteSheet } from '../../../game-engine/SpriteSheet'
import { legend } from '../sprite-sheets/map/legend'

// @TODO add other rooms

const room1 = new Room({
    actors: `
↘↓↓↓↓↓↓↓↓↙
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
})

const room2 = new Room({
    actors: `
↘↓↓↓↓↓↓↓↓↙
→..**...←
→....0...←
→.......←
→........←
→.0.....*←
→....0..←
→........←
→.......0←
↗↑↑↑↑↑↑↑↑↖
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
})

export const level01 = new Level(
    [room1, room2],
    new SpriteSheet('map-sprite-sheet', legend)
)
