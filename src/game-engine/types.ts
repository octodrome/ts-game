export type Direction = 'LEFT' | 'RIGHT' | 'UP' | 'DOWN'
export type CardinalDirection = 'NORTH' | 'SOUTH' | 'WEST' | 'EAST'
export type Size = { h: number; w: number }
export type PositionOnSheet = [number, number]
export type PositionOnScene = [number, number]
export type Legend = { [index: string]: PositionOnSheet }
export type RoomPosition = null | [number, number]
