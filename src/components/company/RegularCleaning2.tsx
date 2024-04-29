import * as React from "react"
import { Card } from "../ui/card"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@radix-ui/react-radio-group"
import { RadioGroupItem } from "../ui/radio-group"

export default function RegularCleaning2({ onInputChange, formData, setNext }) {
    const [roomCounts, setRoomCounts] = useState({
        Cellekontor: 0,
        Møterom: 0,
        Bad_WC: 0,
        Kantine: 0,
        Kjøkken: 0,
        Kontorfellesskap: 0,
        Annet: 0
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
        onInputChange("Antall_rom_som_skal_vaskes", roomCounts);
    }, [roomCounts]);

    React.useEffect(() => {
        setRoomCounts(formData?.Antall_rom_som_skal_vaskes || {
            Cellekontor: 0,
            Møterom: 0,
            Bad_WC: 0,
            Kantine: 0,
            Kjøkken: 0,
            Kontorfellesskap: 0,
            Annet: 0
        })
    }, [])

    React.useEffect(() => {
        if (formData?.Har_bedriften_heis && (formData?.Antall_rom_som_skal_vaskes?.Cellekontor > 0 || formData?.Antall_rom_som_skal_vaskes?.Møterom > 0 || formData?.Antall_rom_som_skal_vaskes?.Bad_WC > 0 || formData?.Antall_rom_som_skal_vaskes?.Kantine > 0 || formData?.Antall_rom_som_skal_vaskes?.Kjøkken > 0 || formData?.Antall_rom_som_skal_vaskes?.Kontorfellesskap > 0 || formData?.Antall_rom_som_skal_vaskes?.Annet > 0)) {
            setNext(true);
        } else {
            setNext(false);
        }
    }, [formData]);    

    return (
        <div className="grid w-full items-center gap-5">
             <div className="flex flex-col space-y-1.5">
                <Label htmlFor="floors">Sett antall som skal vaskes:</Label>
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
                <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("Har_bedriften_heis", e)} value={formData?.Har_bedriften_heis} name="entire home" defaultValue={""} >
                    <Label htmlFor="entire home">Har bedriften heis?</Label>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ja" id="ja" />
                        <Label htmlFor="ja">ja</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nei" id="nei" />
                        <Label htmlFor="nei">nei</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
}

