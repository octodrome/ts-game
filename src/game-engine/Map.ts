import { Cell } from './Cell'
import { MapMatrix } from './types'

type CollisionMap = {
    no: boolean
    ea: boolean
    we: boolean
    so: boolean
}

// @TODO check if the blueprint is valid

export class Map {
    cellwidth = 50
    mapMatrix: MapMatrix
    rowTotal: number = 10
    columnTolal: number = 10
    playerIndexes: Cell | null = null
    brickIndexesList: Cell[] = []
    collisionMap: CollisionMap = {
        no: false,
        ea: false,
        we: false,
        so: false,
    }

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
                    this.playerIndexes = new Cell(
                        columnIndex,
                        rowIndex,
                        this.cellwidth
                    )
                }
                if (this.mapMatrix[rowIndex][columnIndex] === '0')
                    this.brickIndexesList.push(
                        new Cell(columnIndex, rowIndex, this.cellwidth)
                    )
            }
        }
    }
}
