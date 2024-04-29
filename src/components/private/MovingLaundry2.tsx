import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input"
import { useEffect, useState } from "react";


export default function MovingLaundry2({ onInputChange, formData, setNext }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onInputChange(name, value);
    };
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const isFormValid = (
            formData?.type_of_home &&
            formData?.How_many_floors_must_be_washed &&
            formData?.Should_entire_home_be_washed &&
            formData?.Omtrent_hvor_stort_areal_skal_vaskes
        );
        setIsValid(isFormValid);
    }, [formData]);

    useEffect(() => {
        setNext(isValid);
    }, [isValid, setNext]);
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
                <Label htmlFor="floors">How many floors must be washed?</Label>
                <Select onValueChange={e => onInputChange("How_many_floors_must_be_washed", e)} value={formData?.How_many_floors_must_be_washed}>
                    <SelectTrigger id="floors">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="1 floor">1 floor</SelectItem>
                        <SelectItem value="2 floors">2 floors</SelectItem>
                        <SelectItem value="3 or more floors">3 or more floors</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
                <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("Should_entire_home_be_washed", e)} value={formData?.Should_entire_home_be_washed} name="entire home" defaultValue={""} >
                    <Label htmlFor="entire home">Should the entire home be washed?</Label>
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
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Omtrent_hvor_stort_areal_skal_vaskes">Omtrent hvor stort areal skal vaskes?</Label>
                <Input onChange={handleChange} required type="number" value={formData?.Omtrent_hvor_stort_areal_skal_vaskes} name="Omtrent_hvor_stort_areal_skal_vaskes" placeholder="70 sq m" />
            </div>

        </div>
    );
}
