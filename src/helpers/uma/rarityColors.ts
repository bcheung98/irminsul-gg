export function getUmaRarityColor(rarity?: number) {
    switch (rarity) {
        case 5:
            return "rgb(255, 208, 112)";
        case 4:
            return "rgb(175, 134, 255)";
        case 3:
            return "rgb(105, 157, 237)";
        case 2:
            return "rgb(104, 211, 145)";
        case 1:
        default:
            return "rgb(175, 175, 175)";
    }
}

export function getUmaBackgroundColor(rarity: number, opacity = 0.45) {
    switch (rarity) {
        case 5:
            return `rgba(255, 199, 129, ${opacity})`;
        case 4:
            return `rgba(193, 153, 253, ${opacity})`;
        case 3:
            return `rgba(115, 176, 244, ${opacity})`;
        case 2:
            return `rgba(114, 169, 156, ${opacity})`;
        case 1:
        default:
            return `rgba(195, 195, 195, ${opacity})`;
    }
}

export function getUmaSkillRarityColor(rarity: number) {
    switch (rarity) {
        case 6:
            return "linear-gradient(to right, rgb(255, 238, 239), rgb(255, 154, 211))";
        case 5:
        case 4:
        case 3:
            return "linear-gradient(to right, rgb(239, 255, 214) 0%, rgb(189, 219, 255) 50%, rgb(255, 186, 231) 100%)";
        case 2:
            return "linear-gradient(to right, rgb(255, 255, 239), rgb(255, 190, 38) 50%)";
        case 1:
        default:
            return "none";
    }
}

export function getSupportCardRarityColor(rarity: number) {
    switch (rarity) {
        case 5:
            return "linear-gradient(to bottom right, #e100ffff 0%, #2c90fc 50%, #b8fd33 90%, #fec837 100%)";
        case 4:
            return "linear-gradient(to bottom right, #fad764ff 0%, #e4ba30ff 25%, #c4a235ff 50%, #e4ba30ff 75%, #fad764ff 100%)";
        case 3:
        case 2:
        case 1:
        default:
            return "linear-gradient(to bottom right, #ffffffff 0%, #c4c4c4ff 25%, #8f8f8fff 50%, #c4c4c4ff 75%, #ffffffff 100%)";
    }
}
