import StyledRoot from "./StyledRoot";

export default function PagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <StyledRoot>{children}</StyledRoot>;
}
