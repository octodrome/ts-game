export type Direction = 'LEFT' | 'RIGHT' | 'UP' | 'DOWN'
export type Size = { h: number; w: number }
export type PositionOnSheet = [number, number]
export type PositionOnMap = [number, number]
export type Legend = { [index: string]: [number, PositionOnSheet] }
