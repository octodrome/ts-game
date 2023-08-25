import { Level } from './Level'
import { Sprite } from './Sprite'
import { Legend } from './types'
import { Player } from './Player'
import { Brick } from './Brick'
import { Collectable } from './Collectable'
import { Ground } from './Ground'

export class Scene {
    player: Player | null = null
    brickList: Brick[] = []
    groundList: Ground[] = []
    collectableList: Collectable[] = []

    public startX = 0
    public startY = 0
    public endX = 500
    public endY = 500
    cellwidth = 50
    rowTotal: number = 10
    columnTolal: number = 10
    playerSprite: Sprite | null = null
    actorSpriteList: Sprite[] = []
    collectableSpriteList: Sprite[] = []
    backgroundSpriteList: Sprite[] = []

    constructor(
        levelIndex: number,
        levelList: Level[],
        currentRoom: number,
        currentPlayerPosition: [number, number]
    ) {
        // @TODO simplify constructor : Sprite and Player/Bricklist/Groundlist could be refactered
        console.log('blueprintList', levelList)
        this.backgroundSpriteList = this.blueprintToSpriteList(
            levelList[levelIndex].roomList[currentRoom].blueprint.background,
            levelList[levelIndex].spriteSheet.legend
        )
        this.actorSpriteList = this.blueprintToSpriteList(
            levelList[levelIndex].roomList[currentRoom].blueprint.actors,
            levelList[levelIndex].spriteSheet.legend
        )
        this.playerSprite = new Sprite(
            'player-sprite-sheet',
            currentPlayerPosition,
            [0, 0],
            this.cellwidth
        )

        this.player = new Player(this.playerSprite!)

        this.groundList = []
        this.backgroundSpriteList.forEach((sprite) =>
            this.groundList.push(new Ground(sprite))
        )
        this.brickList = []
        this.actorSpriteList.forEach((sprite) =>
            this.brickList.push(new Brick(sprite))
        )
        // this.collectableSpriteList.forEach((sprite) =>
        //     this.collectableList.push(new Collectable(sprite))
        // )
    }

    blueprintToSpriteList(blueprint: string, legend: Legend): Sprite[] {
        // @TODO maybe extract this method as a helper function out of Scene
        // @TODO trim white spaces in sketches correctly
        const mapMatrix = blueprint
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
                        'map-sprite-sheet',
                        [columnIndex, rowIndex],
                        legend[mapMatrix[rowIndex][columnIndex]],
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
