// Component imports
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";

// MUI imports
import CircularProgress from "@mui/material/CircularProgress";

export function SearchNoResults({
    searchValue = "",
    children,
}: {
    searchValue?: string;
    children?: React.ReactNode;
}) {
    if (!searchValue) return null;

    return (
        <Text sx={{ textAlign: "center", pt: 2 }}>
            {`No results for "`}
            <Text component="span" weight="highlight">
                {searchValue}
            </Text>
            {`"`}
            <br />
            <br />
            {children}
        </Text>
    );
}

export function SearchLoader() {
    return (
        <FlexBox sx={{ justifyContent: "center", pt: 3 }}>
            <CircularProgress color="info" />
        </FlexBox>
    );
}
