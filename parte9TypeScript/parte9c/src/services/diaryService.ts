import diaryData from "../../data/entries.json";

import { DiaryEntry, NonSensitiveDiaryEntry } from "../types";

const diaries: DiaryEntry[] = diaryData as DiaryEntry[];


const getEntries = () => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({id, date, weather, visibility}) => ({
        id,
        date,
        weather,
        visibility
    }));
}

const addEntry = (entry: DiaryEntry) => {
  diaries.push(entry);
  return null;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries
};