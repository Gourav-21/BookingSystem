import { RadioGroup } from "@radix-ui/react-radio-group"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { RadioGroupItem } from "../ui/radio-group"
import { CardDescription } from "../ui/card"
import { Input } from "../ui/input"
import { useEffect } from "react"

export default function MovingLaundry9({ onInputChange, formData, setNext }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onInputChange(name, value);
      };

      useEffect(() => {
        const isValid =
          formData?.I_hvilken_etasje_ligger_leiligheten &&
          formData?.Er_det_heis_i_bygningen &&
          formData?.Avstand_til_parkering;
      
        setNext(isValid);
      }, [formData, setNext]);
      
    return (
        <div className="grid w-full items-center gap-5">

            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="floors">I hvilken etasje ligger leiligheten?</Label>
                <Select onValueChange={e => onInputChange("I_hvilken_etasje_ligger_leiligheten", e)} value={formData?.I_hvilken_etasje_ligger_leiligheten}>
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
                <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("Er_det_heis_i_bygningen", e)} value={formData?.Er_det_heis_i_bygningen} name="Is there a lift in the building"  >
                    <Label htmlFor="flexible date">Er det heis i bygningen?</Label>
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
                <Label htmlFor="number">Avstand til parkering</Label>
                <CardDescription >Nærmeste punkt hvor flyttebilen kan stå under lasting</CardDescription>
                <Input onChange={handleChange} value={formData?.Avstand_til_parkering} name="Avstand_til_parkering" id="number" type="number" placeholder="20 meters" />
            </div>
        </div>
    )
}
