import { Level } from './Level'
import { Sprite } from './Sprite'
import { Legend } from './types'

export class Scene {
    startX = 0
    startY = 0
    endX = 500
    endY = 500
    cellwidth = 50
    rowTotal: number = 10
    columnTolal: number = 10
    playerSprite: Sprite | null = null
    actorSpriteList: Sprite[] = []
    collectableSpriteList: Sprite[] = []
    backgroundSpriteList: Sprite[] = []

    constructor(
        levelIndex: number,
        levelList: Level[],
        currentRoom: number,
        currentPlayerPosition: [number, number]
    ) {
        console.log('blueprintList', levelList)
        this.backgroundSpriteList = this.blueprintToSpriteList(
            levelList[levelIndex].roomList[currentRoom].blueprint.background,
            levelList[levelIndex].spriteSheet.legend
        )
        this.actorSpriteList = this.blueprintToSpriteList(
            levelList[levelIndex].roomList[currentRoom].blueprint.actors,
            levelList[levelIndex].spriteSheet.legend
        )
        this.playerSprite = new Sprite(
            'player-sprite-sheet',
            currentPlayerPosition,
            [0, 0],
            this.cellwidth
        )
    }

    blueprintToSpriteList(blueprint: string, legend: Legend): Sprite[] {
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

        console.log('blueprintToSpriteList', spriteList)
        return spriteList
    }
}
