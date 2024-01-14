import { Quota } from "@/App";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function handleInputFieldChange(
    event: React.ChangeEvent<HTMLInputElement>,
    quota: Quota,
    field: "day1" | "day2" | "day3" | "sold",
    setter: React.Dispatch<React.SetStateAction<Quota[]>>
) {
    setter((prev) =>
        prev.map((q) => {
            switch (q.uid) {
                case quota.uid:
                    let value = event.target.value;

                    return {
                        ...quota,
                        [field]: value == "" ? 0 : Number.parseInt(value),
                    };
                    break;
                default:
                    return q;
            }
        })
    );
}
