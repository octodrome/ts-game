import { Blueprint } from '../assets/game/levels/level-list'
import { Sprite } from './Sprite'

// @TODO check if the blueprint is valid
export class Map {
    startX = 0
    startY = 0
    endX = 500
    endY = 500
    cellwidth = 50
    rowTotal: number = 10
    columnTolal: number = 10
    playerSprite: Sprite | null = null
    actorSpriteList: Sprite[] = []
    collectableSpriteList: Sprite[] = []
    backgroundSpriteList: Sprite[] = []

    constructor(levelIndex: number, blueprintList: Blueprint[]) {
        this.backgroundSpriteList = this.blueprintToSpriteList(
            blueprintList[levelIndex].background
        )
        this.actorSpriteList = this.blueprintToSpriteList(
            blueprintList[levelIndex].actors
        )
        this.playerSprite = new Sprite(
            '/src/assets/game/sprites/player-spritesheet.png',
            [1, 1],
            [0, 0],
            this.cellwidth
        )
    }

    blueprintToSpriteList(blueprint: Blueprint): Sprite[] {
        const mapMatrix = blueprint.sketch
            .trim()
            .split('\n')
            .map((line) => [...line])

        const spriteList: Sprite[] = []
        for (let rowIndex = 0; rowIndex < this.rowTotal; rowIndex++) {
            for (
                let columnIndex = 0;
                columnIndex < this.columnTolal;
                columnIndex++
            ) {
                if (mapMatrix[rowIndex][columnIndex] !== '.') {
                    const sprite = new Sprite(
                        blueprint.url,
                        [columnIndex, rowIndex],
                        blueprint.legend[mapMatrix[rowIndex][columnIndex]],
                        this.cellwidth
                    )
                    spriteList.push(sprite)
                }
            }
        }

        console.log('blueprintToSpriteList', spriteList)
        return spriteList
    }
}
