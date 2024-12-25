import LoadingPopup from '@/components/LoadingButton';
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
        {isLoading && <div className='fixed top-0 bottom-0 left-0 right-0  z-50'>
            <LoadingPopup
            isLoading={isLoading}
            size="md" // Can be 'sm', 'md', or 'lg'
            type="gif" // Can be 'spinner' or 'gif'
            gifSrc="/img/icon_img.gif" // Path to custom GIF
          />
        </div>}
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
