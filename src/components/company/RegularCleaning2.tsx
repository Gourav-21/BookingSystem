import * as React from "react"
import { Card } from "../ui/card"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@radix-ui/react-radio-group"
import { RadioGroupItem } from "../ui/radio-group"

export default function RegularCleaning2({ onInputChange, formData, setNext }) {
    const [roomCounts, setRoomCounts] = useState({
        officeCell: 0,
        meetingRoom: 0,
        bathroom: 0,
        cafeteria: 0,
        kitchen: 0,
        officeCommunity: 0,
        other: 0
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

    React.useEffect(() => {
        onInputChange("rooms", roomCounts);
    }, [roomCounts]);

    React.useEffect(() => {
        setRoomCounts(formData?.rooms || {
            officeCell: 0,
            meetingRoom: 0,
            bathroom: 0,
            cafeteria: 0,
            kitchen: 0,
            officeCommunity: 0,
            other: 0
        })
    }, [])

    React.useEffect(()=>{
        if(formData?.does_the_company_have_a_lift && (formData?.rooms?.officeCell > 0 || formData?.rooms?.meetingRoom > 0 || formData?.rooms?.bathroom > 0 || formData?.rooms?.cafeteria > 0 || formData?.rooms?.kitchen > 0 || formData?.rooms?.officeCommunity > 0 || formData?.rooms?.other > 0)){
            setNext(true)
        }else{
            setNext(false)
        }
    },[formData])

    return (
        <div className="grid w-full items-center gap-5">
             <div className="flex flex-col space-y-1.5">
                <Label htmlFor="floors">Number of rooms to be washed</Label>
                {Object.keys(roomCounts).map((room, index) => (
                    <Card key={index} className="grid grid-cols-2 gap-5 items-center p-3 justify-center">
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
                <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("does_the_company_have_a_lift", e)} value={formData?.does_the_company_have_a_lift} name="entire home" defaultValue={""} >
                    <Label htmlFor="entire home">Does the company have a lift?</Label>
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

