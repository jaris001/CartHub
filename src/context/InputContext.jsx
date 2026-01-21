import { createContext } from "react";
import { useState } from "react";

export const InputContext = createContext();

export const InputContextProvider = ({ children }) => {
    const [input, setInput] = useState("");
    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const value = { input, handleInput };
    return (
        <InputContext.Provider value={value}>
            {children}
        </InputContext.Provider>
    );
};
