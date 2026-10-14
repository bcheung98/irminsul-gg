// Component imports
import { DescriptionSmall } from "@/components/Blog";

// MUI imports
import Stack from "@mui/material/Stack";

export default function EndfieldUpdateNotification() {
    return (
        <Stack spacing={1}>
            <DescriptionSmall>
                Endmins! The Arknights: Endfield website is now live!
            </DescriptionSmall>
            <DescriptionSmall>
                The site is still pretty barebones for now, and currently only
                features pages for the Operators and Weapons. I will continue
                working on adding more familiar features such as the Banner
                Archive and Ascension Planner, but these may come out later than
                expected since I will be busy with life stuff soon.
            </DescriptionSmall>
        </Stack>
    );
}
