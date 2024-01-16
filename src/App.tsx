import { OptionsMenu } from "@/components/options";
import { Button } from "@/components/ui/button";
import { CardView } from "@/components/views/card-view";
import { TableView } from "@/components/views/table-view";
import type { Options } from "@/lib/utils";
import { Quota, VALID_DAYS_REVERSED } from "@/lib/utils";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

function App() {
    const [quotas, setQuotas] = useState<Quota[]>([]);
    const [options, setOptions] = useState<Options>({
        viewKind: "table",
        statDisplayMode: "normal",
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
            view = (
                <TableView
                    quotas={quotas}
                    options={options}
                    setter={setQuotas}
                />
            );
            break;
        case "card":
            view = (
                <CardView
                    quotas={quotas}
                    options={options}
                    setter={setQuotas}
                />
            );
            break;
    }

    let statDisplay: JSX.Element;

    switch (options.statDisplayMode) {
        case "normal":
            statDisplay = (
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
            );
            break;
        case "streamer":
            statDisplay = (
                <div className="flex flex-col gap-2 font-mono">
                    <h2 className="text-2xl">Stats</h2>
                    <ul className="flex flex-col text-xl list-inside list-['-']">
                        <li>&nbsp;Total On Ship:&nbsp;&nbsp; {totalOnShip}</li>
                        <li>&nbsp;Total Sold: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{totalSold}</li>
                        <li>&nbsp;Total Collected: {totalCollected}</li>
                        <li>&nbsp;Average Per Day: {averagePerDay.toFixed(2)}</li>
                    </ul>
                </div>
            );
            break;
    }

    return (
        <>
            <main className="flex flex-col gap-6 p-8 pt-16 text-white">
                <div className="flex justify-between">
                    <h1 className="font-mono text-4xl">Quota Tracker</h1>
                    <div className="flex gap-4 font-mono">
                        <Button asChild variant="link" className="text-md">
                            <a
                                href="https://github.com/LucDeCaf/quota-tracker#readme"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                        </Button>
                        <OptionsMenu
                            options={options}
                            setOptions={setOptions}
                        />
                        <Button
                            className="text-md"
                            variant="outline"
                            onClick={() => setQuotas([])}
                        >
                            Clear
                        </Button>
                    </div>
                </div>

                {statDisplay}

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

export default App;
