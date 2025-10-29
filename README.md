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

## Run Locally
```bash
git clone https://github.com/throwAway-sus/HNG-internship.git
cd stage\ 0
open index.html
```

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

## React Live Demo
[Live Site on Netlify](https://kells-hng-stage2-reactimpt.netlify.app/)

**2. Vue.js Implementation (`/vue-app/`)**
    - **Framework:** Vue 3 (Composition API)
    - **Routing:** Vue Router
    - **Styling:** Scoped CSS (or Tailwind)
    - **Notifications:** `vue-toastification`

## Vue Live Demo
[Live Site on Netlify](https://kells-hng-stage2-vueimpt.netlify.app/)

 **3. Twig Implementation (`/twig-app/`)**
    - **Framework:** Symfony
    - **Templating:** Twig
    - **Backend (for rendering):** A minimal **PHP** application (using `composer` for dependencies).
    - **Frontend Logic:** Vanilla JavaScript (for form validation and interactivity)

## TWig Live Demo
[Live Site on Render]()
    

## Run Locally

Follow these instructions to clone the project and run each implementation locally.

### Prerequisites

You will need the following tools installed on your machine:

* **Node.js** (v18 or later) & **npm** / **yarn** (for React and Vue)
* **PHP** (v8.0 or later) (for the Twig version)
* **Composer** (PHP package manager) (for the Twig version)
* **Git**

### Installation

1.  Clone the repository to your local machine:
    ```sh
    git clone https://github.com/throwAway-sus/HNG-internship.git
    cd HNG-internship
    ```
## Running Each Implementation
    
1. if react or vue, navigate to their given folder:
   ```
    cd vue-implementation or cd react-inplementation
    ```
2.  Install the necessary Node.js dependencies:
    ```sh
    npm install
    ```
3.  Start the development server:
    ```sh
    npm run dev
    ```
4.  Open your browser and visit the URL provided in your terminal (usually **`http://localhost:5173`**).

### Running the Twig Version (Locally)

The Twig version requires PHP and Composer to serve the templates.

1.  Navigate to the Twig app directory:
    ```sh
    cd twig-implementation
    ```
2.  Install the PHP dependencies (including Twig) using Composer:
    ```sh
    composer install
    ```
3.  Start the PHP built-in web server.
    ```sh
    php -S localhost:8000 -t public
    ```
4.  Open your browser and visit **`http://localhost:8000`**.
