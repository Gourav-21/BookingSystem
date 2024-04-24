import { RadioGroup } from "@radix-ui/react-radio-group"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { RadioGroupItem } from "../ui/radio-group"
import { CardDescription } from "../ui/card"
import { Input } from "../ui/input"

export default function MovingLaundry9({ formData, onInputChange }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onInputChange(name, value);
      };
    return (
        <div className="grid w-full items-center gap-4">

            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="floors">What floor is the apartment on?</Label>
                <Select onValueChange={e => onInputChange("What_floor_is_the_apartment_on", e)} value={formData?.What_floor_is_the_apartment_on}>
                    <SelectTrigger id="floors">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="9">9</SelectItem>
                        <SelectItem value="10 or higher">10 or higher</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
                <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("Is_there_a_lift_in_the_building", e)} value={formData?.Is_there_a_lift_in_the_building} name="Is there a lift in the building"  >
                    <Label htmlFor="flexible date">Is there a lift in the building?</Label>
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
            
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="number">Distance to parking</Label>
                <CardDescription >Nearest point where the removal truck can be parked during loading</CardDescription>
                <Input onChange={handleChange} value={formData?.distance_to_parking} name="distance_to_parking" id="number" type="number" placeholder="20 meters" />
            </div>
        </div>
    )
}
