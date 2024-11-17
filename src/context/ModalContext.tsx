"use client";

import TokenSelector, { Token } from "@/components/TokenSelector";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  openModal: (onSelect: (value: Token) => void) => void;
  closeModal: () => void;
  onSelectToken: (val: Token) => void;
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
  const [onSelectCallback, setOnSelectCallback] = useState<(value: Token) => void | null>();

  const openModal = (onSelect: (value: Token) => void) => {
    setIsOpen(true);
    setOnSelectCallback(() => onSelect);
  };

  const closeModal = () => {
    setIsOpen(false);
    setOnSelectCallback(() => null);
  };

  const onSelectToken = (val: Token) => {
    if (onSelectCallback) onSelectCallback(val);
    setToken(val);
    closeModal();
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal , onSelectToken, token}}>
      {children}
      <TokenSelector
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSelectedToken={onSelectToken}
      />
    </ModalContext.Provider>
  );
};
