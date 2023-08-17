import { Player } from '../Player'
import { Brick } from '../Brick'
import { Map } from '../Map'
import { levelList } from '../../assets/game/levels/level-list'
import { CanvasDisplay } from '../../devices/CanvasDisplay'
import { Direction } from '../types'
import {
    notCollidingBottomOf,
    notCollidingLeftOf,
    notCollidingRightOf,
    notCollidingTopOf,
} from './collision'

export class Game {
    level: number
    map: Map
    player: Player
    brickList: Brick[] = []
    display: CanvasDisplay

    constructor(canvasElement: HTMLCanvasElement) {
        this.level = 0
        this.map = new Map(this.level, levelList)
        this.player = new Player(this.map.playerSprite!)
        this.map.brickSpriteList.forEach((brickIndexes) =>
            this.brickList.push(new Brick(brickIndexes))
        )
        this.display = new CanvasDisplay(canvasElement)
        this.debug()
    }

    update() {
        this.player.update()
        this.brickList.forEach((b) => b.update())
    }

    render() {
        this.display.clear()
        this.brickList.forEach((brick) => this.drawObject(brick))
        this.drawObject(this.player)
    }

    drawObject(object: Player | Brick) {
        this.display.draw(object)
    }

    onKeyboard(keyboardEvent: Direction) {
        if (keyboardEvent === 'LEFT' && this.noCollision('LEFT')) {
            this.player.move({ x: -2, y: 0 })
        }
        if (keyboardEvent === 'RIGHT' && this.noCollision('RIGHT')) {
            this.player.move({ x: 2, y: 0 })
        }
        if (keyboardEvent === 'UP' && this.noCollision('UP')) {
            this.player.move({ x: 0, y: -2 })
        }
        if (keyboardEvent === 'DOWN' && this.noCollision('DOWN')) {
            this.player.move({ x: 0, y: 2 })
        }
        this.debug()
    }

    noCollision(direction: Direction): boolean {
        const notCollidingAnyBrick = {
            LEFT: this.brickList.every((b) =>
                notCollidingRightOf(b.sprite, this.player)
            ),
            RIGHT: this.brickList.every((b) =>
                notCollidingLeftOf(b.sprite, this.player)
            ),
            UP: this.brickList.every((b) =>
                notCollidingBottomOf(b.sprite, this.player)
            ),
            DOWN: this.brickList.every((b) =>
                notCollidingTopOf(b.sprite, this.player)
            ),
        }

        const notCollidingMap = {
            LEFT: this.player.sprite.startX > this.map.startX,
            RIGHT: this.player.sprite.endX < this.map.endX,
            UP: this.player.sprite.startY > this.map.startY,
            DOWN: this.player.sprite.endY < this.map.endY,
        }

        return notCollidingMap[direction] && notCollidingAnyBrick[direction]
    }

    debug() {
        window.dispatchEvent(new CustomEvent('debug', { detail: this }))
        console.log('player sprite', this.player.sprite)
        console.log('brick sprites', this.brickList)
    }
}
