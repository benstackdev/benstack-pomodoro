import type { AlarmSoundsType } from "@/lib/settings";
import { useSound } from "react-sounds";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type AlarmSoundSelectProps = {
  alarmSound: AlarmSoundsType,
  setAlarmSound: (sound: AlarmSoundsType) => void;
};

const AlarmSoundSelectItems = [
  { label: "Bell", value: "bell" },
  { label: "Digital", value: "digital" },
  { label: "None", value: "" }
];

export function AlarmSoundSelect({ alarmSound, setAlarmSound }: AlarmSoundSelectProps) {
  const stopAllSounds = () => {
    stopBell();
    stopDigital();
  };

  const playSound = (sound: AlarmSoundsType) => {
    switch (sound) {
      case "bell":
        playBell();
        break;
      case "digital":
        playDigital();
        break;
    }
  };

  const {
    play: playDigital,
    stop: stopDigital
  } = useSound("/sounds/digital.mp3");

  const {
    play: playBell,
    stop: stopBell
  } = useSound("/sounds/bell.mp3");

  return (
    <Select items={AlarmSoundSelectItems}>
      <SelectTrigger>
        <SelectValue placeholder={AlarmSoundSelectItems.find((item) => item.value === alarmSound)?.label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {AlarmSoundSelectItems.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              onClick={() => {
                setAlarmSound(item.value as AlarmSoundsType);
                stopAllSounds();
                playSound(item.value as AlarmSoundsType);
              }}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select >
  );
}