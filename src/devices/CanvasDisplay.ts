import { Player } from '../game-engine/Player'
import { Brick } from '../game-engine/Brick'

export class CanvasDisplay {
    isDebug = true
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
        this.ctx!.globalAlpha = 1
        this.ctx!.fillStyle = object.color
        this.ctx!.fillRect(
            object.sprite.startX,
            object.sprite.startY,
            object.size.w,
            object.size.h
        )
        if (this.isDebug) this.drawDebugLines()
    }

    clear(): void {
        this.ctx!.globalAlpha = 1
        this.ctx!.fillStyle = this.backgroundColor
        this.ctx!.fillRect(0, 0, this.width, this.height)
    }

    drawDebugLines(): void {
        this.ctx!.globalAlpha = 0.02
        this.ctx!.strokeStyle = 'grey'
        this.ctx!.lineWidth = 1

        for (let x = 50; x <= 450; x += 50) {
            this.ctx!.beginPath()
            this.ctx!.moveTo(x, 0)
            this.ctx!.lineTo(x, 500)
            this.ctx!.stroke()
        }

        for (let y = 50; y <= 450; y += 50) {
            this.ctx!.beginPath()
            this.ctx!.moveTo(0, y)
            this.ctx!.lineTo(500, y)
            this.ctx!.stroke()
        }
    }
}
