import { RadioGroup } from "@radix-ui/react-radio-group"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { RadioGroupItem } from "../ui/radio-group"
import { Input } from "../ui/input"
import { useEffect } from "react"

export default function MajorCleaning({ onInputChange, formData, setNext }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onInputChange(name, value);
    };

    useEffect(() => {
        const isValid = formData?.type_of_home && formData?.Should_entire_home_be_washed !== undefined && formData?.area_size !== undefined;
        setNext(isValid);
    }, [formData, setNext]);

    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="type_of_home">What type of home should be washed?</Label>
                <Select onValueChange={e => onInputChange("type_of_home", e)} value={formData?.type_of_home}>
                    <SelectTrigger id="type_of_home">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="detached home">detached home</SelectItem>
                        <SelectItem value="terraced home">terraced home</SelectItem>
                        <SelectItem value="apartment">apartment</SelectItem>
                        <SelectItem value="semi-detached home">semi-detached home</SelectItem>
                        <SelectItem value="cabin or holiday home">cabin or holiday home</SelectItem>
                        <SelectItem value="other">other</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
                <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("Should_entire_home_be_washed", e)} value={formData?.Should_entire_home_be_washed} name="entire home" defaultValue={""} >
                    <Label htmlFor="entire home">Should the entire home be washed?</Label>
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
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="area_size">Approximately how large is the area to be washed?</Label>
                <Input onChange={handleChange} required type="number" value={formData?.area_size} name="area_size" placeholder="70 sq m" />
            </div>
        </div>
    )
}

