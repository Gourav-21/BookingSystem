import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { useEffect, useState } from "react";

export default function EstateWashing2({ onInputChange, formData, setNext }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onInputChange(name, value);
    };

    const [roomCounts, setRoomCounts] = useState({
               Soverom: 0,
        Kjøkken: 0,
        "Bad/WC": 0,
        Stue: 0,
        "Øvrige rom": 0
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
        onInputChange("Antall_rom_som_skal_vaskes", roomCounts);
    }, [roomCounts]);

    useEffect(() => {
        setRoomCounts(formData?.Antall_rom_som_skal_vaskes || {
            Soverom: 0,
            Kjøkken: 0,
            "Bad/WC": 0,
            Stue: 0,
            "Øvrige rom": 0
        })
    }, []);

    useEffect(() => {
        const isValid = formData?.Hva_slags_type_bolig_skal_vaskes &&
                        formData?.Omtrent_hvor_stort_areal_skal_vaskes &&
                        Object.values(roomCounts).reduce((total, count) => total + count, 0) > 0 &&
                        formData?.Har_husholdningen_kjæledyr !== undefined;
        setNext(isValid);
    }, [formData, roomCounts, setNext]);

    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Hva_slags_type_bolig_skal_vaskes">Hva slags type bolig skal vaskes?</Label>
                <Select onValueChange={e => onInputChange("Hva_slags_type_bolig_skal_vaskes", e)} value={formData?.Hva_slags_type_bolig_skal_vaskes}>
                    <SelectTrigger id="Hva_slags_type_bolig_skal_vaskes">
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
                <Label htmlFor="area">Omtrent hvor stort areal skal vaskes?</Label>
                <Input onChange={handleChange} required type="number" value={formData?.Omtrent_hvor_stort_areal_skal_vaskes} name="Omtrent_hvor_stort_areal_skal_vaskes" placeholder="70 sq m" />
            </div>

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
            <div className="flex flex-col space-y-1.5">
                <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("Har_husholdningen_kjæledyr", e)} value={formData?.Har_husholdningen_kjæledyr} name="entire home" defaultValue={""} >
                    <Label htmlFor="entire home">Har husholdningen kjæledyr?</Label>
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
