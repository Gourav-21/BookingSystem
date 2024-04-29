import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function RegularCleaning2({ onInputChange, formData, setNext }) {
    const [field, setField] = useState(1);

    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        let valid = formData?.Hvor_ofte_vil_dere_ha_vaskehjelp && formData?.Hvor_ofte_vil_dere_ha_vaskehjelp.trim() !== "";
        for (let i = 0; i < field; i++) {
            if (!(formData[`Vaskedag${i}`] && formData[`Tidspunkt${i}`])) {
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
                <Label htmlFor="Hvor_ofte_vil_dere_ha_vaskehjelp">Hvor ofte vil du ha vaskehjelp?</Label>
                <Select onValueChange={e => onInputChange("Hvor_ofte_vil_dere_ha_vaskehjelp", e)} value={formData?.Hvor_ofte_vil_dere_ha_vaskehjelp}>
                    <SelectTrigger id="Hvor_ofte_vil_dere_ha_vaskehjelp">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="flere ganger i uken">flere ganger i uken</SelectItem>
                        <SelectItem value="hver uke">hver uke</SelectItem>
                        <SelectItem value="annenhver uke">annenhver uke</SelectItem>
                        <SelectItem value="hver tredje uke">hver tredje uke</SelectItem>
                        <SelectItem value="hver måned">hver måned</SelectItem>
                        <SelectItem value="annet">annet</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="">Legg til minst én passende dag og tid</Label>
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
    );
}

