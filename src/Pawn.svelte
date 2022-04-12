<script>
    export let player = "one";
</script>

<div class="pawn" id={player} />

<style>
    .pawn {
        display: inline-block;
        border-radius: 50%;
        width: 70%;
        height: 70%;
        margin: 15%;
    }

    #one {
        background-color: #e9e9e9;
    }

    #two {
        background-color: #212121;
    }
</style>
