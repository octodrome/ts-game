// @TODO check if the blueprint is valid

export class Room {
    blueprint: {
        background: string
        actors: string
    }
    constructor(blueprint: { background: string; actors: string }) {
        this.blueprint = blueprint
    }
}
