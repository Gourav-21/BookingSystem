import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input"
import { useEffect } from "react";


export default function MovingLaundry2({ onInputChange, formData, setNext }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onInputChange(name, value);
    };

    useEffect(() => {
        if (formData?.Omtrent_hvor_stort_areal_skal_vaskes && formData?.Hvor_mange_etasjer_skal_vaskes && formData?.Hva_slags_type_lokale_skal_vaskes) {
            setNext(true);
        } else {
            setNext(false)
        }
    }, [formData?.Omtrent_hvor_stort_areal_skal_vaskes, formData?.Hvor_mange_etasjer_skal_vaskes, formData?.Hva_slags_type_lokale_skal_vaskes]);

    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="premises">Hva slags type lokale skal vaskes?</Label>
                <Select onValueChange={e => onInputChange("Hva_slags_type_lokale_skal_vaskes", e)} value={formData?.Hva_slags_type_lokale_skal_vaskes}>
                    <SelectTrigger id="premises">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="Kontor">Kontor</SelectItem>
                        <SelectItem value="Lager/produksjon">Lager/produksjon</SelectItem>
                        <SelectItem value="Kombinasjonslokale">Kombinasjonslokale</SelectItem>
                        <SelectItem value="Butikk/handel">Butikk/handel</SelectItem>
                        <SelectItem value="Servering">Servering</SelectItem>
                        <SelectItem value="Undervisning">Undervisning</SelectItem>
                        <SelectItem value="Annet">Annet</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="floors">Hvor mange etasjer skal vaskes?</Label>
                <Select onValueChange={e => onInputChange("Hvor_mange_etasjer_skal_vaskes", e)} value={formData?.Hvor_mange_etasjer_skal_vaskes}>
                    <SelectTrigger id="floors">
                        <SelectValue placeholder="Velg antall" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="1 floor">1 floor</SelectItem>
                        <SelectItem value="2 floors">2 floors</SelectItem>
                        <SelectItem value="3 or more floors">3 or more floors</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="area">Omtrent hvor stort areal skal vaskes?</Label>
                <Input onChange={handleChange} required type="number" value={formData?.Omtrent_hvor_stort_areal_skal_vaskes} name="Omtrent_hvor_stort_areal_skal_vaskes" placeholder="70 kvm" />
            </div>
        </div>
    );
}
