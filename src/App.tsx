import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./components/ui/button";

type QuotaType = {
    id: number;
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

    let lastId = quotas.length;

    const addQuota = () => {
        lastId++;
        setQuotas((prev) => [
            ...prev,
            {
                id: lastId,
                day1: 0,
                day2: 0,
                day3: 0,
                sold: 0,
            },
        ]);
    };

    const updateQuota = (id: number, state: QuotaType) => {
        setQuotas((prev) =>
            prev.map((quota) => (quota.id == id ? state : quota))
        );
    };

    let quotaElements = quotas.map((quota) => (
        <Card>
            <CardHeader>
                <CardTitle>Quota {quota.id}</CardTitle>
            </CardHeader>
            <CardContent>
                
            </CardContent>
        </Card>
    ));

    return (
        <main className="flex flex-col gap-6 p-8 pt-16 text-white">
            <h1 className="font-mono text-4xl">Quota Tracker</h1>

            <Button variant="outline" className="font-mono text-3xl" onClick={addQuota}>
                Add Quota
            </Button>

            {quotas.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {quotaElements}
                </div>
            ) : (
                <h2></h2>
            )}            
        </main>
    );
}
