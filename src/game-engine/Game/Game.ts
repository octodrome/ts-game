import { Scene } from '../Scene'
import { levelList } from '../../assets/game/level-list/index'
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

    constructor() {
        this.levelList = levelList
        this.initScene()
    }

    initScene() {
        this.scene = new Scene(
            this.currentLevel,
            levelList,
            this.currentRoomIndex,
            this.currentPlayerPosition
        )

        this.debug()
    }

    onKeyboard(direction: Direction) {
        if (this.noCollision(direction)) this.scene!.player!.move(direction)
        if (this.isSwitchingRoom === 'NORTH') this.goToRoom(1, [7, 9])
        if (this.isSwitchingRoom === 'SOUTH') this.goToRoom(0, [7, 0])
        this.debug()
    }

    // @TODO fix collision not working when player moves 3px and gets stuck in collision block
    // maybe by moving collision system to Player class
    noCollision(direction: Direction): boolean {
        const notCollidingAnyBrick = {
            LEFT: this.scene!.brickList.every((b) =>
                notCollidingRightOf(b.sprite, this.scene!.player!)
            ),
            RIGHT: this.scene!.brickList.every((b) =>
                notCollidingLeftOf(b.sprite, this.scene!.player!)
            ),
            UP: this.scene!.brickList.every((b) =>
                notCollidingBottomOf(b.sprite, this.scene!.player!)
            ),
            DOWN: this.scene!.brickList.every((b) =>
                notCollidingTopOf(b.sprite, this.scene!.player!)
            ),
        }

        return notCollidingAnyBrick[direction]
    }

    get currentRoom(): Room {
        return this.levelList[this.currentLevel].roomList[this.currentRoomIndex]
    }

    get isSwitchingRoom(): CardinalDirection {
        const isSwitchingNorth =
            this.scene!.player!.sprite.startY < this.scene!.startY &&
            typeof this.currentRoom.connexions.no === 'number'
        const isSwitchingSouth =
            this.scene!.player!.sprite.endY > this.scene!.endY &&
            typeof this.currentRoom.connexions.so === 'number'
        const isSwitchingWest =
            this.scene!.player!.sprite.startX < this.scene!.startX &&
            typeof this.currentRoom.connexions.we === 'number'
        const isSwitchingEast =
            this.scene!.player!.sprite.endX > this.scene!.endX &&
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
        console.log('player sprite', this.scene!.player!.sprite)
        console.log('brick sprites', this.scene!.brickList)
    }
}
