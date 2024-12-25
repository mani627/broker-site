
import { useLoading } from '@/context/loadingContext';
import { useCallback } from 'react';


export function useLoadingState() {
    const { isLoading, setLoading, loadingText, setLoadingText, loadingComponent, setLoadingComponent } = useLoading();

    // const startLoading = useCallback((text) => {
    //     setLoading(true);
    //     if (text) setLoadingText(text);
    // }, [setLoading, setLoadingText]);
    const startLoading = useCallback((text, component) => {
        setLoading(true);
        console.log("Start Loading:", component);
        if (text) setLoadingText(text);
        setLoadingComponent(component);
    }, [setLoading, setLoadingText, setLoadingComponent]);

    const stopLoading = useCallback(() => {
        setLoading(false);
    }, [setLoading]);

    return {
        startLoading,
        stopLoading,
        isLoading,
        loadingText,
        loadingComponent
    };
}
