<?php

namespace App\Controller;

use App\Service\TicketService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RequestStack;

class MainController extends BaseController
{
    public function landing(): Response
    {
        return $this->render('main/landing.html.twig');
    }

    public function dashboard(TicketService $ticketService, RequestStack $requestStack): Response
    {
        if ($redirect = $this->checkAuth($requestStack)) {
            return $redirect;
        }

        $tickets = $ticketService->getTickets();
        
        $stats = [
            'total' => count($tickets),
            'open' => 0,
            'in_progress' => 0,
            'closed' => 0
        ];

        foreach ($tickets as $ticket) {
            if ($ticket['status'] === 'open') $stats['open']++;
            if ($ticket['status'] === 'in_progress') $stats['in_progress']++;
            if ($ticket['status'] === 'closed') $stats['closed']++;
        }

        return $this->render('main/dashboard.html.twig', [
            'stats' => $stats,
            'recent_tickets' => array_slice($tickets, 0, 5)
        ]);
    }
}
