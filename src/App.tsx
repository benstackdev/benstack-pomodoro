import { useEffect } from "react";
import { Header } from "./components/header";
import { Timer } from "./components/timer";
import { resetSettings } from "./lib/settings";

export function App() {
  useEffect(resetSettings, []); // set default settings

  return (
    <div className="flex flex-col min-h-svh p-6 max-w-lg mx-auto">
      <Header />
      <Timer />
    </div>
  );
}

export default App;
