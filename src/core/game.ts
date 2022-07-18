import gameConfig from './game.config';
import { Rectangle } from './teris.rect';
import { TerisRule } from './teris.rule';
import { TerisGroup } from './teris.group';
import { createTeris } from './teris.shape';
import { GameStatus, GameViewer, MoveDirection } from '../common/interfaces';

class Game {
    private _timer?: number
    private _score: number = 0
    private _duration: number
    private _curTeris?: TerisGroup
    private _nextTeris: TerisGroup
    private _exists: Rectangle[] = []
    private _gameStatus: GameStatus = GameStatus.init
    get score() {
        return this._score
    }

    get gameStatus() {
        return this._gameStatus
    }
    set score(s) {
        this._score = s
        this._view.showScore(this.score)
        const level = gameConfig.levels.filter(level => level.score <= s).pop()!
        if (this._duration === level.duration) {
            return
        }
        this._duration = level.duration
        if (this._timer) {
            clearInterval(this._timer)
            this._timer = undefined
            this.autoDrop()
        }
    }
    constructor(private _view: GameViewer) {
        this._duration = gameConfig.levels[0].duration
        this.createNextTeris()
        this._view.init(this)
        this._view.showScore(this.score)
    }
    start() {
        if (this._gameStatus === GameStatus.playing) {
            return
        }
        if (this._gameStatus === GameStatus.over) {
            this.init()
        }
        this._gameStatus = GameStatus.playing
        if (!this._curTeris) {
            this.switchTeris()
        }
        this.autoDrop()
        this._view.onGameStart(this)
    }

    pause() {
        if (this._gameStatus === GameStatus.playing) {
            this._gameStatus = GameStatus.pause
            clearInterval(this._timer)
            this._timer = undefined
            this._view.onGamePause(this)
        }
    }

    controlLeft() {
        if (this._gameStatus === GameStatus.playing && this._curTeris) {
            TerisRule.move(this._curTeris, MoveDirection.left, this._exists)
        }
    }
    controlRight() {
        if (this._gameStatus === GameStatus.playing && this._curTeris) {
            TerisRule.move(this._curTeris, MoveDirection.right, this._exists)
        }
    }
    controlDown() {
        if (this._gameStatus === GameStatus.playing && this._curTeris) {
            TerisRule.moveDirectly(this._curTeris, MoveDirection.down, this._exists)
            this.hitBottom()
        }
    }
    controlRotate() {
        if (this._gameStatus === GameStatus.playing && this._curTeris) {
            TerisRule.rotate(this._curTeris, this._exists)
        }
    }

    autoDrop() {
        if (this._timer || this._gameStatus !== GameStatus.playing) {
            return
        }
        this._timer = setInterval(() => {
            if (this._curTeris) {
                if (!TerisRule.move(this._curTeris, MoveDirection.down, this._exists)) {
                    this.hitBottom()
                }
            }
        }, this._duration)
    }

    private createNextTeris() {
        this._nextTeris = createTeris({ x: 0, y: 0 })
        this.restCenterPoint(gameConfig.nextSize.width, this._nextTeris)
        this._view.showNextTeris(this._nextTeris)
    }

    private init() {
        this._exists.forEach((r) => {
            r.view?.remove()
        })
        this._exists = []
        this.createNextTeris()
        this._curTeris = undefined
        this.score = 0
    }

    private hitBottom() {
        this._exists.push(...this._curTeris!.teris)
        const line = TerisRule.deleteTeris(this._exists)
        this.addScore(line)
        this.switchTeris()
    }

    private addScore(line: number) {
        if (line === 0) {
            return
        } else if (line === 1) {
            this.score += 10
        }
        else if (line === 2) {
            this.score += 25
        }
        else if (line === 3) {
            this.score += 60
        }
        else {
            this.score = 100
        }
    }

    private switchTeris() {
        this._curTeris = this._nextTeris
        this._curTeris.teris.forEach((r) => {
            if (r.view) {
                r.view.remove()
            }
        })
        this.restCenterPoint(gameConfig.panelSize.width, this._curTeris)
        this._nextTeris = createTeris({ x: 0, y: 0 })
        this.restCenterPoint(gameConfig.nextSize.width, this._nextTeris)
        if (!TerisRule.canIMove(this._curTeris.shape, this._curTeris.centerPoint, this._exists)) {
            this._gameStatus = GameStatus.over
            clearInterval(this._timer)
            this._timer = undefined
            this._view.onGameOver(this)
            return
        }
        this._view.showNextTeris(this._nextTeris)
        this._view.switchTeris(this._curTeris)
    }

    private restCenterPoint(width: number, teris: TerisGroup) {
        const x = Math.ceil(width / 2) - 1;
        const y = 0
        teris.centerPoint = { x, y }
        while (teris.teris.some(item => item.point.y < 0)) {
            teris.centerPoint = { x: teris.centerPoint.x, y: teris.centerPoint.y + 1 }
        }
    }
}

export { Game }