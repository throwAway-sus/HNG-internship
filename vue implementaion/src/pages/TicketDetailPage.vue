<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { useTicketStore } from '../composables/useTicketStore';
import Navbar from '../components/Navbar.vue';
import EmptyState from '../components/EmptyState.vue';
import { clearSession } from "../utils/session";

const toast = useToast();
const route = useRoute();
const router = useRouter();
const { tickets, updateTicket } = useTicketStore();

const ticket = computed(() => {
  return tickets.value.find((t) => String(t.id) === String(route.params.id));
});

const badgeClass = computed(() => {
  if (!ticket.value) return '';
  return {
    'badge-open': ticket.value.status === 'open',
    'badge-in_progress': ticket.value.status === 'in_progress',
    'badge-closed': ticket.value.status === 'closed',
  };
});

const handleStatusChange = (event) => {
  if (ticket.value) {
    updateTicket(ticket.value.id, { status: event.target.value });
  }
};

const handleLogout = () => {
  clearSession();
  router.replace("/");
  toast.success("Logged out successfully.");
};
</script>

<template>
  <div class="page-wrap">
    <Navbar @logout="handleLogout"/>
    <main class="container">
      <template v-if="!ticket">
        <EmptyState>Ticket not found</EmptyState>
      </template>
      <template v-else>
        <section class="card">
          <div class="header-row">
            <div class="header-info">
              <h2>{{ ticket.title }}</h2>
              <p>{{ ticket.description }}</p>
            </div>
            <div class="status-section">
              <div class="badge" :class="badgeClass">
                {{ ticket.status === "open" ? "Open" : ticket.status === "in_progress" ? "In Progress" : "Closed" }}
              </div>
              <div>
                <select class="select" :value="ticket.status" @change="handleStatusChange">
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <div>
              <div class="label">Priority</div>
              <div class="value">{{ ticket.priority }}</div>
            </div>

            <div>
              <div class="label">Created</div>
              <div class="value">{{ new Date(ticket.createdAt || Date.now()).toLocaleString() }}</div>
            </div>
          </div>

          <div class="back-button-wrapper">
            <button class="primary-button" @click="router.go(-1)">Back</button>
          </div>
        </section>
      </template>
    </main>
    <footer class="footer-wrap"></footer>
  </div>
</template>

<style scoped>
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
@media (max-width: 768px) {
  .header-row {
    flex-direction: column;
    gap: 12px;
  }
}

.header-info h2 {
  margin: 0;
}
.header-info p {
  margin: 4px 0 0;
  color: #6b7280;
  font-size: 14px;
}

.status-section {
  text-align: right;
}
.status-section > div {
  margin-top: 10px;
}
@media (max-width: 768px) {
  .status-section {
    text-align: left;
  }
}

.detail-section {
  margin-top: 18px;
}
.detail-section > div {
  margin-top: 12px;
}
.detail-section > div:first-child {
  margin-top: 0;
}

.label {
  font-weight: 700;
}

.value {
  margin-top: 6px;
}

.back-button-wrapper {
  margin-top: 18px;
}
</style>