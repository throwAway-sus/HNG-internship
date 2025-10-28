import styled from "styled-components";
import { Card } from "../styles/styledBits";

const EmptyCard = styled(Card)`
  text-align: center;
  padding: 28px;
`;

const EmptyText = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 14px;
`;

export const EmptyState = ({ children }) => (
  <EmptyCard>
    <EmptyText>{children}</EmptyText>
  </EmptyCard>
);
