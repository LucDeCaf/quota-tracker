import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { nanoid } from "nanoid";
import { X } from 'lucide-react';

type Quota = {
    uid: string;
    day1: number;
    day2: number;
    day3: number;
    sold: number;
};

interface InputFieldProps {
    quota: Quota;
    field: "day1" | "day2" | "day3" | "sold";
    setter: React.Dispatch<React.SetStateAction<Quota[]>>;
}

function InputField({ quota, field, setter }: InputFieldProps) {
    return (
        <div className="flex flex-col gap-4">
            <Label htmlFor={`${quota.uid}-${field}`}>Day 1</Label>
            <Input
                id={`${quota.uid}-${field}`}
                type="number"
                value={quota[field]}
                onChange={(e) =>
                    setter((prev) =>
                        prev.map((q) => {
                            switch (q.uid) {
                                case quota.uid:
                                    let value = e.target.value;

                                    return {
                                        ...quota,
                                        [field]:
                                            value == ""
                                                ? 0
                                                : Number.parseInt(value),
                                    };
                                    break;
                                default:
                                    return q;
                            }
                        })
                    )
                }
            />
        </div>
    );
}

export default function App() {
    const [quotas, setQuotas] = useState<Quota[]>([]);

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
                    className="w-12 h-12 p-0"
                    onClick={() =>
                        setQuotas((prev) =>
                            prev.filter((q) => q.uid != quota.uid)
                        )
                    }
                >
                    <X />
                </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <InputField quota={quota} field="day1" setter={setQuotas} />
                <InputField quota={quota} field="day2" setter={setQuotas} />
                <InputField quota={quota} field="day3" setter={setQuotas} />
                <InputField quota={quota} field="sold" setter={setQuotas} />
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
