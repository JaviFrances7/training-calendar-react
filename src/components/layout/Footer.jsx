function Footer() {
  return (
    <footer
      className="
        mt-12
        border-t
        border-zinc-800
        bg-zinc-950
        px-6
        py-5
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-center
          gap-4
          text-sm
          text-zinc-400
        "
      >
        {/* Logo */}

        <img
          src="/personal-logo.png"
          alt="Logo"
          className="
            h-12
            w-12
            rounded-xl
            object-cover
            shadow-lg
          "
        />

        {/* Texto */}

        <p>
          Made with{" "}
          <span
            className="
              font-semibold
              text-white
            "
          >
            React
          </span>{" "}
          &{" "}
          <span
            className="
              font-semibold
              text-green-400
            "
          >
            Tailwind
          </span>{" "}
          by{" "}
          <span
            className="
              font-bold
              text-green-400
            "
          >
            Javier Francés
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
