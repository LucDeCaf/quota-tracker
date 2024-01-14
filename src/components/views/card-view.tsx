import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Quota } from "@/App";

export interface InputFieldProps {
    quota: Quota;
    field: "day1" | "day2" | "day3" | "sold";
    setter: React.Dispatch<React.SetStateAction<Quota[]>>;
}

export interface CardViewProps {
    quotas: Quota[];
    setter: React.Dispatch<React.SetStateAction<Quota[]>>;
}

export function InputField({ quota, field, setter }: InputFieldProps) {
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

export function CardView({ quotas, setter }: CardViewProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quotas.map((quota, index) => (
                <Card key={quota.uid}>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Quota {quotas.length - index}</CardTitle>
                        <Button
                            variant="outline"
                            className="w-12 h-12 p-0"
                            onClick={() =>
                                setter((prev) =>
                                    prev.filter((q) => q.uid != quota.uid)
                                )
                            }
                        >
                            <X />
                        </Button>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <InputField
                            quota={quota}
                            field="day1"
                            setter={setter}
                        />
                        <InputField
                            quota={quota}
                            field="day2"
                            setter={setter}
                        />
                        <InputField
                            quota={quota}
                            field="day3"
                            setter={setter}
                        />
                        <InputField
                            quota={quota}
                            field="sold"
                            setter={setter}
                        />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
