import { useState, useEffect } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import TrainerSelector from "../components/controls/TrainerSelector";
import ClientList from "../components/clients/ClientList";
import WeekSelector from "../components/controls/WeekSelector";
import CalendarGrid from "../components/calendar/CalendarGrid";

function Home() {
  const [selectedTrainer, setSelectedTrainer] = useState("Ramses");

  const [clients, setClients] = useState(() => {
    const savedClients = localStorage.getItem("clients");

    return savedClients
      ? JSON.parse(savedClients)
      : {
          Ramses: [],
          Miguel: [],
        };
  });

  const [selectedWeek, setSelectedWeek] = useState(() => {
    const savedWeek = localStorage.getItem("selectedWeek");

    return savedWeek || "";
  });

  const [sessions, setSessions] = useState(() => {
    const savedSessions = localStorage.getItem("sessions");

    return savedSessions
      ? JSON.parse(savedSessions)
      : {
          Ramses: [],
          Miguel: [],
        };
  });

  const [blockedCells, setBlockedCells] = useState(() => {
    const savedBlockedCells = localStorage.getItem("blockedCells");

    return savedBlockedCells
      ? JSON.parse(savedBlockedCells)
      : {
          Ramses: [],
          Miguel: [],
        };
  });

  const [selectedCell, setSelectedCell] = useState(null);

  // =========================
  // GUARDAMOS CLIENTES
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "clients",

      JSON.stringify(clients),
    );
  }, [clients]);

  // =========================
  // GUARDAMOS SESIONES
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "sessions",

      JSON.stringify(sessions),
    );
  }, [sessions]);

  // =========================
  // GUARDAMOS CASILLAS ROJAS
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "blockedCells",

      JSON.stringify(blockedCells),
    );
  }, [blockedCells]);

  // =========================
  // GUARDAMOS SEMANA
  // =========================

  useEffect(() => {
    localStorage.setItem("selectedWeek", selectedWeek);
  }, [selectedWeek]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <section className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
        <TrainerSelector
          selectedTrainer={selectedTrainer}
          setSelectedTrainer={setSelectedTrainer}
        />

        <WeekSelector
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
        />

        <ClientList
          selectedTrainer={selectedTrainer}
          clients={clients}
          setClients={setClients}
        />

        <CalendarGrid
          selectedTrainer={selectedTrainer}
          clients={clients}
          sessions={sessions}
          setSessions={setSessions}
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
          blockedCells={blockedCells}
          setBlockedCells={setBlockedCells}
        />
      </section>
      <Footer />
    </main>
  );
}

export default Home;
