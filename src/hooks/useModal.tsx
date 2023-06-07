import { useContext } from 'react';
import { ModalCtx } from '../context/ModalCtx';

export default function useModal() {
  const modalCtx = useContext(ModalCtx);

  return {
    ...modalCtx
  }
}