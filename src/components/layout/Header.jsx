function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-900">
      <div className="mx-auto flex max-w-7xl justify-center p-4">
        <img
          src="/logo_rt.png"
          alt="Gym Scheduler Logo"
          className="h-55 object-contain"
        />
      </div>
    </header>
  );
}

export default Header;
