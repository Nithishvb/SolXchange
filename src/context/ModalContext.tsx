"use client";

import TokenSelector, { Token } from "@/components/TokenSelector";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  openModal: () => void;
  closeModal: () => void;
  onSelectToken: () => void;
  token: Token | undefined;
};


const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [token, setToken] = useState<Token>();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSelectToken = (val?: Token) => {
    setToken(val);
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal , onSelectToken, token}}>
      {children}
      <TokenSelector
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={closeModal}
        onSelectedToken={onSelectToken}
      />
    </ModalContext.Provider>
  );
};
