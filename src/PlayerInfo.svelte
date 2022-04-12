<script>
    export let player = null;
    export let walls_left = 10;
</script>

<div class="player-info">
    {#if player != null}
        {player} walls: {walls_left}
    {:else}
        Walls: {walls_left}
    {/if}
</div>

<style>
    .player-info {
        font-size: 1.5em;
        color: gray;
        margin: 5px 0;
    }
</style>
