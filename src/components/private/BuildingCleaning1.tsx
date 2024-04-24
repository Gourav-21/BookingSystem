import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { useEffect, useState } from "react"

export default function BuildingCleaning1({ formData, onInputChange }) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedOptions2, setSelectedOptions2] = useState([]);

    const options = [
        "Renovation/Conversion",
        "Extension/Extension",
        "Painting/Sanding",
        "Flooring/Floor sanding",
        "Other"
    ];

    const options2 = [
        "Dust drying",
        "Vacuuming",
        "Floor washing",
        "Window washing",
        "Kitchen sink",
        "Bathroom sink",
        "Wash the ceiling and walls",
        "Disposal of garbage and waste"
    ];

    useEffect(() => {
        onInputChange("What_should_be_included_in_the_wash", selectedOptions2);
    }, [selectedOptions2]);

    useEffect(() => {
        onInputChange("What_kind_of_work_is_done", selectedOptions);
    }, [selectedOptions]);
    
    useEffect(() => {
        setSelectedOptions2(formData?.What_should_be_included_in_the_wash || [])
        setSelectedOptions(formData?.What_kind_of_work_is_done || [])
    }, [])

    const handleCheckboxChange = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(item => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const handleCheckboxChange2 = (option) => {
        if (selectedOptions2.includes(option)) {
            setSelectedOptions2(selectedOptions2.filter(item => item !== option));
        } else {
            setSelectedOptions2([...selectedOptions2, option]);
        }
    };

    return (
        <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
                <Label htmlFor="What_should_be_included_in_the_wash">What kind of work is done?</Label>
                {options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                            type="checkbox"
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
            <div className="flex flex-col space-y-2">
                <Label htmlFor="What_kind_of_work_is_done">What should be included in the wash?</Label>
                {options2.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                            type="checkbox"
                            id={`option-${option}`}
                            checked={selectedOptions2.includes(option)}
                            onCheckedChange={() => handleCheckboxChange2(option)}
                        />
                        <label htmlFor={`option-${option}`} className="text-sm font-medium leading-none">
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}
