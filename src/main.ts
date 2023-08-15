import './assets/ui/style/style.css'
import typescriptLogo from './assets/ui/images/typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter'
import { Game } from './game-engine/Game'
import { Keyboard } from './devices/Keyboard'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas id="screen"></canvas>
    <br>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`
setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const game = new Game(document.querySelector<HTMLCanvasElement>('#screen')!)
const keyboard = new Keyboard()
keyboard.setListener(game)

window.requestAnimationFrame(gameLoop)
function gameLoop() {
    game.render()
    window.requestAnimationFrame(gameLoop)
}
