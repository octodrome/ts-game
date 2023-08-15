// @TODO the player can overlap 1 to 4 cells
// it would be usefull to store them in an array

export class Cell {
    width: number
    colIndex: number
    rowIndex: number
    startX: number
    startY: number
    endX: number
    endY: number

    constructor(colIndex: number, rowIndex: number, width: number) {
        this.width = width
        this.colIndex = colIndex
        this.rowIndex = rowIndex
        this.startX = colIndex * width
        this.startY = rowIndex * width
        this.endX = this.startX + width
        this.endY = this.startY + width
    }

    update(moveX: number, moveY: number): void {
        this.startX += moveX
        this.startY += moveY
        this.endX += moveX
        this.endY += moveY
        this.colIndex = Math.floor(this.startX / this.width)
        this.rowIndex = Math.floor(this.startY / this.width)
    }
}
