import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { VALID_FIELDS, type Quota } from "@/App";
import type { ViewProps } from "@/lib/utils";
import { handleInputFieldChange } from "@/lib/utils";
import { Options } from "../options";

export interface CardInputFieldProps {
    quota: Quota;
    options: Options;
    field: "day1" | "day2" | "day3" | "sold";
    setter: React.Dispatch<React.SetStateAction<Quota[]>>;
}

export function CardInputField({
    quota,
    field,
    options: _options,
    setter,
}: CardInputFieldProps) {
    let label: string;

    switch (field) {
        case "day1":
            label = "Day 1";
            break;
        case "day2":
            label = "Day 2";
            break;
        case "day3":
            label = "Day 3";
            break;
        case "sold":
            label = "Sold";
            break;
        default:
            label = "";
    }

    return (
        <div className="flex flex-col gap-4">
            <Label htmlFor={`${quota.uid}-${field}`}>{label}</Label>
            <Input
                id={`${quota.uid}-${field}`}
                type="number"
                value={quota[field]}
                onFocus={(e) => e.target.select()}
                onChange={(e) =>
                    handleInputFieldChange(e, quota, field, setter)
                }
            />
        </div>
    );
}

export function CardView({ quotas, options, setter }: ViewProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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
                        {VALID_FIELDS.map((field) => (
                            <CardInputField
                                quota={quota}
                                options={options}
                                field={field}
                                setter={setter}
                            />
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
