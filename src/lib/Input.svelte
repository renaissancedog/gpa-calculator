<script>
  import { get } from 'svelte/store';
  import { grades, weights } from './stores';
  import { untrack } from 'svelte';
  let { id, amount = '', classType = 'Regular' } = $props();
  let dropdownOpen = $state(false);
  let toggleDropdown = () => {
    dropdownOpen = !dropdownOpen;
  };

  let types = ['Regular', 'Honors', 'AP'];
  $effect(() => {
    const copyGrade = untrack(() => get(grades));
    const copyWeight = untrack(() => get(weights));
    copyGrade[parseInt(id)] = amount;
    copyWeight[parseInt(id)] = classType;
    grades.set(copyGrade);
    weights.set(copyWeight);
  });
</script>

<div {id} class="flex flex-row">
  <div class="dropdown relative text-left">
    <button
      class="dropbtn mr-2 rounded-lg border-2 bg-gray-50 p-2 hover:bg-gray-100"
      onclick={toggleDropdown}
    >
      {classType}
    </button>
    {#if dropdownOpen}
      <div
        class="dropdown-content absolute z-10 min-w-40 rounded-lg border border-gray-300 bg-white shadow-lg"
      >
        {#each types as type}
          <button
            class="block w-full p-2 text-left first:rounded-t-lg last:rounded-b-lg hover:bg-gray-100"
            onclick={() => {
              classType = type;
              dropdownOpen = false;
            }}
          >
            {type}
          </button>
        {/each}
      </div>
    {/if}
  </div>
  <input
    bind:value={amount}
    placeholder="Enter grade"
    class="mb-2 w-full rounded-lg border-2 border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
  />
</div>
