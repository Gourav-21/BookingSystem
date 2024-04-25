
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"


export default function BuildingCleaning3({ onInputChange, formData }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onInputChange(name, value);
    };

    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="area">Approximately how large is the area to be washed?</Label>
                <Input onChange={handleChange} required type="number" value={formData?.area_size} name="area_size" placeholder="70 sq m" />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="floors">How many floors must be washed?</Label>
                <Select onValueChange={e => onInputChange("How_many_floors_must_be_washed", e)} value={formData?.How_many_floors_must_be_washed}>
                    <SelectTrigger id="floors">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="1 floor">1 floor</SelectItem>
                        <SelectItem value="2 floors">2 floors</SelectItem>
                        <SelectItem value="3 or more floors">3 or more floors</SelectItem>
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
