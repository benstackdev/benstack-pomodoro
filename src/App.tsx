import { Header } from "./components/header";
import { Timer } from "./components/timer";

export function App() {
  return (
    <div className="flex flex-col min-h-svh p-6 max-w-xl mx-auto">
      <Header />
      <Timer focusMinutes={0} focusSeconds={30} breakMinutes={2} breakSeconds={0} />
    </div>
  );
}

export default App;
