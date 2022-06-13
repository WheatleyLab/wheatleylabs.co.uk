import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    title: "WheatleyLabs"
  });

  return (
    <AppContext.Provider
        value={{
          appState,
          setAppState
        }}
    >
        {children}
    </AppContext.Provider>
  );
};

export const AppProvider = AppContextProvider;
export const AppConsumer = AppContext.Consumer;
export default AppContext;
