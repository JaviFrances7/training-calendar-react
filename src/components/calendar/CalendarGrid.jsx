import { useRef } from "react";
import { days, trainerHours } from "../../utils/constants";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function CalendarGrid({
  selectedTrainer,
  clients,
  sessions,
  setSessions,
  selectedCell,
  setSelectedCell,
  blockedCells,
  setBlockedCells,
}) {
  // =========================
  // DATOS ENTRENADOR ACTUAL
  // =========================

  const hours = trainerHours[selectedTrainer] || [];

  const trainerSessions = sessions[selectedTrainer] || [];

  const trainerClients = clients[selectedTrainer] || [];

  const trainerBlockedCells = blockedCells[selectedTrainer] || [];

  // =========================
  // REF CLICK DERECHO
  // =========================

  // Esto evita el "click fantasma"
  // que hace el navegador después
  // de un click derecho
  const rightClickRef = useRef(false);

  // =========================
  // SESIÓN SELECCIONADA
  // =========================

  const selectedSession = trainerSessions.find(
    (session) =>
      session.dia === selectedCell?.day && session.hora === selectedCell?.hour,
  );

  // =========================
  // SELECCIONAR CELDA
  // =========================

  function handleCellClick(day, hour) {
    setSelectedCell({
      day,
      hour,
    });
  }

  // =========================
  // BLOQUEAR CELDA
  // =========================

  function toggleBlockedCell(day, hour) {
    const alreadyBlocked = trainerBlockedCells.some(
      (cell) => cell.day === day && cell.hour === hour,
    );

    // Si ya estaba bloqueada
    // la eliminamos
    if (alreadyBlocked) {
      const updatedBlockedCells = trainerBlockedCells.filter(
        (cell) => !(cell.day === day && cell.hour === hour),
      );

      setBlockedCells({
        ...blockedCells,

        [selectedTrainer]: updatedBlockedCells,
      });
    } else {
      // Si no estaba bloqueada
      // la añadimos
      setBlockedCells({
        ...blockedCells,

        [selectedTrainer]: [
          ...trainerBlockedCells,

          {
            day,
            hour,
          },
        ],
      });
    }

    // Cerramos cualquier menú abierto
    setSelectedCell(null);
  }

  // =========================
  // ELIMINAR CLIENTE
  // =========================

  function removeClient(day, hour, clientToRemove) {
    const updatedSessions = trainerSessions

      .map((session) => {
        if (session.dia === day && session.hora === hour) {
          return {
            ...session,

            clientes: session.clientes.filter(
              (client) => client !== clientToRemove,
            ),
          };
        }

        return session;
      })

      // Eliminamos sesiones vacías
      .filter((session) => session.clientes.length > 0);

    setSessions({
      ...sessions,

      [selectedTrainer]: updatedSessions,
    });
  }

  // =========================
  // AÑADIR CLIENTE
  // =========================

  function addClient(client) {
    const existingSession = trainerSessions.find(
      (session) =>
        session.dia === selectedCell.day && session.hora === selectedCell.hour,
    );

    // Si ya existe sesión
    if (existingSession) {
      // Máximo 3 clientes
      if (existingSession.clientes.length >= 3) {
        alert("Máximo 3 clientes");

        return;
      }

      // Añadimos cliente
      const updatedSessions = trainerSessions.map((session) => {
        if (
          session.dia === selectedCell.day &&
          session.hora === selectedCell.hour
        ) {
          return {
            ...session,

            clientes: [...session.clientes, client.name],
          };
        }

        return session;
      });

      setSessions({
        ...sessions,

        [selectedTrainer]: updatedSessions,
      });
    } else {
      // Creamos nueva sesión
      const newSession = {
        clientes: [client.name],
        dia: selectedCell.day,
        hora: selectedCell.hour,
      };

      setSessions({
        ...sessions,

        [selectedTrainer]: [...trainerSessions, newSession],
      });
    }

    // Cerramos menú
    setSelectedCell(null);
  }

  // =========================
  // BORRAR CALENDARIO
  // =========================

  function deleteAllClientsCalendar() {
    const confirmation = confirm(
      "¿Seguro que quieres borrar todo el calendario?",
    );

    if (confirmation) {
      // Borramos sesiones
      setSessions({
        ...sessions,

        [selectedTrainer]: [],
      });

      // Borramos casillas rojas
      setBlockedCells({
        ...blockedCells,

        [selectedTrainer]: [],
      });

      // Cerramos menú
      setSelectedCell(null);
    }
  }

  // =========================
  // GENERAR PDF
  // =========================

  function generatePDF() {
    const today = new Date();

    const firstDay = new Date(today);

    firstDay.setDate(today.getDate() - today.getDay() + 1);

    const lastDay = new Date(firstDay);

    lastDay.setDate(firstDay.getDate() + 4);

    const weekStart = firstDay.toLocaleDateString("es-ES");

    const weekEnd = lastDay.toLocaleDateString("es-ES");

    const doc = new jsPDF();

    const img = new Image();

    img.src = "/logo_rt.png";

    img.onload = () => {
      // LOGO

      doc.addImage(img, "PNG", 67, 4, 75, 38);

      // TÍTULO

      doc.setFontSize(18);

      doc.setTextColor(30);

      doc.text(`Calendario semanal - ${selectedTrainer}`, 105, 52, {
        align: "center",
      });

      // SEMANA

      doc.setFontSize(11);

      doc.setTextColor(120);

      doc.text(`Semana del ${weekStart} al ${weekEnd}`, 105, 60, {
        align: "center",
      });

      // TABLA

      const tableBody = hours.map((hour) => {
        const row = [hour];

        days.forEach((day) => {
          const session = trainerSessions.find(
            (session) => session.dia === day && session.hora === hour,
          );

          const isBlocked = trainerBlockedCells.some(
            (cell) => cell.day === day && cell.hour === hour,
          );

          if (isBlocked) {
            row.push("BLOCKED");
          } else {
            row.push(session ? session.clientes.join("\n\n") : "");
          }
        });

        return row;
      });

      autoTable(doc, {
        startY: 68,

        head: [["Hora", ...days]],

        body: tableBody,

        theme: "grid",

        tableWidth: "auto",

        columnStyles: {
          // Hora
          0: {
            cellWidth: 22,
          },

          // Lunes
          1: {
            cellWidth: 33,
          },

          // Martes
          2: {
            cellWidth: 33,
          },

          // Miércoles
          3: {
            cellWidth: 33,
          },

          // Jueves
          4: {
            cellWidth: 33,
          },

          // Viernes
          5: {
            cellWidth: 33,
          },
        },

        styles: {
          halign: "center",

          valign: "middle",

          fontSize: 11,

          cellPadding: 3,

          lineColor: [220, 220, 220],

          lineWidth: 0.3,

          minCellHeight: 15,

          textColor: [40, 40, 40],
        },

        headStyles: {
          fillColor: [24, 24, 27],

          textColor: [255, 255, 255],

          fontStyle: "bold",

          fontSize: 11,
        },

        // Casillas rojas
        didParseCell: function (data) {
          if (data.section === "body") {
            if (data.cell.text && data.cell.text[0] === "BLOCKED") {
              data.cell.styles.fillColor = [239, 68, 68];

              data.cell.text = [];
            }
          }
        },
      });

      doc.save(`Calendario-${selectedTrainer}.pdf`);
    };
  }

  return (
    <div
      className="
        rounded-xl
        bg-zinc-900
        p-6
      "
      onClick={() => setSelectedCell(null)}
    >
      {/* HEADER */}

      <div
        className="
          mb-6
          flex
          items-center
          justify-between
        "
      >
        <h2 className="text-2xl font-bold">Calendario</h2>

        <div className="flex gap-3">
          {/* PDF */}

          <button
            onClick={generatePDF}
            className="
              rounded-xl
              bg-blue-500
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-blue-600
            "
          >
            PDF
          </button>

          {/* BORRAR CALENDARIO */}

          <button
            onClick={deleteAllClientsCalendar}
            className="
              rounded-xl
              bg-red-500
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-red-600
            "
          >
            Borrar calendario
          </button>
        </div>
      </div>

      {/* TABLA */}

      <div className="overflow-x-auto">
        <table
          className="
            w-full
            table-fixed
            border-collapse
          "
        >
          <thead>
            <tr>
              {/* HORA */}

              <th
                className="
                  border
                  border-zinc-700
                  bg-zinc-800
                  p-3
                "
              >
                Hora
              </th>

              {/* DÍAS */}

              {days.map((day) => (
                <th
                  key={day}
                  className="
                    border
                    border-zinc-700
                    bg-zinc-800
                    p-3
                    text-center
                  "
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                {/* HORA LATERAL */}

                <td
                  className="
                    h-20
                    border
                    border-zinc-700
                    bg-zinc-800
                    p-3
                    text-center
                    align-middle
                    font-bold
                  "
                >
                  {hour}
                </td>

                {days.map((day) => {
                  // Comprobamos si está bloqueada
                  const isBlocked = trainerBlockedCells.some(
                    (cell) => cell.day === day && cell.hour === hour,
                  );

                  // Clientes de esta celda
                  const cellClients =
                    trainerSessions.find(
                      (session) => session.dia === day && session.hora === hour,
                    )?.clientes || [];

                  return (
                    <td
                      key={day}
                      // CLICK IZQUIERDO
                      onClick={(e) => {
                        e.stopPropagation();

                        // Evitamos click fantasma
                        // después del click derecho
                        if (rightClickRef.current) {
                          return;
                        }

                        // Si está bloqueada
                        // no abrimos menú
                        if (isBlocked) {
                          return;
                        }

                        handleCellClick(day, hour);
                      }}
                      // CLICK DERECHO
                      onContextMenu={(e) => {
                        e.preventDefault();

                        e.stopPropagation();

                        // Marcamos click derecho
                        rightClickRef.current = true;

                        toggleBlockedCell(day, hour);

                        // Esperamos suficiente
                        // para evitar click fantasma
                        setTimeout(() => {
                          rightClickRef.current = false;
                        }, 150);
                      }}
                      className={`
                        relative

                        h-20
                        min-h-20
                        max-h-20

                        border
                        border-zinc-700

                        p-2

                        align-top

                        transition

                        ${
                          isBlocked
                            ? "bg-red-500 hover:bg-red-600"
                            : "hover:bg-zinc-800"
                        }
                      `}
                    >
                      {/* CONTENIDO INTERNO */}

                      <div
                        className="
                          flex
                          h-full
                          flex-col
                          items-center
                          justify-center
                    

                          gap-0.5

                          overflow-y-auto

                          pr-1
                        "
                      >
                        {cellClients.map((client) => (
                          <div
                            key={client}
                            className="
                                group
                                relative

                                w-20

                                rounded-lg
                                bg-emerald-400

                                px-1
                                py-0.5

                                text-center
                                text-xs
                                font-semibold
                                text-black
                              "
                          >
                            {client}

                            {/* BORRAR CLIENTE */}

                            <button
                              onClick={(e) => {
                                e.stopPropagation();

                                removeClient(day, hour, client);
                              }}
                              className="
                                  absolute
                                  -right-1
                                  -top-1

                                  hidden

                                  h-4
                                  w-4

                                  items-center
                                  justify-center

                                  rounded-full
                                  bg-red-500

                                  text-[10px]
                                  text-white

                                  group-hover:flex
                                "
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* MENÚ CLIENTES */}

                      {selectedCell?.day === day &&
                        selectedCell?.hour === hour && (
                          <div
                            className="
                              absolute

                              left-1
                              right-1
                              top-full

                              z-50

                              mt-2

                              flex
                              max-h-48
                              flex-col
                              gap-2

                              overflow-y-auto

                              rounded-xl
                              border
                              border-zinc-700

                              bg-zinc-900

                              p-2

                              shadow-2xl
                            "
                            onClick={(e) => e.stopPropagation()}
                          >
                            {trainerClients
                              .filter(
                                (client) => !cellClients.includes(client.name),
                              )
                              .map((client) => (
                                <button
                                  key={client.id}
                                  onClick={() => addClient(client)}
                                  className="
                                    rounded-lg
                                    bg-zinc-800

                                    px-2
                                    py-1

                                    text-sm

                                    transition

                                    hover:bg-green-500
                                    hover:text-black
                                  "
                                >
                                  {client.name}
                                </button>
                              ))}
                          </div>
                        )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CalendarGrid;
