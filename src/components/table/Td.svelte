<script>
    let clazz;
    export {clazz as class}
</script>

<td class={`bg-white text-left text-gray-600 text-sm p-3 shadow min-w-[100px] ${clazz || ''}`}>
    <slot></slot>
</td>