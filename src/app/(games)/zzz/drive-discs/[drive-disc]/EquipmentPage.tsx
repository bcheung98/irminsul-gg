"use client";

// Component imports
import EquipmentInfo from "@/components/EquipmentInfo";
import InfoPageRoot from "@/components/InfoPageRoot";
import BetaTag from "@/components/BetaTag";

// Type imports
import { Equipment } from "@/types/equipment";

export default function EquipmentPage({ equipment }: { equipment: Equipment }) {
    const header = <BetaTag version={equipment.release.version} />;

    return (
        <InfoPageRoot header={header}>
            <EquipmentInfo equipment={equipment} />
        </InfoPageRoot>
    );
}
