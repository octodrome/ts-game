import { expect, test } from 'vitest'
import { Map } from './Map'
import { levelList } from '../assets/game/levels/level-list'

test('Map', () => {
    const map = new Map(0, levelList)
    expect(map.playerCell).toStrictEqual({ x: 5, y: 9 })
    expect(map.brickCellList).toStrictEqual([
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