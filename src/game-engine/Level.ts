import { Room } from './Room'
import { SpriteSheet } from './SpriteSheet'

export class Level {
    roomList: Room[]
    spriteSheet: SpriteSheet

    constructor(roomList: Room[], spriteSheet: SpriteSheet) {
        this.roomList = roomList
        this.spriteSheet = spriteSheet
    }
}
