import type { SxProps, Theme } from "@mui/material/styles";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { ColorTransform } from "@/utils/colors";
import type { Game } from "@/types";

export interface InfoButtonProps {
    /**
     * The content of the button.
     * If present, it will override `title` and `icons` props.
     */
    children?: React.ReactNode;
    /** The text to display for the button. */
    title?: React.ReactNode;
    /** The size of the button. */
    size?: "small" | "medium";
    /**
     * Set the button's color to a specified game's color.
     * If `true`, the color will be matched to the current game's color.
     */
    game?: Game | true;
    /** The color of the button. If present, it will override the `game` prop. */
    color?: string;
    /**
     * The color of the button when hovering over it.
     * If present, it will override the `hoverAdjust` prop.
     */
    hoverBackgroundColor?: string;
    /**
     * Adjusts the button's color shift on hover.
     *
     * If a number is provided, the color will lighten/darken for positive/negative
     * values.
     *
     * If an array is provided, the first element specifies the transform function:
     * `adjust` to lighten/darken, or `alpha` to set the transparency.
     * The second element is the value of the adjustment.
     */
    hoverAdjust?: number | [ColorTransform, number];
    /**
     * Names of the Material Icons to display at the start or end.
     * By default, displays `ChevronRightIcon` at the end.
     * If `false`, no icons are displayed.
     */
    icons?: InfoButtonIcons;
    /** Callback fired when the button is clicked. */
    onClick?: () => void;
    /** If `true`, the button is disabled. */
    disabled?: boolean;
    /** If present, turns the button into a link component. */
    href?: string;
    target?: React.HTMLAttributeAnchorTarget;
    rel?: string;
    /** If true, the ripple effect is disabled. */
    disableRipple?: boolean;
    /** Spacing between the icons and text. */
    spacing?: number;
    /** System prop to override the default button stylings. */
    sx?: SxProps<Theme>;
}

type InfoButtonIcons =
    | false
    | {
          start?: React.ComponentType<SvgIconProps>;
          end?: React.ComponentType<SvgIconProps>;
      };
