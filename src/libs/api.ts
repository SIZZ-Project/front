export async function api<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    const res = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application.json",
            ...(options.headers || {}),
        },
        cache: "no-store",
        credentials: "include",
    });

    if(!res.ok) {
        const errorBody = await res.text();
        throw new Error(`API Error: ${res.status} - ${errorBody}`);
    }

    return res.json()
}