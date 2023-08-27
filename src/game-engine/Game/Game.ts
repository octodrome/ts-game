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
    private currentPlayerPosition: [number, number] = [50, 50]

    constructor() {
        this.levelList = levelList
        this.initScene()
    }

    public onKeyboard(direction: Direction): void {
        if (this.scene!.noCollisionWithPlayerOn(direction))
            this.scene!.player!.move(direction)
        // @TODO refactor room switching
        if (this.scene!.isSwitchingRoomOn('NORTH'))
            this.goToRoom(
                this.scene?.room?.connexions.NORTH,
                this.scene?.player?.nextPositionSwitchingRoomOn('NORTH')
            )
        if (this.scene!.isSwitchingRoomOn('SOUTH'))
            this.goToRoom(
                this.scene?.room?.connexions.SOUTH,
                this.scene?.player?.nextPositionSwitchingRoomOn('SOUTH')
            )
        if (this.scene!.isSwitchingRoomOn('WEST'))
            this.goToRoom(
                this.scene?.room?.connexions.WEST,
                this.scene?.player?.nextPositionSwitchingRoomOn('WEST')
            )
        if (this.scene!.isSwitchingRoomOn('EAST'))
            this.goToRoom(
                this.scene?.room?.connexions.EAST,
                this.scene?.player?.nextPositionSwitchingRoomOn('EAST')
            )
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
        console.log('this.scene.room', this.scene?.room)
    }
}
