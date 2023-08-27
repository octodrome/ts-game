// @TODO check if the blueprint is valid

import { CardinalDirection, RoomPosition } from './types'

type RoomConnexions = {
    NORTH: number | null
    EAST: number | null
    WEST: number | null
    SOUTH: number | null
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

    hasConnexionOn(direction: CardinalDirection): boolean {
        return typeof this.connexions[direction] === 'number'
    }
}
