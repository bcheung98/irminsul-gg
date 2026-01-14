export const elements = [
    "Physical",
    "Fire",
    "Ice",
    "Electric",
    "Ether",
] as const;

export const weapons = [
    "Attack",
    "Stun",
    "Anomaly",
    "Defense",
    "Support",
    "Rupture",
] as const;

export const attackTypes = ["Strike", "Slash", "Pierce"] as const;

export const rarities = [5, 4, 3, 2, 1] as const;

export const rarityMap: Record<number, string> = {
    5: "S",
    4: "A",
    3: "B",
    2: "C",
    1: "D",
};

export const factions = [
    "Cunning Hares",
    "Belobog Heavy Industries",
    "Victoria Housekeeping Co.",
    "New Eridu Defense Force",
    "Criminal Investigation Special Response Team",
    "Sons of Calydon",
    "Hollow Special Operations Section 6",
    "Stars of Lyra",
    "Mockingbird",
    "Yunkui Summit",
    "Spook Shack",
    "Krampus Compliance Authority",
    "Angels of Delusion",
] as const;
