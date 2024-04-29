import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";


export default function MovingLaundry6({ onInputChange, formData, setNext }) {
  useEffect(() => {
    const isValid =
      formData?.Ønsker_dere_at_flyttebyrået_pakker_inventaret_deres &&
      formData?.Må_gjenstandene_lagres_mellom_ut_og_innflytting &&
      formData?.Do_you_want_to_move_abroad &&
      formData?.are_you_going_to_move_abroad &&
      formData?.Ønsker_dere_å_forsikre_flyttelasset &&
      formData?.Omtrent_hvor_stort_er_flyttelasset;

    setNext(isValid);
  }, [formData, setNext]);
  return (
    <div className="grid w-full items-center gap-5">

      <div className="flex flex-col space-y-1.5">
        <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("Ønsker_dere_at_flyttebyrået_pakker_inventaret_deres", e)} value={formData?.Ønsker_dere_at_flyttebyrået_pakker_inventaret_deres}  >
          <Label htmlFor="flexible date">Ønsker dere at flyttebyrået pakker inventaret deres?</Label>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ja" id="1"/>
            <Label htmlFor="1">ja</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nei" id="2" />
            <Label htmlFor="2">nei</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col space-y-1.5">
        <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("Må_gjenstandene_lagres_mellom_ut_og_innflytting", e)} value={formData?.Må_gjenstandene_lagres_mellom_ut_og_innflytting}  >
          <Label htmlFor="flexible date">Må gjenstandene lagres mellom ut- og innflytting?</Label>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ja" id="3" />
            <Label htmlFor="3">ja</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nei" id="4" />
            <Label htmlFor="4">nei</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col space-y-1.5">
        <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("Do_you_want_to_move_abroad", e)} value={formData?.Do_you_want_to_move_abroad}  >
          <Label htmlFor="flexible date">Do you want to move abroad?</Label>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ja" id="5" />
            <Label htmlFor="5">ja</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nei" id="6" />
            <Label htmlFor="6">nei</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex flex-col space-y-1.5">
        <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("are_you_going_to_move_abroad", e)} value={formData?.are_you_going_to_move_abroad} >
          <Label htmlFor="flexible date">Are you going to move abroad?</Label>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ja" id="7" />
            <Label htmlFor="7">ja</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nei" id="8" />
            <Label htmlFor="8">nei</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex flex-col space-y-1.5">
        <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("Ønsker_dere_å_forsikre_flyttelasset", e)} value={formData?.Ønsker_dere_å_forsikre_flyttelasset}  >
          <Label htmlFor="flexible date">Ønsker dere å forsikre flyttelasset?</Label>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ja" id="9" />
            <Label htmlFor="9">ja</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nei" id="10" />
            <Label htmlFor="10">nei</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="Omtrent_hvor_stort_er_flyttelasset">Omtrent hvor stort er flyttelasset?</Label>
        <Select onValueChange={e => onInputChange("Omtrent_hvor_stort_er_flyttelasset", e)} value={formData?.Omtrent_hvor_stort_er_flyttelasset}>
          <SelectTrigger id="Omtrent_hvor_stort_er_flyttelasset">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="Fyller et bagasjerom">Fyller et bagasjerom</SelectItem>
    <SelectItem value="Fyller en liten tilhenger">Fyller en liten tilhenger</SelectItem>
    <SelectItem value="Fyller en stor tilhenger">Fyller en stor tilhenger</SelectItem>
    <SelectItem value="Fyller en varebil">Fyller en varebil</SelectItem>
    <SelectItem value="Fyller en liten lastebil">Fyller en liten lastebil</SelectItem>
    <SelectItem value="Fyller en stor lastebil">Fyller en stor lastebil</SelectItem>
    <SelectItem value="Fyller en stor lastebil med tilhenger">Fyller en stor lastebil med tilhenger</SelectItem>
    <SelectItem value="Annet/usikker">Annet/usikker</SelectItem>
          </SelectContent>
        </Select>
      </div>

    </div>
  );
}

