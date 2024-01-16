import {
    handleInputFieldChange,
    type Setter,
    type ViewProps,
} from "@/lib/utils";
import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    TableHeader,
} from "@/components/ui/table";
import { Quota } from "@/App";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Options } from "../options";

interface TableViewItemProps {
    index: number;
    quota: Quota;
    options: Options;
    setter: Setter<Quota[]>;
}

interface TableInputFieldProps {
    quota: Quota;
    field: "day1" | "day2" | "day3" | "sold";
    setter: Setter<Quota[]>;
}

function TableInputField({ quota, field, setter }: TableInputFieldProps) {
    return (
        <Input
            value={quota[field]}
            onFocus={(e) => e.target.select()}
            onChange={(e) => handleInputFieldChange(e, quota, field, setter)}
            className="bg-transparent border-none hover:bg-inherit"
            type="number"
        />
    );
}

export function TableViewItem({
    index,
    quota,
    options,
    setter,
}: TableViewItemProps) {
    const netProfit = quota.day1 + quota.day2 + quota.day3 - quota.sold;

    return (
        <TableRow>
            <TableCell className="flex items-center gap-4">
                <Button
                    className="flex items-center justify-center w-8 h-8 p-0 text-xl"
                    variant="outline"
                    onClick={() =>
                        setter((prev) => prev.filter((q) => q.uid != quota.uid))
                    }
                >
                    <X size={16} />
                </Button>
                {index}
            </TableCell>
            <TableCell>
                <TableInputField quota={quota} field="day1" setter={setter} />
            </TableCell>
            <TableCell>
                <TableInputField quota={quota} field="day2" setter={setter} />
            </TableCell>
            <TableCell>
                <TableInputField quota={quota} field="day3" setter={setter} />
            </TableCell>
            <TableCell>
                <TableInputField quota={quota} field="sold" setter={setter} />
            </TableCell>
            <TableCell className="text-right">
                {(netProfit === 0 || !options.colouredText) && (
                    <span>{netProfit}</span>
                )}
                {options.colouredText && netProfit > 0 && (
                    <span className="text-green-500">+{netProfit}</span>
                )}
                {options.colouredText && netProfit < 0 && (
                    <span className="text-red-500">{netProfit}</span>
                )}
            </TableCell>
        </TableRow>
    );
}

export function TableView({ quotas, options, setter }: ViewProps) {
    quotas.filter((_q) => true);
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-24">Quota</TableHead>
                    <TableHead>Day 1</TableHead>
                    <TableHead>Day 2</TableHead>
                    <TableHead>Day 3</TableHead>
                    <TableHead>Sold</TableHead>
                    <TableHead className="text-right">Net Profit</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {quotas.map((quota, index) => (
                    <TableViewItem
                        index={quotas.length - index}
                        quota={quota}
                        options={options}
                        setter={setter}
                    />
                ))}
            </TableBody>
        </Table>
    );
}
