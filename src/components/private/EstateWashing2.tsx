import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input"
import { Card } from "../ui/card"
import { useEffect, useState } from "react";


export default function EstateWashing2({ onInputChange, formData, setNext }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onInputChange(name, value);
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
        onInputChange("rooms", roomCounts);
    }, [roomCounts]);

    useEffect(() => {
        setRoomCounts(formData?.rooms||{
            bedroom: 0,
            kitchen: 0,
            bathroom: 0,
            livingRoom: 0,
            otherRooms: 0
        })
    }, [])
    
    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="type_of_home">What type of home should be washed?</Label>
                <Select onValueChange={e => onInputChange("type_of_home", e)} value={formData?.type_of_home}>
                    <SelectTrigger id="type_of_home">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="detached home">detached home</SelectItem>
                        <SelectItem value="terraced home">terraced home</SelectItem>
                        <SelectItem value="apartment">apartment</SelectItem>
                        <SelectItem value="semi-detached home">semi-detached home</SelectItem>
                        <SelectItem value="cabin or holiday home">cabin or holiday home</SelectItem>
                        <SelectItem value="other">other</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="area">Approximately how large is the area to be washed?</Label>
                <Input onChange={handleChange} required type="number" value={formData?.area_size} name="area_size" placeholder="70 sq m" />
            </div>

            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="floors">Number of rooms to be washed</Label>
                {Object.keys(roomCounts).map((room, index) => (
                    <Card key={index} className="grid grid-cols-2 gap-4 items-center p-3 justify-center">
                        <Label htmlFor={room}>{room.charAt(0).toUpperCase() + room.slice(1)}</Label>
                        <div className="flex items-center gap-3 justify-center">
                            <Button onClick={() => decrementCount(room)} className="w-8 h-8 rounded-full bg-slate-500 text-white"><p className="mb-[1px] mr-[1px]">-</p></Button>
                            <b>{roomCounts[room]}</b>
                            <Button onClick={() => incrementCount(room)} className="w-8 h-8 rounded-full bg-blue-500 text-white"><p className="mb-[1px] mr-[1px]">+</p></Button>
                        </div>
                    </Card>
                ))}
            </div>
            <div className="flex flex-col space-y-1.5">
                <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("Does_the_household_have_pets", e)} value={formData?.Does_the_household_have_pets} name="entire home" defaultValue={""} >
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
        </div>
    );
}

