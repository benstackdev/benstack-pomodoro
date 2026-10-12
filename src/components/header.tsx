import { cn } from "cn";
import { Separator } from "./ui/separator";
import { SettingsPopover } from "./settings-popover";
import { useTheme } from "./theme-provider";
import { ThemeSwitch } from "./theme-switch";

export function Header() {
  const { theme } = useTheme();

  return (
    <div>
      <div className={cn("flex flex-1 items-center justify-between")}>
        <div className={cn("flex flex-row items-center gap-x-2 text-lg font-semibold")}>
          <img src={theme === 'dark' ? "./src/assets/BenStackLogo_dark.svg" : "./src/assets/BenStackLogo_light.svg"} alt="" width={50} />
          BenStack Pomodoro
        </div>
        <div className="flex flex-row gap-x-2">
          <SettingsPopover />
          <ThemeSwitch />
        </div>
      </div>
      <Separator className={cn("mt-2 p-px")} />
    </div>
  );
}