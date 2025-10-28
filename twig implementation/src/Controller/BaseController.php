<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * A base controller to share logic, like the auth check
 */
class BaseController extends AbstractController
{
    protected function getLoggedInUserEmail(RequestStack $requestStack): ?string
    {
        return $requestStack->getSession()->get('user_email');
    }

    /**
     * This method REPLACES the <ProtectedRoute> component logic.
     * Call this at the start of any protected controller action.
     */
    protected function checkAuth(RequestStack $requestStack): ?RedirectResponse
    {
        if ($this->getLoggedInUserEmail($requestStack) === null) {
            // Add a "flash" message (replaces toast.error)
            $this->addFlash('error', 'Your session has expired — please log in again.');
            return $this->redirectToRoute('auth_login');
        }
        return null;
    }
}
