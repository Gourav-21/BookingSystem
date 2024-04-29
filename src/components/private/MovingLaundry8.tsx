import { useEffect, useState } from "react";
import { Card, CardDescription } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MovingLaundry8({ onInputChange, formData, setNext }) {

  const [ToAddress, setToAddress] = useState({
    Adresse: '',
    Gatenr: '',
    Postnummer: '',
    Størrelse_på_lokalet: '',
    Totalt_antall_rom: ''
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
      ToAddress?.Adresse &&
      ToAddress?.Postnummer &&
      ToAddress?.Størrelse_på_lokalet &&
      ToAddress?.Totalt_antall_rom &&
      formData?.type_of_housing;
  
    setNext(isValid);
  }, [ToAddress, formData, setNext]);
  

  return (
    <div className="grid w-full items-center gap-5">
      <Card className="p-4">Adressen som skal <b>flyttes til.</b> </Card>
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col col-span-2 space-y-1.5">
          <Label htmlFor="Adresse">Adresse</Label>
          <Input id="Adresse" type="text" placeholder="Adresse" value={ToAddress?.Adresse} onChange={handleChange} />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="Gatenr">Gatenr.</Label>
          <Input id="Gatenr" type="text" placeholder="1A" value={ToAddress?.Gatenr} onChange={handleChange} />
        </div>
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="Postnummer">Postnummer</Label>
        <Input id="Postnummer" type="number" minLength={4} maxLength={4} placeholder="1234" value={ToAddress?.Postnummer} onChange={handleChange} />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="Størrelse_på_lokalet">Størrelse på lokalet</Label>
        <Input id="Størrelse_på_lokalet" type="number" placeholder="120 sq m" value={ToAddress?.Størrelse_på_lokalet} onChange={handleChange} />
      </div>

      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="Totalt_antall_rom">Totalt antall rom</Label>
        <CardDescription>Inkludert kjøkken og bad</CardDescription>
        <Select onValueChange={e => setToAddress(prevData => ({ ...prevData, Totalt_antall_rom: e }))} value={ToAddress?.Totalt_antall_rom}>
          <SelectTrigger id="Totalt_antall_rom">
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

