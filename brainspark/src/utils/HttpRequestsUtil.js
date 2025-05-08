export async function httpRequest(url, method = 'GET', data = null, headers = {}) {
    const baseUrl = "http://localhost:8080";

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const fullUrl = baseUrl + url;
        const response = await fetch(fullUrl, options);
        const contentType = response.headers.get("content-type");
        const responseData = contentType?.includes("application/json")
            ? await response.json()
            : await response.text();

        return {
            status: response.status,
            ok: response.ok,
            data: responseData,
        };
    } catch (error) {
        console.error("Erro HTTP", error);
        throw error;
    }
}
