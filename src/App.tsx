import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export function App() {
  return (
    <div className="bg-black text-white min-h-screen relative">
      <Navbar />
      <main className="overflow-hidden relative z-10">
        <Hero />
      </main>
    </div>
  );
}

export default App;
