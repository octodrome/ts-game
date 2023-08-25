import { Game } from './game-engine/Game/Game'

export function setupDebug(element: HTMLDivElement) {
    let data = null
    const setData = (newData: Game) => {
        data = newData
        element.innerHTML = `
            <h3>Player sprite data</h3>
            <ul>
                <li>startX : ${data.scene!.player!.sprite.startX}</li>
                <li>startY : ${data.scene!.player!.sprite.startY}</li>
                <li>endX : ${data.scene!.player!.sprite.endX}</li>
                <li>endY : ${data.scene!.player!.sprite.endY}</li>
                <li>width : ${data.scene!.player!.sprite.width}</li>
            </ul>
        `
    }
    window.addEventListener('debug', (e) => setData(e.detail))
}
