import { useEffect } from "react";
import { Input } from "../ui/input"
import { Label } from "../ui/label"

function PrivateSubmitDetail({ onInputChange, formData, setNext }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  useEffect(() => {
    const isValid =
      formData?.Navn &&
      formData?.email &&
      formData?.Telefon &&
      formData?.Adresse &&
      formData?.Postnummer;

    setNext(isValid);
  },[formData])

  return (
    <div className="grid w-full items-center gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Your name</Label>
        <Input onChange={handleChange} value={formData?.Navn} name="Navn" placeholder="First and last name" />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input onChange={handleChange} value={formData?.email} name="email" type="email" placeholder="example@example.com" />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="Telefon">Telephone</Label>
        <Input onChange={handleChange} value={formData?.Telefon} name="Telefon" type="number" placeholder="12345678" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col col-span-2 space-y-1.5">
          <Label htmlFor="Adresse">Adresse</Label>
          <Input onChange={handleChange} value={formData?.Adresse} name="Adresse" type="text" placeholder="Adresse" />
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

export default PrivateSubmitDetail
