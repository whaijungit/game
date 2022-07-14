import { Game } from '../game';
import gameConfig from '../game.config';
import { TerisGroup } from '../teris.group';
import { PageViewerRectangle } from './view.dom';
import { GameStatus, GameViewer } from '../../common/interfaces';

class GameDomViewer implements GameViewer {
    private nextDom = document.getElementById('next')!
    private panelDom = document.getElementById('panel')!
    private scoreDom = document.getElementById('score')!
    private messageDom = document.getElementById('message')!

    onGameOver(game: Game): void {
        this.messageDom.style.display = 'flex'
        this.messageDom.querySelector('span')!.innerText = '游戏结束/按下空格重新开始游戏'
    }
    onGamePause(game: Game): void {
        this.messageDom.style.display = 'flex'
        this.messageDom.querySelector('span')!.innerText = '游戏暂停'
    }
    onGameStart(game: Game): void {
        this.messageDom.style.display = 'none'
    }
    init(game: Game): void {
        this.panelDom.style.width = gameConfig.panelSize.width * 30 + 'px'
        this.panelDom.style.height = gameConfig.panelSize.height * 30 + 'px'
        this.nextDom.style.width = gameConfig.nextSize.width * 30 + 'px'
        this.nextDom.style.height = gameConfig.nextSize.height * 30 + 'px'
        this.addKeyDownEvent(game)
        this.messageDom.style.display = 'flex'
        this.messageDom.querySelector('span')!.innerText = '按空格开始游戏'
    }
    showScore(score: number): void {
        this.scoreDom.innerHTML = '积分 ' + score + ''
    }
    private addKeyDownEvent(game: Game) {
        document.onkeydown = ({ key }) => {
            if (key == ' ') {
                if (game.gameStatus === GameStatus.playing) {
                    game.pause()
                }
                else {
                    game.start()
                }
            }
            if (key === 'ArrowDown') {
                game.controlDown()
            }
            if (key === 'ArrowLeft') {
                game.controlLeft()
            }
            if (key === 'ArrowRight') {
                game.controlRight()
            }
            if (key === 'ArrowUp') {
                game.controlRotate()
            }
        }
    }
    switchTeris(curTeris: TerisGroup): void {
        curTeris.teris.forEach(rect => {
            rect.view?.remove()
            rect.view = new PageViewerRectangle(rect, this.panelDom)
        });
    }
    showNextTeris(nextTeris: TerisGroup): void {
        nextTeris.teris.forEach(rect => {
            rect.view = new PageViewerRectangle(rect, this.nextDom)
        });
    }
}

export { GameDomViewer }