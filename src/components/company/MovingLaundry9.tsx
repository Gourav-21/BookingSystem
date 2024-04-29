import { RadioGroup } from "@radix-ui/react-radio-group"
import { Label } from "../ui/label"
import { RadioGroupItem } from "../ui/radio-group"
import { CardDescription } from "../ui/card"
import { Textarea } from "../ui/textarea"
import { useEffect, useState } from "react"

export default function MovingLaundry9({ onInputChange, formData, setNext }) {
    const [heavy, setHeavy] = useState("")
    const [fragile, setFragile] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onInputChange(name, value);
    };


    useEffect(() => {
        setHeavy(formData?.Skal_dere_flytte_tunge_gjenstander || "")
        setFragile(formData?.Skal_dere_flytte_skjøre_eller_verdifulle_gjenstander || "")
    }, [])

    useEffect(() => {
        const isValid =
            (formData?.Skal_dere_flytte_tunge_gjenstander === "nei" || formData?.er_du_beveger_tunge_objekter_beskrivelse) &&
            (formData?.Skal_dere_flytte_skjøre_eller_verdifulle_gjenstander === "nei" || formData?.Flytter_du_skjøre_eller_verdifulle_gjenstander_beskrivelse);

        setNext(isValid);
    }, [formData, setNext]);



    return (
        <div className="grid w-full items-center gap-5">

            <div className="flex flex-col space-y-2">
                <RadioGroup className="space-y-2" onValueChange={(e) => { setHeavy(e); onInputChange("Skal_dere_flytte_tunge_gjenstander", e) }} name="Skal_dere_flytte_tunge_gjenstander" value={heavy} >
                    <Label htmlFor="Skal_dere_flytte_tunge_gjenstander">Skal dere flytte tunge gjenstander?</Label>
                    <CardDescription>For å planlegge flyttingen best mulig, bør flyttefirmaet vite om tunge eller store ting som skal flyttes.</CardDescription>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ja" id="1" />
                        <Label htmlFor="1">ja</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nei" id="2" />
                        <Label htmlFor="2">nei</Label>
                    </div>
                </RadioGroup>
                {heavy === "ja" && <Textarea onChange={handleChange} name="er_du_beveger_tunge_objekter_beskrivelse" value={formData?.er_du_beveger_tunge_objekter_beskrivelse} placeholder="Hvilke tunge gjenstander skal flyttes?" id="description" />}
            </div>

            <div className="flex flex-col space-y-2">
                <RadioGroup className="space-y-2" onValueChange={(e) => { setFragile(e); onInputChange("Skal_dere_flytte_skjøre_eller_verdifulle_gjenstander", e) }} name="Skal_dere_flytte_skjøre_eller_verdifulle_gjenstander" value={fragile} >
                    <Label htmlFor="Skal_dere_flytte_skjøre_eller_verdifulle_gjenstander">Skal dere flytte skjøre eller verdifulle gjenstander?</Label>
                    <CardDescription>For å planlegge flyttingen best mulig, bør flyttefirmaet vite om skjøre ting som skal flyttes.</CardDescription>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ja" id="ja" />
                        <Label htmlFor="ja">ja</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nei" id="nei" />
                        <Label htmlFor="nei">nei</Label>
                    </div>
                </RadioGroup>
                {fragile === "ja" && <Textarea onChange={handleChange} name="Flytter_du_skjøre_eller_verdifulle_gjenstander_beskrivelse" value={formData?.Flytter_du_skjøre_eller_verdifulle_gjenstander_beskrivelse} placeholder="Hvilke skjøre eller verdifulle gjenstander skal flyttes?" id="description" />}
            </div>

        </div>
    )
}
