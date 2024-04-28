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
        "Kontor",
        "Lager/produksjon",
        "Kombinasjonslokale",
        "Butikk/handel",
        "Servering",
        "Undervisning",
        "Annet"
    ];

    useEffect(() => {
        if (formData?.Hva_slags_type_lokale_skal_vaskes && formData.Hva_slags_type_lokale_skal_vaskes.length != "" && formData?.Hvor_ofte_vil_dere_ha_vaskehjelp && formData.Vaskedag0 && formData.Tidspunkt0) {
            setNext(true)
        } else {
            setNext(false)
        }
    }, [formData])


    useEffect(() => {
        onInputChange("Hva_slags_type_lokale_skal_vaskes", selectedOptions);
    }, [selectedOptions]);

    useEffect(() => {
        setSelectedOptions(formData?.Hva_slags_type_lokale_skal_vaskes || [])
    }, [])

    const handleCheckboxChange = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(item => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-2">
                <Label htmlFor="Hva_slags_type_lokale_skal_vaskes">Hva slags type lokale skal vaskes?</Label>
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
                <Label htmlFor="Hvor_ofte_vil_dere_ha_vaskehjelp">HHvor ofte vil dere ha vaskehjelp?</Label>
                <Select onValueChange={e => onInputChange("Hvor_ofte_vil_dere_ha_vaskehjelp", e)} value={formData?.Hvor_ofte_vil_dere_ha_vaskehjelp}>
                    <SelectTrigger id="Hvor_ofte_vil_dere_ha_vaskehjelp">
                        <SelectValue placeholder="-- Velg hyppighet --" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="Daglig">Daglig</SelectItem>
                        <SelectItem value="Flere ganger i uka">Flere ganger i uka</SelectItem>
                        <SelectItem value="Ukentlig">Ukentlig</SelectItem>
                        <SelectItem value="Annen hver uke">Annen hver uke</SelectItem>
                        <SelectItem value="Månedlig">Månedlig</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Legg til minst én passende vaskedag og tidspunkt:">Legg til minst én passende vaskedag og tidspunkt:</Label>
                {Array.from(Array(field)).map((_, index) => {
                    return (
                        <div key={index} className="flex">
                            <Select onValueChange={e => onInputChange("Vaskedag" + index, e)} value={formData?.[`Vaskedag${index}`]}>
                                <SelectTrigger className="rounded-r-none" id={`Vaskedag${index}`}>
                                    <SelectValue placeholder="Vaskedag" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="Mandager">Mandager</SelectItem>
                                    <SelectItem value="Tirsdager">Tirsdager</SelectItem>
                                    <SelectItem value="Onsdager">Onsdager</SelectItem>
                                    <SelectItem value="Torsdager">Torsdager</SelectItem>
                                    <SelectItem value="Fredager">Fredager</SelectItem>
                                    <SelectItem value="Lørdager">Lørdager</SelectItem>
                                    <SelectItem value="Søndager">Søndager</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select onValueChange={e => onInputChange("Tidspunkt" + index, e)} value={formData?.[`Tidspunkt${index}`]}>
                                <SelectTrigger className="rounded-l-none" id={`Tidspunkt${index}`}>
                                    <SelectValue placeholder="Tidspunkt" />
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
                <Button variant="outline" className={cn("rounded-r-none", field === 1 && "rounded")} onClick={() => setField(field + 1)}>Legg til flere</Button>
                {field > 1 &&
                    <Button variant="outline" className="rounded-l-none" disabled={field === 1} onClick={() => setField(field - 1)}>fjerne</Button>
                }
            </div>
        </div>
    )
}
