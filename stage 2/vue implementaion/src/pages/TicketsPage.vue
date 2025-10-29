<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useTicketStore, initialTickets } from "../composables/useTicketStore";
import { writeLS, LS_TICKETS } from "../utils/localStorage";
import { clearSession } from "../utils/session";
import Navbar from "../components/Navbar.vue";
import Modal from "../components/Modal.vue"; 
import TicketForm from "../components/TicketForm.vue";
import TicketList from "../components/TicketList.vue";

const toast = useToast();
const { tickets, createTicket, updateTicket, deleteTicket } = useTicketStore();
const router = useRouter();

const editing = ref(null);
const showModal = ref(false);
const query = ref("");
const filterStatus = ref("all");
const confirmDeleteId = ref(null);

const onCreate = (payload) => {
    createTicket(payload);
    toast.success("Ticket created!");
};
const onUpdate = (id, payload) => {
    updateTicket(id, payload);
    toast.success("Ticket updated!");
};
const requestDelete = (id) => confirmDeleteId.value = id;
const cancelDelete = () => confirmDeleteId.value = null;
const confirmDelete = () => {
  if (confirmDeleteId.value) {
    deleteTicket(confirmDeleteId.value);
    confirmDeleteId.value = null;
    toast.success("Ticket deleted.");
  }
};

const logoutAndNavigate = () => {
    clearSession();
    router.replace("/");
    toast.success("Logged out successfully.");
};

const filtered = computed(() => {
  let list = tickets.value;
  if (filterStatus.value !== "all") {
    list = list.filter((t) => t.status === filterStatus.value);
  }
  if (query.value.trim()) {
    const q = query.value.trim().toLowerCase();
    list = list.filter(
      (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
  }
  return list;
});

const openEditModal = (ticket) => {
    editing.value = ticket;
    showModal.value = true;
};

const handleModalFormSubmit = (data) => {
    if (editing.value) {
        onUpdate(editing.value.id, data);
    } else {
        onCreate(data);
    }
    showModal.value = false;
    editing.value = null;
};

const handleModalCancel = () => {
    showModal.value = false;
    editing.value = null;
};

const resetSampleData = () => {
    if (window.confirm("Reset tickets to demo data?")) {
        writeLS(LS_TICKETS, initialTickets);
        window.location.reload();
    }
};

const exportTickets = () => {
    const dataStr = JSON.stringify(tickets.value, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tickets.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Export started");
};

</script>

<template>
  <div class="page-wrap">
    <Navbar @logout="logoutAndNavigate" />
    <div class="container">
      <div class="page-header">
        <div class="header-info">
          <h1>{{ editing ? "Edit Ticket" : "Tickets" }}</h1>
          <p>{{ editing ? "Editing mode" : "Create and manage tickets" }}</p>
        </div>
        <div class="search-filter-group">
          <input
            class="search-input input"
            aria-label="Search tickets"
            placeholder="Search tickets..."
            v-model="query"
          />
          <select class="status-select select" aria-label="Filter status" v-model="filterStatus">
            <option value="all">All statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <button class="primary-button" @click="() => { editing = null; showModal = true; }" aria-label="Create new ticket">New Ticket</button>
        </div>
      </div>

      <div class="grid-layout">
        <div>
          <section class="card">
            <h3 style="margin-top: 0">All Tickets</h3>
            <TicketList
              :tickets="filtered"
              :onEdit="openEditModal"
              :onDelete="requestDelete"
              :onOpen="(id) => router.push(`/tickets/${id}`)"
            />
          </section>
        </div>

        <div>
          <section class="card">
            <h3 style="margin-top: 0">{{ editing ? "Edit Ticket" : "Create Ticket" }}</h3>
            <TicketForm
              :initial="editing"
              :onSubmit="(data) => {
                  if (editing) onUpdate(editing.id, data);
                  else onCreate(data);
                  editing = null;
              }"
              :onCancel="() => editing = null"
            />
          </section>

          <div class="spacer"></div>

          <section class="card">
            <h4 style="margin-top: 0">Quick Actions</h4>
            <div class="quick-actions">
              <button class="primary-button" @click="resetSampleData">Reset sample data</button>
              <button class="nav-button" @click="exportTickets">Export</button>
            </div>
          </section>
        </div>
      </div>
    </div>

    <Modal :is-open="showModal" @close="handleModalCancel" :aria-label="editing ? 'Edit ticket' : 'Create ticket'">
      <h3 style="margin-top: 0">{{ editing ? "Edit Ticket" : "New Ticket" }}</h3>
      <TicketForm
        :initial="editing"
        :onSubmit="handleModalFormSubmit"
        :onCancel="handleModalCancel"
      />
    </Modal>

    <Modal :is-open="!!confirmDeleteId" @close="cancelDelete" aria-label="Confirm delete">
      <h3 style="margin-top: 0">Confirm delete</h3>
      <p>Are you sure you want to delete this ticket? This action cannot be undone.</p>
      <div class="button-row">
        <button class="primary-button" @click="confirmDelete" aria-label="Confirm delete">Yes, delete</button>
        <button class="nav-button" @click="cancelDelete" aria-label="Cancel delete">Cancel</button>
      </div>
    </Modal>

    <footer class="footer-wrap">{{ new Date().getFullYear() }} Ticketi•fy — © UnSiMplYkells</footer>
  </div>
</template>

<style scoped>

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

.header-info h1 {
  margin: 0;
  font-size: 20px;
  color: var(--color-text);
}
.header-info p {
  margin: 6px 0 0;
  color: var(--color-mutted);
  font-size: 14px;
}

.search-filter-group {
  display: flex;
  gap: 8px;
}

@media (max-width: 768px) {
  .search-filter-group {
    flex-wrap: wrap;
    width: 100%;
  }
}

.search-input {
  width: 220px;
}

@media (max-width: 768px) {
  .search-input {
    width: 100%;
  }
}

.status-select {
  width: 160px;
}

@media (max-width: 768px) {
  .status-select {
    width: 100%;
  }
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 16px;
  margin-top: 18px;
}

@media (max-width: 1024px) {
  .grid-layout {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }
}

.quick-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.spacer {
  height: 12px;
}

.button-row {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

@media (max-width: 480px) {
  .button-row {
    flex-direction: column;
  }
}
</style>