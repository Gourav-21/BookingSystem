import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea"
import { Card } from "../ui/card"
import { Checkbox } from "../ui/checkbox"


export default function MovingLaundry3({ onInputChange, formData, setNext }) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isValid, setIsValid] = useState(false);
    const [roomCounts, setRoomCounts] = useState({
        Soverom: 0,
        Kjøkken: 0,
        "Bad/WC": 0,
        Stue: 0,
    });

    const options = [
        "Garasje",
        "Balkong/veranda",
        "Bod"
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

    const decrementCount = (room) => {
        if (roomCounts[room] > 0) {
            setRoomCounts(prevCounts => ({
                ...prevCounts,
                [room]: prevCounts[room] - 1
            }));
        }
    };

    const incrementCount = (room) => {
        setRoomCounts(prevCounts => ({
            ...prevCounts,
            [room]: prevCounts[room] + 1
        }));
    };

    useEffect(() => {
        onInputChange("Velg_om_du_vil_ha_vask_av_følgende", selectedOptions);
    }, [selectedOptions]);

    useEffect(() => {
        onInputChange("Antall_rom_som_skal_vaskes", roomCounts);
    }, [roomCounts]);

    useEffect(() => {
        setSelectedOptions(formData?.Velg_om_du_vil_ha_vask_av_følgende || [])
        setRoomCounts(formData?.Antall_rom_som_skal_vaskes || {
            Soverom: 0,
            Kjøkken: 0,
            "Bad/WC": 0,
            Stue: 0,
        })
    }, [])

    useEffect(() => {
        const isFormValid = Object.values(roomCounts).some(count => count > 0);
        setIsValid(isFormValid);
    }, [roomCounts, selectedOptions]);

    useEffect(() => {
        setNext(isValid);
    }, [isValid, setNext]);

    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="floors">Antall rom som skal vaskes</Label>
                {Object.keys(roomCounts).map((room, index) => (
                    <Card key={index} className="grid grid-cols-2 gap-5 items-center p-3 justify-center">
                        <Label className="text-slate-500" htmlFor={room}>{room.charAt(0).toUpperCase() + room.slice(1)}</Label>

                        <div className="flex items-center gap-3 justify-center">
                            <Button onClick={() => decrementCount(room)} className="w-8 h-8 rounded-full bg-slate-500 text-white hover:bg-slate-200 hover:text-slate-900"><span className="">-</span></Button>
                            <b>{roomCounts[room]}</b>
                            <Button onClick={() => incrementCount(room)} className="w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-blue-200 hover:text-blue-900"><span className="">+</span></Button>
                        </div>
                    </Card>
                ))}
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="floors">Velg om du vil ha vask av følgende:</Label>
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
