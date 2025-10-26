export interface InfoGalleryProps {
    children?: React.ReactNode;
    title?: string;
    buttons?: InfoGalleryButtonProps[];
    view: string;
    handleView: (_: React.BaseSyntheticEvent, view: string) => void;
}

export interface InfoGalleryButtonProps {
    value: string;
    icon: React.ReactNode;
    tooltip: string;
}
