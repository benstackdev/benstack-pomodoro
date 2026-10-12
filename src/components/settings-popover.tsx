import { Settings } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "cn";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { getSetting, SETTING_EVENT, SettingsKeys, updateSetting } from "@/lib/settings";
import { useState } from "react";
import { clampSetting } from "@/lib/settings";

export function SettingsPopover() {
  const [focusTimeValue, setFocusTimeValue] = useState<string>(String(Number(getSetting(SettingsKeys.FOCUS_TIME)) / 60));
  const [breakTimeValue, setBreakTimeValue] = useState<string>(String(Number(getSetting(SettingsKeys.BREAK_TIME)) / 60));

  const handleUpdateSettings = () => {
    updateSetting(SettingsKeys.FOCUS_TIME, String(Number(focusTimeValue) * 60));
    updateSetting(SettingsKeys.BREAK_TIME, String(Number(breakTimeValue) * 60));
    window.dispatchEvent(new Event(SETTING_EVENT));
  };

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button size="icon-lg" variant="outline">
            <Settings className="size-6" />
          </Button>
        } />
      <PopoverContent className={cn("w-60")}>
        <div className="flex flex-col gap-y-4">
          <h4 className="text-xl leading-none font-medium">Settings</h4>
          <FieldGroup className={cn("flex flex-row")}>
            <Field>
              <FieldLabel htmlFor="focus-time">
                Focus (mins)
              </FieldLabel>
              <Input
                id="focus-time"
                type="number"
                value={focusTimeValue}
                onChange={(e) => setFocusTimeValue(clampSetting(e.target.value, 1, 99))}
                className={cn("min-w-16 max-w-16")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="break-time">
                Break (mins)
              </FieldLabel>
              <Input
                id="break-time"
                type="number"
                value={breakTimeValue}
                onChange={(e) => setBreakTimeValue(clampSetting(e.target.value, 1, 99))}
                className={cn("min-w-16 max-w-16")}
              />
            </Field>
          </FieldGroup>
          <Button variant="secondary" onClick={handleUpdateSettings}>
            Update Settings
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}