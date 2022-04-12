class GameState {
    constructor(state = { isActivePlayer: true, playerOne: "e1", playerTwo: "e9", walls: [], playerOneWalls: 10, playerTwoWalls: 10, lastMove: "start" }) {
        this.isActivePlayer = state.isActivePlayer
        this.playerOne = state.playerOne
        this.playerTwo = state.playerTwo
        this.walls = state.walls
        this.playerOneWalls = state.playerOneWalls
        this.playerTwoWalls = state.playerTwoWalls
        this.lastMove = state.lastMove
    }

    Move(move) {
        const isActivePlayerUpdated = !this.isActivePlayer
        let newState = {
            isActivePlayer: isActivePlayerUpdated,
            playerOne: this.playerOne,
            playerTwo: this.playerTwo,
            walls: [...this.walls],
            playerOneWalls: this.playerOneWalls,
            playerTwoWalls: this.playerTwoWalls,
            lastMove: move
        }
        if (move.length == 2) {
            if (isActivePlayerUpdated) {
                newState.playerTwo = move
            } else {
                newState.playerOne = move
            }
        } else {
            newState.walls.push(move)
            if (isActivePlayerUpdated) {
                newState.playerTwoWalls -= 1
            } else {
                newState.playerOneWalls -= 1
            }
        }
        return new GameState(newState)
    }
}

export class FullGame {
    constructor() {
        this.selected = 0
        this.game = []
        this.game.push(new GameState())
    }

    AddMove(move) {
        this.game.push(this.game[this.game.length - 1].Move(move))
    }

    // Takes Quoridor notation as an array and builds a game tree from it
    ConstructGame(notation) {
        notation.forEach(move => {
            this.AddMove(move)
        })
        return this.game[this.selected]
    }

    // Takes the game tree and returns an array with the moves
    OutputNotationObject() {
        let notation = []
        let counter = 1
        let turn = []
        this.game.forEach(state => {
            turn.push(state.lastMove)
            counter += 1
            if (counter == 2) {
                counter = 0
                notation.push(turn)
                turn = []
            }
        })
        if (turn.length > 0) {
            notation.push(turn)
        }
        return notation
    }

    GetGameLength() {
        return this.game.length
    }

    NextStep() {
        if (this.selected < (this.game.length - 1)) {
            this.selected += 1
        }
        return this.game[this.selected]
    }

    PreviousStep() {
        if (this.selected > 0) {
            this.selected -= 1
        }
        return this.game[this.selected]
    }

    FirstStep() {
        this.selected = 0
        return this.game[this.selected]
    }

    LastStep() {
        this.selected = this.game.length - 1
        return this.game[this.selected]
    }
}