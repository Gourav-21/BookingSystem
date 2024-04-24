import { Input } from "../ui/input"
import { Label } from "../ui/label"

function CompanySubmitDetail({ onInputChange,formData }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };
  return (
    <div className="grid w-full items-center gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Company name or organization number</Label>
        <Input onChange={handleChange} value={formData?.company_name} name="company_name" placeholder="Company AS" />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Contact person's name</Label>
        <Input onChange={handleChange} value={formData?.name} name="name" placeholder="steve jobs" />
      </div> 
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="number">The contact person's telephone number</Label>
        <Input onChange={handleChange} value={formData?.number} name="number" type="number" placeholder="12345678" />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input onChange={handleChange} value={formData?.email} name="email" type="email" placeholder="example@example.com" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col col-span-2 space-y-1.5">
          <Label htmlFor="address">Address</Label>
          <Input onChange={handleChange} value={formData?.address} name="address" type="text" placeholder="address" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="StreetNo">Street no.</Label>
          <Input onChange={handleChange} value={formData?.StreetNo} name="StreetNo" type="text" placeholder="1A" />
        </div>
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="postalCode">Postal code</Label>
        <Input onChange={handleChange} value={formData?.postalCode} name="postalCode" type="number" minLength={4} maxLength={4} placeholder="1234" />
      </div>
    </div>
  )
}

export default CompanySubmitDetail
