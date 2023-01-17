import { useShowGlobalSnackbar } from '@/contexts/snackbar';
import { MeterCommonResponse } from '@/models';
import { abortController } from '@/utils/abortController';
import { useCallback, useEffect, useRef } from 'react';

type fetchApi = (controller: AbortController, payload?: any) => any;

/**
 * Custom hook that returns a function to make the fetch
 * @returns callApi `function`.
 */
export const useFetchWithCallback = () => {
    const refAbortController = useRef<AbortController>();
    const showSnackbar = useShowGlobalSnackbar();

    // func that make the fetch call
    const fetchApi = useCallback(async (
        fetchFunc: fetchApi,
        payload?: any,
        showErrors = true
    ): Promise<any> => {
        refAbortController.current = abortController();

        let result: MeterCommonResponse = {
            data: [],
            error: null
        };

        try {
            result = await fetchFunc(refAbortController.current, payload || null);

            /* if (result && showErrors) {
                showSnackbar(`Ops.. something went wrong, ${error} `, 'error');
                console.error(result.error.message);
            } */
        } catch (error) {
            if (showErrors)
                showSnackbar(`Ops.. something went wrong, ${error} `, 'error');

            console.error(error);
        }

        return result;
    }, [showSnackbar]);

    useEffect(() => {
        return () => {
            const abortApiCall = () => {
                refAbortController.current?.abort();
            };
            abortApiCall();
        };
    }, [fetchApi]);

    return fetchApi;
};
