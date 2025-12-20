export const rarities = [5, 4, 3, 2, 1] as const;
export const skillRarities = [6, 5, 4, 3, 2, 1] as const;

export const rarityMap: Record<number, string> = {
    5: "SSR",
    4: "SR",
    3: "R",
};

export const ranks = ["A", "B", "C", "D", "E", "F", "G"] as const;
export const stats = ["Speed", "Stamina", "Power", "Guts", "Wit"] as const;
export const specialties = [
    "Speed",
    "Stamina",
    "Power",
    "Guts",
    "Wit",
    "Pal",
    "Group",
] as const;

export const aptitude = [
    "Turf",
    "Dirt",
    "Front",
    "Pace",
    "Late",
    "End",
    "Sprint",
    "Mile",
    "Medium",
    "Long",
] as const;
export const terrain = aptitude.slice(0, 2);
export const distances = aptitude.slice(-4);
export const strategies = aptitude.slice(2, 6);

export const grades = [
    "graded",
    "G1",
    "G2",
    "G3",
    "OP",
    "",
    "",
    "Pre-OP",
    "Maiden",
    "Debut",
] as const;

export const raceStages = [
    "Early-Race",
    "Mid-Race",
    "Late-Race",
    "Last-Spurt",
    "Corner",
    "Straight",
    "Final Corner",
    "Final Straight",
    "Slope",
] as const;

export const moods = ["Awful", "Bad", "Normal", "Good", "Great"] as const;
