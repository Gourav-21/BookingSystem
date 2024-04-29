import { RadioGroup } from "@radix-ui/react-radio-group"
import { Label } from "../ui/label"
import { RadioGroupItem } from "../ui/radio-group"
import { Textarea } from "../ui/textarea"
import { useEffect } from "react";

export default function MajorCleaning4({ onInputChange, formData, setNext }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onInputChange(name, value);
      };

      useEffect(() => {
        const isValid = formData?.Does_the_household_have_pets !== undefined;
        setNext(isValid);
    }, [formData, setNext]);


    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("Does_the_household_have_pets", e)} value={formData?.Does_the_household_have_pets} name="entire home" defaultValue={""} >
                    <Label htmlFor="entire home">Does the household have pets?</Label>
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
                <Label htmlFor="area">Other wishes (optional)</Label>
                <Textarea onChange={handleChange} value={formData?.Other_wishes} name="Other_wishes" placeholder="Inform the laundry company of any wishes." />
            </div>
        </div>
    )
}
