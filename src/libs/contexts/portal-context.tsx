import React, { createContext, useContext } from "react";

const PortalContext = createContext<HTMLElement | null>(null);

export const usePortalContainer = () => {
  return useContext(PortalContext);
};

export const PortalProvider = ({
  container,
  children,
}: {
  container: HTMLElement;
  children: React.ReactNode;
}) => {
  return (
    <PortalContext.Provider value={container}>
      {children}
    </PortalContext.Provider>
  );
};