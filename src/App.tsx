import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CardView } from "@/components/views/card-view";
import { TableView } from "@/components/views/table-view";
import { Options } from "@/components/options";
import { nanoid } from "nanoid";

export type Quota = {
    uid: string;
    day1: number;
    day2: number;
    day3: number;
    sold: number;
};

const DEFAULT_VIEW = "table";

export default function App() {
    const [quotas, setQuotas] = useState<Quota[]>([]);
    const [viewKind, setViewKind] = useState<"table" | "card">(DEFAULT_VIEW);

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
        let stored = localStorage.getItem("quotas");
        setQuotas((prev) => (stored ? JSON.parse(stored) : prev));
    }, []);

    useEffect(
        () => localStorage.setItem("quotas", JSON.stringify(quotas)),
        [quotas]
    );

    let totalSold = 0;
    let totalOnShip = 0;

    quotas.forEach((quota) => {
        totalSold += quota.sold;
        totalOnShip += quota.day1 + quota.day2 + quota.day3 - quota.sold;
    });

    let view: JSX.Element;

    switch (viewKind) {
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
                        <Options viewKind={viewKind} viewKindSetter={setViewKind} />
                        <Button variant="outline" onClick={() => setQuotas([])}>
                            Clear
                        </Button>
                    </div>
                </div>

                <div className="font-mono text-2xl">
                    <p>Total On Ship: {totalOnShip}</p>
                    <p>Total Sold: &nbsp;&nbsp;&nbsp;{totalSold}</p>
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
