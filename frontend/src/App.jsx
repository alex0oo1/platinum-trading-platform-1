
export default function App() {
  return (
    <main className="min-h-screen bg-[#080b10] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="mb-5 text-sm tracking-[0.4em] text-amber-400">
          TRADE WITH PRECISION
        </p>

        <h1 className="text-5xl md:text-7xl font-bold tracking-widest text-white">
          PLATINUM
        </h1>

        <p className="mt-6 text-lg text-slate-400">
          The future of your trading experience starts here.
        </p>

        <button
          type="button"
          className="mt-10 rounded-xl bg-amber-500 px-8 py-4 font-semibold text-black transition-all duration-300 hover:bg-amber-400"
          onClick={() =>
            alert("Welcome to PLATINUM 2.0!")
          }
        >
          Explore PLATINUM
        </button>
      </div>
    </main>
  );
}
