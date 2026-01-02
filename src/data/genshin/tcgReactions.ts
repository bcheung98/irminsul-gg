import { GenshinElement } from "@/types/genshin";

interface ReactionProps {
    element: GenshinElement;
    application?: boolean;
}

export const Bloom = ({ element, application = false }: ReactionProps) => {
    const elements = ["Hydro", "Dendro"];
    if (element === "Dendro") {
        elements.reverse();
    }
    const description = !application
        ? `DMG +1 for this instance, creates a [<span class="text-primary">Dendro Core</span>] that grants +2 DMG to the next instance of <span class="text-pyro">Pyro</span> or <span class="text-electro">Electro DMG</span>`
        : `Creates a [<span class="text-primary">Dendro Core</span>] that grants +2 DMG to the next instance of <span class="text-pyro">Pyro</span> or <span class="text-electro">Electro DMG</span>`;
    return `Icon_${elements[0]} +Icon_${elements[1]} <span class="text-primary">Bloom</span>: ${description}`;
};

export const Burning = ({ element, application = false }: ReactionProps) => {
    const elements = ["Pyro", "Dendro"];
    if (element === "Dendro") {
        elements.reverse();
    }
    const description = !application
        ? `DMG +1 for this instance, creates a [<span class="text-primary">Burning Flame</span>] that will deal 1 <span class="text-pyro">Pyro DMG</span> at the end of the Round (Takes effect once, max 2 stacks)`
        : `Creates a [<span class="text-primary">Burning Flame</span>] that will deal 1 <span class="text-pyro">Pyro DMG</span> at the end of the Round (Takes effect once, max 2 stacks)`;
    return `Icon_${elements[0]} +Icon_${elements[1]} <span class="text-primary">Burning</span>: ${description}`;
};

export const Crystallize = ({
    element,
    application = false,
}: ReactionProps) => {
    return !application
        ? `Icon_Geo +Icon_${element} <span class="text-primary">${element} Crystallize</span>: DMG +1 for this instance, your active character gains 1 Icon_Shield <span class="tooltip" data-tag="shield">Shield</span> point (Can stack, max 2 points)`
        : `Icon_Geo +Icon_${element} <span class="text-primary">${element} Crystallize</span>: The opponent's active character gains 1 Icon_Shield <span class="tooltip" data-tag="shield">Shield</span> point (Can stack, max 2 points)`;
};

export const Frozen = ({ element, application = false }: ReactionProps) => {
    const elements = ["Hydro", "Cryo"];
    if (element === "Cryo") {
        elements.reverse();
    }
    const description = !application
        ? `DMG +1 for this instance, the target is unable to perform any Actions this Round (Can be removed in advance after the target receives <span class="text-primary">Physical</span> or <span class="text-pyro">Pyro DMG</span>, in which case they will take +2 DMG)`
        : `The target is unable to perform any Actions this Round (Can be removed in advance after the target receives <span class="text-primary">Physical</span> or <span class="text-pyro">Pyro DMG</span>, in which case they will take +2 DMG)`;
    return `Icon_${elements[0]} +Icon_${elements[1]} <span class="text-primary">Frozen</span>: ${description}`;
};

export const ElectroCharged = ({
    element,
    application = false,
}: ReactionProps) => {
    const elements = ["Electro", "Hydro"];
    if (element === "Hydro") {
        elements.reverse();
    }
    const description = !application
        ? "DMG +1 for this instance, deal 1 Piercing DMG to all opposing characters except the target"
        : "No effect";
    return `Icon_${elements[0]} +Icon_${elements[1]} <span class="text-primary">Electro-Charged</span>: ${description}`;
};

export const Melt = ({ element, application = false }: ReactionProps) => {
    const elements = ["Pyro", "Cryo"];
    if (element === "Cryo") {
        elements.reverse();
    }
    const description = !application ? "DMG +2 for this instance" : "No effect";
    return `Icon_${elements[0]} +Icon_${elements[1]} <span class="text-primary">Melt</span>: ${description}`;
};

export const Overloaded = ({ element, application = false }: ReactionProps) => {
    const elements = ["Pyro", "Electro"];
    if (element === "Electro") {
        elements.reverse();
    }
    const description = !application
        ? "DMG +2 for this instance, the target is forcibly switched to the next character"
        : "The target is forcibly switched to the next character";
    return `Icon_${elements[0]} +Icon_${elements[1]} <span class="text-primary">Overloaded</span>: ${description}`;
};

export const Quicken = ({ element, application = false }: ReactionProps) => {
    const elements = ["Electro", "Dendro"];
    if (element === "Dendro") {
        elements.reverse();
    }
    const description = !application
        ? `DMG +1 for this instance, creates a [<span class="text-primary">Catalyzing Field</span>] that grants +1 DMG to the next 2 instances of <span class="text-dendro">Dendro</span> or <span class="text-electro">Electro DMG</span>`
        : `Creates a [<span class="text-primary">Catalyzing Field</span>] that grants +1 DMG to the next 2 instances of <span class="text-dendro">Dendro</span> or <span class="text-electro">Electro DMG</span>`;
    return `Icon_${elements[0]} +Icon_${elements[1]} <span class="text-primary">Quicken</span>: ${description}`;
};

export const Superconduct = ({
    element,
    application = false,
}: ReactionProps) => {
    const elements = ["Electro", "Cryo"];
    if (element === "Cryo") {
        elements.reverse();
    }
    const description = !application
        ? `DMG +1 for this instance, deal 1 <span class="text-primary">Piercing DMG</span> to all opposing characters except the target`
        : "No effect";
    return `Icon_${elements[0]} +Icon_${elements[1]} <span class="text-primary">Superconduct</span>: ${description}`;
};

export const Swirl = ({ element }: ReactionProps) => {
    return `Icon_Anemo +Icon_${element} <span class="text-primary">${element} Swirl</span>: Deals 1 <span class="text-${element.toLowerCase()}">${element} DMG</span> to all opposing characters except the target`;
};

export const Vaporize = ({ element, application = false }: ReactionProps) => {
    const elements = ["Pyro", "Hydro"];
    if (element === "Hydro") {
        elements.reverse();
    }
    const description = !application ? "DMG +2 for this instance" : "No effect";
    return `Icon_${elements[0]} +Icon_${elements[1]} <span class="text-primary">Vaporize</span>: ${description}`;
};
