import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext(undefined);

export function LoadingProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState();
    const [loadingComponent, setLoadingComponent] = useState(null);
    const setLoading = (loading) => {
        setIsLoading(loading);
        if (!loading) setLoadingText(undefined);
    };

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading, loadingText, setLoadingText,loadingComponent,setLoadingComponent }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}
