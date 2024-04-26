import { useEffect, useState } from "react";
import { Card, CardDescription } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      formData?.type_of_housing;
  
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
        <Label htmlFor="type_of_housing">What type of housing will it be moved to?</Label>
        <Select onValueChange={e => onInputChange("type_of_housing", e)} value={formData?.type_of_housing}>
          <SelectTrigger id="type_of_housing">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="Detached house">Detached house</SelectItem>
            <SelectItem value="Semi-detached house">Semi-detached house</SelectItem>
            <SelectItem value="Apartment">Apartment</SelectItem>
            <SelectItem value="Terraced house">Terraced house</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>

        </Select>
      </div>

    </div>
  )
}

