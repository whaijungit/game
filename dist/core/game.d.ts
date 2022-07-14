import { GameStatus, GameViewer } from '../common/interfaces';
declare class Game {
    private _view;
    private _timer?;
    private _score;
    private _curTeris?;
    private _nextTeris;
    private _exists;
    private _duration;
    private _gameStatus;
    get score(): number;
    get gameStatus(): GameStatus;
    set score(s: number);
    constructor(_view: GameViewer);
    start(): void;
    pause(): void;
    controlLeft(): void;
    controlRight(): void;
    controlDown(): void;
    controlRotate(): void;
    autoDrop(): void;
    private createNextTeris;
    private init;
    private hitBottom;
    private addScore;
    private switchTeris;
    private restCenterPoint;
}
export { Game };
