import { Scene } from '../Scene'
import { levelList } from '../../assets/game/level-list/index'
import { Direction } from '../types'
import { Level } from '../Level'

// Game inits a Scene instance and listens for Keyboard events to update it
export class Game {
    public scene: Scene | null = null
    public levelList: Level[]

    private currentLevel: number = 0
    private currentRoomIndex: number = 0
    private currentPlayerPosition: [number, number] = [1, 1]

    constructor() {
        this.levelList = levelList
        this.initScene()
    }

    public onKeyboard(direction: Direction): void {
        if (this.scene!.noCollisionWithPlayerOn(direction))
            this.scene!.player!.move(direction)
        // @TODO continue implementing room switching
        if (this.scene!.isSwitchingRoomOn('NORTH')) this.goToRoom(1, [7, 9])
        if (this.scene!.isSwitchingRoomOn('SOUTH')) this.goToRoom(0, [7, 0])
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
