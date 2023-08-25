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
    public scene: Scene | null = null

    private currentLevel: number = 0
    private currentRoomIndex: number = 0
    private currentPlayerPosition: [number, number] = [1, 1]
    private levelList: Level[]

    constructor() {
        this.levelList = levelList
        this.initScene()
    }

    public onKeyboard(direction: Direction): void {
        if (this.noCollision(direction)) this.scene!.player!.move(direction)
        if (this.isSwitchingRoom === 'NORTH') this.goToRoom(1, [7, 9])
        if (this.isSwitchingRoom === 'SOUTH') this.goToRoom(0, [7, 0])
        this.debug()
    }

    private initScene(): void {
        this.scene = new Scene(
            levelList[this.currentLevel].roomList[this.currentRoomIndex],
            levelList[this.currentLevel].spriteSheet,
            this.currentPlayerPosition
        )

        this.debug()
    }

    // @TODO fix collision not working when player moves 3px and gets stuck in collision block
    // maybe by moving collision system to Player class
    private noCollision(direction: Direction): boolean {
        const notCollidingAnyBrick = {
            LEFT: this.scene!.brickList.every((b) =>
                notCollidingRightOf(b, this.scene!.player!)
            ),
            RIGHT: this.scene!.brickList.every((b) =>
                notCollidingLeftOf(b, this.scene!.player!)
            ),
            UP: this.scene!.brickList.every((b) =>
                notCollidingBottomOf(b, this.scene!.player!)
            ),
            DOWN: this.scene!.brickList.every((b) =>
                notCollidingTopOf(b, this.scene!.player!)
            ),
        }

        return notCollidingAnyBrick[direction]
    }

    private get currentRoom(): Room {
        return this.levelList[this.currentLevel].roomList[this.currentRoomIndex]
    }

    private get isSwitchingRoom(): CardinalDirection {
        const isSwitchingNorth =
            this.scene!.player!.startY < this.scene!.startY &&
            typeof this.currentRoom.connexions.no === 'number'
        const isSwitchingSouth =
            this.scene!.player!.endY > this.scene!.endY &&
            typeof this.currentRoom.connexions.so === 'number'
        const isSwitchingWest =
            this.scene!.player!.startX < this.scene!.startX &&
            typeof this.currentRoom.connexions.we === 'number'
        const isSwitchingEast =
            this.scene!.player!.endX > this.scene!.endX &&
            typeof this.currentRoom.connexions.ea === 'number'

        if (isSwitchingNorth) return 'NORTH'
        if (isSwitchingSouth) return 'SOUTH'
        if (isSwitchingWest) return 'WEST'
        if (isSwitchingEast) return 'EAST'

        return 'NOWHERE'
    }

    private goToRoom(
        roomIndex: number,
        playerPosition: [number, number]
    ): void {
        this.currentRoomIndex = roomIndex
        this.currentPlayerPosition = playerPosition
        this.initScene()
    }

    private debug(): void {
        window.dispatchEvent(new CustomEvent('debug', { detail: this }))
    }
}
