<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { readSession } from '../utils/session';
import { theme } from '../styles/theme';

const props = defineProps({
  onLogout: Function,
});
const emit = defineEmits(['logout']);

const mobileOpen = ref(false);
const session = readSession();

const handleLogout = () => {
  setMobileOpen(false);
  emit('logout');
  if (props.onLogout) {
    props.onLogout();
  }
};

const setMobileOpen = (value) => {
  mobileOpen.value = value;
};
</script>

<template>
  <nav class="nav" role="navigation" aria-label="Main navigation">
    <div class="nav-inner">
      <div class="brand-container">
        <div class="brand">Ticketi•fy</div>
        <div style="display: none" class="sr-only" aria-hidden></div>
      </div>

      <div class="nav-container">
        <button
          class="hamburger"
          aria-label="Toggle menu"
          :aria-expanded="mobileOpen"
          @click="setMobileOpen(!mobileOpen)"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 6h16M4 12h16M4 18h16"
              :stroke="theme.colors.text"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>

        <div class="nav-links" :class="{ 'mobile-open': mobileOpen }">
          <router-link to="/" class="styled-nav-link" @click="setMobileOpen(false)">Home</router-link>
          <template v-if="session">
            <router-link to="/dashboard" class="styled-nav-link" @click="setMobileOpen(false)">Dashboard</router-link>
            <router-link to="/tickets" class="styled-nav-link" @click="setMobileOpen(false)">Tickets</router-link>
            <button class="styled-nav-link logout-button" @click="handleLogout">
              Logout
            </button>
          </template>
          <template v-else>
            <router-link to="/auth/login" class="styled-nav-link" @click="setMobileOpen(false)">Login</router-link>
            <router-link to="/auth/signup" class="styled-nav-link" @click="setMobileOpen(false)">Sign up</router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  background: var(--color-surface, #ffffff);
  box-shadow: 0 1px 4px var(--color-cardShadow, rgba(16, 24, 40, 0.06));
  position: sticky;
  top: 0;
  z-index: 40;
  width: 100%;
  height: 40px;
}
.nav-inner {
  width: inherit;
  height: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand {
  font-weight: 700;
  color: var(--color-primary, #2563eb);
  font-size: 18px;
}
.hamburger {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
}
@media (max-width: 720px) {
  .hamburger {
    display: inline-flex;
  }
}
.brand-container {
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 20px;
}
.nav-container {
  height: 100%;
  display: flex;
  align-items: center;
}
@media (min-width: 720px) {
  .nav-container {
    width: 30%;
  }
}
.nav-links {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
@media (min-width: 720px) {
  .nav-links {
    width: 100%;
    height: inherit;
  }
}
@media (max-width: 720px) {
  .nav-links {
    width: 120px;
    display: none;
    flex-direction: column;
    position: absolute;
    right: 0;
    top: 40px;
    background: var(--color-surface, #ffffff);
    box-shadow: 0 6px 18px var(--color-cardShadow, rgba(16, 24, 40, 0.06));
  }
  .nav-links.mobile-open {
    display: flex;
  }
}
.styled-nav-link {
  width: inherit;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  font-weight: 500;
  transition: background-color 0.2s ease;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  color: var(--color-text);
  text-decoration: none;
}
.styled-nav-link.active {
  background-color: var(--color-primary-dark, #1e40af);
  color: white;
}
.styled-nav-link:hover {
  background-color: var(--color-primary, #2563eb);
  color: white;
}
@media (max-width: 720px) {
  .styled-nav-link {
    padding: 8px 0;
  }
}
.logout-button {
  background-color: black;
  color: white;
}
.logout-button:hover,
.logout-button.active {
  background-color: black;
  color: white;
}
</style>