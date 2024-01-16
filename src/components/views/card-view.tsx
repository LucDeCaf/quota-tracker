import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Field, Setter, ViewProps } from "@/lib/utils";
import {
    Options,
    VALID_FIELDS,
    handleInputFieldChange,
    type Quota,
} from "@/lib/utils";
import { X } from "lucide-react";

interface CardInputFieldProps {
    quota: Quota;
    options: Options;
    field: Field;
    setter: Setter<Quota[]>;
}

interface CardItemProps {
    quota: Quota;
    options: Options;
    index: number;
    setter: Setter<Quota[]>;
}

function CardInputField({
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
        <div className="flex flex-col gap-2">
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

function CardItem({ quota, index, options, setter }: CardItemProps) {
    const netProfit = quota.day1 + quota.day2 + quota.day3 - quota.sold;

    return (
        <Card key={quota.uid}>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Quota {index}</CardTitle>
                <Button
                    variant="outline"
                    className="w-12 h-12 p-0"
                    onClick={() =>
                        setter((prev) => prev.filter((q) => q.uid != quota.uid))
                    }
                >
                    <X />
                </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <div className="flex justify-between pr-2 text-xl">
                    <span>Net Profit: </span>
                    {(netProfit === 0 || !options.colouredText) && (
                        <span>{netProfit}</span>
                    )}
                    {options.colouredText && netProfit > 0 && (
                        <span className="text-green-500">+{netProfit}</span>
                    )}
                    {options.colouredText && netProfit < 0 && (
                        <span className="text-red-500">{netProfit}</span>
                    )}
                </div>
                <hr />
                <div className="flex flex-col gap-4">
                    {VALID_FIELDS.map((field) => (
                        <CardInputField
                            quota={quota}
                            options={options}
                            field={field}
                            setter={setter}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function CardView({ quotas, options, setter }: ViewProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {quotas.map((quota, index) => (
                <CardItem
                    key={quota.uid}
                    quota={quota}
                    index={quotas.length - index}
                    options={options}
                    setter={setter}
                />
            ))}
        </div>
    );
}

export { CardView };
