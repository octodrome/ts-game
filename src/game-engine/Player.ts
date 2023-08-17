import { Sprite } from './Sprite'
import { Size } from './types'

export class Player {
    sprite: Sprite
    size: Size = { w: 50, h: 50 }
    color: string = '#FF0000'
    gravity = 0.2
    velocity = 3

    constructor(sprite: Sprite) {
        this.sprite = sprite
    }

    update(): void {
        if (this.gravity > 0) this.applyGravity()
    }

    applyGravity(): void {
        this.sprite.update(0, this.velocity)

        if (this.sprite.endY + this.velocity >= 500) this.velocity = 0
        else this.velocity += this.gravity
    }

    move({ x, y }: { x: number; y: number }) {
        this.sprite.update(x, y)
    }

    logPlayerSprite() {
        console.log('Player sprite', this.sprite)
    }
}
