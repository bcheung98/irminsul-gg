import { createContext } from "react";

import { Website } from "@/types/website";
import { CharacterSkillsList } from "@/types/skill";

export const WebsiteContext = createContext<Website[]>([]);
export const DataContext = createContext<any[]>([]);
export const SkillContext = createContext<CharacterSkillsList | null>(null);
