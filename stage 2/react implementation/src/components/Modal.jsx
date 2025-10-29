import styled from "styled-components";
import { theme } from "../styles/theme";

const ModalBackdrop = styled.div`
  position:fixed;
  inset:0;
  background: rgba(2,6,23,0.4);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:999;
`;

const ModalCard = styled.div`
  width: 100%;
  max-width: 720px;
  background:white;
  border-radius: 12px;
  padding: 18px;
`;

export const Modal = ({ children, isOpen, onClose, ariaLabel }) => {
  if (!isOpen) return null;
  
  return (
    <ModalBackdrop onClick={onClose} role="presentation">
      <ModalCard 
        role="dialog" 
        aria-modal="true" 
        aria-label={ariaLabel}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </ModalCard>
    </ModalBackdrop>
  );
};