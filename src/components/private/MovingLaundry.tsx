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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function MovingLaundry({ onInputChange, formData, setNext }) {
    const [flexible, setFlexible] = React.useState("no");
    const [flexibility, setFlexibility] = React.useState("");

    React.useEffect(() => {
        setFlexible(formData?.washing_Date_flexible || "no");
    }, []);

    const handleDateChange = (date: Date | null) => {
        onInputChange("washingDate", date);
    };

    const handleFlexibleChange = (value: string) => {
        setFlexible(value);
        onInputChange("washing_Date_flexible", value);
        if (value === "no") {
            setFlexibility("");
            onInputChange("Flexibility", "");
        }
    };

    const handleFlexibilityChange = (value: string) => {
        setFlexibility(value);
        onInputChange("Flexibility", value);
    };

    React.useEffect(() => {
        const isValid = formData?.washingDate && (flexible === "no" || flexibility);
        setNext(isValid);
    }, [formData, flexible, flexibility, setNext]);

    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="washing date">Washing date?</Label>
                <DatePicker value={formData?.washingDate} onInputChange={handleDateChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
                <RadioGroup className="space-y-1" onValueChange={handleFlexibleChange} value={flexible} name="flexible" defaultValue="no">
                    <Label htmlFor="flexible date">Is the washing date flexible?</Label>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes">yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no">no</Label>
                    </div>
                </RadioGroup>
            </div>

            {flexible === "yes" && <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Flexibility">Flexibility</Label>
                <Select onValueChange={handleFlexibilityChange} value={flexibility}>
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
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
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