<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTicketStore } from '../composables/useTicketStore';
import Navbar from '../components/Navbar.vue';
import TicketList from '../components/TicketList.vue';
import { clearSession } from '../utils/session';

const { tickets } = useTicketStore();
const router = useRouter();

const open = computed(() => tickets.value.filter((t) => t.status === "open").length);
const inProgress = computed(() => tickets.value.filter((t) => t.status === "in_progress").length);
const closed = computed(() => tickets.value.filter((t) => t.status === "closed").length);

const handleLogout = () => {
  clearSession();
  router.replace("/");
};
</script>

<template>
  <div class="page-wrap">
    <Navbar @logout="handleLogout" />
    <main class="container">
      <div class="top-grid-wrapper">
        <div class="grid-3">
          <section class="card">
            <div class="ticket-card-content">
              <div class="ticket-count" style="background-color: #ecfdf5">{{ tickets.length }}</div>
              <div class="ticket-info">
                <div class="ticket-label">Total Tickets</div>
                <div class="ticket-number">{{ tickets.length }}</div>
              </div>
            </div>
          </section>

          <section class="card">
            <div class="ticket-card-content">
              <div class="ticket-count" style="background-color: #fff7ed">{{ open }}</div>
              <div class="ticket-info">
                <div class="ticket-label">Open</div>
                <div class="ticket-number">{{ open }}</div>
              </div>
            </div>
          </section>

          <section class="card">
            <div class="ticket-card-content">
              <div class="ticket-count" style="background-color: #f1f5f9">{{ closed }}</div>
              <div class="ticket-info">
                <div class="ticket-label">Resolved</div>
                <div class="ticket-number">{{ closed }}</div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div class="section-wrapper">
        <section class="card">
          <h3 class="section-title">Recent Tickets</h3>
          <TicketList :tickets="tickets.slice(0, 5)" />
        </section>
      </div>
    </main>

    <footer class="footer-wrap">{{ new Date().getFullYear() }} Ticketi•fy — © UnSiMplYkells</footer>
  </div>
</template>

<style scoped>
.top-grid-wrapper {
  margin-top: 20px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
}
@media (min-width: 768px) {
  .grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

.ticket-card-content {
  display: flex;
  gap: 12px;
  align-items: center;
}

.ticket-count {
  font-size: 22px;
  padding: 8px;
  border-radius: 8px;
  background-color: #f1f5f9;
}

.ticket-info {
}

.ticket-label {
  font-size: 12px;
  color: #6b7280;
}

.ticket-number {
  font-weight: 700;
  font-size: 18px;
}

.section-wrapper {
  margin-top: 24px;
}

.section-title {
  margin-top: 0;
}
</style>