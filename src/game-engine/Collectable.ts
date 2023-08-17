import { Sprite } from './Sprite'
import { Size } from './types'

export class Collectable {
    sprite: Sprite
    size: Size = { w: 50, h: 50 }
    color: string = 'yellow'

    constructor(sprite: Sprite) {
        this.sprite = sprite
    }

    update(): void {}
}
