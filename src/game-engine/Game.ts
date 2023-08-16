import { Player } from './Player'
import { Brick } from './Brick'
import { Sprite } from './Sprite'
import { Map } from './Map'
import { levelList } from '../assets/game/levels/level-list'
import { CanvasDisplay } from '../devices/CanvasDisplay'
import { Direction } from './types'

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
            this.player.move({ x: -1, y: 0 })
        }
        if (keyboardEvent === 'RIGHT' && this.noCollision('RIGHT')) {
            this.player.move({ x: 1, y: 0 })
        }
        if (keyboardEvent === 'UP' && this.noCollision('UP')) {
            this.player.move({ x: 0, y: -1 })
        }
        if (keyboardEvent === 'DOWN' && this.noCollision('DOWN')) {
            this.player.move({ x: 0, y: 1 })
        }
        this.debug()
    }

    noCollision(direction: Direction): boolean {
        const isOnTopOf = (sprite: Sprite): boolean => {
            return this.player.sprite.endY < sprite.startY
        }

        const isUnder = (sprite: Sprite): boolean => {
            return this.player.sprite.startY > sprite.endY
        }

        const isRightOf = (sprite: Sprite): boolean => {
            return this.player.sprite.startX > sprite.endX
        }

        const isLeftOf = (sprite: Sprite): boolean => {
            return this.player.sprite.endX < sprite.startX
        }

        const overlapsOnXWith = (sprite: Sprite): boolean => {
            return (
                this.player.sprite.startX < sprite.endX &&
                this.player.sprite.endX > sprite.startX
            )
        }

        const overlapsOnYWith = (sprite: Sprite): boolean => {
            return (
                this.player.sprite.startY < sprite.endY &&
                this.player.sprite.endY > sprite.startY
            )
        }

        const notCollidingBottomOf = (sprite: Sprite): boolean => {
            return (
                (isUnder(sprite) && overlapsOnXWith(sprite)) ||
                !overlapsOnXWith(sprite) ||
                this.player.sprite.endY <= sprite.startY
            )
        }

        const notCollidingTopOf = (sprite: Sprite): boolean => {
            return (
                (isOnTopOf(sprite) && overlapsOnXWith(sprite)) ||
                !overlapsOnXWith(sprite) ||
                this.player.sprite.startY >= sprite.endY
            )
        }

        const notCollidingRightOf = (sprite: Sprite): boolean => {
            return (
                (isRightOf(sprite) && overlapsOnYWith(sprite)) ||
                !overlapsOnYWith(sprite) ||
                this.player.sprite.endX <= sprite.startX
            )
        }

        const notCollidingLeftOf = (sprite: Sprite): boolean => {
            return (
                (isLeftOf(sprite) && overlapsOnYWith(sprite)) ||
                !overlapsOnYWith(sprite) ||
                this.player.sprite.startX >= sprite.endX
            )
        }

        const notCollidingAnyBrick = {
            LEFT: this.brickList.every((b) => notCollidingRightOf(b.sprite)),
            RIGHT: this.brickList.every((b) => notCollidingLeftOf(b.sprite)),
            UP: this.brickList.every((b) => notCollidingBottomOf(b.sprite)),
            DOWN: this.brickList.every((b) => notCollidingTopOf(b.sprite)),
        }

        console.log('notCollidingAnyBrick', notCollidingAnyBrick)

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
