import { RadioGroup } from "@radix-ui/react-radio-group"
import { Label } from "../ui/label"
import { RadioGroupItem } from "../ui/radio-group"
import { useEffect } from "react";

export default function MovingLaundry4({ onInputChange, formData, setNext }) {
    
    useEffect(() => {
        setNext(formData?.relocation_assistance !== undefined);
    }, [formData?.relocation_assistance, setNext]);

    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <RadioGroup className="space-y-1" onValueChange={(e) =>onInputChange("relocation_assistance", e)} value={formData?.relocation_assistance} name="entire home" defaultValue={""} >
                    <Label htmlFor="entire home">Do you also want relocation assistance?</Label>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes">yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no">no</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}
