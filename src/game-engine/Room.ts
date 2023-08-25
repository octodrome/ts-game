// @TODO check if the blueprint is valid

import { RoomPosition } from './types'

type RoomConnexions = {
    no: RoomPosition
    ea: RoomPosition
    we: RoomPosition
    so: RoomPosition
}

export class Room {
    position: RoomPosition
    connexions: RoomConnexions
    blueprint: {
        background: string
        actors: string
    }
    constructor(
        blueprint: { background: string; actors: string },
        position: RoomPosition,
        connexions: RoomConnexions
    ) {
        this.blueprint = blueprint
        this.position = position
        this.connexions = connexions
    }
}
