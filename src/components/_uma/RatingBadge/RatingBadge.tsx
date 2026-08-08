// Helper imports
import { ranks } from "@/data/uma/ranks";
import { getRankBadge } from "@/helpers/uma/calculator";

export interface RatingBadgeProps {
    rank: keyof typeof ranks;
    size?: number;
}

export default function RatingBadge({ rank, size = 72 }: RatingBadgeProps) {
    return (
        <div
            style={{
                width: `${size}px`,
                height: `${size}px`,
            }}
        >
            <div style={getRankBadge(rank, size)}></div>
        </div>
    );
}
