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
import { Checkbox } from "../ui/checkbox";

export default function EstateWashing({ onInputChange, formData, setNext }) {
    const [flexible, setFlexible] = React.useState("nei");
    const [selectedOptions, setSelectedOptions] = React.useState([]);
    const [flexibilitySelected, setFlexibilitySelected] = React.useState(false);

    const handleCheckboxChange = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(item => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const handleDateChange = (date: Date | null) => {
        onInputChange("Når_ønsker_du_vask_av_dødsbo", date);
    };

    const options = [
        "Ønsker tømming/Bortkjøring av eiendeler",
        "Ønsker vindusvask",
        "Ønsker salg av løsøre"
    ];    
    
    React.useEffect(() => {
        onInputChange("Ekstratjenester", selectedOptions);
    }, [selectedOptions]);

    React.useEffect(() => {
        setFlexible(formData?.Er_vaskedatoen_fleksibel || "nei");
        setSelectedOptions(formData?.Ekstratjenester || []);
    }, []);

    React.useEffect(() => {
        const isValid = formData?.Når_ønsker_du_vask_av_dødsbo !== null && flexible !== "" && (flexible === "nei" || (flexible === "ja" && formData?.Fleksibilitet));
        setNext(isValid);
    }, [formData?.Når_ønsker_du_vask_av_dødsbo, flexible, flexibilitySelected, setNext]);

    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="washing date">Når ønsker du vask av dødsbo?</Label>
                <DatePicker onInputChange={handleDateChange} value={formData?.Når_ønsker_du_vask_av_dødsbo } />
            </div>
            <div className="flex flex-col space-y-1.5">
                <RadioGroup className="space-y-1" onValueChange={(e) => { setFlexible(e); setFlexibilitySelected(false); onInputChange("Er_vaskedatoen_fleksibel", e) }} value={flexible} name="flexible" defaultValue={""}>
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
                <Select onValueChange={(e) => { onInputChange("Fleksibilitet", e); setFlexibilitySelected(true); }} value={formData?.Fleksibilitet || ""}>
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

            <div className="flex flex-col space-y-2">
                <Label htmlFor="floors">Ekstratjenester</Label>
                {options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                            id={`option-${index}`}
                            checked={selectedOptions.includes(option)}
                            onCheckedChange={() => handleCheckboxChange(option)}
                        />
                        <label htmlFor={`option-${index}`} className="text-sm font-medium leading-none">
                            {option}
                        </label>
                    </div>
                ))}
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