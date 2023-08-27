import { Scene } from '../Scene'
import { levelList } from '../../assets/game/level-list/index'
import { CardinalDirection, Direction } from '../types'
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
        if (this.scene!.noCollisionWithPlayerOn(direction))
            this.scene!.player!.move(direction)
        // @TODO continue implementing room switching
        if (this.isSwitchingRoomOn('NORTH')) this.goToRoom(1, [7, 9])
        if (this.isSwitchingRoomOn('SOUTH')) this.goToRoom(0, [7, 0])
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

    private get currentRoom(): Room {
        return this.levelList[this.currentLevel].roomList[this.currentRoomIndex]
    }

    private isSwitchingRoomOn(direction: CardinalDirection): boolean {
        return (
            this.scene!.isPlayerCollidingSceneOn(direction) &&
            this.currentRoom.hasConnexionOn(direction)
        )
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
