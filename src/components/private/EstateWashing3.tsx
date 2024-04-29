import * as React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "../ui/textarea";

export default function EstateWashing3({ onInputChange, formData, setNext }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onInputChange(name, value);
    };

    React.useEffect(() => {
        const isValid = formData?.Hvor_mange_etasjer_har_bygningen;
        setNext(isValid);
    }, [formData, setNext]);

    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Hvor_mange_etasjer_har_bygningen">Hvor mange etasjer har bygningen?</Label>
                <Select onValueChange={e => onInputChange("Hvor_mange_etasjer_har_bygningen", e)} value={formData?.Hvor_mange_etasjer_har_bygningen}>
                    <SelectTrigger id="Hvor_mange_etasjer_har_bygningen">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4+">4 +</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="area">Øvrige ønsker (frivillig)</Label>
                <Textarea onChange={handleChange} value={formData?.Øvrige_ønsker || ''} name="Øvrige_ønsker" placeholder="Opplys vaskefirmaet om eventuelle ønsker." />
            </div>
        </div>
    );
}
