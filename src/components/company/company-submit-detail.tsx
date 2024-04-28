import { useEffect } from "react";
import { Input } from "../ui/input"
import { Label } from "../ui/label"

function CompanySubmitDetail({ onInputChange,formData,setNext }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

useEffect(() => {
    if (formData?.Firmanavn && formData?.Navn && formData?.telefonnummer && formData?.email && formData?.Adresse && formData?.Postnummer && formData?.Firmanavn != "" && formData?.Navn != "" && formData?.telefonnummer != "" && formData?.email != "" && formData?.Adresse != "" && formData?.Postnummer != "" ) {
      setNext(true)
    } else {
      setNext(false)
    }
  }, [formData])
  

  return (
    <div className="grid w-full items-center gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Firmanavn eller organisasjonsnummer</Label>
        <Input onChange={handleChange} value={formData?.Firmanavn} name="Firmanavn" placeholder="Selskap AS" />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="Navn">Kontaktpersonens navn</Label>
        <Input onChange={handleChange} value={formData?.Navn} name="Navn" placeholder="steve jobs" />
      </div> 
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="telefonnummer">Kontaktpersonens telefonnummer</Label>
        <Input onChange={handleChange} value={formData?.telefonnummer} name="telefonnummer" type="number" placeholder="12345678" />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="email">E-post</Label>
        <Input onChange={handleChange} value={formData?.email} name="email" type="email" placeholder="example@example.com" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col col-span-2 space-y-1.5">
          <Label htmlFor="Adresse">Adresse</Label>
          <Input onChange={handleChange} value={formData?.Adresse} name="Adresse" type="text" placeholder="Gateadresse" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="Gatenr">Gatenr.</Label>
          <Input onChange={handleChange} value={formData?.Gatenr} name="Gatenr" type="text" placeholder="1A" />
        </div>
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="Postnummer">Postnummer</Label>
        <Input onChange={handleChange} value={formData?.Postnummer} name="Postnummer" type="number" minLength={4} maxLength={4} placeholder="1234" />
      </div>
    </div>
  )
}

export default CompanySubmitDetail
