export class Sprite {
    width: number
    startX: number
    startY: number
    endX: number
    endY: number

    constructor(colIndex: number, rowIndex: number, width: number) {
        this.width = width
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
    }
}
