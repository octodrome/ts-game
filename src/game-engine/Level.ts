import { Room } from './Room'
import { SpriteSheet } from './SpriteSheet'

export class Level {
    roomList: Room[]
    spriteSheet: SpriteSheet
    mapBlueprint: string

    constructor(
        roomList: Room[],
        spriteSheet: SpriteSheet,
        mapBlueprint: string
    ) {
        this.roomList = roomList
        this.spriteSheet = spriteSheet
        this.mapBlueprint = mapBlueprint
    }
}
