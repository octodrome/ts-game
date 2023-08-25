import { Sprite } from './Sprite'
import { Size } from './types'

export class Ground {
    sprite: Sprite
    size: Size = { w: 50, h: 50 }

    constructor(sprite: Sprite) {
        this.sprite = sprite
    }
}
