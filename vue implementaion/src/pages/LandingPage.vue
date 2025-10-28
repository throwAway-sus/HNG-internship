<script setup>
import { clearSession, readSession } from "../utils/session";
import Navbar from "../components/Navbar.vue";
import HeroWave from "../components/HeroWave.vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();
const session = readSession();

const handleLogout = () => {
  clearSession();
  toast.success("Logged out successfully.");
  setTimeout(() => {
    window.location.reload();
  }, 700);
};
</script>

<template>
  <div class="page-wrap">
    <Navbar @logout="handleLogout"/>

    <div class="hero-section">
      <div
    class="circle"
    :style="{
      background: 'rgba(37, 100, 235, 0.6)',
      position: 'absolute',
      borderRadius: '100%',
      width: '220px',
      height: '220px',
      transform: 'translate(-40px, -30px)',
      left: '-60px',
      top: '-20px',
    }"
  ></div>

  <div
    class="circle"
    :style="{
      background: 'rgba(16, 185, 129, 0.6)',
      position: 'absolute',
      borderRadius: '100%',
      width: '140px',
      height: '140px',
      right: '-40px',
      top: '40px',
    }"
  ></div>

  <div
    class="circle"
    :style="{
      background: 'rgba(185, 168, 16, 0.6)',
      position: 'absolute',
      borderRadius: '100%',
      width: '180px',
      height: '180px',
      transform: 'translate(-120px, 60px)',
      right: '-20px',
      top: '40px',
    }"
  ></div>

  <div
    class="circle"
    :style="{
      background: 'rgba(185, 92, 16, 0.6)',
      position: 'absolute',
      borderRadius: '100%',
      width: '100px',
      height: '100px',
      transform: 'translate(-620px, 10px)',
      right: '-20px',
      top: '100px',
    }"
  ></div>

  <div
    class="circle"
    :style="{
      background: 'rgba(185, 16, 109, 0.6)',
      position: 'absolute',
      borderRadius: '100%',
      width: '300px',
      height: '300px',
      transform: 'translate(-320px, 20px)',
      right: '450px',
      top: '130px',
    }"
  ></div>
      

      <main class="container" style="padding-left: 38px; padding-right: 38px">
        <div class="hero-inner">
          <div class="hero-text-block">
            <h1 class="hero-title">Ticketi•fy</h1>
            <p class="hero-description">
              Streamline your support workflow with our simple ticket management system.
              Create, update, and track tickets quickly — built with a react and styled with styled components.
            </p>
            <div v-if="!session" class="hero-buttons">
              <router-link to="/auth/signup">
                <button class="primary-button" aria-label="Create account">Get Started</button>
              </router-link>
              <router-link to="/auth/login">
                <button class="nav-button" aria-label="Login">Login</button>
              </router-link>
            </div>
          </div>

          <div class="stats-card-wrap">
            <section class="card" aria-hidden>
              <h3 class="stats-heading">Quick stats</h3>
              <div class="quick-stats">
                <div class="stats-item">
                  <div class="stat-label">Open</div>
                  <div class="stat-value">3</div>
                </div>
                <div class="stats-item">
                  <div class="stat-label">In Progress</div>
                  <div class="stat-value">1</div>
                </div>
                <div class_name="stats-item">
                  <div class="stat-label">Closed</div>
                  <div class="stat-value">1</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <div class="wave-wrapper">
        <HeroWave />
      </div>
    </div>

    <div class="container" style="padding-left: 0; padding-right: 0">
      <section class="features-section">
        <h2>Features</h2>
        <div class="feature-grid">
          <div class="feature-item">
            <v-icon name="gi-ticket" />
            <div>
              <div class="feature-item-title">Tickets</div>
              <div class="feature-item-desc">Create and manage tickets</div>
            </div>
          </div>
          <div class="feature-item">
            <v-icon name="fa-filter" />
            <div>
              <div class="feature-item-title">Filters</div>
              <div class="feature-item-desc">Search & filter tickets</div>
            </div>
          </div>
          <div class="feature-item">
            <v-icon name="fa-highlighter" />
            <div>
              <div class="feature-item-title">Light UI</div>
              <div class="feature-item-desc">Clean SaaS card UI</div>
            </div>
          </div>
          <div class="feature-item">
            <v-icon name="md-moneyoff" />
            <div>
              <div class="feature-item-title">Free</div>
              <div class="feature-item-desc">No recurring payments</div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer-wrap">
      {{ new Date().getFullYear() }} Ticketi•fy — © UnSiMplYkells
    </footer>
  </div>
</template>

<style scoped>
.hero-section {
  position: relative;
  overflow: hidden;
  padding-bottom: 40px;
}
.hero-inner {
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 40px 0;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
}
.hero-text-block {
  flex: 1 1 480px;
}
.hero-title {
  margin: 0;
  font-size: 36px;
  color: #0f172a;
}
.hero-description {
  color: #6b7280;
  max-width: 680px;
}
.hero-buttons {
  margin-top: 16px;
  display: flex;
  gap: 12px;
}
.stats-card-wrap {
  flex: 0 1 380px;
  margin-right: 70px;
  text-align: center;
}
@media (max-width: 1025px) {
  .stats-card-wrap {
    margin: auto;
    flex: 0 1 480px;
    padding-top: 20px;
  }
}
.stats-heading {
  margin-top: 0;
}
.quick-stats {
  display: flex;
  gap: 12px;
}
.stats-item {
  flex: 1;
}
.stat-label {
  font-size: 12px;
  color: #6b7280;
}
.stat-value {
  font-weight: 700;
  font-size: 20px;
}
.features-section {
  margin: 40px 0px;
  padding: 12px 30px;
}
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  gap: 12px;
}
.feature-item {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 15px;
  background-color: #ebe5ddff;
}
.feature-item svg {
  width: 25px;
  height: auto;
  aspect-ratio: 1;
}
.feature-item-title {
  font-weight: 700;
}
.feature-item-desc {
  color: #6b7280;
  font-size: 13px;
}
.wave-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
@media (min-width: 1025px) {
  .wave-wrapper {
    bottom: -25px;
  }
}
@media (min-width: 1500px) {
  .wave-wrapper {
    bottom: -100px;
  }
}
</style>