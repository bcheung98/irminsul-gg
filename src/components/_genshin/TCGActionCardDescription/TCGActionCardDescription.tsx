import { useState } from "react";
import useSWR from "swr";

// Component imports
import ContentDialog from "@/components/ContentDialog";
import Text from "@/components/Text";
import SkillCard from "@/components/SkillCard";
import SkillDescription from "@/components/SkillDescription";
import TCGKeywordPopup from "../TCGKeywordPopup";

// Helper imports
import { useTCGKeywordContext } from "@/context";
import getTCGSkillKeyword from "@/helpers/genshin/getTCGSkillKeyword";
import { urls } from "@/lib/fetchData";

// Type imports
import { AttributeData } from "@/types";
import { SkillKeyword } from "@/types/skill";
import { TCGCharacterCard } from "@/types/genshin/tcg";

export default function TCGActionCardDescription({
    description,
    attributes,
}: {
    description: string;
    attributes: AttributeData;
}) {
    const keywords = useTCGKeywordContext();

    const { data, error, isLoading } = useSWR(
        urls["genshin/tcg"],
        (url: string) => fetch(url).then((r) => r.json())
    );
    let characters: TCGCharacterCard[] | undefined;
    if (!isLoading && !error) {
        characters = data;
    }

    const [currentKeyword, setCurrentKeyword] = useState<SkillKeyword | null>(
        null
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = (event: React.BaseSyntheticEvent) => {
        const keyword = getTCGSkillKeyword({
            tag: event.target.dataset.tag,
            characters,
            keywords,
            attributes,
        });
        if (keyword) {
            setCurrentKeyword(keyword);
            setDialogOpen(true);
        }
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
        setCurrentKeyword(null);
    };

    return (
        <>
            <SkillCard size={12}>
                <Text
                    component="span"
                    variant="subtitle1"
                    sx={(theme) => ({ color: theme.text.description })}
                >
                    <SkillDescription
                        game="genshin"
                        description={description}
                        onClick={handleDialogOpen}
                    />
                </Text>
            </SkillCard>
            <ContentDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                onClose={handleDialogClose}
                header={"Keywords"}
                maxWidth="md"
            >
                <TCGKeywordPopup
                    keyword={currentKeyword}
                    attributes={attributes}
                />
            </ContentDialog>
        </>
    );
}
