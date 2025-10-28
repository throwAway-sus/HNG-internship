import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import {
  PageWrap,
  Container,
  Card,
  Input,
  Select,
  PrimaryButton,
  NavButton,
  FooterWrap,
  Avatar,
  Badge,
  Small,
  InlineLink
} from "../styles/styledBits";
import { Navbar } from "../components/Navbar";
import { Modal } from "../components/Modal";
import { TicketForm } from "./TicketForm";
import { initialTickets } from "../hooks/useTicketStore";
import { writeLS } from "../utils/localStorage";
import { clearSession } from "../utils/session";

const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 14px;
  border-bottom: 1px solid #f1f5f9;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ItemLeft = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 600px) {
    margin-bottom: 8px;
  }
`;

const ItemRight = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

const ActionsGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const HeaderInfo = styled.div`
  h1 {
    margin: 0;
    font-size: 20px;
    color: #0f172a;
  }
  p {
    margin: 6px 0 0;
    color: #6b7280;
    font-size: 14px;
  }
`;

const SearchFilterGroup = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    width: 100%;
  }
`;

const SearchInput = styled(Input)`
  width: 220px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StatusSelect = styled(Select)`
  width: 160px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 16px;
  margin-top: 18px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const QuickActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Spacer = styled.div`
  height: 12px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const TicketList = ({ tickets = [], onEdit, onDelete, onOpen }) => {
  if (!tickets || tickets.length === 0) return <p>No tickets yet</p>;

  return (
    <ListWrapper>
      {tickets.map((ticket) => (
        <ListItem key={ticket.id}>
          <ItemLeft>
            <Avatar aria-hidden>{ticket.title.charAt(0)}</Avatar>
            <div>
              <div style={{ fontWeight: 700 }}>{ticket.title}</div>
              <Small>{ticket.description}</Small>
            </div>
          </ItemLeft>

          <ItemRight>
            <Badge variant={ticket.status} role="status" aria-label={`status ${ticket.status}`}>
              {ticket.status === "open"
                ? "Open"
                : ticket.status === "in_progress"
                ? "In Progress"
                : "Closed"}
            </Badge>
            <Small>{ticket.priority}</Small>
            <ActionsGroup>
              {onOpen && <InlineLink aria-label={`View ${ticket.title}`} onClick={() => onOpen(ticket.id)}>View</InlineLink>}
              {onEdit && <InlineLink aria-label={`Edit ${ticket.title}`} onClick={() => onEdit(ticket)}>Edit</InlineLink>}
              {onDelete && <InlineLink aria-label={`Delete ${ticket.title}`} onClick={() => onDelete(ticket.id)} style={{ color: "#dc2626" }}>Delete</InlineLink>}
            </ActionsGroup>
          </ItemRight>
        </ListItem>
      ))}
    </ListWrapper>
  );
};

// Tickets Page Component
export const TicketsPage = ({ ticketStore }) => {
  const { tickets, createTicket, updateTicket, deleteTicket } = ticketStore;
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const navigate = useNavigate();

  const onCreate = (payload) => createTicket(payload);
  const onUpdate = (id, payload) => updateTicket(id, payload);
  const requestDelete = (id) => setConfirmDeleteId(id);
  const confirmDelete = () => {
    if (confirmDeleteId) {
      deleteTicket(confirmDeleteId);
      setConfirmDeleteId(null);
    }
  };
  const cancelDelete = () => setConfirmDeleteId(null);

  const filtered = useMemo(() => {
    let list = tickets;
    if (filterStatus !== "all") list = list.filter((t) => t.status === filterStatus);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [tickets, query, filterStatus]);

  const handleLogout = () => {
    clearSession();
    window.location.href = "/";
  };

  return (
    <PageWrap>
      <Navbar onLogout={handleLogout} />
      <Container>
        <PageHeader>
          <HeaderInfo>
            <h1>{editing ? "Edit Ticket" : "Tickets"}</h1>
            <p>{editing ? "Editing mode" : "Create and manage tickets"}</p>
          </HeaderInfo>
          <SearchFilterGroup>
            <SearchInput aria-label="Search tickets" placeholder="Search tickets..." value={query} onChange={(e) => setQuery(e.target.value)} />
            <StatusSelect aria-label="Filter status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All statuses</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </StatusSelect>
            <PrimaryButton onClick={() => { setEditing(null); setShowModal(true); }} aria-label="Create new ticket">New Ticket</PrimaryButton>
          </SearchFilterGroup>
        </PageHeader>

        <GridLayout>
          <div>
            <Card>
              <h3 style={{ marginTop: 0 }}>All Tickets</h3>
              <TicketList
                tickets={filtered}
                onEdit={(t) => { setEditing(t); setShowModal(true); }}
                onDelete={(id) => requestDelete(id)}
                onOpen={(id) => navigate(`/tickets/${id}`)}
              />
            </Card>
          </div>

          <div>
            <Card>
              <h3 style={{ marginTop: 0 }}>{editing ? "Edit Ticket" : "Create Ticket"}</h3>
              <TicketForm
                key={editing ? editing.id : "new"}
                initial={editing || null}
                onSubmit={(data) => {
                  if (editing) {
                    onUpdate(editing.id, data);
                    setEditing(null);
                  } else {
                    onCreate(data);
                  }
                }}
                onCancel={() => setEditing(null)}
              />
            </Card>

            <Spacer />

            <Card>
              <h4 style={{ marginTop: 0 }}>Quick Actions</h4>
              <QuickActions>
                <PrimaryButton onClick={() => {
                  if (window.confirm("Reset tickets to demo data?")) {
                    writeLS("ticketflow::tickets_v1", initialTickets);
                    window.location.reload();
                  }
                }}>Reset sample data</PrimaryButton>

                <NavButton onClick={() => {
                  const dataStr = JSON.stringify(tickets, null, 2);
                  const blob = new Blob([dataStr], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "tickets.json";
                  a.click();
                  URL.revokeObjectURL(url);
                  toast.success("Export started");
                }}>Export</NavButton>
              </QuickActions>
            </Card>
          </div>
        </GridLayout>
      </Container>

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditing(null); }} ariaLabel={editing ? "Edit ticket" : "Create ticket"}>
        <h3 style={{ marginTop: 0 }}>{editing ? "Edit Ticket" : "New Ticket"}</h3>
        <TicketForm
          initial={editing || null}
          onSubmit={(data) => {
            if (editing) onUpdate(editing.id, data);
            else onCreate(data);
            setShowModal(false);
            setEditing(null);
          }}
          onCancel={() => { setShowModal(false); setEditing(null); }}
        />
      </Modal>

      <Modal isOpen={!!confirmDeleteId} onClose={() => setConfirmDeleteId(null)} ariaLabel="Confirm delete">
        <h3 style={{ marginTop: 0 }}>Confirm delete</h3>
        <p>Are you sure you want to delete this ticket? This action cannot be undone.</p>
        <ButtonRow>
          <PrimaryButton onClick={confirmDelete} aria-label="Confirm delete">Yes, delete</PrimaryButton>
          <NavButton onClick={cancelDelete} aria-label="Cancel delete">Cancel</NavButton>
        </ButtonRow>
      </Modal>

      <FooterWrap>{new Date().getFullYear()} Ticketi•fy — © UnSiMplYkells</FooterWrap>
    </PageWrap>
  );
};