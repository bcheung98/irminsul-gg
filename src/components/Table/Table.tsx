// Component imports
import TextLabel from "../TextLabel";

// MUI imports
import { useTheme, TypographyVariant } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

// Helper imports
import { variantMap } from "@/themes/theme";

// Type imports
import { TextLabelProps } from "../TextLabel/TextLabel.types";
import { ColorVariants } from "@/types/theme";

export interface RowProps {
    color?: ColorVariants;
}

export interface HeadProps {
    data: (string | number)[];
    align?: "left" | "center" | "right";
    textVariant?: TypographyVariant;
}

export interface CellProps {
    label: TextLabelProps;
    align?: "left" | "center" | "right";
    padding?: string;
    borderColor?: string;
}

export const Container = TableContainer;
export const Root = Table;
export const Body = TableBody;

export function Head({
    data,
    align = "center",
    textVariant = "body1",
}: HeadProps) {
    const theme = useTheme();

    return (
        <TableHead>
            <Row
                sx={{
                    backgroundColor: theme.table.backgroundColor.header,
                    borderBottom: `1px solid ${theme.border.color.primary}`,
                }}
            >
                {data.map((column, index) => (
                    <Cell
                        key={index}
                        label={{
                            title: column,
                            titleProps: {
                                color: theme.table.color.header,
                                variant: textVariant,
                            },
                        }}
                        align={align}
                    />
                ))}
            </Row>
        </TableHead>
    );
}

export function Cell({
    label,
    align = "center",
    padding = "4px 16px",
    borderColor,
}: CellProps) {
    const theme = useTheme();

    let { title, icon } = label;
    if (typeof label.title === "string") {
        [title, icon] = label.title.split("|");
    }
    return (
        <TableCell
            sx={{
                borderColor: borderColor || theme.border.color.primary,
                p: padding,
            }}
        >
            <TextLabel
                title={title}
                titleProps={{
                    variant: label.titleProps?.variant || "body2",
                }}
                icon={icon}
                justifyContent={align}
            />
        </TableCell>
    );
}

export const Row = styled(TableRow)<RowProps>(
    ({ theme, color = "primary" }) => ({
        backgroundColor: theme.background(
            variantMap[color as keyof typeof variantMap]
        ),
        [`&.${tableRowClasses.hover}`]: {
            "&:hover": {
                backgroundColor: theme.background(
                    variantMap[color as keyof typeof variantMap],
                    "dark"
                ),
            },
        },
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    })
);
