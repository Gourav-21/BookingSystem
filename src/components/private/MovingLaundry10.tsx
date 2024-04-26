import { RadioGroup } from "@radix-ui/react-radio-group"
import { Label } from "../ui/label"
import { RadioGroupItem } from "../ui/radio-group"
import { CardDescription } from "../ui/card"
import { Textarea } from "../ui/textarea"
import { useEffect, useState } from "react"

export default function MovingLaundry10({ onInputChange, formData, setNext }) {
    const [heavy, setHeavy] = useState("")
    const [fragile, setFragile] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onInputChange(name, value);
    };


    useEffect(() => {
        setHeavy(formData?.are_you_moving_heavy_objects || "")
        setFragile(formData?.are_you_moving_fragile_or_valuable_items || "")
    }, [])

    useEffect(() => {
        const isValid =
            (formData?.are_you_moving_heavy_objects === "no" || formData?.are_you_moving_heavy_objects_description) &&
            (formData?.are_you_moving_fragile_or_valuable_items === "no" || formData?.are_you_moving_fragile_or_valuable_items_description);

        setNext(isValid);
    }, [formData, setNext]);



    return (
        <div className="grid w-full items-center gap-5">

            <div className="flex flex-col space-y-2">
                <RadioGroup className="space-y-1" onValueChange={(e) => { setHeavy(e); onInputChange("are_you_moving_heavy_objects", e) }} name="are_you_moving_heavy_objects" value={heavy} >
                    <Label htmlFor="are_you_moving_heavy_objects">Are you moving heavy objects?</Label>
                    <CardDescription>In order to plan the move as best as possible, the moving company should know about heavy or large items to be moved.</CardDescription>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="1" />
                        <Label htmlFor="1">yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="2" />
                        <Label htmlFor="2">no</Label>
                    </div>
                </RadioGroup>
                {heavy === "yes" && <Textarea onChange={handleChange} name="are_you_moving_heavy_objects_description" value={formData?.are_you_moving_heavy_objects_description} placeholder="Which heavy objects are to be moved?" id="description" />}
            </div>

            <div className="flex flex-col space-y-2">
                <RadioGroup className="space-y-1" onValueChange={(e) => { setFragile(e); onInputChange("are_you_moving_fragile_or_valuable_items", e) }} name="are_you_moving_fragile_or_valuable_items" value={fragile} >
                    <Label htmlFor="are_you_moving_fragile_or_valuable_items">Are you moving fragile or valuable items?</Label>
                    <CardDescription>In order to plan the move as best as possible, the moving company should know about fragile items to be moved.</CardDescription>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes">yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no">no</Label>
                    </div>
                </RadioGroup>
                {fragile === "yes" && <Textarea onChange={handleChange} name="are_you_moving_fragile_or_valuable_items_description" value={formData?.are_you_moving_fragile_or_valuable_items_description} placeholder="Which fragile or valuable items should be moved?" id="description" />}
            </div>

        </div>
    )
}
