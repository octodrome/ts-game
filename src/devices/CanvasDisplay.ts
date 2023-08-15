import { Player } from '../game-engine/Player'
import { Brick } from '../game-engine/Brick'

export class CanvasDisplay {
    backgroundColor: string = '#FFFFFF'
    width: number = 500
    height: number = 500
    ctx: CanvasRenderingContext2D | null

    constructor(canvasElement: HTMLCanvasElement) {
        canvasElement.width = this.width
        canvasElement.height = this.height
        this.ctx = canvasElement.getContext('2d')
        this.clear()
    }

    draw(object: Player | Brick): void {
        this.ctx!.fillStyle = object.color
        this.ctx!.fillRect(
            object.cell.startX,
            object.cell.startY,
            object.size.w,
            object.size.h
        )
    }

    clear(): void {
        this.ctx!.fillStyle = this.backgroundColor
        this.ctx!.fillRect(0, 0, this.width, this.height)
    }
}
