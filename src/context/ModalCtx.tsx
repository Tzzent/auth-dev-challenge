/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useRef, useState } from 'react';

export interface ModalCtxType {
  isOpen: boolean,
  onClose: () => void,
  title: string,
  setTitle: (title: string) => void,
  description: string,
  setDescription: (description: string) => void,
  onOpen: () => void,
  onYes: () => void | Promise<void>,
  setCallback: (callback: () => void | Promise<void>) => void,
}

const initialState = {
  isOpen: false,
  onClose: () => { },
  title: '',
  setTitle: () => { },
  description: '',
  setDescription: () => { },
  onOpen: () => { },
  onYes: () => { },
  setCallback: () => { }
};

export const ModalCtx = createContext<ModalCtxType>(initialState);

export const ModalProvider = (
  { children }: { children: ReactNode }
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const callbackRef = useRef<() => void | Promise<void>>();

  const onClose = () => {
    setIsOpen(false);
  }

  const onOpen = () => {
    setIsOpen(true);
  }

  const onYes = async () => {
    if (callbackRef.current) {
      await callbackRef.current();
    }

    setIsOpen(false);
  }

  const setCallback = (callback: () => void | Promise<void>) => {
    callbackRef.current = callback;
  };

  return (
    <ModalCtx.Provider
      value={{
        isOpen,
        title,
        setTitle,
        description,
        setDescription,
        onClose,
        onOpen,
        onYes,
        setCallback,
      }}>
      {children}
    </ModalCtx.Provider>
  )
}