// @TODO add PNG img prop

import { PositionOnMap, PositionOnSheet } from './types'

export class Sprite {
    sheetUrl: string
    positionOnSheet: PositionOnSheet
    width: number
    startX: number
    startY: number
    endX: number
    endY: number

    constructor(
        sheetUrl: string,
        positionOnMap: PositionOnMap,
        positionOnSheet: PositionOnSheet,
        width: number
    ) {
        this.sheetUrl = sheetUrl
        this.positionOnSheet = positionOnSheet
        this.width = width
        this.startX = positionOnMap[0] * width
        this.startY = positionOnMap[1] * width
        this.endX = this.startX + width
        this.endY = this.startY + width
    }

    update(moveX: number, moveY: number): void {
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
}
