import { createContext } from "react";

import { Website } from "@/types/website";

export const WebsiteContext = createContext<Website[]>([]);
