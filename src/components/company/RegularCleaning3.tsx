import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input"
import { useEffect } from "react";


export default function BuildingCleaning3({ onInputChange, formData, setNext }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onInputChange(name, value);
    };

    useEffect(() => {
        if (formData?.områdestørrelse && formData?.Hvor_mange_etasjer_skal_vaskes) {
            setNext(true);
        }else{
            setNext(false)
        }
    }, [formData?.områdestørrelse, formData?.Hvor_mange_etasjer_skal_vaskes]);

    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="områdestørrelse">Omtrent hvor stort er området som skal vaskes?</Label>
                <Input onChange={handleChange} required type="number" value={formData?.områdestørrelse} name="områdestørrelse" placeholder="60 Kvm" />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="floors">Hvor mange etasjer skal vaskes?</Label>
                <Select onValueChange={e => onInputChange("Hvor_mange_etasjer_skal_vaskes", e)} value={formData?.Hvor_mange_etasjer_skal_vaskes}>
                    <SelectTrigger id="floors">
                        <SelectValue placeholder="-- Velg antall --" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="1 floor">1 floor</SelectItem>
                        <SelectItem value="2 floors">2 floors</SelectItem>
                        <SelectItem value="3 or more floors">3 or more floors</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
