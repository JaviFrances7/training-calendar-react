function WeekSelector({ selectedWeek, setSelectedWeek }) {
  function formatWeek(dateString) {
    if (!dateString) return "";

    const startDate = new Date(dateString);

    const endDate = new Date(startDate);

    const day = startDate.getDay();

    const daysUntilSunday = day === 0 ? 0 : 7 - day;

    endDate.setDate(startDate.getDate() + daysUntilSunday);

    const month = endDate.toLocaleString("es-ES", {
      month: "long",
    });

    return `
    Semana del
    ${startDate.getDate()}
    al
    ${endDate.getDate()}
    de
    ${month}
  `;
  }

  return (
    <div className="rounded-xl bg-zinc-900 p-6">
      <h2 className="mb-4 text-2xl font-bold">Semana</h2>

      <input
        type="date"
        value={selectedWeek}
        onChange={(e) => setSelectedWeek(e.target.value)}
        className="
          rounded-xl
          bg-zinc-800
          px-4
          py-3
          outline-none
        "
      />

      {selectedWeek && (
        <p className="mt-4 text-green-400">{formatWeek(selectedWeek)}</p>
      )}
    </div>
  );
}

export default WeekSelector;
