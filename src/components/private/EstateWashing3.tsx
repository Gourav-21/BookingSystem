import * as React from "react"
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "../ui/textarea"


export default function EstateWashing3({ onInputChange, formData, setNext }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onInputChange(name, value);
      };
    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="floors">How many floors does the building have?</Label>
                <Select onValueChange={e => formData.floors = e} value={formData.floors}>
                    <SelectTrigger id="floors">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4+">4 or more</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="area">Other wishes (optional)</Label>
                <Textarea onChange={handleChange} value={formData?.Other_wishes} name="Other_wishes" placeholder="Inform the laundry company of any wishes." />
            </div>

        </div>
    );
}

