import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function RegularCleaning2({ onInputChange, formData, setNext }) {
    const [field, setField] = useState(1);

    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        let valid = formData?.frequency && formData?.frequency.trim() !== "";
        for (let i = 0; i < field; i++) {
            if (!(formData[`day${i}`] && formData[`time${i}`])) {
                valid = false;
                break;
            }
        }
        setIsValid(valid);
    }, [formData, field]);

    useEffect(() => {
        setNext(isValid);
    }, [isValid, setNext]);

    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="frequency">How often do you want laundry help?</Label>
                <Select onValueChange={e => onInputChange("frequency", e)} value={formData?.frequency}>
                    <SelectTrigger id="frequency">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="several times a week">several times a week</SelectItem>
                        <SelectItem value="every week">every week</SelectItem>
                        <SelectItem value="biweekly">biweekly</SelectItem>
                        <SelectItem value="every three week">every three week</SelectItem>
                        <SelectItem value="each month">each month</SelectItem>
                        <SelectItem value="other">other</SelectItem>
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
    );
}

