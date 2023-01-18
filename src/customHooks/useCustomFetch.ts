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

export const useCustomFetch = <T>(url: string, fetchOpts: RequestInit | undefined = {}) => {
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
                    return;
                }

                const data = await response.json();
                setFetchState({ data, error: null, state: 'success' });

            } catch (error) {
                setFetchState({ data: null, error: error as Error, state: 'error' });
            }
        }

        fetchData();

        return () => { controller.abort(); };
    }, [url])

    // func to fetch data
    const fetchData = useCallback(async (
        url: string,
        fetchOpts: RequestInit | undefined
    ): Promise<FetchState<T>> => {
        refAbortController.current = abortController();
        try {
            setFetchState(oldState => ({ ...oldState, state: 'loading' }));
            const response = await fetch(url, {
                ...fetchOpts,
                signal: refAbortController.current.signal,
            });

            if (!response.ok) {
                setFetchState({ data: null, error: new Error(response.statusText), state: 'error' });
                return fetchState;
            }

            const data = await response.json();
            setFetchState({ data, error: null, state: 'success' });

        } catch (error) {
            setFetchState({ data: null, error: error as Error, state: 'error' });
        }

        return fetchState;
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
