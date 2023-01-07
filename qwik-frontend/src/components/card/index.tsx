import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="border-gray-400 rounded-md">
      <Slot />
    </div>
  );
});
