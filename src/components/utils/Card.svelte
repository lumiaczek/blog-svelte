<script>
    export let title = '';
    let className;
    export {className as class}
</script>

<div class={`bg-white block shadow rounded-lg + ${className || ''}`}>
    {#if title !== ''}
    <h6 class="font-semibold mb-3 text-gray-600">{title}</h6>
    {/if}
    <slot></slot>
</div>