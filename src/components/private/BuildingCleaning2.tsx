import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function BuildingCleaning2({ onInputChange, formData, setNext }) {
    const [flexible, setFlexible] = useState("nei");

    React.useEffect(() => {
        setFlexible(formData?.Er_vaskedatoen_fleksibel || "nei");
    }, [])

    React.useEffect(() => {
        const isValid = formData?.Når_ønsker_du_byggrengjøring && formData?.Hva_slags_type_bolig_skal_vaskes && (flexible === "ja" ? formData?.Fleksibilitet : true);
        setNext(isValid);
    }, [formData, flexible, setNext]);

    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="washing date">Når ønsker du byggrengjøring??</Label>
                <DatePicker onInputChange={(e) => onInputChange("Når_ønsker_du_byggrengjøring", e)} value={formData?.Når_ønsker_du_byggrengjøring} />
            </div>
            <div className="flex flex-col space-y-1.5">
                <RadioGroup className="space-y-1" onValueChange={(e) => { setFlexible(e); onInputChange("Er_vaskedatoen_fleksibel", e) }} name="flexible" defaultValue={flexible} value={flexible} >
                    <Label htmlFor="flexible date">Er vaskedatoen fleksibel?</Label>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ja" id="ja" />
                        <Label htmlFor="ja">ja</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nei" id="nei" />
                        <Label htmlFor="nei">nei</Label>
                    </div>
                </RadioGroup>
            </div>

            {flexible === "ja" && <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Fleksibilitet">Fleksibilitet</Label>
                <Select onValueChange={e => onInputChange("Fleksibilitet", e)} value={formData?.Fleksibilitet}>
                    <SelectTrigger id="Fleksibilitet">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="+-1 day">+-1 day</SelectItem>
                        <SelectItem value="+-2 days">+-2 days</SelectItem>
                        <SelectItem value="+-3 days">+-3 days</SelectItem>
                        <SelectItem value="+-1 week">+-1 week</SelectItem>
                        <SelectItem value="+-2 weeks">+-2 weeks</SelectItem>
                        <SelectItem value="+-1 month">+-1 month</SelectItem>
                        <SelectItem value="+-more than 1 month">+-more than 1 month</SelectItem>
                    </SelectContent>
                </Select>
            </div>}

            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Hva_slags_type_bolig_skal_vaskes">Hva slags type bolig skal vaskes?</Label>
                <Select onValueChange={e => onInputChange("Hva_slags_type_bolig_skal_vaskes", e)} value={formData?.Hva_slags_type_bolig_skal_vaskes}>
                    <SelectTrigger id="Hva_slags_type_bolig_skal_vaskes">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="Enebolig">Enebolig</SelectItem>
                        <SelectItem value="Leilighet">Leilighet</SelectItem>
                        <SelectItem value="Rekkehus">Rekkehus</SelectItem>
                        <SelectItem value="Tomannsbolig">Tomannsbolig</SelectItem>
                        <SelectItem value="Hytte eller fritidshus">Hytte eller fritidshus</SelectItem>
                        <SelectItem value="Annet">Annet</SelectItem>
                    </SelectContent>
                </Select>
            </div>

        </div>
    );
}

export function DatePicker({ value, onInputChange }) {
    const [date, setDate] = React.useState<Date>(value || null);

    React.useEffect(() => {
        onInputChange(date);
    }, [date])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        " justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Velg dato</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    disabled={(day) => day.getTime() < new Date().setHours(0, 0, 0, 0)} onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}