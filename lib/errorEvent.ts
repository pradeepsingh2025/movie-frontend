export const API_ERROR_EVENT = 'api-error';

export interface ApiErrorDetail {
    message: string;
    title?: string;
}

export function dispatchApiError(message: string, title: string = 'Error') {
    if (typeof window !== 'undefined') {
        const event = new CustomEvent<ApiErrorDetail>(API_ERROR_EVENT, {
            detail: { message, title },
        });
        window.dispatchEvent(event);
    }
}
