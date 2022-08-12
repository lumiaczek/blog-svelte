<script>
    import Card from "../utils/Card.svelte";
</script>

<div>
    <Card class={"overflow-x-auto mb-5"}>
        <table class="table border-collapse border border-blue-100 w-full bg-white">
            <slot></slot>
        </table>
    </Card>

</div>