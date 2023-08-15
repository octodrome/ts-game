import './assets/ui/style/style.css'
import typescriptLogo from './assets/ui/images/typescript.svg'
import viteLogo from '/vite.svg'
import { setupDebug } from './debug'
import { Game } from './game-engine/Game'
import { Keyboard } from './devices/Keyboard'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <br>
    <canvas id="screen"></canvas>
    <br>
    <div class="card">
      <div id="debug"></div>
    </div>
  </div>
`
setupDebug(document.querySelector<HTMLDivElement>('#debug')!)

const game = new Game(document.querySelector<HTMLCanvasElement>('#screen')!)
const keyboard = new Keyboard()
keyboard.setListener(game)

window.requestAnimationFrame(gameLoop)
function gameLoop() {
    game.render()
    window.requestAnimationFrame(gameLoop)
}
