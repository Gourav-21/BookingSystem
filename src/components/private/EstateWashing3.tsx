import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Card } from "../ui/card"
import { Textarea } from "../ui/textarea"


export default function EstateWashing3({ onInputChange, formData }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onInputChange(name, value);
      };
    return (
        <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="floors">How many floors does the building have?</Label>
                <Select onValueChange={e => formData.floors = e} value={formData.floors}>
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
                <Label htmlFor="area">Other wishes (optional)</Label>
                <Textarea onChange={handleChange} value={formData?.Other_wishes} name="Other_wishes" placeholder="Inform the laundry company of any wishes." />
            </div>



        </div>
    );
}

