export async function loggedFetch(url: RequestInfo, options?: RequestInit): Promise<Response> {
    const response = await fetch(url, options);
    const clonedResponse = response.clone();

    try {
        const json = await clonedResponse.json();
        console.log('--- API Response ---',
            '\nURL:', url,
            '\nOptions:', options,
            '\nStatus:', response.status,
            '\nBody:', json);
    } catch (e) {
        console.error('--- API Response ---',
            '\nStatus:', response.status,
            '\nBody: Not a JSON response or failed to parse.');
    }

    return response;
}
