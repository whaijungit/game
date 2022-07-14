import { Game } from '../core/game';
import { TerisGroup } from '../core/teris.group';
export interface IPoint {
    readonly x: number;
    readonly y: number;
}
export interface Size {
    width: number;
    height: number;
}
export interface IViewer {
    show(): void;
    remove(): void;
}
export interface GameViewer {
    init(game: Game): void;
    onGameOver(game: Game): void;
    onGamePause(game: Game): void;
    onGameStart(game: Game): void;
    showScore(score: number): void;
    switchTeris(curTeris: TerisGroup): void;
    showNextTeris(nextTeris: TerisGroup): void;
}
export declare type Shape = IPoint[];
export declare enum MoveDirection {
    left = 0,
    right = 1,
    down = 2
}
export declare enum GameStatus {
    init = 0,
    playing = 1,
    pause = 2,
    over = 3
}
