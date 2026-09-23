import { useState } from "react";

// Component imports
import ContentBox from "@/components/ContentBox";
import Text from "@/components/Text";
import {
    EquipmentTabSolo,
    EquipmentTabMulti,
    EquipmentTabsList,
} from "./EquipmentInfo.components";

// Type imports
import type { EquipmentInfo } from "./EquipmentInfo.types";

export default function EquipmentInfo({ equipment }: EquipmentInfo) {
    const { displayName, pieces } = equipment;

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (_: React.BaseSyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <ContentBox
            header={
                <Text variant="h5" weight="highlight">
                    {displayName}
                </Text>
            }
            headerProps={{ dense: false, padding: "12px 16px" }}
            contentProps={{ padding: 0 }}
        >
            {pieces ? (
                <>
                    <EquipmentTabsList
                        pieces={pieces}
                        tabValue={tabValue}
                        handleTabChange={handleTabChange}
                    />
                    {pieces.map((piece, index) => (
                        <EquipmentTabMulti
                            key={piece.type}
                            equipment={equipment}
                            piece={piece}
                            tabValue={tabValue}
                            index={index}
                        />
                    ))}
                </>
            ) : (
                <EquipmentTabSolo equipment={equipment} />
            )}
        </ContentBox>
    );
}
