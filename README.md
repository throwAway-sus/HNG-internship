# HNG-internship

    STAGE 0
     
# Kells accessible Profile Card

A responsive, semantic HTML/CSS/JS profile card built with accessibility and testability in mind.

## Features
- Semantic HTML structure
- Fully responsive layout
- Accessible navigation
- Real-time display of `Date.now()` in milliseconds
- All required `data-testid` attributes for automated testing

      STAGE 1

# Kells Multi-Page Accessible Profile App

An extended version of the Stage 0 Profile Card, built as an accessible, responsive single-page application (SPA).
This stage introduces internal page navigation (Profile, About, Contact) without page reloads, preserving accessibility, responsiveness, and testability across all sections.

## New Features Added
- Internal Multi-Page Navigation (SPA): Seamlessly switch between Profile, About, and Contact sections without reloading the page.
- Optimized Load Performance: Minimal inline styling and optimized assets for faster page rendering.

## Live Demo
[Live Site on Netlify](https://kells-hng-stage1.netlify.app/)

     STAGE 2

# Ticket Management Web App

This repository contains three separate, complete frontend implementations (React, Vue.js, and Twig) of a robust ticket management web application.

The primary goal of this project is to demonstrate mastery in structuring frontend applications, state management, form logic, and UI design by building the exact same application with three distinct technologies. All versions adhere to a strict set of requirements, including a uniform layout, design language, and user experience.

## Core Features

- **Multi-Framework Implementation:** The same UI/UX built three times from scratch using:
    - **React.js**
    - **Vue.js**
    - **Twig** (with a minimal PHP backend for rendering)
- **Welcoming Landing Page:** A visually appealing hero section featuring a distinctive wavy SVG background, decorative circles, and clear "Login" / "Get Started" calls-to-action.
- **Secure Authentication:** A complete Login and Signup flow with client-side validation, toast/snackbar notifications, and simulated session management using `localStorage` (react and vue).
- **Protected Routes:** The Dashboard and Ticket Management pages are secured. Unauthorized users are automatically redirected to the login page.
- **High-Level Dashboard:** Displays key summary statistics and provides clear navigation.
- **Full CRUD Functionality:** A complete ticket management screen to Create, Read, Update, and Delete tickets.
- **Robust Validation:** Enforces mandatory fields and strict value rules.
- **Clear User Feedback:** Provides inline error messages and toast notifications for all form actions, API errors, and authentication status changes.
- **Consistent & Responsive Design:** The UI is fully responsive and adheres to a strict design guide (1440px max-width, consistent colors, shadows, and layout) across all three versions.

## 🛠 Tech Stack

 **1. React Implementation (`/react-app/`)**
    - **Framework:** React 18
    - **Routing:** React Router DOM
    - **State Management:** React Context and Zustand
    - **Styling:** Styled-Components
    - **Notifications:** `react-hot-toast`
    - **[Live Site on Netlify](https://kells-hng-stage1.netlify.app/](https://kells-hng-stage2-reactimpt.netlify.app/))**

**2. Vue.js Implementation (`/vue-app/`)**
    - **Framework:** Vue 3 (Composition API)
    - **Routing:** Vue Router
    - **Styling:** Scoped CSS (or Tailwind)
    - **Notifications:** `vue-toastification`
    - **[Live Site on Netlify](https://kells-hng-stage1.netlify.app/](https://kells-hng-stage2-vueimpt.netlify.app/))**

 **3. Twig Implementation (`/twig-app/`)**
    - **Framework:** Symphony
    - **Templating:** Twig
    - **Backend (for rendering):** A minimal **PHP** application (using `composer` for dependencies).
    - **Frontend Logic:** Vanilla JavaScript (for form validation and interactivity)
    - **[Live Site on Render]()**
    



## Run Locally
```bash
git clone https://github.com/throwAway-sus/profile-card.git
cd profile-card
open index.html

