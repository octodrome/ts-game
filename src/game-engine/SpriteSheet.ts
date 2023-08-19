import { Legend } from './types'

export class SpriteSheet {
    name: string
    legend: Legend

    constructor(name: string, legend: Legend) {
        this.name = name
        this.legend = legend
    }
}
