import { tv } from "tailwind-variants";

export const myProfileStyles = tv({
    slots: {
        container: "flex flex-col gap-20",
        header: "flex flex-col gap-3",
        titleRow: "flex flex-row gap-3",
        titleText: "text-5xl sm:text-6xl md:text-7xl font-semibold",
    }
});