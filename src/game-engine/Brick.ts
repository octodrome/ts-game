import { Cell } from './Cell'
import { Size } from './types'

export class Brick {
    cell: Cell
    size: Size = { w: 50, h: 50 }
    color: string = '#FF00FF'

    constructor(cell: Cell) {
        this.cell = cell
    }
}
