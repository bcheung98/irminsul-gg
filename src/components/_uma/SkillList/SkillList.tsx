import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    useTransition,
} from "react";

// Component imports
import SkillListRow from "./SkillListRow";

// MUI imports
import Card from "@mui/material/Card";
import LinearProgress from "@mui/material/LinearProgress";

// Type imports
import type { UmaSkill } from "@/types/uma/skill";

const INITIAL_COUNT = 60;
const BATCH_SIZE = 60;
const PRELOAD_MARGIN = 600; // px

export default function SkillList({ skills }: { skills: UmaSkill[] }) {
    const [isPending, startTransition] = useTransition();

    const listRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);

    // Associate the visible count with its result set to avoid
    // rendering the previous count when search or filters change.
    const [renderState, setRenderState] = useState({
        skills,
        visibleCount: INITIAL_COUNT,
    });

    const count = Math.min(
        renderState.skills === skills
            ? renderState.visibleCount
            : INITIAL_COUNT,
        skills.length,
    );

    useLayoutEffect(() => {
        // Reset progressive rendering when the results change.
        setRenderState((current) =>
            current.skills === skills
                ? current
                : {
                      skills,
                      visibleCount: INITIAL_COUNT,
                  },
        );

        // Return to the start of the list, accounting for the
        // fixed header, without scrolling users who are above it.
        const element = listRef.current;
        if (!element) return;

        const top = element.getBoundingClientRect().top + window.scrollY - 144;

        if (window.scrollY > top) {
            window.scrollTo({
                top,
                behavior: "instant",
            });
        }
    }, [skills]);

    useEffect(() => {
        const sentinel = sentinelRef.current;

        // Stop observing once every skill is rendered or
        // while the next batch is loading.
        if (!sentinel || count >= skills.length || isPending) return;

        // Preload the next batch before the user
        // reaches the bottom of the rendered list.
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;

                // Prevent multiple requests for the same batch.
                observer.disconnect();

                startTransition(() => {
                    setRenderState((current) => ({
                        skills,
                        visibleCount: Math.min(
                            (current.skills === skills
                                ? current.visibleCount
                                : INITIAL_COUNT) + BATCH_SIZE,
                            skills.length,
                        ),
                    }));
                });
            },
            {
                root: null,
                rootMargin: `${PRELOAD_MARGIN}px 0px`,
            },
        );

        observer.observe(sentinel);

        return () => observer.disconnect();
    }, [count, skills, isPending]);

    return (
        <>
            <Card>
                <div ref={listRef}>
                    {skills.slice(0, count).map((skill, index) => (
                        <SkillListRow
                            key={skill.id}
                            skill={skill}
                            index={index}
                        />
                    ))}
                </div>
                {/* The sentinel remains at the bottom of the list as additional rows are rendered. */}
                {count < skills.length && (
                    <div ref={sentinelRef} aria-hidden="true" />
                )}
            </Card>
            {isPending && <LinearProgress color="info" />}
        </>
    );
}
