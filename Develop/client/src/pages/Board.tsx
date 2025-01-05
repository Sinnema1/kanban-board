import { useEffect, useState, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { retrieveTickets, deleteTicket } from "../api/ticketAPI";
import ErrorPage from "./ErrorPage";
import Swimlane from "../components/Swimlane";
import { TicketData } from "../interfaces/TicketData";
import { ApiMessage } from "../interfaces/ApiMessage";

import auth from "../utils/auth";

const boardStates = ["Todo", "In Progress", "Done"];

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState<boolean | null>(null); // Null for initial state
  const [sortBy, setSortBy] = useState<string>("name");
  const [filterBy, setFilterBy] = useState<string>("all");

  const navigate = useNavigate();

  const checkLogin = () => {
    const isLoggedIn = auth.loggedIn();
    console.log(`User is logged in: ${isLoggedIn}`);
    setLoginCheck(isLoggedIn);
  };

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      console.log("Fetched Tickets:", data);
      setTickets(data);
    } catch (err) {
      console.error("Failed to retrieve tickets:", err);
      setError(true);
    }
  };

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      console.log(`Deleted ticket with ID ${ticketId}:`, data);
      fetchTickets();
      return data;
    } catch (err) {
      console.error("Failed to delete ticket:", err);
      return Promise.reject(err);
    }
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (loginCheck === false) {
      console.log("User not logged in, redirecting...");
      navigate("/login");
    } else if (loginCheck === true) {
      fetchTickets();
    }
  }, [loginCheck, navigate]);

  useEffect(() => {
    if (tickets.length === 0) return;

    console.log("Recalculating filtered and sorted tickets");
    const filtered = tickets.filter((ticket) => {
      if (filterBy === "all") return true;
      return ticket.assignedUser?.username === filterBy;
    });

    console.log("Filtered Tickets:", filtered);

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        const nameA = a.name ?? "";
        const nameB = b.name ?? "";
        return nameA.localeCompare(nameB);
      } else if (sortBy === "status") {
        const statusA = a.status ?? "";
        const statusB = b.status ?? "";
        return boardStates.indexOf(statusA) - boardStates.indexOf(statusB);
      }
      return 0;
    });

    console.log("Filtered and Sorted Tickets:", sorted);
    setFilteredTickets(sorted);
  }, [tickets, sortBy, filterBy]);

  if (error) {
    return <ErrorPage />;
  }

  if (loginCheck === null) {
    console.log("Waiting for login evaluation...");
    return (
      <div className="board-loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (loginCheck === false) {
    console.log("User not logged in, redirecting...");
    return (
      <div className="board-loading">
        <h1>Redirecting to Login...</h1>
      </div>
    );
  }

  if (tickets.length === 0) {
    console.log("Waiting for tickets to load...");
    return (
      <div className="board-loading">
        <h1>Loading Tickets...</h1>
      </div>
    );
  }

  return (
    <div className="board">
      <div className="board-controls">
        <button type="button" id="create-ticket-link">
          <Link to="/create">New Ticket</Link>
        </button>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="status">Sort by Status</option>
        </select>
        <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
          <option value="all">All Tickets</option>
          <option value="RadiantComet">Assigned to RadiantComet</option>
          <option value="SunnyScribe">Assigned to SunnyScribe</option>
        </select>
      </div>
      <div className="board-display">
        {boardStates.map((status) => {
          const swimlaneTickets = filteredTickets.filter(
            (ticket) => ticket.status === status
          );
          console.log(`Rendering Swimlane (${status}):`, swimlaneTickets);

          return (
            <Swimlane
              title={status}
              key={status}
              tickets={swimlaneTickets}
              deleteTicket={deleteIndvTicket}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;