import { Sprite } from './Sprite'
import { CardinalDirection, Legend } from './types'
import { Room } from './Room'
import { SpriteSheet } from './SpriteSheet'

export class Scene {
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

    public isPlayerCollidingOn(direction: CardinalDirection): boolean {
        if (direction === 'NORTH') return this.player!.startY < this.startY
        if (direction === 'SOUTH') return this.player!.endY > this.endY
        if (direction === 'WEST') return this.player!.startX < this.startX
        if (direction === 'EAST') return this.player!.endX > this.endX

        return false
    }

    public get isCollidingEast() {
        return this.player!.startX < this.startX
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
