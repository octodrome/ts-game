import { Sprite } from './Sprite'
import { CardinalDirection, Direction, Legend } from './types'
import { Room } from './Room'
import { SpriteSheet } from './SpriteSheet'
import {
    notCollidingBottomOf,
    notCollidingLeftOf,
    notCollidingRightOf,
    notCollidingTopOf,
} from './Game/collision'

export class Scene {
    public room: Room | null = null
    public player: Sprite | null = null
    public brickList: Sprite[] = []
    public groundList: Sprite[] = []
    public collectableList: Sprite[] = []

    public startX = 0
    public startY = 0
    public endX = 500
    public endY = 500

    private cellwidth = 50
    private rowTotal: number = 10
    private columnTolal: number = 10

    constructor(
        currentRoom: Room,
        levelSpriteSheet: SpriteSheet,
        currentPlayerPosition: [number, number]
    ) {
        this.room = currentRoom
        this.groundList = this.blueprintToSpriteList(
            currentRoom.blueprint.background,
            levelSpriteSheet.legend
        )
        this.brickList = this.blueprintToSpriteList(
            currentRoom.blueprint.actors,
            levelSpriteSheet.legend
        )
        this.player = new Sprite(
            'player-sprite-sheet',
            currentPlayerPosition,
            [0, 0],
            this.cellwidth
        )
    }

    public isSwitchingRoomOn(direction: CardinalDirection): boolean {
        return (
            this.isPlayerCollidingSceneOn(direction) &&
            this.room!.hasConnexionOn(direction)
        )
    }

    // @TODO fix collision not working when player moves 3px and gets stuck in collision block
    public noCollisionWithPlayerOn(direction: Direction): boolean {
        const notCollidingAnyBrick = {
            LEFT: this.brickList.every((b) =>
                notCollidingRightOf(b, this.player!)
            ),
            RIGHT: this.brickList.every((b) =>
                notCollidingLeftOf(b, this.player!)
            ),
            UP: this.brickList.every((b) =>
                notCollidingBottomOf(b, this.player!)
            ),
            DOWN: this.brickList.every((b) =>
                notCollidingTopOf(b, this.player!)
            ),
        }

        return notCollidingAnyBrick[direction]
    }

    private isPlayerCollidingSceneOn(direction: CardinalDirection): boolean {
        if (direction === 'NORTH') return this.player!.startY < this.startY
        if (direction === 'SOUTH') return this.player!.endY > this.endY
        if (direction === 'WEST') return this.player!.startX < this.startX
        if (direction === 'EAST') return this.player!.endX > this.endX

        return false
    }

    private blueprintToSpriteList(blueprint: string, legend: Legend): Sprite[] {
        // @TODO maybe extract this method as a helper function out of Scene
        // @TODO trim white spaces in sketches correctly
        const mapMatrix = blueprint
            .trim()
            .split('\n')
            .map((line) => [...line])

        const spriteList: Sprite[] = []
        for (let rowIndex = 0; rowIndex < this.rowTotal; rowIndex++) {
            for (
                let columnIndex = 0;
                columnIndex < this.columnTolal;
                columnIndex++
            ) {
                if (mapMatrix[rowIndex][columnIndex] !== '.') {
                    const sprite = new Sprite(
                        'map-sprite-sheet',
                        [columnIndex, rowIndex],
                        legend[mapMatrix[rowIndex][columnIndex]],
                        this.cellwidth
                    )
                    spriteList.push(sprite)
                }
            }
        }

        return spriteList
    }
}
