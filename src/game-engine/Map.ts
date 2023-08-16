import { Sprite } from './Sprite'
import { MapMatrix } from './types'

// @TODO check if the blueprint is valid
export class Map {
    startX = 0
    startY = 0
    endX = 500
    endY = 500
    cellwidth = 50
    mapMatrix: MapMatrix
    rowTotal: number = 10
    columnTolal: number = 10
    playerSprite: Sprite | null = null
    brickSpriteList: Sprite[] = []

    constructor(levelIndex: number, blueprintList: string[]) {
        this.mapMatrix = this.bluePrintToMapMatrix(blueprintList[levelIndex])
        this.scanMapMatrix()
    }

    bluePrintToMapMatrix(blueprint: string): MapMatrix {
        return blueprint
            .trim()
            .split('\n')
            .map((line) => [...line])
    }

    scanMapMatrix(): void {
        for (let rowIndex = 0; rowIndex < this.rowTotal; rowIndex++) {
            for (
                let columnIndex = 0;
                columnIndex < this.columnTolal;
                columnIndex++
            ) {
                if (this.mapMatrix[rowIndex][columnIndex] === 'x') {
                    this.playerSprite = new Sprite(
                        columnIndex,
                        rowIndex,
                        this.cellwidth
                    )
                }
                if (this.mapMatrix[rowIndex][columnIndex] === '0')
                    this.brickSpriteList.push(
                        new Sprite(columnIndex, rowIndex, this.cellwidth)
                    )
            }
        }
    }
}
