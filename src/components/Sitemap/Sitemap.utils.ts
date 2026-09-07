import { blogList } from "@/data/blog-list";
import { navItems } from "@/data/navItems";

const SORT_LEVEL_PRIORITY = ["/", "/calendar", "/privacy-policy", "/blog"];

export interface RouteNode {
    path: string;
    children: RouteNode[];
}

export function buildRouteTree(paths: string[]): RouteNode[] {
    const root: RouteNode = {
        path: "",
        children: [],
    };

    for (const path of paths) {
        const parts = path.split("/").filter(Boolean);

        let current = root;
        if (parts.length === 0) {
            current.children.push({
                path: "/",
                children: [],
            });
            continue;
        }

        let fullPath = "";

        for (const part of parts) {
            fullPath += `/${part}`;

            let child = current.children.find((node) => node.path === fullPath);
            if (!child) {
                child = {
                    path: fullPath,
                    children: [],
                };

                current.children.push(child);
            }
            current = child;
        }
    }

    sortRouteTree(root.children);
    return root.children;
}

function sortRouteTree(nodes: RouteNode[], depth = 0) {
    nodes.sort((a, b) => {
        if (depth === 0) {
            return sortTopLevel(a, b);
        }
        if (depth === 1) {
            return sortGameRoutes(a, b);
        }
        return a.path.localeCompare(b.path, undefined, {
            numeric: true,
        });
    });

    for (const node of nodes) {
        sortRouteTree(node.children, depth + 1);
    }
}

function sortTopLevel(a: RouteNode, b: RouteNode) {
    const ai = SORT_LEVEL_PRIORITY.indexOf(a.path);
    const bi = SORT_LEVEL_PRIORITY.indexOf(b.path);

    if (ai !== -1 || bi !== -1) {
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
    }
    return a.path.localeCompare(b.path);
}

function sortGameRoutes(a: RouteNode, b: RouteNode) {
    const game = a.path.split("/")[1] as keyof typeof navItems;
    const items = navItems[game];

    if (!items) {
        if (a.path.includes("/blog") || b.path.includes("/blog")) {
            const slugs = blogList.map((blog) => blog.slug).reverse();
            const ai = slugs.indexOf(a.path.split("/")[2]);
            const bi = slugs.indexOf(b.path.split("/")[2]);
            if (ai !== -1 || bi !== -1) {
                if (ai === -1) return 1;
                if (bi === -1) return -1;
                return ai - bi;
            }
        }
        return a.path.localeCompare(b.path);
    }

    const routeOrder = items
        .filter((item) => item.href)
        .map((item) => `/${game}/${item.href}`);

    const aIndex = routeOrder.indexOf(a.path);
    const bIndex = routeOrder.indexOf(b.path);

    if (aIndex !== -1 || bIndex !== -1) {
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
    }

    return a.path.localeCompare(b.path);
}

export function isLeafList(nodes: RouteNode[]) {
    return (
        nodes.length > 0 && nodes.every((node) => node.children.length === 0)
    );
}
