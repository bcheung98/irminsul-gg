import Color, { type ColorTransform } from "@/utils/colors";
import { getContrastText } from "@/utils/getContrastText";
import type { SxProps, Theme } from "@mui/material/styles";
import type { InfoButtonProps } from "./InfoButton.types";

export const infoButtonStyles = ({
    size = "medium",
    backgroundColor,
    hoverBackgroundColor,
    hoverAdjust = -0.15,
    icons,
}: {
    size?: "small" | "medium";
    backgroundColor: string;
    hoverBackgroundColor?: string;
    hoverAdjust?: InfoButtonProps["hoverAdjust"];
    icons?: boolean;
}) => {
    let factor: number;
    let method: ColorTransform;
    if (typeof hoverAdjust === "number") {
        method = "adjust";
        factor = hoverAdjust;
    } else {
        [method, factor] = hoverAdjust;
    }

    const bgColor = new Color(backgroundColor);
    const hoverBgColor =
        hoverBackgroundColor ?? bgColor[method](factor).toString();

    return {
        root: ((): SxProps<Theme> => (theme) => ({
            width: "max-content",
            height: "max-content",
            padding:
                size === "medium"
                    ? `6px ${icons ? 12 : 16}px`
                    : `4px ${icons ? 10 : 16}px`,
            borderRadius: "4px",
            color: getContrastText(theme.text.primary, bgColor.toString()),
            backgroundColor: bgColor.toString(),
            "&:hover": {
                color: getContrastText(theme.text.primary, hoverBgColor),
                backgroundColor: hoverBgColor,
            },
            "&.Mui-disabled": {
                opacity: 0.35,
            },
            transition: "background-color 0.15s",
        }))(),
        icon: ((): SxProps<Theme> => () => ({
            color: "inherit",
            fontSize: {
                xs: "16px",
                sm: "18px",
            },
        }))(),
    };
};
