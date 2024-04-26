import { useEffect, useState } from "react";
import { Card, CardDescription } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export default function MovingLaundry7({ onInputChange, formData, setNext }) {
  const [addressData, setAddressData] = useState({
    address: '',
    streetNo: '',
    postalCode: '',
    distanceToParking: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAddressData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  useEffect(() => {
    onInputChange("from_address",addressData);
  }, [addressData]);

  useEffect(()=>{
    setAddressData(formData?.from_address)
  },[])

  useEffect(()=>{
    if(formData?.from_address?.address !== undefined && formData?.from_address?.postalCode !== undefined && formData?.from_address?.distanceToParking !== undefined && formData?.from_address?.address !== "" && formData?.from_address?.postalCode !== "" && formData?.from_address?.distanceToParking !== ""){
      setNext(true)
    }else{
      setNext(false)
    }
  },[formData])

  return (
    <div className="grid w-full items-center gap-4">
      <Card className="p-4">The address to be <b>washed and moved from.</b></Card>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col col-span-2 space-y-1.5">
          <Label htmlFor="address">Address</Label>
          <Input id="address" type="text" placeholder="address" value={addressData?.address} onChange={handleChange} />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="StreetNo">Street no.</Label>
          <Input id="streetNo" type="text" placeholder="1A" value={addressData?.streetNo} onChange={handleChange} />
        </div>
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="postalCode">Postal code</Label>
        <Input id="postalCode" type="number" minLength={4} maxLength={4} placeholder="1234" value={addressData?.postalCode} onChange={handleChange} />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="number">Distance to parking</Label>
        <CardDescription >Nearest point where the removal truck can be parked during loading</CardDescription>
        <Input id="distanceToParking" type="number" placeholder="20 meters" value={addressData?.distanceToParking} onChange={handleChange} />
      </div>
    </div>
  )
}

