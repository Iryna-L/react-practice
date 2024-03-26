import { proxy, useSnapshot } from 'valtio';
import { devtools } from 'valtio/utils';

type ModalState = {
  open: boolean;
  text: string;
  title: string;
  onConfirm: () => void;
  confirmBtnText?: string;
  cancelBtnText?: string;
};

type ModalStore = {
  state: ModalState;
};

const defaultHandler = () => true;
const defaultState = (): ModalState => ({
  open: false,
  title: '',
  text: '',
  confirmBtnText: 'Confirm',
  cancelBtnText: 'Cancel',
  onConfirm: defaultHandler,
});

export const modalStore = proxy<ModalStore>({
  state: defaultState(),
});

export const useModalStore = () => useSnapshot(modalStore).state;

export const showModal = (config: Partial<ModalState>) => {
  modalStore.state = {
    ...modalStore.state,
    ...config,
    open: true,
  };
};

export const resetState = () => {
  modalStore.state = defaultState();
};

devtools(modalStore, { name: 'modalStore', enabled: true });
