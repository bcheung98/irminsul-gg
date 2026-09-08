// Component imports
import Text from "@/components/Text";
import FlexBox from "@/components/FlexBox";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function StatusAlert({ open }: { open?: boolean }) {
    const theme = useTheme();

    return (
        <Snackbar
            open={open}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
        >
            <Card
                sx={{
                    px: 4,
                    py: 2,
                    outline: `1px solid ${theme.palette.warning.light}`,
                    borderRadius: theme.contentBox.border.radius,
                }}
            >
                <FlexBox spacing={4}>
                    <FlexBox spacing={2}>
                        <InfoOutlinedIcon sx={{ color: theme.text.primary }} />
                        <Stack>
                            <Text variant="subtitle1" weight="highlight">
                                Updates are available
                            </Text>
                            <Text
                                variant="body2"
                                weight="highlight"
                                sx={{ color: theme.text.description }}
                            >
                                Refresh to get the latest content
                            </Text>
                        </Stack>
                    </FlexBox>
                    <Button
                        size="small"
                        variant="contained"
                        color="info"
                        onClick={() => window.location.reload()}
                    >
                        <Text
                            component="span"
                            variant="subtitle2"
                            weight="highlight"
                        >
                            Refresh
                        </Text>
                    </Button>
                </FlexBox>
            </Card>
        </Snackbar>
    );
}
