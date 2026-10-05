import { cn } from "cn";
import { Settings } from "lucide-react";
import { Separator } from "./ui/separator";

export function Header() {
  return (
    <div>
      <div className={cn("flex flex-1 items-center justify-between")}>
        <div className={cn("flex flex-row items-center gap-x-2 text-lg font-semibold")}>
          <img src="./src/assets/BenStackLogo_Isometric_transparent.svg" alt="" width={32} height={32} />
          BenStack Pomodoro
        </div>
        <Settings />
      </div>
      <Separator className={cn("mt-2 p-px")} />
    </div>
  );
}