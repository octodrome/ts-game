import './assets/ui/style/style.css'
import figmaLogo from './assets/ui/images/figma.png'
import githubLogo from './assets/ui/images/github.svg'
import viteLogo from '/vite.svg'
import { setupDebug } from './debug'
import { Game } from './game-engine/Game/Game'
import { Keyboard } from './devices/Keyboard'

// @TODO add eslint

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.figma.com/file/sDRerDd0ly3V81BG7tcByo/LeLaboratoireDesPossibles?type=design&node-id=0-1&mode=design&t=gtTJPbUBmdCFgAOI-0" target="_blank">
      <img src="${figmaLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <a href="https://github.com/octodrome/ts-game" target="_blank">
      <img src="${githubLogo}" class="logo" alt="Github logo"/>
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
    game.update()
    game.render()
    window.requestAnimationFrame(gameLoop)
}
