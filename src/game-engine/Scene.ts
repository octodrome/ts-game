import { Sprite } from './Sprite'
import { Legend } from './types'
import { Player } from './Player'
import { Brick } from './Brick'
import { Collectable } from './Collectable'
import { Ground } from './Ground'
import { Room } from './Room'
import { SpriteSheet } from './SpriteSheet'

export class Scene {
    public player: Player | null = null
    public brickList: Brick[] = []
    public groundList: Ground[] = []
    public collectableList: Collectable[] = []

    public startX = 0
    public startY = 0
    public endX = 500
    public endY = 500

    private cellwidth = 50
    private rowTotal: number = 10
    private columnTolal: number = 10
    private playerSprite: Sprite | null = null
    private actorSpriteList: Sprite[] = []
    private collectableSpriteList: Sprite[] = []
    private backgroundSpriteList: Sprite[] = []

    constructor(
        currentRoom: Room,
        levelSpriteSheet: SpriteSheet,
        currentPlayerPosition: [number, number]
    ) {
        // @TODO simplify constructor : Sprite and Player/Bricklist/Groundlist could be refactered
        this.backgroundSpriteList = this.blueprintToSpriteList(
            currentRoom.blueprint.background,
            levelSpriteSheet.legend
        )
        this.actorSpriteList = this.blueprintToSpriteList(
            currentRoom.blueprint.actors,
            levelSpriteSheet.legend
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
        this.collectableSpriteList.forEach((sprite) =>
            this.collectableList.push(new Collectable(sprite))
        )
    }

    private blueprintToSpriteList(blueprint: string, legend: Legend): Sprite[] {
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

        return spriteList
    }
}
