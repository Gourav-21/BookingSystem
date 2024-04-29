import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DisplayWash2({ onInputChange, formData, setNext }) {
    const [flexible, setFlexible] = React.useState("nei");
    const [flexibility, setFlexibility] = React.useState("");

    React.useEffect(() => {
        setFlexible(formData?.Er_vaskedatoen_fleksibel || "nei");
    }, []);

    const handleDateChange = (date: Date | null) => {
        onInputChange("washingDate", date);
    };

    const handleFlexibleChange = (value: string) => {
        setFlexible(value);
        onInputChange("Er_vaskedatoen_fleksibel", value);
        if (value === "nei") {
            setFlexibility("");
            onInputChange("Fleksibilitet", "");
        }
    };

    const handleFlexibilityChange = (value: string) => {
        setFlexibility(value);
        onInputChange("Fleksibilitet", value);
    };

    React.useEffect(() => {
        const isValid = formData?.washingDate && (flexible === "nei" || formData?.Fleksibilitet);
        setNext(isValid);
    }, [formData, flexible, flexibility, setNext]);

    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="washing date">Når ønsker du vask?</Label>
                <DatePicker value={formData?.washingDate} onInputChange={handleDateChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
                <RadioGroup className="space-y-1" onValueChange={handleFlexibleChange} value={flexible} name="flexible" defaultValue="nei">
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
                <Label htmlFor="Flexibility">Flexibility</Label>
                <Select onValueChange={handleFlexibilityChange} value={formData?.Fleksibilitet}>
                    <SelectTrigger id="Flexibility">
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
                    disabled={(day) => day.getTime() < new Date().setHours(0, 0, 0, 0)}                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}