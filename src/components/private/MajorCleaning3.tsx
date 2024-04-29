import { RadioGroup } from "@radix-ui/react-radio-group"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { RadioGroupItem } from "../ui/radio-group"
import { Checkbox } from "../ui/checkbox"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"

export default function MajorCleaning3({ onInputChange, formData, setNext }) {
    const [selectedOptions, setSelectedOptions] = useState([]);

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

    const [roomCounts, setRoomCounts] = useState({
        bedroom: 0,
        kitchen: 0,
        bathroom: 0,
        livingRoom: 0,
        otherRooms: 0
    });

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
        onInputChange("wash", selectedOptions);
    }, [selectedOptions]);
    
    useEffect(() => {
        onInputChange("rooms", roomCounts);
    }, [roomCounts]);

    useEffect(() => {
        setSelectedOptions(formData?.wash || [])
        setRoomCounts(formData?.rooms||{
            bedroom: 0,
            kitchen: 0,
            bathroom: 0,
            livingRoom: 0,
            otherRooms: 0
        })
    }, [])

    useEffect(() => {
        const isValid = formData?.How_many_floors_must_be_washed &&
            (formData?.what_floor_is_the_apartment_on !== "1" || !formData?.what_floor_is_the_apartment_on) &&
            (formData?.what_floor_is_the_apartment_on === "1" || formData?.Er_det_heis_i_bygningen) &&
            Object.values(roomCounts).reduce((acc, val) => acc + val, 0) > 0;

        setNext(isValid);
    }, [formData, roomCounts, setNext]);

    return (
        <div className="grid w-full items-center gap-5">
           <div className="flex flex-col space-y-1.5">
            <Label htmlFor="floors">Number of rooms to be washed</Label>
            {Object.keys(roomCounts).map((room, index) => (
                <Card key={index} className="grid grid-cols-2 gap-5 items-center p-3 justify-center">
                                           <Label className="text-slate-500" htmlFor={room}>{room.charAt(0).toUpperCase() + room.slice(1)}</Label>

                    <div className="flex items-center gap-3 justify-center">
                        <Button onClick={() => decrementCount(room)} className="w-8 h-8 rounded-full bg-slate-500 text-white"><p className="mb-[1px] mr-[1px]">-</p></Button>
                        <b>{roomCounts[room]}</b>
                        <Button onClick={() => incrementCount(room)} className="w-8 h-8 rounded-full bg-blue-500 text-white"><p className="mb-[1px] mr-[1px]">+</p></Button>
                    </div>
                </Card>
            ))}
        </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="floors">How many floors must be washed?</Label>
                <Select onValueChange={e => onInputChange("How_many_floors_must_be_washed", e)} value={formData?.How_many_floors_must_be_washed}>
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
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="what_floor_is_the_apartment_on">What floor is the apartment on?</Label>
                <Select onValueChange={e => onInputChange("what_floor_is_the_apartment_on", e)} value={formData?.what_floor_is_the_apartment_on}>
                    <SelectTrigger id="what_floor_is_the_apartment_on">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="9">9</SelectItem>
                        <SelectItem value="10 or higher">10 or higher</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {formData?.what_floor_is_the_apartment_on && formData?.what_floor_is_the_apartment_on !== "1" && <div className="flex flex-col space-y-1.5">
                <RadioGroup className="space-y-1" value={formData?.Er_det_heis_i_bygningen} onValueChange={(e) => onInputChange("Er_det_heis_i_bygningen",e)} name="lift"  >
                    <Label htmlFor="lift">Er det heis i bygningen?</Label>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ja" id="ja" />
                        <Label htmlFor="ja">ja</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nei" id="nei" />
                        <Label htmlFor="nei">nei</Label>
                    </div>
                </RadioGroup>
            </div>}

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
    )
}
