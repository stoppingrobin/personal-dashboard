export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestConfig {
    method: HttpMethod;
    headers: Record<string, string>;
    body?: string;
}

export class ApiClient {

    protected async request<T>(
        endpoint: string,
        method: HttpMethod = 'GET',
        data?: unknown,
        headers: Record<string, string> = {}
    ): Promise<T> {
        const config: RequestConfig = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        };

        if (data) {
            config.body = JSON.stringify(data);
        }

        const response = await fetch(`${endpoint}`, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API error: ${response.status}`);
        }

        return response.status !== 204 ? response.json() : (null as T);
    }

    get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, 'GET', undefined, headers);
    }

    post<T>(endpoint: string, data: unknown, headers?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, 'POST', data, headers);
    }

    put<T>(endpoint: string, data: unknown, headers?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, 'PUT', data, headers);
    }

    patch<T>(endpoint: string, data: unknown, headers?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, 'PATCH', data, headers);
    }

    delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, 'DELETE', undefined, headers);
    }
}
