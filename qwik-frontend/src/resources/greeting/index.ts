export type GetGreetingParams = GetResources<{ name: string }>

export interface GetGreetingResult {
    message: string
}

export async function getGreeting({ params, controller }: GetGreetingParams): Promise<GetGreetingResult> {
    const endpoint = new URL("http://localhost:3000/api/greeting");
    endpoint.searchParams.append("name", params.name);

    const response = await fetch(new URL(endpoint), { signal: controller?.signal });
    const json: GetGreetingResult = await response.json();

    return Object.keys(json).includes("message") ? json : Promise.reject("Invalid JSON")
}