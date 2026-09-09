import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRandomPageShortcut() {
    const router = useRouter();

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            const isDialogOpen = Object.values(document.body.style).includes(
                "padding-right",
            );
            if (
                event.altKey &&
                event.key.toLowerCase() === "x" &&
                !isTypingTarget(event.target) &&
                !isDialogOpen
            ) {
                event.preventDefault();
                router.push("/random");
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [router]);
}

function isTypingTarget(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) {
        return false;
    }
    return (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
    );
}
