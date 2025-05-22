<script>
  import { get } from 'svelte/store';
  import { grades, credits } from './stores';
  import { untrack } from 'svelte';

  let { id } = $props();
  let dropdownOpen = $state(false);
  let amount = $state('');
  let classType = $state('Regular');

  let toggleDropdown = () => {
    dropdownOpen = !dropdownOpen;
  };

  let types = ['Regular', 'Honors', 'AP'];

  let weightedGrade = $derived.by(() => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || amount === '') {
      return 0;
    }
    switch (classType) {
      case 'Regular':
        return numericAmount;
      case 'Honors':
        return numericAmount * 1.08;
      case 'AP':
        return numericAmount * 1.15;
      default:
        return numericAmount;
    }
  });
  $effect(() => {
    const copy = untrack(() => get(grades));
    const copyCredit = untrack(() => get(credits));
    copy[parseInt(id)] = weightedGrade;
    copyCredit[parseInt(id)] = 0.5;
    grades.set(copy);
    credits.set(copyCredit);
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
