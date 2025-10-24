// MUI imports
import { useTheme } from "@mui/material/styles";

export default function MenuCloseIcon({ open }: { open?: boolean }) {
    const theme = useTheme();

    const baseIconStyle = {
        transformOrigin: "center center",
        transition: "0.2s",
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
        >
            <rect
                x="1"
                y="5"
                width="14"
                height="1.5"
                fill={theme.text.primary}
                style={{
                    ...baseIconStyle,
                    transform: open
                        ? "translate(1.5px, 1.6px) rotateZ(-45deg)"
                        : "none",
                }}
                className={open ? "lock-scroll" : ""}
            ></rect>
            <rect
                x="1"
                y="9"
                width="14"
                height="1.5"
                fill={theme.text.primary}
                style={{
                    ...baseIconStyle,
                    transform: open
                        ? "translate(1.5px, -1.2px) rotateZ(45deg)"
                        : "none",
                }}
                className={open ? "lock-scroll" : ""}
            ></rect>
        </svg>
    );
}
