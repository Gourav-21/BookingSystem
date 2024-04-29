import { RadioGroup } from "@radix-ui/react-radio-group"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { RadioGroupItem } from "../ui/radio-group"
import { Input } from "../ui/input"
import { useEffect } from "react"

export default function RegularCleaning({ onInputChange, formData, setNext }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  useEffect(() => {
    const isValid =
      formData?.type_of_home &&
      formData?.wash_entire_home &&
      formData?.Omtrent_hvor_stort_areal_skal_vaskes;

    setNext(isValid);
  }, [formData, setNext]);

  return (
    <div className="grid w-full items-center gap-5">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="type_of_home">What type of home should be washed?</Label>
        <Select required onValueChange={e => onInputChange("type_of_home", e)} value={formData?.type_of_home}>
          <SelectTrigger id="type_of_home">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="detached home">detached home</SelectItem>
            <SelectItem value="terraced home">terraced home</SelectItem>
            <SelectItem value="apartment">apartment</SelectItem>
            <SelectItem value="semi-detached home">semi-detached home</SelectItem>
            <SelectItem value="cabin or holiday home">cabin or holiday home</SelectItem>
            <SelectItem value="other">other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col space-y-1.5">
        <RadioGroup required className="space-y-1" onValueChange={(e) => onInputChange("wash_entire_home", e)} name="entire home" defaultValue={""} value={formData?.wash_entire_home} >
          <Label htmlFor="entire home">Should the entire home be washed?</Label>
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
        <Label htmlFor="Omtrent_hvor_stort_areal_skal_vaskes">Omtrent hvor stort areal skal vaskes?</Label>
        <Input onChange={handleChange} required type="number" value={formData?.Omtrent_hvor_stort_areal_skal_vaskes} name="Omtrent_hvor_stort_areal_skal_vaskes" placeholder="70 sq m" />
      </div>
    </div>
  )
}

