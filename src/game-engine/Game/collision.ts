import { Sprite } from '../Sprite'

export const isOnTopOf = (sprite: Sprite, player: Sprite): boolean =>
    player.endY < sprite.startY

export const isUnder = (sprite: Sprite, player: Sprite): boolean =>
    player.startY > sprite.endY

export const isRightOf = (sprite: Sprite, player: Sprite): boolean =>
    player.startX > sprite.endX

export const isLeftOf = (sprite: Sprite, player: Sprite): boolean =>
    player.endX < sprite.startX

export const overlapsOnXWith = (sprite: Sprite, player: Sprite): boolean =>
    player.startX < sprite.endX && player.endX > sprite.startX

export const overlapsOnYWith = (sprite: Sprite, player: Sprite): boolean =>
    player.startY < sprite.endY && player.endY > sprite.startY

export const notCollidingBottomOf = (sprite: Sprite, player: Sprite): boolean =>
    (isUnder(sprite, player) && overlapsOnXWith(sprite, player)) ||
    !overlapsOnXWith(sprite, player) ||
    player.endY <= sprite.startY

export const notCollidingTopOf = (sprite: Sprite, player: Sprite): boolean =>
    (isOnTopOf(sprite, player) && overlapsOnXWith(sprite, player)) ||
    !overlapsOnXWith(sprite, player) ||
    player.startY >= sprite.endY

export const notCollidingRightOf = (sprite: Sprite, player: Sprite): boolean =>
    (isRightOf(sprite, player) && overlapsOnYWith(sprite, player)) ||
    !overlapsOnYWith(sprite, player) ||
    player.endX <= sprite.startX

export const notCollidingLeftOf = (sprite: Sprite, player: Sprite): boolean =>
    (isLeftOf(sprite, player) && overlapsOnYWith(sprite, player)) ||
    !overlapsOnYWith(sprite, player) ||
    player.startX >= sprite.endX
