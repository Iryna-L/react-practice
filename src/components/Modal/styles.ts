import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  margin: 0;
  padding: 0;
  border: 0;
  background: rgb(3 20 56 / 60%);
  cursor: pointer;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Body = styled.div`
  padding: 16px;
  background: white;
  z-index: 9999;
  border-radius: 24px;
  text-align: center;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-size: 27px;
  font-style: normal;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 35px;
  display: flex;
  justify-content: space-between;
`;

export const Text = styled.div`
  font-size: 16px;
  font-style: normal;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 23px;
  margin-bottom: 24px;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
`;
