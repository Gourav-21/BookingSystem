import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";

export default function Page1({ onInputChange, formData,setNext }) {
    useEffect(()=>{
        if(formData.how_many_floors_does_the_building_have && formData.how_many_ascents_are_there){
            setNext(true)
        }else{
            setNext(false)
        }
    },[formData])

    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="floors">How many floors does the building have?</Label>
                <Select onValueChange={e => onInputChange("how_many_floors_does_the_building_have",e)} value={formData?.how_many_floors_does_the_building_have}>
                    <SelectTrigger id="floors">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4+">4 or more</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="ascents">How many ascents are there?</Label>
                <Select onValueChange={e => onInputChange("how_many_ascents_are_there",e)} value={formData?.how_many_ascents_are_there}>
                    <SelectTrigger id="ascents">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4+">4 or more</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}