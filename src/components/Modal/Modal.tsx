import React from 'react';
import { Button } from '@/components';
import { Content, Overlay, Title, Body, Buttons, Text } from './styles';

type ModalProps = {
  open: boolean;
  text?: string;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmBtnText?: string;
  cancelBtnText?: string;
  children?: React.ReactNode | null;
};

export function Modal(props: ModalProps) {
  const { open, text, onConfirm, onCancel, title, confirmBtnText, cancelBtnText, children } = props;

  if (!open) return null;

  return (
    <Overlay>
      <Content>
        <Body>
          <Title>
            {title}
            <Button
              className="btn btn-outline-danger"
              text="X"
              type="button"
              onClick={onCancel}
            />
          </Title>

          {children || <Text>{text}</Text>}
          <Buttons>
            <Button
              className="btn btn-outline-danger"
              text={cancelBtnText || 'Cancel'}
              type="button"
              onClick={onCancel}
            />
            <Button
              className="btn btn-outline-primary"
              text={confirmBtnText || 'Confirm'}
              type="button"
              onClick={onConfirm}
            />
          </Buttons>
        </Body>
      </Content>
    </Overlay>
  );
}
