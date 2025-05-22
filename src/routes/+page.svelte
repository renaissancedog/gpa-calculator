<script>
  import Input from '$lib/Input.svelte';
  import { get } from 'svelte/store';
  let gpa = $state(100);
  import { grades, credits } from '$lib/stores';
  grades.subscribe(() => {
    const currentGrades = get(grades);
    const currentCredits = get(credits);

    let totalWeightedPoints = 0;
    let totalCredits = 0;
    currentGrades.forEach((grade, index) => {
      if (grade > 0) {
        const credit = currentCredits[index] || 0.5;
        totalWeightedPoints += grade;
        totalCredits += credit;
      }
    });
    gpa =
      totalCredits > 0
        ? (totalWeightedPoints / (2 * totalCredits)).toFixed(3)
        : 0;
  });
  const items = Array.from({ length: 56 }, (_, i) => `${i}`);
</script>

<div class="space-y-4">
  <div class="mb-4 space-y-4 text-xl">
    <h1 class="bold text-center text-5xl">Reagan GPA Calculator</h1>
    <p>
      Are you an academic tryhard? Are you constantly optimizing time spent in
      your classes to maximize your GPA? Then this is the app for you! Calculate
      your GPA over 4 years at Reagan!
    </p>
  </div>
  <div class="mx-auto grid w-3/4 grid-cols-4 items-center justify-center gap-2">
    {#each items as id}
      {#if id % 7 == 0}
        <h2 class="col-span-4 text-center text-3xl">
          Semester {Math.floor(id / 7) + 1}
        </h2>
      {/if}
      <Input {id} />
    {/each}
  </div>

  <div>
    <h1 class="text-5xl">
      Your GPA is:
      <span class="font-bold text-sky-600">{gpa}</span>
    </h1>
  </div>
</div>
