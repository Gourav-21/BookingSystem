import { RadioGroup } from "@radix-ui/react-radio-group"
import { Label } from "../ui/label"
import { RadioGroupItem } from "../ui/radio-group"
import { Checkbox } from "../ui/checkbox"
import { useEffect, useState } from "react"
import { Textarea } from "../ui/textarea"

export default function RegularCleaning4({ onInputChange, formData, setNext }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    "Ønsker vindusvask",
    "Ønsker skift av sengetøy",
    "Ønsker oppvask",
    "Ønsker stryking av tøy"
  ];

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  useEffect(() => {
    onInputChange("Ekstratjenester", selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    setSelectedOptions(formData?.Ekstratjenester || [])
  }, [])

  useEffect(() => {
    const isValid = formData?.Har_husholdningen_kjæledyr !== undefined && formData?.Har_husholdningen_kjæledyr !== "";
    setNext(isValid);
  }, [formData, setNext]);

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
      <div className="flex flex-col space-y-2">
        <Label htmlFor="floors">Ekstratjenester</Label>
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`option-${index}`}
              checked={selectedOptions.includes(option)}
              onCheckedChange={() => handleCheckboxChange(option)}
            />
            <label htmlFor={`option-${index}`} className="text-sm font-medium leading-none">
              {option}
            </label>
          </div>
        ))}
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="area">Øvrige ønsker (frivillig)</Label>
        <Textarea onChange={handleChange} value={formData?.Øvrige_ønsker} name="Øvrige_ønsker" placeholder="Inform the laundry company of any wishes." />
      </div>
    </div>
  )
}
