import { Player } from '../Player'
import { Brick } from '../Brick'
import { Collectable } from '../Collectable'
import { Ground } from '../Ground'
import { Scene } from '../Scene'
import { levelList } from '../../assets/game/level-list/index'
import { CanvasDisplay } from '../../devices/CanvasDisplay'
import { CardinalDirection, Direction } from '../types'
import {
    notCollidingBottomOf,
    notCollidingLeftOf,
    notCollidingRightOf,
    notCollidingTopOf,
} from './collision'
import { Level } from '../Level'
import { Room } from '../Room'

export class Game {
    currentLevel: number = 0
    currentRoomIndex: number = 0
    currentPlayerPosition: [number, number] = [1, 1]
    levelList: Level[]
    scene: Scene | null = null
    player: Player | null = null
    brickList: Brick[] = []
    groundList: Ground[] = []
    collectableList: Collectable[] = []
    display: CanvasDisplay

    constructor(canvasElement: HTMLCanvasElement) {
        this.levelList = levelList
        this.display = new CanvasDisplay(canvasElement)
        this.initScene()
    }

    initScene() {
        this.scene = new Scene(
            this.currentLevel,
            levelList,
            this.currentRoomIndex,
            this.currentPlayerPosition
        )
        this.player = new Player(this.scene.playerSprite!)

        this.groundList = []
        this.scene.backgroundSpriteList.forEach((sprite) =>
            this.groundList.push(new Ground(sprite))
        )
        this.brickList = []
        this.scene.actorSpriteList.forEach((sprite) =>
            this.brickList.push(new Brick(sprite))
        )
        // this.scene.collectableSpriteList.forEach((sprite) =>
        //     this.collectableList.push(new Collectable(sprite))
        // )
        this.debug()
    }

    update() {
        this.player!.update()
    }

    // @TODO render should not be the Game responsability
    // only state and state mutation should be handled here
    // CanvasDisplay should do that instead
    render() {
        this.groundList.forEach((ground) => this.drawObject(ground))
        this.brickList.forEach((brick) => this.drawObject(brick))
        // this.collectableList.forEach((collectable) =>
        //     this.drawObject(collectable)
        // )
        this.drawObject(this.player!)
    }

    drawObject(object: Player | Brick) {
        this.display.draw(object)
    }

    onKeyboard(direction: Direction) {
        if (this.noCollision(direction)) this.player!.move(direction)
        if (this.isSwitching === 'NORTH') this.goToRoom(1, [7, 9])
        if (this.isSwitching === 'SOUTH') this.goToRoom(0, [7, 0])
        this.debug()
    }

    // @TODO fix collision not working when player moves 3px and gets stuck in collision block
    // maybe by moving collision system to Player class
    noCollision(direction: Direction): boolean {
        const notCollidingAnyBrick = {
            LEFT: this.brickList.every((b) =>
                notCollidingRightOf(b.sprite, this.player!)
            ),
            RIGHT: this.brickList.every((b) =>
                notCollidingLeftOf(b.sprite, this.player!)
            ),
            UP: this.brickList.every((b) =>
                notCollidingBottomOf(b.sprite, this.player!)
            ),
            DOWN: this.brickList.every((b) =>
                notCollidingTopOf(b.sprite, this.player!)
            ),
        }

        return notCollidingAnyBrick[direction]
    }

    get currentRoom(): Room {
        return this.levelList[this.currentLevel].roomList[this.currentRoomIndex]
    }

    get isSwitching(): CardinalDirection {
        const isSwitchingNorth =
            this.player!.sprite.startY < this.scene!.startY &&
            typeof this.currentRoom.connexions.no === 'number'
        const isSwitchingSouth =
            this.player!.sprite.endY > this.scene!.endY &&
            typeof this.currentRoom.connexions.so === 'number'
        const isSwitchingWest =
            this.player!.sprite.startX < this.scene!.startX &&
            typeof this.currentRoom.connexions.we === 'number'
        const isSwitchingEast =
            this.player!.sprite.endX > this.scene!.endX &&
            typeof this.currentRoom.connexions.ea === 'number'

        if (isSwitchingNorth) return 'NORTH'
        if (isSwitchingSouth) return 'SOUTH'
        if (isSwitchingWest) return 'WEST'
        if (isSwitchingEast) return 'EAST'

        return 'NOWHERE'
    }

    goToRoom(roomIndex: number, playerPosition: [number, number]): void {
        this.currentRoomIndex = roomIndex
        this.currentPlayerPosition = playerPosition
        this.initScene()
    }

    debug() {
        window.dispatchEvent(new CustomEvent('debug', { detail: this }))
        console.log('player sprite', this.player!.sprite)
        console.log('brick sprites', this.brickList)
    }
}
