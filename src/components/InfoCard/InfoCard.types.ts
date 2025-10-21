import { AttributeData } from "@/types";
import { InfoAvatarProps } from "../InfoAvatar/InfoAvatar.types";

export interface InfoCardProps extends InfoAvatarProps {
    badgeLeft?: AttributeData;
    badgeRight?: AttributeData;
}
