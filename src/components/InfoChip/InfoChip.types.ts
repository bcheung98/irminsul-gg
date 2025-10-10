import { TextLabelProps } from "../TextLabel/TextLabel.types";

export interface InfoChipProps extends TextLabelProps {
    chipProps?: {
        background?: string;
        padding?: string | number;
    };
}
