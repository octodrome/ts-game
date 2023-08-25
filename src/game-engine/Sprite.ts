import { PositionOnScene, PositionOnSheet, Direction } from './types'

export class Sprite {
    public spriteSheetName: string
    public positionOnSheet: PositionOnSheet
    public startX: number
    public startY: number
    public endX: number
    public endY: number

    constructor(
        spriteSheetName: string,
        positionOnScene: PositionOnScene,
        positionOnSheet: PositionOnSheet,
        width: number
    ) {
        this.spriteSheetName = spriteSheetName
        this.positionOnSheet = positionOnSheet
        this.startX = positionOnScene[0] * width
        this.startY = positionOnScene[1] * width
        this.endX = this.startX + width
        this.endY = this.startY + width
    }

    public update(moveX: number, moveY: number): void {
        const animationDelta = Math.floor(Date.now() / 120) % 2
        if (moveX > 0) this.positionOnSheet = [0 + animationDelta, 0]
        if (moveX < 0) this.positionOnSheet = [4 + animationDelta, 0]
        if (moveY > 0) this.positionOnSheet = [6 + animationDelta, 0]
        if (moveY < 0) this.positionOnSheet = [2 + animationDelta, 0]

        this.startX += moveX
        this.startY += moveY
        this.endX += moveX
        this.endY += moveY
    }

    move(direction: Direction) {
        const speed = 3
        const moves = {
            LEFT: { x: -speed, y: 0 },
            RIGHT: { x: speed, y: 0 },
            UP: { x: 0, y: -speed },
            DOWN: { x: 0, y: speed },
        }

        this.update(moves[direction].x, moves[direction].y)
    }

    logPlayerSprite() {
        console.log('Player sprite', this)
    }
}
