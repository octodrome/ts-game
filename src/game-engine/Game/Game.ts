import { Player } from '../Player'
import { Brick } from '../Brick'
import { Collectable } from '../Collectable'
import { Ground } from '../Ground'
import { Scene } from '../Scene'
import { levelList } from '../../assets/game/level-list/index'
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
    scene: Scene
    player: Player
    brickList: Brick[] = []
    groundList: Ground[] = []
    collectableList: Collectable[] = []
    display: CanvasDisplay

    constructor(canvasElement: HTMLCanvasElement) {
        this.level = 0
        this.scene = new Scene(this.level, levelList)
        this.player = new Player(this.scene.playerSprite!)
        this.scene.backgroundSpriteList.forEach((sprite) =>
            this.groundList.push(new Ground(sprite))
        )
        this.scene.actorSpriteList.forEach((sprite) =>
            this.brickList.push(new Brick(sprite))
        )
        // this.scene.collectableSpriteList.forEach((sprite) =>
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

    // @TODO fix collision not working when player moves 3px and gets stuck in collision block
    // maybe by moving collision system to Player class
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

        const notCollidingScene = {
            LEFT: this.player.sprite.startX > this.scene.startX,
            RIGHT: this.player.sprite.endX < this.scene.endX,
            UP: this.player.sprite.startY > this.scene.startY,
            DOWN: this.player.sprite.endY < this.scene.endY,
        }

        return notCollidingScene[direction] && notCollidingAnyBrick[direction]
    }

    debug() {
        window.dispatchEvent(new CustomEvent('debug', { detail: this }))
        console.log('player sprite', this.player.sprite)
        console.log('brick sprites', this.brickList)
    }
}
