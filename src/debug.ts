import { Game } from './game-engine/Game'

export function setupDebug(element: HTMLDivElement) {
    let data = null
    const setData = (newData: Game) => {
        data = newData
        element.innerHTML = `
            <h3>Player sprite data</h3>
            <ul>
                <li>startX : ${data.player.sprite.startX}</li>
                <li>startY : ${data.player.sprite.startY}</li>
                <li>endX : ${data.player.sprite.endX}</li>
                <li>endY : ${data.player.sprite.endY}</li>
                <li>width : ${data.player.sprite.width}</li>
            </ul>
        `
    }
    window.addEventListener('debug', (e) => setData(e.detail))
}
