<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  tickets: {
    type: Array,
    default: () => [],
  },
  onEdit: Function,
  onDelete: Function,
  onOpen: Function,
});

const getBadgeClass = computed(() => (status) => {
  return {
    'badge-open': status === 'open',
    'badge-in_progress': status === 'in_progress',
    'badge-closed': status === 'closed',
  };
});
</script>

<template>
  <p v-if="!tickets || tickets.length === 0">No tickets yet</p>
  <ul v-else class="list-wrapper">
    <li v-for="ticket in tickets" :key="ticket.id" class="list-item">
      <div class="item-left">
        <div class="avatar" aria-hidden>{{ ticket.title.charAt(0) }}</div>
        <div>
          <div style="font-weight: 700">{{ ticket.title }}</div>
          <div class="small">{{ ticket.description }}</div>
        </div>
      </div>

      <div class="item-right">
        <div class="badge" :class="getBadgeClass(ticket.status)" role="status" :aria-label="`status ${ticket.status}`">
          {{ ticket.status === "open" ? "Open" : ticket.status === "in_progress" ? "In Progress" : "Closed" }}
        </div>
        <div class="small">{{ ticket.priority }}</div>
        <div class="actions-group">
          <button v-if="onOpen" class="inline-link" :aria-label="`View ${ticket.title}`" @click="onOpen(ticket.id)">View</button>
          <button v-if="onEdit" class="inline-link" :aria-label="`Edit ${ticket.title}`" @click="onEdit(ticket)">Edit</button>
          <button v-if="onDelete" class="inline-link" :aria-label="`Delete ${ticket.title}`" @click="onDelete(ticket.id)" style="color: var(--color-danger)">Delete</button>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.list-wrapper {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 14px;
  border-bottom: 1px solid #f1f5f9;
  align-items: center;
}

@media (max-width: 600px) {
  .list-item {
    flex-direction: column;
    align-items: flex-start;
  }
}

.item-left {
  display: flex;
  gap: 12px;
  align-items: center;
}

@media (max-width: 600px) {
  .item-left {
    margin-bottom: 8px;
  }
}

.item-right {
  display: flex;
  gap: 8px;
  align-items: center;
}

@media (max-width: 600px) {
  .item-right {
    flex-wrap: wrap;
  }
}

.actions-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>