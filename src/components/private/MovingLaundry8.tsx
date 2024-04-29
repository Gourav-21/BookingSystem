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
    onInputChange("to_address", ToAddress);
  }, [ToAddress]);

  useEffect(() => {
    setToAddress(formData?.to_address)
  }, [])

  useEffect(() => {
    const isValid =
      ToAddress?.Adresse &&
      ToAddress?.Postnummer &&
      ToAddress?.Størrelse_på_lokalet &&
      ToAddress?.Totalt_antall_rom &&
      formData?.Hva_slags_type_bolig_skal_det_flyttes_til;

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
            <SelectItem value="1 rom">1 rom</SelectItem>
            <SelectItem value="2 rom">2 rom</SelectItem>
            <SelectItem value="3 rom">3 rom</SelectItem>
            <SelectItem value="4 rom">4 rom</SelectItem>
            <SelectItem value="5 rom">5 rom</SelectItem>
            <SelectItem value="6 rom">6 rom</SelectItem>
            <SelectItem value="7 rom">7 rom</SelectItem>
            <SelectItem value="8 rom">8 rom</SelectItem>
            <SelectItem value="9 rom">9 rom</SelectItem>
            <SelectItem value="10 rom+">10 rom+</SelectItem>
          </SelectContent>

        </Select>
      </div>

      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="Hva_slags_type_bolig_skal_det_flyttes_til">Hva slags type bolig skal det flyttes til?</Label>
        <Select onValueChange={e => onInputChange("Hva_slags_type_bolig_skal_det_flyttes_til", e)} value={formData?.Hva_slags_type_bolig_skal_det_flyttes_til}>
          <SelectTrigger id="Hva_slags_type_bolig_skal_det_flyttes_til">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="Enebolig">Enebolig</SelectItem>
            <SelectItem value="Tomannsbolig">Tomannsbolig</SelectItem>
            <SelectItem value="Leilighet">Leilighet</SelectItem>
            <SelectItem value="Rekkehus">Rekkehus</SelectItem>
            <SelectItem value="Annet">Annet</SelectItem>
          </SelectContent>

        </Select>
      </div>

    </div>
  )
}

