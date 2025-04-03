"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the Background context state
interface BackgroundContextState {
    status: boolean;
    toggleBackground: (newState: boolean) => void;
}

// Create the context with default values
const BackgroundContext = createContext<BackgroundContextState>({
    status: true,
    toggleBackground: () => { },
});

// Create a provider component
export const BackgroundContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [status, setStatus] = useState(true);

    // Toggle function to change the open state
    const toggleBackground = (newState: boolean) => {
        setStatus(newState);
    };

    return (
        <BackgroundContext.Provider value={{ status, toggleBackground }}>
            {children}
        </BackgroundContext.Provider>
    );
};

// Custom hook to use the Background context
export const useBackgroundContext = () => useContext(BackgroundContext);
