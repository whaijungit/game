export var MoveDirection;
(function (MoveDirection) {
    MoveDirection[MoveDirection["left"] = 0] = "left";
    MoveDirection[MoveDirection["right"] = 1] = "right";
    MoveDirection[MoveDirection["down"] = 2] = "down";
})(MoveDirection || (MoveDirection = {}));
export var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["init"] = 0] = "init";
    GameStatus[GameStatus["playing"] = 1] = "playing";
    GameStatus[GameStatus["pause"] = 2] = "pause";
    GameStatus[GameStatus["over"] = 3] = "over";
})(GameStatus || (GameStatus = {}));
//# sourceMappingURL=interfaces.js.map