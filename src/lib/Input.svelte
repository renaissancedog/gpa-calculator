<script>
  import { get } from 'svelte/store';
  import { grades, weights } from './stores';
  import { untrack } from 'svelte';
  let { id, amount = '', classType = 'Regular' } = $props();
  let toggleType = () => {
    classType =
      classType === 'Regular'
        ? 'Honors'
        : classType === 'Honors'
          ? 'AP'
          : 'Regular';
  };
  $effect(() => {
    if (amount > 100) {
      amount = 100;
    }
    if (amount < 0) {
      amount = 0;
    }
    const copyGrade = untrack(() => get(grades));
    const copyWeight = untrack(() => get(weights));
    copyGrade[parseInt(id)] = amount;
    copyWeight[parseInt(id)] = classType;
    grades.set(copyGrade);
    weights.set(copyWeight);
  });
</script>

<div {id} class="flex flex-row">
  <div class="relative text-left">
    <button
      class="mr-2 rounded-lg border-2 bg-gray-50 p-2 hover:bg-gray-100"
      onclick={toggleType}
    >
      {classType}
    </button>
  </div>
  <input
    bind:value={amount}
    placeholder="Grade"
    class="mb-2 w-full rounded-lg border-2 border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
  />
</div>
