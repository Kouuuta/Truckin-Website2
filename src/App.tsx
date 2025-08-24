import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Clients from "./components/Clients";
import Team from "./components/Team";

export function App() {
  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen relative transition-colors duration-300">
        <Navbar />
        <main className="overflow-hidden relative z-10">
          <Hero />
          <About />
          <Clients />
          <Team />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
