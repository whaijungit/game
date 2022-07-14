import { GameStatus } from '../../common/interfaces';
import gameConfig from '../game.config';
import { PageViewerRectangle } from './view.dom';
class GameDomViewer {
    constructor() {
        this.nextDom = document.getElementById('next');
        this.panelDom = document.getElementById('panel');
        this.scoreDom = document.getElementById('score');
        this.messageDom = document.getElementById('message');
    }
    onGameOver(game) {
        this.messageDom.style.display = 'flex';
        this.messageDom.querySelector('span').innerText = '游戏结束';
    }
    onGamePause(game) {
        this.messageDom.style.display = 'flex';
        this.messageDom.querySelector('span').innerText = '游戏暂停';
    }
    onGameStart(game) {
        this.messageDom.style.display = 'none';
    }
    init(game) {
        this.panelDom.style.width = gameConfig.panelSize.width * 30 + 'px';
        this.panelDom.style.height = gameConfig.panelSize.height * 30 + 'px';
        this.nextDom.style.width = gameConfig.nextSize.width * 30 + 'px';
        this.nextDom.style.height = gameConfig.nextSize.height * 30 + 'px';
        this.addKeyDownEvent(game);
    }
    showScore(score) {
        this.scoreDom.innerHTML = '积分 ' + score + '';
    }
    addKeyDownEvent(game) {
        document.onkeydown = ({ key }) => {
            console.log(key);
            if (key == ' ') {
                if (game.gameStatus === GameStatus.playing) {
                    game.pause();
                }
                else {
                    game.start();
                }
            }
            if (key === 'ArrowDown') {
                game.controlDown();
            }
            if (key === 'ArrowLeft') {
                game.controlLeft();
            }
            if (key === 'ArrowRight') {
                game.controlRight();
            }
            if (key === 'ArrowUp') {
                game.controlRotate();
            }
        };
    }
    switchTeris(curTeris) {
        curTeris.teris.forEach(rect => {
            var _a;
            (_a = rect.view) === null || _a === void 0 ? void 0 : _a.remove();
            rect.view = new PageViewerRectangle(rect, this.panelDom);
        });
    }
    showNextTeris(nextTeris) {
        nextTeris.teris.forEach(rect => {
            rect.view = new PageViewerRectangle(rect, this.nextDom);
        });
    }
}
export { GameDomViewer };
//# sourceMappingURL=game.view.dom.js.map