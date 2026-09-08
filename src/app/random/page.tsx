import { connection } from "next/server";
import { redirect } from "next/navigation";

// Helper imports
import { getPathsByGame, getSitemapPaths } from "@/utils/sitemap";

const EXCLUDED_RANDOM_PATHS = new Set(["/", "/privacy-policy", "/site-map"]);

const WEIGHT_EXPONENT = 0.25;

function getGameWeights(pathsByGame: Record<string, string[] | undefined>) {
    const counts = Object.fromEntries(
        Object.entries(pathsByGame).map(([game, paths]) => [
            game,
            paths?.length ?? 0,
        ]),
    );
    const positiveCounts = Object.values(counts).filter((count) => count > 0);
    const minCount = Math.min(...positiveCounts);
    return Object.fromEntries(
        Object.entries(counts).map(([game, count]) => [
            game,
            count > 0 ? (count / minCount) ** WEIGHT_EXPONENT : 0,
        ]),
    );
}

function getWeightedRandomGame(weights: Record<string, number>) {
    const entries = Object.entries(weights).filter(([, weight]) => weight > 0);
    const totalWeight = entries.reduce((sum, [, weight]) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    for (const [game, weight] of entries) {
        random -= weight;

        if (random < 0) {
            return game;
        }
    }
    return entries[0][0];
}

export default async function Page() {
    await connection();

    const paths = (await getSitemapPaths()).filter(
        (path) =>
            !EXCLUDED_RANDOM_PATHS.has(path) &&
            !path.startsWith("/blog") &&
            path.split("/").length === 4,
    );

    const pathsByGame = getPathsByGame(paths);
    const gameWeights = getGameWeights(pathsByGame);

    const game = getWeightedRandomGame(gameWeights);
    const gamePaths = pathsByGame[game] ?? [];
    const path = gamePaths[Math.floor(Math.random() * gamePaths.length)];

    redirect(path);
}
