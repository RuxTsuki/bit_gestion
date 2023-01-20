import { useShowGlobalSnackbar } from '@/contexts/snackbar';
import { MeterErrorResponse } from '@/models';
import { abortController } from '@/utils/abortController';
import { useCallback, useEffect, useRef, useState } from 'react';

type FetchState<T> = {
    state: 'idle' | 'loading' | 'error' | 'success',
    data: null | T;
    error: null | Error | MeterErrorResponse
};

const initialState: FetchState<any> = {
    state: 'idle',
    data: null,
    error: null,
}

export const useCustomFetch = <T>(url: string = '', fetchOpts: RequestInit | undefined = {}) => {
    const [fetchState, setFetchState] = useState<FetchState<T>>(initialState);

    const refAbortController = useRef<AbortController>();
    // para mas tarde si hay tiempo
    const showSnackbar = useShowGlobalSnackbar();

    useEffect(() => {
        const controller = abortController();

        const fetchData = async () => {
            try {
                setFetchState(oldState => ({ ...oldState, state: 'loading' }));
                const response = await fetch(url, {
                    ...fetchOpts,
                    signal: controller.signal,
                });

                if (!response.ok) {
                    setFetchState({ data: null, error: new Error(response.statusText), state: 'error' });
                    showSnackbar('Something went wrong', 'error');
                    return;
                }

                const data = await response.json();
                setFetchState({ data, error: null, state: 'success' });

            } catch (error) {
                setFetchState({ data: null, error: error as Error, state: 'error' });
            }
        }

        if (url.trim().length > 0)
            fetchData();

        return () => { controller.abort(); };
    }, [url])

    // func to fetch data manually this doesn't save state
    const fetchData = useCallback(async (
        url: string,
        fetchOpts: RequestInit | undefined
    ): Promise<FetchState<T>> => {
        refAbortController.current = abortController();

        let data: T | null = null;
        let error: null | Error | MeterErrorResponse = null;

        try {
            setFetchState(oldState => ({ ...oldState, state: 'loading' }));
            const response = await fetch(url, {
                ...fetchOpts,
                signal: refAbortController.current.signal,
            });

            if (!response.ok) {
                showSnackbar('Something went wrong', 'error');

                return {
                    state: 'error',
                    data: null,
                    error: new Error(response.statusText),
                };
            }
            data = await response.json();
        } catch (errorA) {
            error = errorA as Error;
            showSnackbar('Something went wrong', 'error');
        }

        return {
            state: 'success',
            data,
            error
        };;
    }, []);

    useEffect(() => {
        return () => {
            const abortApiCall = () => {
                refAbortController.current?.abort();
            };
            abortApiCall();
        };
    }, [fetchData]);

    return [fetchState, fetchData] as const;
};
