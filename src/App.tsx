import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CardView } from "@/components/views/card-view";
import { TableView } from "@/components/views/table-view";
import { OptionsMenu } from "@/components/options";
import type { Options } from "@/components/options";
import { nanoid } from "nanoid";

export type Quota = {
    uid: string;
    day1: number;
    day2: number;
    day3: number;
    sold: number;
};

const VALID_DAYS_REVERSED = ["day3", "day2", "day1"] as (
    | "day1"
    | "day2"
    | "day3"
)[];

export default function App() {
    const [quotas, setQuotas] = useState<Quota[]>([]);
    const [options, setOptions] = useState<Options>({
        viewKind: "table",
        colouredText: true,
    });

    const addQuota = () => {
        setQuotas((prev) => [
            {
                uid: nanoid(),
                day1: 0,
                day2: 0,
                day3: 0,
                sold: 0,
            },
            ...prev,
        ]);
    };

    useEffect(() => {
        const storedQuotas = localStorage.getItem("quotas");
        const storedOptions = localStorage.getItem("options");
        setQuotas((prev) => (storedQuotas ? JSON.parse(storedQuotas) : prev));
        setOptions((prev) =>
            storedOptions ? JSON.parse(storedOptions) : prev
        );
    }, []);

    useEffect(
        () => localStorage.setItem("quotas", JSON.stringify(quotas)),
        [quotas]
    );

    useEffect(
        () => localStorage.setItem("options", JSON.stringify(options)),
        [options]
    );

    let totalSold = 0;
    let totalCollected = 0;

    let foundNumber = false;
    let dayCount = 0;

    for (let quota of quotas) {
        for (let day of VALID_DAYS_REVERSED) {
            if (quota[day] === 0) {
                if (!foundNumber) continue;
            }

            foundNumber = true;

            dayCount++;

            totalCollected += quota[day];
        }
        totalSold += quota.sold;
    }

    const totalOnShip = totalCollected - totalSold;
    const averagePerDay = dayCount === 0 ? 0 : totalCollected / dayCount;

    let view: JSX.Element;

    switch (options.viewKind) {
        case "table":
            view = <TableView quotas={quotas} setter={setQuotas} />;
            break;
        case "card":
            view = <CardView quotas={quotas} setter={setQuotas} />;
            break;
    }

    return (
        <>
            <main className="flex flex-col gap-6 p-8 pt-16 text-white">
                <div className="flex justify-between">
                    <h1 className="font-mono text-4xl">Quota Tracker</h1>
                    <div className="flex gap-4 font-mono">
                        <OptionsMenu
                            options={options}
                            setOptions={setOptions}
                        />
                        <Button variant="outline" onClick={() => setQuotas([])}>
                            Clear
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 font-mono text-2xl md:gap-x-12 md:grid-cols-2 2xl:grid-cols-4">
                    <p className="flex justify-between">
                        <span>Total On Ship:</span>
                        <span>{totalOnShip}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Total Sold:</span>
                        <span>{totalSold}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Total Collected:</span>
                        <span>{totalCollected}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Average Per Day:</span>
                        <span>{averagePerDay.toFixed(2)}</span>
                    </p>
                </div>

                <Button
                    variant="outline"
                    className="font-mono text-3xl"
                    onClick={addQuota}
                >
                    Add Quota
                </Button>

                {view}
            </main>
        </>
    );
}
