import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Setter } from "@/lib/utils";

export type Options = {
    viewKind: "table" | "card";
    colouredText: boolean;
};

interface OptionsProps {
    options: Options;
    setOptions: Setter<Options>;
}

export function OptionsMenu({ options, setOptions }: OptionsProps) {
    const viewKindSelect = (
        <Select
            onValueChange={(v) =>
                setOptions((prev) => ({
                    ...prev,
                    viewKind: v as "table" | "card",
                }))
            }
        >
            <SelectTrigger>
                <SelectValue
                    placeholder={
                        options.viewKind[0].toUpperCase() +
                        options.viewKind.slice(1)
                    }
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Views</SelectLabel>
                    <SelectItem defaultChecked value="table">
                        Table
                    </SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );

    return (
        <Dialog>
            <DialogTrigger className="hover:underline underline-offset-4">
                Options
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-6">
                <DialogHeader className="flex flex-col gap-2">
                    <DialogTitle>Options</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col w-1/2 gap-2">
                        <Label>View Kind</Label>
                        {viewKindSelect}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
