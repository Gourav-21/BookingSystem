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


export default function Page2({ onInputChange, formData, setNext }) {
  const [flexible, setFlexible] = useState("nei");
  const [field, setField] = useState(1);

  React.useEffect(() => {
    setFlexible(formData?.Er_vaskedatoen_fleksibel || "nei");
  }, [])

  React.useEffect(() => {
    const isValidNoFlexibility = formData.Hvor_ofte_vil_du_ha_vaskehjelp === "Bare én gang" && formData.Når_ønsker_du_gang_og_trappevask && flexible === "nei";
    const isValidFlexibility = formData.Hvor_ofte_vil_du_ha_vaskehjelp === "Bare én gang" && formData.Når_ønsker_du_gang_og_trappevask && flexible === "ja" && formData.Fleksibilitet;
    const isValidMultiple = formData.Hvor_ofte_vil_du_ha_vaskehjelp && formData.Hvor_ofte_vil_du_ha_vaskehjelp !== "Bare én gang" && field > 0 && [...Array(field)].every((_, i) => formData[`Vaskedag ${i}`] && formData[`Tidspunkt ${i}`]);
    setNext(isValidNoFlexibility || isValidFlexibility || isValidMultiple);
  }, [formData, flexible, field]);


  return (
    <div className="grid w-full items-center gap-5">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="frequency">Hvor ofte vil du ha vaskehjelp?</Label>
        <Select onValueChange={e => onInputChange("Hvor_ofte_vil_du_ha_vaskehjelp", e)} value={formData?.Hvor_ofte_vil_du_ha_vaskehjelp}>
          <SelectTrigger id="frequency">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="Bare én gang">Bare én gang</SelectItem>
            <SelectItem value="Flere ganger i uka">Flere ganger i uka</SelectItem>
            <SelectItem value="Ukentlig">Ukentlig</SelectItem>
            <SelectItem value="Annenhver uke">Annenhver uke</SelectItem>
            <SelectItem value="Månedlig">Månedlig</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData?.Hvor_ofte_vil_du_ha_vaskehjelp === "Bare én gang" &&
        <>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="washing date">Når ønsker du gang- og trappevask?</Label>
            <DatePicker onInputChange={(e) => onInputChange("Når_ønsker_du_gang_og_trappevask", e)} value={formData?.Når_ønsker_du_gang_og_trappevask} />
          </div>
          <div className="flex flex-col space-y-1.5">
            <RadioGroup className="space-y-1" onValueChange={(e) => { setFlexible(e); onInputChange("Er_vaskedatoen_fleksibel", e) }} name="flexible" defaultValue={flexible} value={flexible} >
              <Label htmlFor="flexible date">Er vaskedatoen fleksibel?</Label>
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

          {flexible === "ja" && <div className="flex flex-col space-y-1.5">
            <Label htmlFor="Fleksibilitet">Fleksibilitet</Label>
            <Select onValueChange={e => onInputChange("Fleksibilitet", e)} value={formData?.Fleksibilitet}>
              <SelectTrigger id="Fleksibilitet">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="+-1 day">+-1 day</SelectItem>
                <SelectItem value="+-2 days">+-2 days</SelectItem>
                <SelectItem value="+-3 days">+-3 days</SelectItem>
                <SelectItem value="+-1 week">+-1 week</SelectItem>
                <SelectItem value="+-2 weeks">+-2 weeks</SelectItem>
                <SelectItem value="+-1 month">+-1 month</SelectItem>
                <SelectItem value="+-more than 1 month">+-more than 1 month</SelectItem>
              </SelectContent>
            </Select>
          </div>}
        </>}

      {formData?.Hvor_ofte_vil_du_ha_vaskehjelp && formData?.Hvor_ofte_vil_du_ha_vaskehjelp != "Bare én gang" &&
        <>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="frequency">Legg til minst én passende vaskedag og tidspunkt:</Label>
            {Array.from(Array(field)).map((_, index) => {
              return (
                <div key={index} className="flex">
                  <Select onValueChange={e => onInputChange("Vaskedag " + index, e)} value={formData?.[`Vaskedag ${index}`]}>
                    <SelectTrigger className="rounded-r-none" id={`Vaskedag ${index}`}>
                      <SelectValue placeholder="Vaskedag" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Mandager">Mandager</SelectItem>
                      <SelectItem value="Tirsdager">Tirsdager</SelectItem>
                      <SelectItem value="Onsdager">Onsdager</SelectItem>
                      <SelectItem value="Torsdager">Torsdager</SelectItem>
                      <SelectItem value="Fredager">Fredager</SelectItem>
                      <SelectItem value="Lørdager">Lørdager</SelectItem>
                      <SelectItem value="Søndager">Søndager</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select onValueChange={e => onInputChange("Tidspunkt " + index, e)} value={formData?.[`Tidspunkt ${index}`]}>
                    <SelectTrigger className="rounded-l-none" id={`Tidspunkt ${index}`}>
                      <SelectValue placeholder="Tidspunkt" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="06:00 - 09:00">06:00 - 09:00</SelectItem>
                      <SelectItem value="09:00 - 12:00">09:00 - 12:00</SelectItem>
                      <SelectItem value="12:00 - 15:00">12:00 - 15:00</SelectItem>
                      <SelectItem value="15:00 - 18:00">15:00 - 18:00</SelectItem>
                      <SelectItem value="18:00 - 21:00">18:00 - 21:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )
            })}
          </div>
          <div className="flex">
            <Button variant="outline" className={cn("rounded-r-none", field === 1 && "rounded")} onClick={() => setField(field + 1)}>Legg til flere</Button>
            {field > 1 &&
              <Button variant="outline" className="rounded-l-none" disabled={field === 1} onClick={() => setField(field - 1)}>fjerne</Button>
            }
          </div>
        </>
      }

    </div>
  );
}

export function DatePicker({ value, onInputChange }) {
  const [date, setDate] = React.useState<Date>(value || null);

  React.useEffect(() => {
    onInputChange(date);
  }, [date])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Velg dato</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          disabled={(day) => day.getTime() < new Date().setHours(0, 0, 0, 0)}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}