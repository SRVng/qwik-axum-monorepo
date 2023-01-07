import {
  component$,
  Resource,
  useResource$,
  // useSignal,
  useStore,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { GetGreetingResult } from "~/resources/greeting";
import { getGreeting } from "~/resources/greeting";
import Card from "../../components/card";

export default component$(() => {
  // const name = useSignal("Anon");
  const name = useStore({ value: "Anon" });

  const data = useResource$<GetGreetingResult>(({ track, cleanup }) => {
    track(() => name.value);

    const controller = new AbortController();
    cleanup(() => controller.abort());

    return getGreeting({ params: { name: name.value }, controller });
  });

  return (
    <div>
      <div class="flex gap-2">
        <label>Name: </label>
        <input
          class="border-black border rounded-md hover:shadow-black hover:shadow-md cursor-pointer focus:cursor-text px-0.5 py-0"
          type="text"
          autoComplete="off"
          onChange$={(event) => (name.value = event.target.value)}
        />
      </div>
      <Card>
        <Resource
          value={data}
          onPending={() => <div>Hello! {name.value}, from Qwik</div>}
          onResolved={({ message }) => <div>{message}</div>}
          onRejected={() => <div>Hello! {name.value}, from Qwik</div>}
        />
      </Card>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Greeting Page",
  meta: [
    {
      name: "description",
      content: "Greeting",
    },
  ],
};
