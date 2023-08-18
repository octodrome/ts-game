import { Player } from '../game-engine/Player'
import { Brick } from '../game-engine/Brick'

// @TODO try loading spriteSheets images fom the constructor

export class CanvasDisplay {
    isDebug = false
    backgroundColor: string = '#FFFFFF'
    width: number = 500
    height: number = 500
    ctx: CanvasRenderingContext2D | null

    constructor(canvasElement: HTMLCanvasElement) {
        canvasElement.width = this.width
        canvasElement.height = this.height
        this.ctx = canvasElement.getContext('2d')
    }

    draw(object: Player | Brick): void {
        this.ctx!.globalAlpha = 1
        const img = new Image()
        img.onload = () => {
            this.ctx!.drawImage(
                img,
                object.sprite.positionOnSheet[0] * 16,
                object.sprite.positionOnSheet[1] * 16,
                16,
                16,
                object.sprite.startX,
                object.sprite.startY,
                50,
                50
            )
        }
        img.src = object.sprite.sheetUrl

        if (this.isDebug) this.drawDebugLines()
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
