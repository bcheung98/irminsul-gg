import { AttributeData } from "@/types";
import { InfoAvatarProps } from "../InfoAvatar/InfoAvatar.types";
import { Materials } from "@/types/materials";

export interface InfoCardProps extends InfoAvatarProps {
    badgeLeft?: AttributeData;
    badgeRight?: AttributeData;
    materials?: Materials;
}

export interface InfoCardMaterialProps extends InfoCardProps {
    materials: Materials;
}
