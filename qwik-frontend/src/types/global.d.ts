declare global {
    interface GetResources<T> {
        params: T;
        controller?: AbortController;
    }
}

export {};