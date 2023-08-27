import { Game } from '../game-engine/Game/Game'

// @TODO basic keyboard events useed here are a bit clunky at the moment
// try to find a way for repeated direction pressed is not waiting
// try to find a way to go two directions at the same time

export class Keyboard {
    game: Game | null = null

    constructor() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') this.dispatch('LEFT')
            if (event.key === 'ArrowRight') this.dispatch('RIGHT')
            if (event.key === 'ArrowUp') this.dispatch('UP')
            if (event.key === 'ArrowDown') this.dispatch('DOWN')
        })
    }

    public setListener(game: Game): void {
        this.game = game
    }

    public dispatch(key: 'LEFT' | 'RIGHT' | 'UP' | 'DOWN'): void {
        this.game?.onKeyboard(key)
    }
}
