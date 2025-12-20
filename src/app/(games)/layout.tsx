import StyledRoot from "./StyledRoot";

export default function GamesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <StyledRoot>{children}</StyledRoot>;
}
