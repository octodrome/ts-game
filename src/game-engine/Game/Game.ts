import { Player } from '../Player'
import { Brick } from '../Brick'
import { Collectable } from '../Collectable'
import { Ground } from '../Ground'
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
    groundList: Ground[] = []
    collectableList: Collectable[] = []
    display: CanvasDisplay

    constructor(canvasElement: HTMLCanvasElement) {
        this.level = 0
        this.map = new Map(this.level, levelList)
        this.player = new Player(this.map.playerSprite!)
        this.map.backgroundSpriteList.forEach((sprite) =>
            this.groundList.push(new Ground(sprite))
        )
        this.map.actorSpriteList.forEach((sprite) =>
            this.brickList.push(new Brick(sprite))
        )
        // this.map.collectableSpriteList.forEach((sprite) =>
        //     this.collectableList.push(new Collectable(sprite))
        // )
        this.display = new CanvasDisplay(canvasElement)
        this.debug()
    }

    update() {
        this.player.update()
    }

    render() {
        this.groundList.forEach((ground) => this.drawObject(ground))
        this.brickList.forEach((brick) => this.drawObject(brick))
        // this.collectableList.forEach((collectable) =>
        //     this.drawObject(collectable)
        // )
        this.drawObject(this.player)
    }

    drawObject(object: Player | Brick) {
        this.display.draw(object)
    }

    onKeyboard(direction: Direction) {
        if (this.noCollision(direction)) this.player.move(direction)
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
