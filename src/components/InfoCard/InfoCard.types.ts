import { AttributeData } from "@/types/_common";
import { InfoAvatarProps } from "../InfoAvatar/InfoAvatar.types";

export interface InfoCardProps extends InfoAvatarProps {
    badgeLeft?: AttributeData;
    badgeRight?: AttributeData;
}
