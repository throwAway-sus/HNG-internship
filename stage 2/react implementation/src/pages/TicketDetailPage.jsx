import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PageWrap, Container, Card, Badge, Select, PrimaryButton } from "../styles/styledBits";
import { Navbar } from "../components/Navbar";
import { EmptyState } from "../components/EmptyState";
import { clearSession } from "../utils/session";

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const HeaderInfo = styled.div`
  h2 {
    margin: 0;
  }
  p {
    margin: 4px 0 0;
    color: #6b7280;
    font-size: 14px;
  }
`;

const StatusSection = styled.div`
  text-align: right;

  & > div {
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const DetailSection = styled.div`
  margin-top: 18px;

  & > div {
    margin-top: 12px;
  }

  & > div:first-child {
    margin-top: 0;
  }
`;

const Label = styled.div`
  font-weight: 700;
`;

const Value = styled.div`
  margin-top: 6px;
`;

const BackButtonWrapper = styled.div`
  margin-top: 18px;
`;

export const TicketDetailPage = ({ ticketStore }) => {
  const { id } = useParams();
  const { tickets, updateTicket } = ticketStore;
  const ticket = tickets.find((t) => String(t.id) === String(id));
  const navigate = useNavigate();

  const handleLogout = () => {
    clearSession();
    window.location.href = "/";
  };

  if (!ticket) {
    return (
      <PageWrap>
        <Navbar  onLogout={handleLogout} />
        <Container>
          <EmptyState>Ticket not found</EmptyState>
        </Container>
      </PageWrap>
    );
  }

  return (
    <PageWrap>
      <Navbar  onLogout={handleLogout} />
      <Container>
        <Card>
          <HeaderRow>
            <HeaderInfo>
              <h2>{ticket.title}</h2>
              <p>{ticket.description}</p>
            </HeaderInfo>
            <StatusSection>
              <Badge variant={ticket.status}>
                {ticket.status === "open" ? "Open" : ticket.status === "in_progress" ? "In Progress" : "Closed"}
              </Badge>
              <div>
                <Select
                  value={ticket.status}
                  onChange={(e) => updateTicket(ticket.id, { status: e.target.value })}
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </Select>
              </div>
            </StatusSection>
          </HeaderRow>

          <DetailSection>
            <div>
              <Label>Priority</Label>
              <Value>{ticket.priority}</Value>
            </div>

            <div>
              <Label>Created</Label>
              <Value>{new Date(ticket.createdAt).toLocaleString()}</Value>
            </div>
          </DetailSection>

          <BackButtonWrapper>
            <PrimaryButton onClick={() => navigate(-1)}>Back</PrimaryButton>
          </BackButtonWrapper>
        </Card>
      </Container>
    </PageWrap>
  );
};