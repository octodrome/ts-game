import { Sprite } from '../Sprite'
import { Player } from '../Player'

export const isOnTopOf = (sprite: Sprite, player: Player): boolean =>
    player.sprite.endY < sprite.startY

export const isUnder = (sprite: Sprite, player: Player): boolean =>
    player.sprite.startY > sprite.endY

export const isRightOf = (sprite: Sprite, player: Player): boolean =>
    player.sprite.startX > sprite.endX

export const isLeftOf = (sprite: Sprite, player: Player): boolean =>
    player.sprite.endX < sprite.startX

export const overlapsOnXWith = (sprite: Sprite, player: Player): boolean =>
    player.sprite.startX < sprite.endX && player.sprite.endX > sprite.startX

export const overlapsOnYWith = (sprite: Sprite, player: Player): boolean =>
    player.sprite.startY < sprite.endY && player.sprite.endY > sprite.startY

export const notCollidingBottomOf = (sprite: Sprite, player: Player): boolean =>
    (isUnder(sprite, player) && overlapsOnXWith(sprite, player)) ||
    !overlapsOnXWith(sprite, player) ||
    player.sprite.endY <= sprite.startY

export const notCollidingTopOf = (sprite: Sprite, player: Player): boolean =>
    (isOnTopOf(sprite, player) && overlapsOnXWith(sprite, player)) ||
    !overlapsOnXWith(sprite, player) ||
    player.sprite.startY >= sprite.endY

export const notCollidingRightOf = (sprite: Sprite, player: Player): boolean =>
    (isRightOf(sprite, player) && overlapsOnYWith(sprite, player)) ||
    !overlapsOnYWith(sprite, player) ||
    player.sprite.endX <= sprite.startX

export const notCollidingLeftOf = (sprite: Sprite, player: Player): boolean =>
    (isLeftOf(sprite, player) && overlapsOnYWith(sprite, player)) ||
    !overlapsOnYWith(sprite, player) ||
    player.sprite.startX >= sprite.endX
