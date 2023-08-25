import { Scene } from '../game-engine/Scene'
import { Sprite } from '../game-engine/Sprite'

export class CanvasDisplay {
    private img = {
        player: new Image(),
        map: new Image(),
    }
    private isDebug = false
    private width: number = 500
    private height: number = 500
    private ctx: CanvasRenderingContext2D | null

    constructor(canvasElement: HTMLCanvasElement) {
        canvasElement.width = this.width
        canvasElement.height = this.height
        this.ctx = canvasElement.getContext('2d')
        this.img.player.src = '/src/assets/game/sprite-sheets/player/player.png'
        this.img.map.src = '/src/assets/game/sprite-sheets/map/map.png'
    }

    public drawScene(scene: Scene): void {
        scene!.groundList.forEach((ground) => this.draw(ground))
        scene!.brickList.forEach((brick) => this.draw(brick))
        this.draw(scene!.player!)
    }

    private draw(object: Sprite): void {
        const img =
            object.spriteSheetName === 'player-sprite-sheet'
                ? this.img.player
                : this.img.map

        this.ctx!.drawImage(
            img,
            object.positionOnSheet[0] * 16,
            object.positionOnSheet[1] * 16,
            16,
            16,
            object.startX,
            object.startY,
            50,
            50
        )

        if (this.isDebug) this.drawDebugLines()
    }

    private drawDebugLines(): void {
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
