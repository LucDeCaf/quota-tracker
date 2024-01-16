import { useState } from "react";

import {
    Dialog,
    DialogClose,
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
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Options, Setter } from "@/lib/utils";

interface OptionsMenuProps {
    options: Options;
    setOptions: Setter<Options>;
}

function OptionsMenu({ options, setOptions }: OptionsMenuProps) {
    const [tempOptions, setTempOptions] = useState<Options>(options);

    const viewKindSelect = (
        <Select
            onValueChange={(viewKind) =>
                setTempOptions((prev) => ({
                    ...prev,
                    viewKind: viewKind as "table" | "card",
                }))
            }
        >
            <SelectTrigger>
                <SelectValue
                    placeholder={
                        tempOptions.viewKind[0].toUpperCase() +
                        tempOptions.viewKind.slice(1)
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

    const colouredTextSwitch = (
        <Switch
            checked={tempOptions.colouredText}
            onCheckedChange={(checked) =>
                setTempOptions((prev) => ({
                    ...prev,
                    colouredText: checked,
                }))
            }
        />
    );

    const handleSave = () => {
        setOptions(tempOptions);
    };

    return (
        <Dialog>
            <DialogTrigger
                className="hover:underline underline-offset-4"
                onClick={() => setTempOptions(options)}
            >
                Options
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-6">
                <DialogHeader className="flex flex-col gap-2">
                    <DialogTitle>Options</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <Label>View Kind</Label>
                        {viewKindSelect}
                    </div>
                    <div className="flex items-center justify-between">
                        <Label>Colour text based on amount</Label>
                        {colouredTextSwitch}
                    </div>
                    <DialogClose
                        className="text-md"
                        type="submit"
                        onClick={handleSave}
                    >
                        Save Changes
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export { OptionsMenu };
