import { Header } from "./components/header";
import { Timer } from "./components/timer";

export function App() {
  return (
    <div className="flex flex-col min-h-svh p-6 max-w-xl mx-auto">
      <Header />
      <Timer focusTime={90} breakTime={120} />
    </div>
  );
}

export default App;
