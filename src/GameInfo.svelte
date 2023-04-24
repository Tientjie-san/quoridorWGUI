<script>
    import { createEventDispatcher } from "svelte";
    export let notationObject = false;
    export let activeStep;
    let value;
    const dispatch = createEventDispatcher();

    function startGame(notationString) {
        if(notationString === undefined) return;
        let notationCleaned = notationString;
        console.log(notationString);
        if (notationString.substring(notationString.length - 1) === ",") {
            notationCleaned = notationString.substring(
                0,
                notationString.length - 1
            );
        }
        dispatch("start_game", notationCleaned.split("/"));
    }
    function controlGame(steps) {
        dispatch("game_step", steps);
    }
    function newGame() {
        dispatch("new_game");
    }
</script>

<div class="info-pannel">
    {#if notationObject}
        <div class="game-notation-display">
            <button class="full-button new-game" on:click={() => newGame()}
                >New</button
            >
            <div class="game-controls">
                <button class="control-button" on:click={() => controlGame(-2)}
                    >&lt&lt</button
                >
                <button class="control-button" on:click={() => controlGame(-1)}
                    >&lt</button
                >
                <button class="control-button" on:click={() => controlGame(1)}
                    >&gt</button
                >
                <button class="control-button" on:click={() => controlGame(2)}
                    >&gt&gt</button
                >
            </div>
            <div class="notation">
                {#each notationObject as turn, idx}
                    {#if idx > 0}
                        <div class="turn">
                            <div class="turn-index">{idx}.</div>
                            {#if idx * 2 - 1 === activeStep}
                                <div class="turn-move active-step">{turn[0]}</div>
                            {:else}
                                <div class="turn-move">{turn[0]}</div>
                            {/if}
                            {#if turn.length === 2}
                                {#if idx * 2 === activeStep}
                                    <div class="turn-move active-step">
                                        {turn[1]}
                                    </div>
                                {:else}
                                    <div class="turn-move">{turn[1]}</div>
                                {/if}
                            {/if}
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    {:else}
        <div class="notation-input">
            <button
                class="full-button start-game"
                on:click={() => startGame(value)}>Start</button
            >
            <textarea
                name="game-notation-input"
                id="game-notation-input"
                rows="50"
                bind:value
                placeholder="Example PGN: e2/e8/e3/e7/d2h/d8v"
            />
        </div>
    {/if}
</div>

<style>
    .info-pannel {
        grid-column: 2;
        background-color: #333;
        height: var(--board-width);
        width: 300px;
        margin-left: 1em;
        border-radius: var(--rounding);
    }

    .notation {
        height: 84%;
        overflow-y: auto;
    }

    .full-button {
        width: 95%;
        margin: 7px;
    }

    #game-notation-input {
        margin: 10px;
        width: 90%;
        height: calc(0.8 * var(--board-width));
        background-color: #777;
        border: solid;
        border-width: 1px;
        font-size: 1.5em;
        resize: none;
    }

    .game-controls {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
    }

    .control-button {
        width: 22%;
    }

    .turn {
        font-size: 1em;
        color: gray;
        margin: 10px;
    }

    .turn-index {
        width: 30px;
        display: inline-block;
    }

    .turn-move {
        margin: 0 10px;
        width: 50px;
        display: inline-block;
    }

    .active-step {
        margin-left: 5px;
        padding-left: 5px;
        background-color: lightgray;
        color: #111;
        font-weight: 500;
    }
</style>
