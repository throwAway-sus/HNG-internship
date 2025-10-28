import styled from "styled-components";
import { PageWrap, Container, Card, Grid3, FooterWrap } from "../styles/styledBits";
import { Navbar } from "../components/Navbar";
import { clearSession } from "../utils/session";
import { TicketList } from "./TicketsPage";

const TopGridWrapper = styled.div`
  margin-top: 20px;
`;

const TicketCardContent = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const TicketCount = styled.div`
  font-size: 22px;
  padding: 8px;
  border-radius: 8px;
  background-color: ${(props) => props.bg || "#f1f5f9"};
`;

const TicketInfo = styled.div``;

const TicketLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

const TicketNumber = styled.div`
  font-weight: 700;
  font-size: 18px;
`;

const SectionWrapper = styled.div`
  margin-top: 24px;
`;

const SectionTitle = styled.h3`
  margin-top: 0;
`;

export const DashboardPage = ({ ticketStore }) => {
  const { tickets } = ticketStore;
  const open = tickets.filter((t) => t.status === "open").length;
  const inProgress = tickets.filter((t) => t.status === "in_progress").length;
  const closed = tickets.filter((t) => t.status === "closed").length;

  const handleLogout = () => {
    clearSession();
    window.location.href = "/";
  };

  return (
    <PageWrap>
      <Navbar onLogout={handleLogout} />
      <Container>
        <TopGridWrapper>
          <Grid3>
            <Card>
              <TicketCardContent>
                <TicketCount bg="#ecfdf5">{tickets.length}</TicketCount>
                <TicketInfo>
                  <TicketLabel>Total Tickets</TicketLabel>
                  <TicketNumber>{tickets.length}</TicketNumber>
                </TicketInfo>
              </TicketCardContent>
            </Card>

            <Card>
              <TicketCardContent>
                <TicketCount bg="#fff7ed">{open}</TicketCount>
                <TicketInfo>
                  <TicketLabel>Open</TicketLabel>
                  <TicketNumber>{open}</TicketNumber>
                </TicketInfo>
              </TicketCardContent>
            </Card>

            <Card>
              <TicketCardContent>
                <TicketCount bg="#f1f5f9">{closed}</TicketCount>
                <TicketInfo>
                  <TicketLabel>Resolved</TicketLabel>
                  <TicketNumber>{closed}</TicketNumber>
                </TicketInfo>
              </TicketCardContent>
            </Card>
          </Grid3>
        </TopGridWrapper>

        <SectionWrapper>
          <Card>
            <SectionTitle>Recent Tickets</SectionTitle>
            <TicketList tickets={tickets.slice(0, 5)} compact />
          </Card>
        </SectionWrapper>
      </Container>

      <FooterWrap>{new Date().getFullYear()} Ticketi•fy — © UnSiMplYkells</FooterWrap>
    </PageWrap>
  );
};
