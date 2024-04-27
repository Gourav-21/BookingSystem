import { useEffect, useState } from "react";
import { Card, CardDescription } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function MovingLaundry8({ onInputChange, formData, setNext }) {

  const [ToAddress, setToAddress] = useState({
    address: '',
    streetNo: '',
    postalCode: '',
    homeSize: '',
    totalRooms: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setToAddress(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  useEffect(() => {
    onInputChange("to_address",ToAddress);
  }, [ToAddress]);

  useEffect(()=>{
    setToAddress(formData?.to_address)
  },[])

  useEffect(() => {
    const isValid =
      ToAddress?.address &&
      ToAddress?.postalCode &&
      ToAddress?.homeSize &&
      ToAddress?.totalRooms &&
      formData?.What_type_of_premises_should_be_washed &&
      formData?.How_many_floors_does_the_new_premises_have &&
      formData?.is_there_a_lift_in_the_building
  
    setNext(isValid);
  }, [ToAddress, formData, setNext]);
  

  return (
    <div className="grid w-full items-center gap-5">
      <Card className="p-4">The address to be <b>moved to.</b> </Card>
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col col-span-2 space-y-1.5">
          <Label htmlFor="address">Address</Label>
          <Input id="address" type="text" placeholder="address" value={ToAddress?.address} onChange={handleChange} />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="streetNo">Street no.</Label>
          <Input id="streetNo" type="text" placeholder="1A" value={ToAddress?.streetNo} onChange={handleChange} />
        </div>
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="postalCode">Postal code</Label>
        <Input id="postalCode" type="number" minLength={4} maxLength={4} placeholder="1234" value={ToAddress?.postalCode} onChange={handleChange} />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="homeSize">The size of the home</Label>
        <Input id="homeSize" type="number" placeholder="120 sq m" value={ToAddress?.homeSize} onChange={handleChange} />
      </div>

      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="totalRooms">Total number of rooms</Label>
        <CardDescription>Including kitchen and bathroom</CardDescription>
        <Select onValueChange={e => setToAddress(prevData => ({ ...prevData, totalRooms: e }))} value={ToAddress?.totalRooms}>
          <SelectTrigger id="totalRooms">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="1 room">1 room</SelectItem>
            <SelectItem value="2 rooms">2 rooms</SelectItem>
            <SelectItem value="3 rooms">3 rooms</SelectItem>
            <SelectItem value="4 rooms">4 rooms</SelectItem>
            <SelectItem value="5 rooms">5 rooms</SelectItem>
            <SelectItem value="6 rooms">6 rooms</SelectItem>
            <SelectItem value="7 rooms">7 rooms</SelectItem>
            <SelectItem value="8 rooms">8 rooms</SelectItem>
            <SelectItem value="9 rooms">9 rooms</SelectItem>
            <SelectItem value="10 rooms or more">10 rooms or more</SelectItem>
          </SelectContent>

        </Select>
      </div>

      

      <div className="flex flex-col space-y-1.5">
                <Label htmlFor="premises">What type of premises should be washed?</Label>
                <Select onValueChange={e => onInputChange("What_type_of_premises_should_be_washed", e)} value={formData?.What_type_of_premises_should_be_washed}>
                    <SelectTrigger id="premises">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="Office">Office</SelectItem>
                        <SelectItem value="Stock/production">Stock/production</SelectItem>
                        <SelectItem value="Combination room">Combination room</SelectItem>
                        <SelectItem value="Shop/trade">Shop/trade</SelectItem>
                        <SelectItem value="Serving">Serving</SelectItem>
                        <SelectItem value="Instruction">Instruction</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="floors">How many floors does the new premises have?</Label>
                <Select onValueChange={e => onInputChange("How_many_floors_does_the_new_premises_have", e)} value={formData?.How_many_floors_does_the_new_premises_have}>
                    <SelectTrigger id="floors">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="1 floor">1 floor</SelectItem>
                        <SelectItem value="2 floors">2 floors</SelectItem>
                        <SelectItem value="3 or more floors">3 or more floors</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
                <RadioGroup className="space-y-1" value={formData?.is_there_a_lift_in_the_building} onValueChange={(e) => onInputChange("is_there_a_lift_in_the_building",e)} name="lift"  >
                    <Label htmlFor="lift">Is there a lift in the building?</Label>
                    <div className="flex gap-2">

                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes">yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no">no</Label>
                    </div>
                    </div>
                </RadioGroup>
            </div>

    </div>
  )
}

