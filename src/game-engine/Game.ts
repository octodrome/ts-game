import { Player } from './Player'
import { Brick } from './Brick'
import { Map } from './Map'
import { levelList } from '../assets/game/levels/level-list'
import { CanvasDisplay } from '../devices/CanvasDisplay'

export class Game {
    level: number
    map: Map
    player: Player
    brickList: Brick[] = []
    display: CanvasDisplay

    constructor(canvasElement: HTMLCanvasElement) {
        this.level = 0
        this.map = new Map(this.level, levelList)
        this.player = new Player(this.map.playerIndexes!)
        this.map.brickIndexesList.forEach((brickIndexes) =>
            this.brickList.push(new Brick(brickIndexes))
        )
        this.display = new CanvasDisplay(canvasElement)
    }

    render() {
        this.display.clear()
        this.brickList.forEach((brick) => this.drawObject(brick))
        this.drawObject(this.player)
        window.dispatchEvent(new CustomEvent('debug', { detail: this }))
    }

    drawObject(object: Player | Brick) {
        this.display.draw(object)
    }

    isValideMove() {
        // @TODO find a way to implement a collision map to validate the move
        // Need to track player cellCell and compare it to mapSurrounding cells

        return true
    }

    onKeyboard(keyboardEvent: string) {
        if (keyboardEvent === 'LEFT') {
            this.player.move({ x: -1, y: 0 })
        }
        if (keyboardEvent === 'RIGHT') {
            this.player.move({ x: 1, y: 0 })
        }
        if (keyboardEvent === 'UP') {
            this.player.move({ x: 0, y: -1 })
        }
        if (keyboardEvent === 'DOWN') {
            this.player.move({ x: 0, y: 1 })
        }
    }
}
