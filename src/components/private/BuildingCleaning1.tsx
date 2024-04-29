import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { useEffect, useState } from "react"

export default function BuildingCleaning1({ onInputChange, formData, setNext }) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedOptions2, setSelectedOptions2] = useState([]);

    const options = [
        "Renovering/Ombygging",
        "Tillbygg/Utbygg",
        "Maling/Sliping",
        "Gulvlegging/Gulvsliping",
        "Annet"
    ];

    const options2 = [
        "Støvtørking",
        "Støvsuging",
        "Gulvvask",
        "Vindusvask",
        "Kjøkkenvask",
        "Baderomsvask",
        "Vask av tak og vegger",
        "Kast av søppel og avfall"
    ];

    useEffect(() => {
        onInputChange("Hva_skal_inngå_i_vasken", selectedOptions2);
    }, [selectedOptions2]);

    useEffect(() => {
        onInputChange("Hva_slags_arbeid_er_utført", selectedOptions);
    }, [selectedOptions]);
    
    useEffect(() => {
        setSelectedOptions2(formData?.Hva_skal_inngå_i_vasken || [])
        setSelectedOptions(formData?.Hva_slags_arbeid_er_utført || [])
    }, [])

    useEffect(() => {
        const isValid = selectedOptions.length > 0 && selectedOptions2.length > 0;
        setNext(isValid);
    }, [selectedOptions, selectedOptions2, setNext]);

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
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-2">
                <Label htmlFor="Hva_slags_arbeid_er_utført">Hva slags arbeid er utført?</Label>
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
            <div className="flex flex-col space-y-2">
                <Label htmlFor="Hva_skal_inngå_i_vasken">Hva skal inngå i vasken?</Label>
                {options2.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <Checkbox
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
