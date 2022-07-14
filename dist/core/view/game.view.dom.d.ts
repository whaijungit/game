import { GameViewer } from '../../common/interfaces';
import { Game } from '../game';
import { TerisGroup } from '../teris.group';
declare class GameDomViewer implements GameViewer {
    private nextDom;
    private panelDom;
    private scoreDom;
    private messageDom;
    onGameOver(game: Game): void;
    onGamePause(game: Game): void;
    onGameStart(game: Game): void;
    init(game: Game): void;
    showScore(score: number): void;
    private addKeyDownEvent;
    switchTeris(curTeris: TerisGroup): void;
    showNextTeris(nextTeris: TerisGroup): void;
}
export { GameDomViewer };
