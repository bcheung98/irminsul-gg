export interface InfoGalleryProps {
    children?: React.ReactNode;
    title?: string;
    buttons?: InfoGalleryButtonProps[];
    view: string;
    searchValue: string;
    handleView: (_: React.BaseSyntheticEvent, view: string) => void;
    handleInputChange: (event: React.BaseSyntheticEvent) => void;
}

export interface InfoGalleryButtonProps {
    value: string;
    icon: React.ReactNode;
    tooltip: string;
}
