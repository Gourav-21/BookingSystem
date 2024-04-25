import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea"
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox"

export default function BuildingCleaning3({ onInputChange, formData }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    "Garbage disposal",
    "Watering of plants",
    "Booking of bottles",
    "Refill paper towels",
    "Replenishment of toilet paper",
    "Replacement of door mats"
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
    <div className="grid w-full items-center gap-5">
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
        <Label htmlFor="area">Do you have other comments?</Label>
        <Textarea onChange={handleChange} value={formData?.Other_comments} name="Other_comments" placeholder="Write here if you have other information that is relevant for the washing company to know." />
      </div>
    </div>
  );
}
