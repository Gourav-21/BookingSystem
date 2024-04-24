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


export default function Page2({ onInputChange, formData }) {
  const [flexible, setFlexible] = useState("no");
  const [field, setField] = useState(1);

  React.useEffect(() => {
    setFlexible(formData?.washing_Date_flexible || "no");
}, [])

  return (
    <div className="grid w-full items-center gap-5">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="frequency">How often do you want laundry help?</Label>
        <Select onValueChange={e => onInputChange("how_often_do_you_want_laundry_help", e)} value={formData?.how_often_do_you_want_laundry_help}>
          <SelectTrigger id="frequency">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="only once">only once</SelectItem>
            <SelectItem value="several times a week">several times a week</SelectItem>
            <SelectItem value="weekly">weekly</SelectItem>
            <SelectItem value="biweekly">biweekly</SelectItem>
            <SelectItem value="monthly">monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData?.how_often_do_you_want_laundry_help === "only once" &&
        <>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="washing date">When do you want corridor and staircase washing?</Label>
            <DatePicker onInputChange={(e) => onInputChange("when_do_you_want_corridor_and_staircase_washing", e)} value={formData?.when_do_you_want_corridor_and_staircase_washing} />
          </div>
          <div className="flex flex-col space-y-1.5">
          <RadioGroup className="space-y-1" onValueChange={(e) => { setFlexible(e); onInputChange("washing_Date_flexible", e) }} name="flexible" defaultValue={flexible} value={flexible} >
              <Label htmlFor="flexible date">Is the washing date flexible?</Label>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">no</Label>
              </div>
            </RadioGroup>
          </div>

          {flexible === "yes" && <div className="flex flex-col space-y-1.5">
            <Label htmlFor="Flexibility">Flexibility</Label>
            <Select onValueChange={e => onInputChange("Flexibility", e)} value={formData?.Flexibility}>
              <SelectTrigger id="Flexibility">
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

      {formData?.how_often_do_you_want_laundry_help && formData?.how_often_do_you_want_laundry_help != "only once" &&
        <>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="frequency">Add at least one suitable washing day and time:</Label>
            {Array.from(Array(field)).map((c, index) => {
              return (
                <div key={index} className="flex">
                  <Select onValueChange={e => onInputChange("day "+index, e)} value={formData?.[`day ${index}`]}>
                    <SelectTrigger className="rounded-r-none" id={`day ${index}`}>
                      <SelectValue placeholder="washing day" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="monday">monday</SelectItem>
                      <SelectItem value="tuesday">tuesday</SelectItem>
                      <SelectItem value="wednesday">wednesday</SelectItem>
                      <SelectItem value="thursday">thursday</SelectItem>
                      <SelectItem value="friday">friday</SelectItem>
                      <SelectItem value="saturday">saturday</SelectItem>
                      <SelectItem value="sunday">sunday</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select onValueChange={e => onInputChange("time "+index, e)} value={formData?.[`time ${index}`]}>
                    <SelectTrigger className="rounded-l-none" id={`time ${index}`}>
                      <SelectValue placeholder="time" />
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
            <Button variant="outline" className={cn("rounded-r-none", field === 1 && "rounded")} onClick={e => setField(field + 1)}>Add More</Button>
            {field > 1 &&
              <Button variant="outline" className="rounded-l-none" disabled={field === 1} onClick={e => setField(field - 1)}>remove</Button>
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
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          disabled={(day) => day < new Date().setHours(0, 0, 0, 0)}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}