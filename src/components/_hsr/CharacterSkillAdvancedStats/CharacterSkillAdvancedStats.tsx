// Component imports
import * as Table from "@/components/Table";
import Image from "@/components/Image";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";

// Type imports
import { HSRCharacterSkill } from "@/types/hsr/character";

export default function CharacterSkillAdvancedStats({
    skill,
}: {
    skill: HSRCharacterSkill;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const rows = [];

    if ("cost" in skill) {
        const skillCost = getSkillCost(
            skill.cost?.type || "",
            skill.cost?.value || 0,
            matches
        );
        rows.push({
            key: skillCost.cost,
            value: skillCost.value,
        });
    }
    skill.regen &&
        rows.push({
            key: <span>{`Energy Generation`}</span>,
            value: (
                <span style={{ color: theme.text.hsr.highlight2 }}>
                    {skill.regen}
                </span>
            ),
        });
    skill.break &&
        rows.push({
            key: <span>{`Toughness Reduction`}</span>,
            value: Object.entries(skill.break).map(([key, value], index) => (
                <div key={index} style={{ display: "inline-block" }}>
                    <span>{`${key}: `}</span>
                    <span
                        style={{
                            color: theme.text.hsr.highlight2,
                        }}
                    >
                        {value}
                    </span>
                    {index !== Object.entries(skill.break!).length - 1 && (
                        <span
                            style={{
                                margin: "0 4px 0 4px",
                            }}
                        >
                            /
                        </span>
                    )}
                </div>
            )),
        });

    const tableRowStyle = {
        backgroundColor: theme.background(0, "light"),
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    };

    const tableCellStyle = {
        borderColor: "transparent",
        padding: "6px 12px",
    };

    if (rows.length === 0) {
        return <></>;
    }

    return (
        <Table.Container
            component={Card}
            sx={{
                minWidth: {
                    xs: "100%",
                    md: "400px",
                },
                width: {
                    xs: "100%",
                    md: "60%",
                    lg: "40%",
                },
            }}
        >
            <Table.Root size="small">
                <Table.Body>
                    {rows.map((row, index) => (
                        <Table.Row
                            key={index}
                            color="secondary"
                            sx={tableRowStyle}
                        >
                            <Table.Cell
                                align="left"
                                label={{ title: row.key }}
                                {...tableCellStyle}
                            />
                            <Table.Cell
                                align="right"
                                label={{ title: row.value || "???" }}
                                {...tableCellStyle}
                            />
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Table.Container>
    );
}

function getSkillCost(type: string, cost: number | string, matches: boolean) {
    const theme = useTheme();

    const costType = type === "SP" || type === "Energy" ? `${type}` : "Ability";
    let costValue;
    if (type === "SP") {
        costValue = [...Array(cost).keys()].map((index) => (
            <Image
                key={index}
                src={"hsr/icons/SkillPoint"}
                style={{
                    height: matches ? "16px" : "14px",
                    marginBottom: matches ? "-4px" : "-2px",
                    pointerEvents: "none",
                }}
            />
        ));
    } else if (type === "Energy") {
        costValue = (
            <span style={{ color: theme.text.hsr.highlight2 }}>{cost}</span>
        );
    } else {
        costValue = (
            <>
                <span style={{ color: theme.text.hsr.header }}>{cost}</span>
                <span style={{ color: theme.text.hsr.highlight2 }}>
                    {typeof cost === "string"
                        ? ` of ${type}`
                        : ` points of ${type}`}
                </span>
            </>
        );
    }

    return {
        cost: <span>{`${costType} Cost`}</span>,
        value: costValue,
    };
}
