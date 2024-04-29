import { RadioGroup } from "@radix-ui/react-radio-group"
import { Label } from "../ui/label"
import { RadioGroupItem } from "../ui/radio-group"
import { Textarea } from "../ui/textarea"
import { useEffect } from "react";

export default function DisplayWash4({ onInputChange, formData, setNext }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onInputChange(name, value);
      };

      useEffect(() => {
        const isValid = formData?.Har_husholdningen_kjæledyr !== undefined && formData?.Har_husholdningen_kjæledyr !== "";
        setNext(isValid);
    }, [formData?.Har_husholdningen_kjæledyr, setNext]);


    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("Har_husholdningen_kjæledyr", e)} value={formData?.Har_husholdningen_kjæledyr} name="entire home" defaultValue={""} >
                    <Label htmlFor="entire home">Har husholdningen kjæledyr?</Label>
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
                <Label htmlFor="area">Øvrige ønsker (frivillig)</Label>
                <Textarea onChange={handleChange} value={formData?.Øvrige_ønsker} name="Øvrige_ønsker" placeholder="Inform the laundry company of any wishes." />
            </div>
        </div>
    )
}
