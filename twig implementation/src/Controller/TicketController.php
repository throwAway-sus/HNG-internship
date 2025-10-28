<?php

namespace App\Controller;

use App\Service\TicketService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\RedirectResponse;

class TicketController extends BaseController
{
    public function list(Request $request, TicketService $ticketService, RequestStack $requestStack): Response
    {
        if ($redirect = $this->checkAuth($requestStack)) {
            return $redirect;
        }

        // Save last tickets listing page for returning later
        $session = $request->getSession();
        $session->set('last_tickets_page', $request->getRequestUri());

        $allTickets = $ticketService->getTickets();
        $query = $request->query->get('q', '');
        $status = $request->query->get('status', 'all');

        $filteredTickets = array_filter($allTickets, function($ticket) use ($query, $status) {
            $statusMatch = ($status === 'all' || $ticket['status'] === $status);

            $queryMatch = true;
            if (!empty($query)) {
                $q = strtolower($query);
                $queryMatch = str_contains(strtolower($ticket['title']), $q) || 
                              str_contains(strtolower($ticket['description']), $q);
            }

            return $statusMatch && $queryMatch;
        });

        return $this->render('ticket/list.html.twig', [
            'tickets' => $filteredTickets,
            'current_query' => $query,
            'current_status' => $status,
        ]);
    }

    public function detail(int $id, TicketService $ticketService, RequestStack $requestStack): Response
    {
        if ($redirect = $this->checkAuth($requestStack)) {
            return $redirect;
        }

        $ticket = $ticketService->findTicketById($id);
        if (!$ticket) {
            $this->addFlash('error', 'Ticket not found.');
            return $this->redirectToRoute('ticket_list');
        }

        return $this->render('ticket/detail.html.twig', [
            'ticket' => $ticket
        ]);
    }

    public function create(Request $request, TicketService $ticketService, RequestStack $requestStack): RedirectResponse
    {
        if ($redirect = $this->checkAuth($requestStack)) {
            return $redirect;
        }

        $title = trim($request->request->get('title', ''));
        $description = trim($request->request->get('description', ''));
        $status = $request->request->get('status', 'open');
        $priority = $request->request->get('priority', 'medium');

        if (empty($title) || empty($description)) {
            $this->addFlash('error', 'Title and Description are required.');
        } else {
            $ticketService->createTicket($title, $description, $status, $priority);
            $this->addFlash('success', 'Ticket created');
        }

        return $this->redirectToRoute('ticket_list');
    }

    public function updateStatus(int $id, Request $request, TicketService $ticketService, RequestStack $requestStack): RedirectResponse
    {
        if ($redirect = $this->checkAuth($requestStack)) {
            return $redirect;
        }
        
        $status = $request->request->get('status');
        if (in_array($status, ['open', 'in_progress', 'closed'])) {
            $ticketService->updateTicket($id, ['status' => $status]);
            $this->addFlash('success', 'Ticket status updated');
        } else {
            $this->addFlash('error', 'Invalid status');
        }

        return $this->redirectToRoute('ticket_detail', ['id' => $id]);
    }

    public function delete(int $id, TicketService $ticketService, RequestStack $requestStack): RedirectResponse
    {
        if ($redirect = $this->checkAuth($requestStack)) {
            return $redirect;
        }

        $ticketService->deleteTicket($id);
        $this->addFlash('success', 'Ticket deleted');

        return $this->redirectToRoute('ticket_list');
    }

    public function edit(int $id, TicketService $ticketService, RequestStack $requestStack): Response
    {
        if ($redirect = $this->checkAuth($requestStack)) {
            return $redirect;
        }

        $ticket = $ticketService->findTicketById($id);
        if (!$ticket) {
            $this->addFlash('error', 'Ticket not found.');
            return $this->redirectToRoute('ticket_list');
        }

        return $this->render('ticket/edit.html.twig', [
            'ticket' => $ticket
        ]);
    }

    public function update(int $id, Request $request, TicketService $ticketService, RequestStack $requestStack): RedirectResponse
    {
        if ($redirect = $this->checkAuth($requestStack)) {
            return $redirect;
        }

        $payload = [
            'title' => $request->request->get('title'),
            'description' => $request->request->get('description'),
            'priority' => $request->request->get('priority'),
            'status' => $request->request->get('status'),
        ];

        $ticketService->updateTicket($id, $payload);
        $this->addFlash('success', 'Ticket updated.');

        return $this->redirectToRoute('ticket_detail', ['id' => $id]);
    }
}
