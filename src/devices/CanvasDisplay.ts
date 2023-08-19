import { Player } from '../game-engine/Player'
import { Brick } from '../game-engine/Brick'

export class CanvasDisplay {
    img = {
        player: new Image(),
        map: new Image(),
    }
    isDebug = false
    backgroundColor: string = '#FFFFFF'
    width: number = 500
    height: number = 500
    ctx: CanvasRenderingContext2D | null

    constructor(canvasElement: HTMLCanvasElement) {
        canvasElement.width = this.width
        canvasElement.height = this.height
        this.ctx = canvasElement.getContext('2d')
        this.img.player.src = '/src/assets/game/sprites/player-sprite-sheet.png'
        this.img.map.src = '/src/assets/game/sprites/map-sprite-sheet.png'
    }

    draw(object: Player | Brick): void {
        const img =
            object.sprite.spriteSheetName === 'player-sprite-sheet'
                ? this.img.player
                : this.img.map

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
