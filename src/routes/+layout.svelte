<script>
  import '../app.css';
</script>

<svelte:head>
  <title>Reagan GPA Calculator</title>
</svelte:head>
<div class="min-h-screen bg-sky-50 text-xl text-black">
  <main class="mx-auto text-center">
    <slot></slot>
    <footer class="mt-4 text-center">
      <p>
        <a
          class="text-sky-600 underline"
          href="https://github.com/renaissancedog/gpa-calculator"
          target="_blank">Star or fork</a
        >
        this repo.
      </p>
      <p class="mt-2 mb-4">Made with ❤️ by William, 2025</p>
    </footer>
  </main>
</div>
