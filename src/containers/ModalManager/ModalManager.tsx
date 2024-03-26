import { Modal } from '@/components';
import { resetState, useModalStore } from '@/store/modal.store';

export function ModalManager() {
  const { open, text, title, onConfirm } = useModalStore();
  const confirmHandler = () => {
    onConfirm();
    resetState();
  };

  return (
    <Modal
      open={open}
      title={title}
      text={text}
      onCancel={resetState}
      onConfirm={confirmHandler}
    />
  );
}
