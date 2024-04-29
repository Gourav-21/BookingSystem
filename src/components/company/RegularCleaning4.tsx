import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea"
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox"

export default function BuildingCleaning3({ onInputChange, formData, setNext }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    "Søppeltømming",
    "Vanning av planter",
    "Panting av flasker",
    "Påfyll av tørkepapir",
    "Påfyll av toalettpapir",
    "Utskiftning av dørmatter"
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
    onInputChange("ekstra_tjenester", selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    setSelectedOptions(formData?.ekstra_tjenester || [])
  }, [])

  useEffect(()=>{
      setNext(true)
  },[])

  return (
    <div className="grid w-full items-center gap-5">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="floors">Velg dersom du ønsker ekstratjenester</Label>
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
        <Label htmlFor="andre_kommentarer">Har du andre kommentarer?</Label>
        <Textarea onChange={handleChange} value={formData?.andre_kommentarer} name="andre_kommentarer" placeholder="Skriv her dersom du har andre opplysninger det er relevant for vaskefirmaet å vite." />
      </div>
    </div>
  );
}
