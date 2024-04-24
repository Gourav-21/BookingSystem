import { RadioGroup } from "@radix-ui/react-radio-group"
import { Label } from "../ui/label"
import { RadioGroupItem } from "../ui/radio-group"
import { Checkbox } from "../ui/checkbox"
import { useEffect, useState } from "react"
import { Textarea } from "../ui/textarea"

export default function RegularCleaning4({ formData, onInputChange }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    "Want window washing",
    "Would like a change of bed linen",
    "Want to wash dishes",
    "Wants ironing of clothes"
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
    onInputChange("Extra_services", selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    setSelectedOptions(formData?.Extra_services || [])
  }, [])

  return (
    <div className="grid w-full items-center gap-4">
      <div className="flex flex-col space-y-1.5">
        <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("Does_the_household_have_pets", e)} value={formData?.Does_the_household_have_pets}  name="entire home" defaultValue={""} >
          <Label htmlFor="entire home">Does the household have pets?</Label>
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
      <div className="flex flex-col space-y-2">
        <Label htmlFor="floors">Extra services</Label>
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
        <Label htmlFor="area">Other wishes (optional)</Label>
        <Textarea onChange={handleChange} value={formData?.Other_wishes} name="Other_wishes" placeholder="Inform the laundry company of any wishes." />
      </div>
    </div>
  )
}
