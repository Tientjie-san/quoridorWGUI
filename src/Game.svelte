<script>
    import PlayerInfo from "./PlayerInfo.svelte";
    import Board from "./Board.svelte";
    import GameInfo from "./GameInfo.svelte";
    import { FullGame } from "./GameLogic";
    // let test_game = "e2, e8, e3, e7, e4, e6, e3h, e8v, d1v, d4v, f3v, f5h, e4v, d6h, c5h, e6v, b6v, c7v, h5h, b8h, a4h, e2h, a5v, b3v, e5, d6, e6"
    let game = new FullGame();
    let state = game.ConstructGame([]);
    let notationObject = false;
    let activeStep = 0;

    function handleNewGame() {
        game = new FullGame();
        state = game.ConstructGame([]);
        notationObject = false;
        activeStep = 0;
    }

    function handleStartGame(event) {
        state = game.ConstructGame(event.detail);
        notationObject = game.OutputNotationObject();
    }

    function handleGameSteps(event) {
        if (event.detail === -1) {
            state = game.PreviousStep();
            if (activeStep > 0) {
                activeStep -= 1;
            }
        } else if (event.detail === 1) {
            state = game.NextStep();
            if (activeStep < game.GetGameLength() - 1) {
                activeStep += 1;
            }
        } else if (event.detail === -2) {
            state = game.FirstStep();
            activeStep = 0;
        } else if (event.detail === 2) {
            state = game.LastStep();
            activeStep = game.GetGameLength() - 1;
        }
    }
</script>

<div>
    <PlayerInfo walls_left={state.playerTwoWalls} />
    <div class="game">
        <Board
            playerOne={state.playerOne}
            playerTwo={state.playerTwo}
            walls={state.walls}
        />
        <GameInfo
            {notationObject}
            activeStep={activeStep}
            on:game_step={handleGameSteps}
            on:start_game={handleStartGame}
            on:new_game={handleNewGame}
        />
    </div>
    <PlayerInfo walls_left={state.playerOneWalls} />
</div>

<style>
    .game {
        grid-row: 2;
        display: flex;
    }
</style>
