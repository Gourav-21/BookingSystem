import { useEffect, useState } from "react";
import { Card, CardDescription } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

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
      formData?.Hva_slags_type_lokale_flytter_dere_til &&
      formData?.Hvor_mange_etasjer_har_det_nye_lokalet &&
      formData?.Er_det_heis_i_bygningen

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
        <Input id="Størrelse_på_lokalet" type="number" placeholder="100 kvm" value={ToAddress?.Størrelse_på_lokalet} onChange={handleChange} />
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
            <SelectItem value="10 rom eller flere">10 rom eller flere</SelectItem>
          </SelectContent>

        </Select>
      </div>



      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="premises">Hva slags type lokale flytter dere til?</Label>
        <Select onValueChange={e => onInputChange("Hva_slags_type_lokale_flytter_dere_til", e)} value={formData?.Hva_slags_type_lokale_flytter_dere_til}>
          <SelectTrigger id="premises">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="Kontor">Kontor</SelectItem>
            <SelectItem value="Lager/produksjon">Lager/produksjon</SelectItem>
            <SelectItem value="Kombinasjonslokale">Kombinasjonslokale</SelectItem>
            <SelectItem value="Butikk/handel">Butikk/handel</SelectItem>
            <SelectItem value="Servering">Servering</SelectItem>
            <SelectItem value="Undervisning">Undervisning</SelectItem>
            <SelectItem value="Annet">Annet</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="floors">Hvor mange etasjer har det nye lokalet?</Label>
        <Select onValueChange={e => onInputChange("Hvor_mange_etasjer_har_det_nye_lokalet", e)} value={formData?.Hvor_mange_etasjer_har_det_nye_lokalet}>
          <SelectTrigger id="floors">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="1 ">1 </SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5+">5+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col space-y-1.5">
        <RadioGroup className="space-y-1" value={formData?.Er_det_heis_i_bygningen} onValueChange={(e) => onInputChange("Er_det_heis_i_bygningen", e)} name="lift"  >
          <Label htmlFor="lift">Er det heis i bygningen?</Label>
          <div className="flex gap-2">

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="ja" />
              <Label htmlFor="ja">ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nei" id="nei" />
              <Label htmlFor="nei">nei</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

    </div>
  )
}

