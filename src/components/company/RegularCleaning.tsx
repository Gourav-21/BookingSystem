import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils"

export default function RegularCleaning({ formData, onInputChange, setNext }) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [field, setField] = useState(1);


    const options = [
        "Office",
        "Stock/production",
        "Combination room",
        "Shop/trade",
        "Serving",
        "Instruction",
        "Other"
    ];

    useEffect(() => {
        if (formData?.what_type_of_premises_should_be_washed && formData.what_type_of_premises_should_be_washed.length != "" && formData?.frequency && formData.day0 && formData.time0){
            setNext(true)
        } else {
            setNext(false)
        }
    }, [formData])


    useEffect(() => {
        onInputChange("what_type_of_premises_should_be_washed", selectedOptions);
    }, [selectedOptions]);

    useEffect(() => {
        setSelectedOptions(formData?.what_type_of_premises_should_be_washed || [])
    }, [])

    const handleCheckboxChange = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(item => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
                <Label htmlFor="what_type_of_premises_should_be_washed">What type of premises should be washed?</Label>
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
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="frequency">How often do you want laundry help?</Label>
                <Select onValueChange={e => onInputChange("frequency", e)} value={formData?.frequency}>
                    <SelectTrigger id="frequency">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Several times a week">Several times a week</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="Biweekly">Biweekly</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="frequency">Add at least one suitable day and time</Label>
                {Array.from(Array(field)).map((_, index) => {
                    return (
                        <div key={index} className="flex">
                            <Select onValueChange={e => onInputChange("day" + index, e)} value={formData?.[`day${index}`]}>
                                <SelectTrigger className="rounded-r-none" id={`day${index}`}>
                                    <SelectValue placeholder="washing day" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="monday">monday</SelectItem>
                                    <SelectItem value="tuesday">tuesday</SelectItem>
                                    <SelectItem value="wednesday">wednesday</SelectItem>
                                    <SelectItem value="thursday">thursday</SelectItem>
                                    <SelectItem value="friday">friday</SelectItem>
                                    <SelectItem value="saturday">saturday</SelectItem>
                                    <SelectItem value="sunday">sunday</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select onValueChange={e => onInputChange("time" + index, e)} value={formData?.[`time${index}`]}>
                                <SelectTrigger className="rounded-l-none" id={`time${index}`}>
                                    <SelectValue placeholder="time" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="06:00 - 09:00">06:00 - 09:00</SelectItem>
                                    <SelectItem value="09:00 - 12:00">09:00 - 12:00</SelectItem>
                                    <SelectItem value="12:00 - 15:00">12:00 - 15:00</SelectItem>
                                    <SelectItem value="15:00 - 18:00">15:00 - 18:00</SelectItem>
                                    <SelectItem value="18:00 - 21:00">18:00 - 21:00</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )
                })}
            </div>
            <div className="flex">
                <Button variant="outline" className={cn("rounded-r-none", field === 1 && "rounded")} onClick={() => setField(field + 1)}>Add More</Button>
                {field > 1 &&
                    <Button variant="outline" className="rounded-l-none" disabled={field === 1} onClick={() => setField(field - 1)}>remove</Button>
                }
            </div>
        </div>
    )
}
