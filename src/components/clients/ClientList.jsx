import { useState } from "react";

function ClientList({ selectedTrainer, clients, setClients }) {
  const [newClient, setNewClient] = useState("");

  const trainerClients = clients[selectedTrainer] || [];

  function deleteAllClients() {
    const confirmation = confirm(
      "¿Seguro que quieres borrar todos los clientes?",
    );

    if (confirmation) {
      setClients({
        ...clients,

        [selectedTrainer]: [],
      });
    }
  }

  function addClient() {
    if (!newClient.trim()) return;

    const client = {
      id: Date.now(),
      name: newClient,
    };

    setClients({
      ...clients,

      [selectedTrainer]: [...trainerClients, client],
    });

    setNewClient("");
  }

  function deleteClient(id) {
    const filteredClients = trainerClients.filter((client) => client.id !== id);

    setClients({
      ...clients,

      [selectedTrainer]: filteredClients,
    });
  }

  return (
    <div
      className="
        rounded-xl
        bg-zinc-900
        p-6
      "
    >
      <h2
        className="
          mb-4
          text-2xl
          font-bold
        "
      >
        Clientes
      </h2>

      <div
        className="
          mb-6
          flex
          gap-3
        "
      >
        <input
          type="text"
          placeholder="Añadir cliente..."
          value={newClient}
          onChange={(e) => setNewClient(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addClient();
            }
          }}
          className="
            flex-1
            rounded-xl
            bg-zinc-800
            px-4
            py-3
            outline-none
          "
        />

        <button
          onClick={addClient}
          className="
            rounded-xl
            bg-green-500
            px-5
            py-3
            font-bold
            text-black
            transition
            hover:bg-green-600
          "
        >
          Añadir
        </button>

        <button
          onClick={deleteAllClients}
          className="
            rounded-xl
            bg-red-500
            px-4
            py-2
            font-semibold
            text-white
            transition
            hover:bg-red-600
          "
        >
          Borrar todos
        </button>
      </div>

      <div
        className="
          flex
          flex-col
          gap-3
        "
      >
        {trainerClients.map((client) => (
          <div
            key={client.id}
            className="
                flex
                items-center
                justify-between
                rounded-xl
                bg-zinc-800
                px-4
                py-3
              "
          >
            <span>{client.name}</span>

            <button
              onClick={() => deleteClient(client.id)}
              className="
                  text-red-400
                  transition
                  hover:text-red-300
                "
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientList;
