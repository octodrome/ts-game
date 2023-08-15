import { Game } from './game-engine/Game'

export function setupDebug(element: HTMLDivElement) {
    let data = null
    const setData = (newData: Game) => {
        data = newData
        element.innerHTML = `
            <h3>Player cell data</h3>
            <ul>
                <li>colIndex : ${data.player.cell.colIndex}</li>
                <li>rowIndex : ${data.player.cell.rowIndex}</li>
                <li>startX : ${data.player.cell.startX}</li>
                <li>startY : ${data.player.cell.startY}</li>
                <li>endX : ${data.player.cell.endX}</li>
                <li>endY : ${data.player.cell.endY}</li>
            </ul>
        `
    }
    window.addEventListener('debug', (e) => setData(e.detail))
}
