import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { nanoid } from "nanoid";

type QuotaType = {
    uid: string;
    day1: number;
    day2: number;
    day3: number;
    sold: number;
};

export default function App() {
    const [quotas, setQuotas] = useState<QuotaType[]>([]);

    let totalSold = 0;
    let totalOnShip = 0;

    quotas.forEach((quota) => {
        totalSold += quota.sold;
        totalOnShip += quota.day1 + quota.day2 + quota.day3 - quota.sold;
    });

    useEffect(() => {
        let stored = localStorage.getItem("quotas");
        setQuotas((prev) => (stored ? JSON.parse(stored) : prev));
    }, []);

    useEffect(
        () => localStorage.setItem("quotas", JSON.stringify(quotas)),
        [quotas]
    );

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

    let quotaElements = quotas.map((quota, index) => (
        <Card key={quota.uid}>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Quota {quotas.length - index}</CardTitle>
                <Button
                    variant="outline"
                    onClick={() =>
                        setQuotas((prev) =>
                            prev.filter((q) => q.uid != quota.uid)
                        )
                    }
                >
                    X
                </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Label htmlFor={`${quota.uid}-day1`}>Day 1</Label>
                <Input
                    id={`${quota.uid}-day1`}
                    type="number"
                    onChange={(e) =>
                        setQuotas((prev) =>
                            prev.map((q) =>
                                q.uid == quota.uid
                                    ? {
                                          ...quota,
                                          day1: Number.parseFloat(
                                              e.target.value
                                          ),
                                      }
                                    : q
                            )
                        )
                    }
                />
                <Label htmlFor={`${quota.uid}-day2`}>Day 2</Label>
                <Input
                    id={`${quota.uid}-day2`}
                    type="number"
                    onChange={(e) =>
                        setQuotas((prev) =>
                            prev.map((q) =>
                                q.uid == quota.uid
                                    ? {
                                          ...quota,
                                          day2: Number.parseFloat(
                                              e.target.value
                                          ),
                                      }
                                    : q
                            )
                        )
                    }
                />
                <Label htmlFor={`${quota.uid}-day3`}>Day 3</Label>
                <Input
                    id={`${quota.uid}-day3`}
                    type="number"
                    onChange={(e) =>
                        setQuotas((prev) =>
                            prev.map((q) =>
                                q.uid == quota.uid
                                    ? {
                                          ...quota,
                                          day3: Number.parseFloat(
                                              e.target.value
                                          ),
                                      }
                                    : q
                            )
                        )
                    }
                />
                <Label htmlFor={`${quota.uid}-sold`}>Sold</Label>
                <Input
                    id={`${quota.uid}-sold`}
                    type="number"
                    onChange={(e) =>
                        setQuotas((prev) =>
                            prev.map((q) =>
                                q.uid == quota.uid
                                    ? {
                                          ...quota,
                                          sold: Number.parseFloat(
                                              e.target.value
                                          ),
                                      }
                                    : q
                            )
                        )
                    }
                />
            </CardContent>
        </Card>
    ));

    return (
        <main className="flex flex-col gap-6 p-8 pt-16 text-white">
            <div className="flex justify-between">
                <h1 className="font-mono text-4xl">Quota Tracker</h1>
                <div className="flex gap-2 font-mono">
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

            {quotas.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {quotaElements}
                </div>
            )}
        </main>
    );
}
