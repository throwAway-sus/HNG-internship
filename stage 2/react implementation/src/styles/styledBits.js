import styled, { css } from "styled-components";
import { theme } from "./theme.js";

export const PageWrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.main`
  width: 100vw;
  max-width: ${(p) => p.theme.maxWidth};
  margin: 0 auto;
  padding: ${(p) => p.px ?? p.theme.spacing(6)};
`;

export const Card = styled.section`
  background: ${(p) => p.theme.colors.surface};
  border-radius: ${(p) => p.theme.radii.md};
  box-shadow: 0 6px 18px ${(p) => p.theme.colors.cardShadow};
  padding: 18px;
`;

export const Grid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  @media(min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Flex = styled.div`
  display:flex;
  gap:12px;
  align-items:center;
  justify-content: ${(p) => p.justify || "flex-start"};
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  color: ${(p) => p.theme.colors.text};
`;

export const Subtle = styled.p`
  margin:0;
  color: ${(p) => p.theme.colors.mutted};
  font-size: 14px;
`;

export const FormRow = styled.div`
  margin-top: 12px;
`;

export const Label = styled.label`
  display:block;
  font-size: 13px;
  margin-bottom: 6px;
  color: ${(p) => p.theme.colors.mutted};
`;

export const Input = styled.input`
  width:100%;
  padding: 10px 12px;
  border-radius: ${(p) => p.theme.radii.sm};
  border: 1px solid ${(p) => p.theme.colors.inputBorder};
  background: white;
  outline: none;
  font-size: 14px;
  &:focus { 
    box-shadow: 0 0 0 4px rgba(37,99,235,0.08); 
    border-color: ${(p) => p.theme.colors.primary}; 
  }
`;

export const Textarea = styled.textarea`
  width:100%;
  padding: 10px 12px;
  border-radius: ${(p) => p.theme.radii.sm};
  border: 1px solid ${(p) => p.theme.colors.inputBorder};
  background: white;
  outline: none;
  font-size: 14px;
  &:focus { 
    box-shadow: 0 0 0 4px rgba(37,99,235,0.08); 
    border-color: ${(p) => p.theme.colors.primary}; 
  }
`;

export const Select = styled.select`
  width:100%;
  padding: 10px 12px;
  border-radius: ${(p) => p.theme.radii.sm};
  border: 1px solid ${(p) => p.theme.colors.inputBorder};
  background: white;
  outline: none;
  font-size: 14px;
  &:focus { 
    box-shadow: 0 0 0 4px rgba(37,99,235,0.08); 
    border-color: ${(p) => p.theme.colors.primary}; 
  }
`;

export const PrimaryButton = styled.button`
  background: ${(p) => p.theme.colors.primary};
  color: white;
  padding: 10px 12px;
  border: none;
  border-radius: ${(p) => p.theme.radii.sm};
  font-weight: 600;
  cursor: pointer;
  &:hover { background: ${(p) => p.theme.colors.primaryDark}; }
`;

export const NavButton = styled.button`
  background: transparent;
  border: 1px solid transparent;
  padding: 8px 12px;
  border-radius: ${(p) => p.theme.radii.sm};
  cursor: pointer;
  color: ${(p) => p.theme.colors.text};
  font-weight: 500;
  &:hover { background: #f1f8ff; }
`;

export const InlineLink = styled.button`
  background:transparent;
  border:none;
  color: ${(p) => p.theme.colors.primary};
  cursor:pointer;
  font-weight:600;
  padding:4px 6px;
  border-radius:6px;
  &:hover { background:#f1f8ff; }
`;

export const Small = styled.div`
  font-size: 13px;
  color: ${(p) => p.theme.colors.mutted};
`;

export const Avatar = styled.div`
  min-width:44px;
  min-height:44px;
  border-radius:999px;
  background:#eff6ff;
  color:#1e3a8a;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:700;
`;

export const Badge = styled.div`
  display:inline-flex;
  align-items:center;
  padding: 5px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  ${(p) => p.variant === "open" && css`background:#ecfdf5;color:#065f46;`}
  ${(p) => p.variant === "in_progress" && css`background:#fffbeb;color:#92400e;`}
  ${(p) => p.variant === "closed" && css`background:#f3f4f6;color:#374151;`}
`;

export const FooterWrap = styled.footer`
  margin-top: auto;
  padding: 18px;
  text-align:center;
  color:${(p) => p.theme.colors.mutted};
`;

export const Circle = styled.div`
  position: absolute;
  border-radius: 999px;
  opacity: 0.16;
  background: ${(p) => p.color || "#2563eb"};
  width: ${(p) => p.size || "120px"};
  height: ${(p) => p.size || "120px"};
  transform: translate(${(p) => p.x || "0"}, ${(p) => p.y || "0"});
  pointer-events: none;
`;