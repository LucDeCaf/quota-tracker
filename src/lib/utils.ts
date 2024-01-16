import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const VALID_DAYS = ["day1", "day2", "day3"] as ("day1" | "day2" | "day3")[];

const VALID_DAYS_REVERSED = ["day3", "day2", "day1"] as (
    | "day3"
    | "day2"
    | "day1"
)[];

const VALID_FIELDS = ["day1", "day2", "day3", "sold"] as (
    | "day1"
    | "day2"
    | "day3"
    | "sold"
)[];

type Field = "day1" | "day2" | "day3" | "sold";

type Quota = {
    uid: string;
    day1: number;
    day2: number;
    day3: number;
    sold: number;
};

type Options = {
    viewKind: "table" | "card";
    statDisplayMode: "normal" | "streamer";
    colouredText: boolean;
};

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

interface ViewProps {
    quotas: Quota[];
    options: Options;
    setter: Setter<Quota[]>;
}

function handleInputFieldChange(
    event: React.ChangeEvent<HTMLInputElement>,
    quota: Quota,
    field: Field,
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

export type { Field, Options, Quota, Setter, ViewProps };

export {
    VALID_DAYS,
    VALID_DAYS_REVERSED,
    VALID_FIELDS,
    cn,
    handleInputFieldChange,
};
