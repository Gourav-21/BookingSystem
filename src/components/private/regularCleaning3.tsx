import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

function RegularCleaning3({ onInputChange, formData, setNext }) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [roomCounts, setRoomCounts] = useState({
        bedroom: 0,
        kitchen: 0,
        bathroom: 0,
        livingRoom: 0,
        otherRooms: 0
    });
    const [selectedFloors, setSelectedFloors] = useState("");

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

    const options = [
        "Garage",
        "Balcony/Veranda/Terrace",
        "Storage room"
    ];

    const handleCheckboxChange = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(item => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    useEffect(() => {
        onInputChange("wash", selectedOptions);
    }, [selectedOptions]);

    useEffect(() => {
        onInputChange("rooms", roomCounts);
    }, [roomCounts]);

    useEffect(() => {
        setSelectedOptions(formData?.wash || []);
        setRoomCounts(formData?.rooms || {
            bedroom: 0,
            kitchen: 0,
            bathroom: 0,
            livingRoom: 0,
            otherRooms: 0
        });
        setSelectedFloors(formData?.How_many_floors_must_be_washed || "");
    }, []);

    useEffect(() => {
        const isValid = Object.values(roomCounts).some(count => count > 0) && selectedFloors !== "";
        setNext(isValid);
    }, [roomCounts, selectedFloors, setNext]);

    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="floors">Number of rooms to be washed</Label>
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
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="floors">How many floors must be washed?</Label>
                <Select onValueChange={e => { onInputChange("How_many_floors_must_be_washed", e); setSelectedFloors(e); }} value={selectedFloors}>
                    <SelectTrigger id="floors">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="1 floor">1 floor</SelectItem>
                        <SelectItem value="2 floors">2 floors</SelectItem>
                        <SelectItem value="3 or more floors">3 or more floors</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="floors">Choose whether you want to wash the following:</Label>
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
        </div>
    );
}

export default RegularCleaning3;