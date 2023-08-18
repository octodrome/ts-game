import { Sprite } from './Sprite'
import { Direction, Size } from './types'

export class Player {
    sprite: Sprite
    size: Size = { w: 50, h: 50 }
    color: string = '#FF0000'
    gravity = 0
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

    move(direction: Direction) {
        const speed = 3
        const moves = {
            LEFT: { x: -speed, y: 0 },
            RIGHT: { x: speed, y: 0 },
            UP: { x: 0, y: -speed },
            DOWN: { x: 0, y: speed },
        }

        this.sprite.update(moves[direction].x, moves[direction].y)
    }

    logPlayerSprite() {
        console.log('Player sprite', this.sprite)
    }
}
