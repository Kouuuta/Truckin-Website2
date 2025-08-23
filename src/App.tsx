import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Clients from "./components/Clients";
export function App() {
  return (
    <div className="bg-black text-white min-h-screen relative">
      <Navbar />
      <main className="overflow-hidden relative z-10">
        <Hero />
        <About />
        <Clients />
      </main>
    </div>
  );
}

export default App;
