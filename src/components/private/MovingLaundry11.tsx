import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function MovingLaundry11({ formData, onInputChange }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onInputChange(name, value);
    };
    return (
        <div className="grid w-full items-center gap-4">

            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="additional_information">Additional information (optional)</Label>
                <Textarea onChange={handleChange} value={formData?.additional_information} name="additional_information" placeholder="Other relevant information, questions or comments to the moving companies." />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Your name</Label>
                <Input onChange={handleChange} value={formData?.name} name="name" placeholder="First and last name" />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="number">Telephone</Label>
                <Input onChange={handleChange} value={formData?.number} name="number" type="number" placeholder="12345678" />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input onChange={handleChange} value={formData?.email} name="email" type="email" placeholder="example@example.com" />
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
        </div>
    )
}

