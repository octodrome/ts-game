// @TODO add other levels
// @TODO trim white spaces in sketches correctly
// @TODO use the Blueprint class to generate levelList

import { Legend } from '../../../game-engine/types'

const actorsBlueprint = {
    tileWidth: 16,
    sketch: `
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
    legend: {
        '↘': [0, 0],
        '↙': [1, 0],
        '↓': [2, 0],
        '←': [3, 0],
        '*': [6, 0],
        '0': [7, 0],
        '↗': [0, 1],
        '↖': [1, 1],
        '→': [2, 1],
        '↑': [3, 1],
    },
    url: '/src/assets/game/tilemaps/tilemap.png',
}

const backgroundBlueprint = {
    tileWidth: 16,
    sketch: `
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
    legend: {
        '░': [6, 1],
        '▒': [7, 1],
    },
    url: '/src/assets/game/tilemaps/tilemap.png',
}

export const levelList = [
    { actors: actorsBlueprint, background: backgroundBlueprint },
]

export class Blueprint {
    sketch: string
    legend: Legend
    url: string
    tileWidth: number = 16

    constructor(sketch: string, legend: Legend, url: string) {
        this.sketch = sketch
        this.legend = legend
        this.url = url
    }
}
