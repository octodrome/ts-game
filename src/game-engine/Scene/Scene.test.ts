import { expect, test } from 'vitest'
import { Scene } from './Scene/Scene'
import { levelList } from '../assets/game/level-list/index'

// @TODO fix test and write other tests for Sprite
test('Scene', () => {
    const map = new Scene(0, levelList)
    expect(map.playerSprite).toStrictEqual({ x: 5, y: 9 })
    expect(map.actorSpriteList).toStrictEqual([
        {
            x: 0,
            y: 0,
        },
        {
            x: 1,
            y: 0,
        },
        {
            x: 2,
            y: 0,
        },
        {
            x: 3,
            y: 0,
        },
        {
            x: 4,
            y: 0,
        },
        {
            x: 5,
            y: 0,
        },
        {
            x: 6,
            y: 0,
        },
        {
            x: 7,
            y: 0,
        },
        {
            x: 8,
            y: 0,
        },
        {
            x: 9,
            y: 0,
        },
        {
            x: 9,
            y: 1,
        },
        {
            x: 9,
            y: 2,
        },
    ])
})
