import { trainers } from "../../data/trainers";

function TrainerSelector({ selectedTrainer, setSelectedTrainer }) {
  return (
    <div className="flex gap-4">
      {trainers.map((trainer) => (
        <button
          key={trainer.id}
          onClick={() => setSelectedTrainer(trainer.name)}
          className={`
            rounded-xl px-6 py-3 font-semibold transition
            ${
              selectedTrainer === trainer.name
                ? "bg-green-500 text-black"
                : "bg-zinc-800 text-white hover:bg-zinc-700"
            }
          `}
        >
          {trainer.name}
        </button>
      ))}
    </div>
  );
}

export default TrainerSelector;
