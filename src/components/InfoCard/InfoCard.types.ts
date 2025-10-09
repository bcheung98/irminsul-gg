import { InfoAvatarProps } from "../InfoAvatar/InfoAvatar.types";
import { InfoBadgeData } from "../InfoBadge/InfoBadge.types";

export interface InfoCardProps extends InfoAvatarProps {
    badgeLeft?: InfoBadgeData;
    badgeRight?: InfoBadgeData;
}
