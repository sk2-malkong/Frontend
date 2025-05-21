import React, { createContext, useContext, useState } from "react";

const NicknameContext = createContext();

export const NicknameProvider = ({ children }) => {
    const [nickname, setNickname] = useState("");

    return (
        <NicknameContext.Provider value={{ nickname, setNickname }}>
            {children}
        </NicknameContext.Provider>
    );
};

export const useNickname = () => useContext(NicknameContext);
