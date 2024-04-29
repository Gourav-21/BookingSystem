import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";

export default function Page1({ onInputChange, formData,setNext }) {
    useEffect(()=>{
        if(formData.Hvor_mange_etasjer_har_bygningen && formData.Hvor_mange_oppganger_er_det){
            setNext(true)
        }else{
            setNext(false)
        }
    },[formData])

    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="floors">Hvor mange etasjer har bygningen?</Label>
                <Select onValueChange={e => onInputChange("Hvor_mange_etasjer_har_bygningen",e)} value={formData?.Hvor_mange_etasjer_har_bygningen}>
                    <SelectTrigger id="floors">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4+">4 +</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="ascents">Hvor mange oppganger er det?</Label>
                <Select onValueChange={e => onInputChange("Hvor_mange_oppganger_er_det",e)} value={formData?.Hvor_mange_oppganger_er_det}>
                    <SelectTrigger id="ascents">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4+">4 +</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}