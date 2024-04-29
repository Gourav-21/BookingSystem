import { useEffect, useState } from "react";
import { Card, CardDescription } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export default function MovingLaundry7({ onInputChange, formData, setNext }) {
  const [addressData, setAddressData] = useState({
    Adresse: '',
    Gatenr: '',
    Postnummer: '',
    Avstand_til_parkering: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAddressData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  useEffect(() => {
    onInputChange("Adressen_som_skal_vaskes_og_flyttes_fra",addressData);
  }, [addressData]);

  useEffect(()=>{
    setAddressData(formData?.Adressen_som_skal_vaskes_og_flyttes_fra)
  },[])

  useEffect(()=>{
    if(formData?.Adressen_som_skal_vaskes_og_flyttes_fra?.Adresse !== undefined && formData?.Adressen_som_skal_vaskes_og_flyttes_fra?.Postnummer !== undefined && formData?.Adressen_som_skal_vaskes_og_flyttes_fra?.Avstand_til_parkering !== undefined && formData?.Adressen_som_skal_vaskes_og_flyttes_fra?.Adresse !== "" && formData?.Adressen_som_skal_vaskes_og_flyttes_fra?.Postnummer !== "" && formData?.Adressen_som_skal_vaskes_og_flyttes_fra?.Avstand_til_parkering !== ""){
      setNext(true)
    }else{
      setNext(false)
    }
  },[formData])

  return (
    <div className="grid w-full items-center gap-5">
      <Card className="p-4">Adressen som skal <b>vaskes og flyttes fra.</b></Card>
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col col-span-2 space-y-1.5">
          <Label htmlFor="Adresse">Adresse</Label>
          <Input id="Adresse" type="text" placeholder="Adresse" value={addressData?.Adresse} onChange={handleChange} />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="Gatenr">Gatenr.</Label>
          <Input id="Gatenr" type="text" placeholder="1A" value={addressData?.Gatenr} onChange={handleChange} />
        </div>
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="Postnummer">Postnummer</Label>
        <Input id="Postnummer" type="number" minLength={4} maxLength={4} placeholder="1234" value={addressData?.Postnummer} onChange={handleChange} />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="number">Avstand til parkering</Label>
        <CardDescription >Nærmeste punkt hvor flyttebilen kan stå under lasting</CardDescription>
        <Input id="Avstand_til_parkering" type="number" placeholder="20 meters" value={addressData?.Avstand_til_parkering} onChange={handleChange} />
      </div>
    </div>
  )
}

