import './assets/ui/style/style.css'
import figmaLogo from './assets/ui/images/figma.png'
import githubLogo from './assets/ui/images/github.svg'
import viteLogo from '/vite.svg'
import asciiLogo from './assets/ui/images/ascii.png'
import conventionalCommitsLogo from './assets/ui/images/conventional-commits.png'
import soundIcon from './assets/ui/images/sound.png'
import { setupDebug } from './debug'
import { Game } from './game-engine/Game/Game'
import { Keyboard } from './devices/Keyboard'
import { CanvasDisplay } from './devices/CanvasDisplay'

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
    <a href="https://www.lookuptables.com/text/extended-ascii-table" target="_blank">
      <img src="${asciiLogo}" class="logo" alt="Ascii logo"/>
    </a>
    <a href="https://github.com/commitizen/cz-cli" target="_blank">
      <img src="${conventionalCommitsLogo}" class="logo" alt="Conventional commit logo"/>
    </a>
    <a href="http://noproblo.dayjo.org/ZeldaSounds/LA/index.html">
      <img src="${soundIcon}" class="logo" alt="Sound icon"/>
    </a>
    <br>
    <canvas id="screen"></canvas>
    <br>
    <div class="card">
      <div id="debug"></div>
    </div>
  </div>
`

const debugElement = document.querySelector<HTMLDivElement>('#debug')!
const canvasElement = document.querySelector<HTMLCanvasElement>('#screen')!
setupDebug(debugElement)

const game = new Game()
const keyboard = new Keyboard()
const display = new CanvasDisplay(canvasElement)
keyboard.setListener(game)

window.requestAnimationFrame(gameLoop)
function gameLoop() {
    display.drawScene(game.scene!)

    window.requestAnimationFrame(gameLoop)
}

// @TODO Create UML diagram in dedicated Figma
