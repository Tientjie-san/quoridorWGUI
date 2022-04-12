<script>
    import Pawn from "./Pawn.svelte";
    export let playerOne = "e1";
    export let playerTwo = "e9";
    export let walls = [];
    const rows = [9, 8, 7, 6, 5, 4, 3, 2, 1];
    const cols = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
    const showLabels = false;
</script>

<div class="board">
    {#each rows as row, idx_r}
        {#each cols as col, idx_c}
            <div class="square" id="{col}{row}">
                {#if showLabels}
                    <p class="label">{col}{row}</p>
                {/if}
                {#if col + row === playerOne}
                    <Pawn player="one" />
                {/if}
                {#if col + row === playerTwo}
                    <Pawn player="two" />
                {/if}
            </div>
            {#if idx_c < 8}
                <div class="wall-slot vertical">
                    {#if walls.includes(col + (row - 1) + "v") || walls.includes(col + row + "v")}
                        <div class="wall">
                            {#if showLabels}
                                <p class="label">{col}{row}</p>
                            {/if}
                        </div>
                    {/if}
                </div>
            {/if}
        {/each}
        {#each cols as col, idx_c}
            {#if idx_r < 8}
                {#if idx_c < 8}
                    <div class="wall-slot horizontal">
                        {#if walls.includes(col + (row - 1) + "h") || walls.includes(cols[idx_c - 1] + (row - 1) + "h")}
                            <div class="wall">
                                {#if showLabels}
                                    <p class="label">{col}{row - 1}</p>
                                {/if}
                            </div>
                        {/if}
                    </div>
                    <div class="wall-slot inbetween">
                        {#if walls.includes(col + (row - 1) + "h") || walls.includes(col + (row - 1) + "v")}
                            <div class="wall">
                                {#if showLabels}
                                    <p class="label">{col}{row - 1}</p>
                                {/if}
                            </div>
                        {/if}
                    </div>
                {:else}
                    <div class="wall-slot horizontal">
                        {#if walls.includes(col + (row - 1) + "h") || walls.includes(cols[idx_c - 1] + (row - 1) + "h")}
                            <div class="wall">
                                {#if showLabels}
                                    <p class="label">{col}{row - 1}</p>
                                {/if}
                            </div>
                        {/if}
                    </div>
                {/if}
            {/if}
        {/each}
    {/each}
</div>

<style>
    .board {
        grid-column: 1;
        --ratio: 3.5;
        --wall-size: calc(var(--board-width) / (9 * var(--ratio) + 8));
        --square-size: calc((var(--board-width) - (8 * var(--wall-size))) / 9);
        display: grid;
        grid-template-columns: repeat(8, var(--square-size) var(--wall-size)) var(
                --square-size
            );
        grid-template-rows: repeat(8, var(--square-size) var(--wall-size)) var(
                --square-size
            );
        background: #444;
        /* padding: 30px; */
        /* border-radius: 10px; */
        /* margin: 20px; */
    }

    .square {
        height: 100%;
        width: 100%;
        background: #666;
        border-radius: var(--rounding);
        color: white;
        font-size: 0.7em;
    }

    .wall-slot {
        height: 100%;
        width: 100%;
        background: #444;
    }

    .label {
        margin: 1px;
    }

    .wall {
        background-color: black;
        height: 100%;
        width: 100%;
        /* margin: 5% 0; */
    }
</style>
