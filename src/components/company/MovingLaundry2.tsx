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
        if (formData?.area_size && formData?.How_many_floors_must_be_washed && formData?.What_type_of_premises_should_be_washed) {
            setNext(true);
        } else {
            setNext(false)
        }
    }, [formData?.area_size, formData?.How_many_floors_must_be_washed, formData?.What_type_of_premises_should_be_washed]);

    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="premises">What type of premises should be washed?</Label>
                <Select onValueChange={e => onInputChange("What_type_of_premises_should_be_washed", e)} value={formData?.What_type_of_premises_should_be_washed}>
                    <SelectTrigger id="premises">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="Office">Office</SelectItem>
                        <SelectItem value="Stock/production">Stock/production</SelectItem>
                        <SelectItem value="Combination room">Combination room</SelectItem>
                        <SelectItem value="Shop/trade">Shop/trade</SelectItem>
                        <SelectItem value="Serving">Serving</SelectItem>
                        <SelectItem value="Instruction">Instruction</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                </Select>
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
                <Label htmlFor="area">Approximately how large is the area to be washed?</Label>
                <Input onChange={handleChange} required type="number" value={formData?.area_size} name="area_size" placeholder="70 sq m" />
            </div>
        </div>
    );
}
