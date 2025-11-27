import { TextLabelProps } from "@/components/TextLabel/TextLabel.types";
import { BoxProps } from "@mui/material/Box";

export interface InfoChipProps extends TextLabelProps {
    chipProps?: {
        background?: string;
        padding?: string | number;
        height?: BoxProps["height"];
    };
}
