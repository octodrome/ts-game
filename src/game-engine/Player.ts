import { Sprite } from './Sprite'
import { Size } from './types'

// @TODO implement velocity and gravity
export class Player {
    sprite: Sprite
    size: Size = { w: 50, h: 50 }
    color: string = '#FF0000'

    constructor(sprite: Sprite) {
        this.sprite = sprite
    }

    move({ x, y }: { x: number; y: number }) {
        this.sprite.update(x, y)
    }

    logPlayerSprite() {
        console.log('Player sprite', this.sprite)
    }
}
