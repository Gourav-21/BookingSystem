import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function MovingLaundry6({ onInputChange, formData }) {

  return (
    <div className="grid w-full items-center gap-5">

      <div className="flex flex-col space-y-1.5">
        <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("Does_the_moving_agency_pack_the_items", e)} value={formData?.Does_the_moving_agency_pack_the_items}  >
          <Label htmlFor="flexible date">Do you want the moving agency to pack the items?</Label>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="1"/>
            <Label htmlFor="1">yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="2" />
            <Label htmlFor="2">no</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col space-y-1.5">
        <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("Do_the_objects_have_to_be_stored_between_moving_out_and_moving_in", e)} value={formData?.Do_the_objects_have_to_be_stored_between_moving_out_and_moving_in}  >
          <Label htmlFor="flexible date">Do the objects have to be stored between moving out and moving in?</Label>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="3" />
            <Label htmlFor="3">yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="4" />
            <Label htmlFor="4">no</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col space-y-1.5">
        <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("Do_you_want_to_move_abroad", e)} value={formData?.Do_you_want_to_move_abroad}  >
          <Label htmlFor="flexible date">Do you want to move abroad?</Label>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="5" />
            <Label htmlFor="5">yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="6" />
            <Label htmlFor="6">no</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex flex-col space-y-1.5">
        <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("are_you_going_to_move_abroad", e)} value={formData?.are_you_going_to_move_abroad} >
          <Label htmlFor="flexible date">Are you going to move abroad?</Label>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="7" />
            <Label htmlFor="7">yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="8" />
            <Label htmlFor="8">no</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex flex-col space-y-1.5">
        <RadioGroup className="space-y-1" onValueChange={(e) => onInputChange("do_you_want_to_insure_the_moving_load", e)} value={formData?.do_you_want_to_insure_the_moving_load}  >
          <Label htmlFor="flexible date">Do you want to insure the moving load?</Label>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="9" />
            <Label htmlFor="9">yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="10" />
            <Label htmlFor="10">no</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="how_big_is_the_moving_load">Approximately how big is the moving load?</Label>
        <Select onValueChange={e => onInputChange("how_big_is_the_moving_load", e)} value={formData?.how_big_is_the_moving_load}>
          <SelectTrigger id="how_big_is_the_moving_load">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="Fills a trunk">Fills a trunk</SelectItem>
            <SelectItem value="Fills a small trailer">Fills a small trailer</SelectItem>
            <SelectItem value="Fills a large trailer">Fills a large trailer</SelectItem>
            <SelectItem value="Filling a van">Filling a van</SelectItem>
            <SelectItem value="Fills a small truck">Fills a small truck</SelectItem>
            <SelectItem value="Fills a large truck">Fills a large truck</SelectItem>
            <SelectItem value="Fills a large truck with trailer">Fills a large truck with trailer</SelectItem>
            <SelectItem value="Other/uncertain">Other/uncertain</SelectItem>
          </SelectContent>
        </Select>
      </div>

    </div>
  );
}

