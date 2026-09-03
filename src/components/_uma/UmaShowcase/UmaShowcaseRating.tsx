// Component imports
import Text from "@/components/Text";
import RatingBadge from "../RatingBadge";

// MUI imports
import Stack from "@mui/material/Stack";
import FlexBox from "@/components/FlexBox";

// Helper imports
import { ranks } from "@/data/uma/ranks";

export default function UmaShowcaseRating({
    rating,
    rank,
}: {
    rating: number;
    rank: keyof typeof ranks;
}) {
    return (
        <Stack spacing={0.5} sx={{ mr: 8 }}>
            <FlexBox sx={{ justifyContent: "center" }}>
                <RatingBadge rank={rank} size={64} />
            </FlexBox>
            <Text
                variant="subtitle1"
                sx={{
                    textAlign: "center",
                    backgroundColor: "rgb(250, 250, 250)",
                    borderRadius: "16px",
                    px: 2,
                    color: "rgb(121, 64, 22)",
                    height: "18px",
                    lineHeight: "18px",
                }}
            >
                {rating.toLocaleString("en-US")}
            </Text>
        </Stack>
    );
}
