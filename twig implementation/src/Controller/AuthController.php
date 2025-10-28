<?php

namespace App\Controller;

use App\Service\TicketService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Replaces LoginPage.jsx and SignupPage.jsx
 */
class AuthController extends BaseController
{
    public function login(Request $request, TicketService $ticketService, RequestStack $requestStack): Response
    {
        // If already logged in, redirect to dashboard
        if ($this->getLoggedInUserEmail($requestStack) !== null) {
            return $this->redirectToRoute('dashboard');
        }

        $error = null;
        $email = '';

        if ($request->isMethod('POST')) {
            $email = $request->request->get('email');
            $password = $request->request->get('password');
            $email = is_string($email) ? trim($email) : '';

            // Replicates logic from LoginPage.jsx handleSubmit
            if (empty($email) || empty($password)) {
                $error = 'Please fill in all fields';
            } elseif (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
                $error = 'Please enter a valid email address';
            } else {
                $user = $ticketService->login($email, $password);
                if ($user) {
                    // Login success! Store email in session.
                    $requestStack->getSession()->set('user_email', $user['email']);
                    $this->addFlash('success', 'Login successful');
                    return $this->redirectToRoute('dashboard');
                } else {
                    $error = 'Invalid email or password';
                }
            }
        }

        // Render the Twig template (replaces React component render)
        return $this->render('auth/login.html.twig', [
            'error_message' => $error,
            'old_email' => $email
        ]);
    }

    public function signup(Request $request, TicketService $ticketService, RequestStack $requestStack): Response
    {
        // If already logged in, redirect to dashboard
        if ($this->getLoggedInUserEmail($requestStack) !== null) {
            return $this->redirectToRoute('dashboard');
        }

        $error = null;
        $email = '';

        if ($request->isMethod('POST')) {
            $email = $request->request->get('email');
            $password = $request->request->get('password');
            $email = is_string($email) ? trim($email) : '';

            // Replicates logic from SignupPage.jsx handleSubmit
            if (empty($email) || empty($password)) {
                $error = 'Please fill in all fields';
            } elseif (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
                $error = 'Please enter a valid email address';
            } elseif (strlen($password) < 6) {
                $error = 'Password must be at least 6 characters';
            } elseif ($ticketService->findUserByEmail($email) !== null) {
                $error = 'Email already exists';
            } else {
                // Signup success!
                $user = $ticketService->signup($email, $password);
                $requestStack->getSession()->set('user_email', $user['email']);
                $this->addFlash('success', 'Account created');
                return $this->redirectToRoute('dashboard');
            }
        }

        return $this->render('auth/signup.html.twig', [
            'error_message' => $error,
            'old_email' => $email
        ]);
    }

    public function logout(RequestStack $requestStack): RedirectResponse
    {
        $requestStack->getSession()->clear();
        return $this->redirectToRoute('index');
    }
}
