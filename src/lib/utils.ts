import { Quota } from "@/App";
import { Options } from "@/components/options";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

export interface ViewProps {
    quotas: Quota[];
    options: Options;
    setter: Setter<Quota[]>;
}

export function handleInputFieldChange(
    event: React.ChangeEvent<HTMLInputElement>,
    quota: Quota,
    field: "day1" | "day2" | "day3" | "sold",
    setter: Setter<Quota[]>
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
