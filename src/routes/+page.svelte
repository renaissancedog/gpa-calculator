<script>
  import Input from '$lib/Input.svelte';
  import { get } from 'svelte/store';
  let gpa = $state();
  let uwgpa = $state();
  import { grades, weights, WG, WW } from '$lib/stores';
  function updateGPA() {
    const currentGrades = get(grades);
    const currentWeights = get(weights);
    let totalCredits = 0;
    let totalPoints = 0;
    let totalWeightedPoints = 0;
    currentGrades.forEach((grade, index) => {
      if (grade > 0) {
        totalCredits += 0.5;
        if (currentWeights[index] == 'AP') {
          totalWeightedPoints += parseFloat(1.15 * grade);
        } else if (currentWeights[index] == 'Honors') {
          totalWeightedPoints += parseFloat(1.08 * grade);
        } else {
          totalWeightedPoints += parseFloat(grade);
        }
        totalPoints += parseFloat(grade);
      }
    });
    uwgpa = totalCredits > 0 ? totalPoints / (2 * totalCredits) : 0;
    gpa = totalCredits > 0 ? totalWeightedPoints / (2 * totalCredits) : 0;
    console.log('GPA:', gpa);
    console.log('Unweighted GPA:', uwgpa);
    console.log('Total Points:', totalPoints);
    console.log('Total Weighted Points:', totalWeightedPoints);
    console.log('Total Credits:', totalCredits);
  }
  grades.subscribe(() => updateGPA());
  function williamGrades() {
    let MG = new Array(63).fill(null);
    let MW = new Array(63).fill('Regular');
    for (let i = 0; i < WG.length; i++) {
      MG[i] = WG[i];
    }
    for (let i = 0; i < WG.length; i++) {
      MW[i] = WW[i];
    }
    MG[56] = 100;
    MW[56] = 'Regular';
    grades.set(MG);
    weights.set(MW);
  }
  const items = Array.from({ length: 63 }, (_, i) => `${i}`);
</script>

<div class="space-y-4">
  <div
    class="sticky top-0 z-50 mx-auto h-auto min-h-[110px] w-screen items-center bg-gray-50 p-4 px-12 text-center text-2xl"
  >
    <h1 class="text-5xl">
      Your GPA is:
      <span class="font-bold text-sky-600">{gpa.toFixed(3)}</span>
      ({uwgpa.toFixed(3)} unweighted)
    </h1>
  </div>
  <div class="mb-4 text-xl">
    <h1 class="bold mb-4 text-center text-5xl">Reagan GPA Calculator</h1>
    <p>
      Are you an academic tryhard? Are you constantly worrying about and trying
      to maximize your GPA? Then this is the app for you!
    </p>
    <a class="text-sky-600 underline" href="https://www.neisd.net/class-rank"
      >NEISD GPA Guidelines</a
    >
  </div>
  <div
    class="mx-auto items-center justify-center gap-2 px-2 lg:grid lg:w-3/4 lg:grid-cols-4"
  >
    {#each items as id}
      {#if id % 7 == 0 && id < 56}
        <h2 class="col-span-4 text-center text-3xl">
          Semester {Math.floor(id / 7) + 1}
        </h2>
      {/if}
      {#if id == 56}
        <h2 class="col-span-4 text-center text-3xl">Miscellaneous</h2>
      {/if}
      <Input {id} amount={$grades[id]} classType={$weights[id]} />
    {/each}
  </div>
  <button
    class="dropbtn mr-2 rounded-lg border-2 bg-gray-50 p-2 hover:bg-gray-100"
    onclick={williamGrades}>William button</button
  >
</div>
