import React, { createContext, useContext, useState } from "react";

const InsightsContext = createContext();

export const InsightsProvider = ({ children }) => {
  const [insights, setInsights] = useState(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  return (
    <InsightsContext.Provider
      value={{ insights, setInsights, loadingInsights, setLoadingInsights }}
    >
      {children}
    </InsightsContext.Provider>
  );
};

export const useInsights = () => useContext(InsightsContext);
