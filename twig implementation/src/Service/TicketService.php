<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\RequestStack;

class TicketService
{
    private const TICKETS_KEY = 'ticketflow_tickets_v1';

    private string $usersFile;
    private $session;

    public function __construct(RequestStack $requestStack)
    {
        $this->session = $requestStack->getSession();
        $this->usersFile = __DIR__ . '/../../var/users.json';

        if (!file_exists($this->usersFile)) {
            file_put_contents($this->usersFile, json_encode([]));
        }

        $this->initTickets();
    }

    /* ==============================
       USER STORAGE (JSON FILE)
       ============================== */

    private function loadUsers(): array
    {
        return json_decode(file_get_contents($this->usersFile), true) ?? [];
    }

    private function saveUsers(array $users): void
    {
        file_put_contents($this->usersFile, json_encode($users, JSON_PRETTY_PRINT));
    }

    public function findUserByEmail(string $email): ?array
    {
        foreach ($this->loadUsers() as $user) {
            if ($user['email'] === $email) {
                return $user;
            }
        }
        return null;
    }

    public function signup(string $email, string $password): ?array
    {
        $users = $this->loadUsers();

        foreach ($users as $user) {
            if ($user['email'] === $email) {
                return null; // duplicate
            }
        }

        $newUser = [
            'id' => time(),
            'email' => $email,
            'password' => password_hash($password, PASSWORD_DEFAULT)
        ];

        $users[] = $newUser;
        $this->saveUsers($users);
        $this->session->set('user_email', $email);

        return $newUser;
    }

    public function login(string $email, string $password): ?array
    {
        $users = $this->loadUsers();
        foreach ($users as $user) {
            if ($user['email'] === $email && password_verify($password, $user['password'])) {
                $this->session->set('user_email', $email);
                return $user;
            }
        }
        return null;
    }

    public function clearSession(): void
    {
        $this->session->remove('user_email');
    }

    public function readSession(): ?string
    {
        return $this->session->get('user_email');
    }

    public function isAuthenticated(): bool
    {
        return $this->readSession() !== null;
    }


    /* ==============================
       TICKET STORAGE (SESSION)
       ============================== */

    private function initTickets(): void
    {
        if ($this->session->get(self::TICKETS_KEY) !== null) {
            return;
        }

        $now = time();

        $demoTickets = [
            [
                'id' => 1,
                'title' => 'Login issue',
                'description' => 'Users cannot login',
                'status' => 'open',
                'priority' => 'high',
                'createdAt' => $now - 86400,
            ]
        ];

        $this->session->set(self::TICKETS_KEY, $demoTickets);
    }

    public function getTickets(): array
    {
        return $this->session->get(self::TICKETS_KEY, []);
    }

    public function findTicketById(int $id): ?array
    {
        foreach ($this->getTickets() as $ticket) {
            if ($ticket['id'] == $id) {
                return $ticket;
            }
        }
        return null;
    }

    public function createTicket(string $title, string $description, string $status, string $priority): array
    {
        $tickets = $this->getTickets();
        $newTicket = [
            'id' => time(),
            'title' => $title,
            'description' => $description,
            'status' => $status,
            'priority' => $priority,
            'createdAt' => time()
        ];

        array_unshift($tickets, $newTicket);
        $this->session->set(self::TICKETS_KEY, $tickets);

        return $newTicket;
    }

    public function updateTicket(int $id, array $payload): bool
    {
        $tickets = $this->getTickets();

        foreach ($tickets as $key => $ticket) {
            if ($ticket['id'] == $id) {
                $tickets[$key] = array_merge($ticket, $payload);
                $this->session->set(self::TICKETS_KEY, $tickets);
                return true;
            }
        }

        return false;
    }

    public function deleteTicket(int $id): bool
    {
        $tickets = $this->getTickets();
        $filtered = array_filter($tickets, fn($t) => $t['id'] != $id);

        if (count($filtered) === count($tickets)) {
            return false; // not found
        }

        $this->session->set(self::TICKETS_KEY, array_values($filtered));
        return true;
    }
}
