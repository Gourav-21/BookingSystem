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
            formData?.Hva_slags_type_bolig_skal_vaskes &&
            formData?.Hvor_mange_etasjer_skal_vaskes &&
            formData?.Skal_hele_boligen_vaskes &&
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
                <Label htmlFor="Hva_slags_type_bolig_skal_vaskes">Hva slags type bolig skal vaskes?</Label>
                <Select onValueChange={e => onInputChange("Hva_slags_type_bolig_skal_vaskes", e)} value={formData?.Hva_slags_type_bolig_skal_vaskes}>
                    <SelectTrigger id="Hva_slags_type_bolig_skal_vaskes">
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
                <Label htmlFor="floors">Hvor mange etasjer skal vaskes?</Label>
                <Select onValueChange={e => onInputChange("Hvor_mange_etasjer_skal_vaskes", e)} value={formData?.Hvor_mange_etasjer_skal_vaskes}>
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
                <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("Skal_hele_boligen_vaskes", e)} value={formData?.Skal_hele_boligen_vaskes} name="entire home" defaultValue={""} >
                    <Label htmlFor="entire home">Skal hele boligen vaskes?</Label>
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
