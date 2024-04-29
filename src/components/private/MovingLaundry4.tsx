import { RadioGroup } from "@radix-ui/react-radio-group"
import { Label } from "../ui/label"
import { RadioGroupItem } from "../ui/radio-group"
import { useEffect } from "react";

export default function MovingLaundry4({ onInputChange, formData, setNext }) {
    
    useEffect(() => {
        setNext(formData?.Ønsker_dere_også_flyttehjelp !== undefined);
    }, [formData?.Ønsker_dere_også_flyttehjelp, setNext]);

    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <RadioGroup className="space-y-1" onValueChange={(e) =>onInputChange("Ønsker_dere_også_flyttehjelp", e)} value={formData?.Ønsker_dere_også_flyttehjelp} name="entire home" defaultValue={""} >
                    <Label htmlFor="entire home">Ønsker dere også flyttehjelp?</Label>
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
        </div>
    )
}
