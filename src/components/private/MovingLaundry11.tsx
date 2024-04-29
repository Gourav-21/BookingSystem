import { useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function MovingLaundry11({ onInputChange, formData, setNext }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onInputChange(name, value);
    };

    useEffect(() => {
        const isValid =
            formData?.Navn &&
            formData?.Telefon &&
            formData?.email;

        setNext(isValid);
    }, [formData, setNext]);

    return (
        <div className="grid w-full items-center gap-5">

            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Utfyllende_informasjon">Utfyllende informasjon (valgfritt)</Label>
                <Textarea onChange={handleChange} value={formData?.Utfyllende_informasjon} name="Utfyllende_informasjon" placeholder="Annen relevant informasjon, spørsmål eller kommentarer til flyttefirmaene." />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Ditt navn</Label>
                <Input onChange={handleChange} value={formData?.Navn} name="Navn" placeholder="Ola Nordmann" />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="number">Telefon</Label>
                <Input onChange={handleChange} value={formData?.Telefon} name="Telefon" type="number" placeholder="12345678" />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">E-post</Label>
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

