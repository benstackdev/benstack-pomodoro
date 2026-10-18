export const SETTING_EVENT = 'settingEvent';

export const SettingsKeys = {
  FOCUS_TIME: "FOCUS_TIME",
  BREAK_TIME: "BREAK_TIME",
  ALARM_SOUND: "ALARM_SOUND"
};

export type SettingsKeysType = (typeof SettingsKeys)[keyof typeof SettingsKeys];

export type AlarmSoundsType = "digital" | "bell" | "";

export const resetSettings = () => {
  localStorage.setItem(SettingsKeys.FOCUS_TIME, String(25 * 60));
  localStorage.setItem(SettingsKeys.BREAK_TIME, String(5 * 60));
  localStorage.setItem(SettingsKeys.ALARM_SOUND, "digital");
};

export const getSetting = (key: SettingsKeysType) => localStorage.getItem(key) ?? undefined;

export const updateSetting = (key: SettingsKeysType, value: string) => {
  localStorage.setItem(key, value);
  window.dispatchEvent(new Event(SETTING_EVENT));
};

export const clampSetting = (value: string, min: number, max: number) => String(Math.min(Math.max(Number(value), min), max));