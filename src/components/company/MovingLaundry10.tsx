import { useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function MovingLaundry10({ onInputChange, formData, setNext }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onInputChange(name, value);
    };

    useEffect(() => {
        const isValid =
            formData?.name &&
            formData?.number &&
            formData?.email &&
            formData?.company_name &&
            formData?.name !="" &&
            formData?.number != "" &&
            formData?.email != "" &&
            formData?.company_name != "";

        setNext(isValid);
    }, [formData, setNext]);

    return (
        <div className="grid w-full items-center gap-5">

            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="additional_information">Additional information (optional)</Label>
                <Textarea onChange={handleChange} value={formData?.additional_information} name="additional_information" placeholder="Feel free to write detailed information about the move here. What kind of company are you and what kind of equipment will mainly be moved?" />
            </div>

            {/* <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                     I accept the terms of use , and confirm that the personal information is correct. 
                </label>
            </div> */}
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Company name or organization number</Label>
                <Input onChange={handleChange} value={formData?.company_name} name="company_name" placeholder="Company AS" />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Contact person's name</Label>
                <Input onChange={handleChange} value={formData?.name} name="name" placeholder="steve jobs" />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="number">The contact person's telephone number</Label>
                <Input onChange={handleChange} value={formData?.number} name="number" type="number" placeholder="12345678" />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input onChange={handleChange} value={formData?.email} name="email" type="email" placeholder="example@example.com" />
            </div>

        </div>
    )
}

