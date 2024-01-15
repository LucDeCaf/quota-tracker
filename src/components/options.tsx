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

interface OptionsProps {
    viewKind: string;
    viewKindSetter: Setter<"card" | "table">;
}

export function Options({ viewKind, viewKindSetter }: OptionsProps) {
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
                        <Select
                            onValueChange={(v) =>
                                viewKindSetter(v as "card" | "table")
                            }
                        >
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={
                                        viewKind[0].toUpperCase() +
                                        viewKind.slice(1)
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
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
