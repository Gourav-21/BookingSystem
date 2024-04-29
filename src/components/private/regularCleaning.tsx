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
      formData?.Hva_slags_type_bolig_skal_vaskes &&
      formData?.Skal_hele_boligen_vaskes &&
      formData?.Omtrent_hvor_stort_areal_skal_vaskes;

    setNext(isValid);
  }, [formData, setNext]);

  return (
    <div className="grid w-full items-center gap-5">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="Hva_slags_type_bolig_skal_vaskes">Hva slags type bolig skal vaskes?</Label>
        <Select required onValueChange={e => onInputChange("Hva_slags_type_bolig_skal_vaskes", e)} value={formData?.Hva_slags_type_bolig_skal_vaskes}>
          <SelectTrigger id="Hva_slags_type_bolig_skal_vaskes">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="Enebolig">Enebolig</SelectItem>
            <SelectItem value="Leilighet">Leilighet</SelectItem>
            <SelectItem value="Rekkehus">Rekkehus</SelectItem>
            <SelectItem value="Tomannsbolig">Tomannsbolig</SelectItem>
            <SelectItem value="Hytte eller fritidshus">Hytte eller fritidshus</SelectItem>
            <SelectItem value="Annet">Annet</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col space-y-1.5">
        <RadioGroup required className="space-y-1" onValueChange={(e) => onInputChange("Skal_hele_boligen_vaskes", e)} name="entire home" defaultValue={""} value={formData?.Skal_hele_boligen_vaskes} >
          <Label htmlFor="entire home">Skal hele boligen vaskes?</Label>
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

