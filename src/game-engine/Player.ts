import { Cell } from './Cell'
import { Size } from './types'

export class Player {
    cell: Cell
    size: Size = { w: 50, h: 50 }
    color: string = '#FF0000'

    constructor(cell: Cell) {
        this.cell = cell
    }

    move({ x, y }: { x: number; y: number }) {
        this.cell.update(x, y)
    }

    logPlayerCell() {
        console.log('Player cell', this.cell)
    }
}
