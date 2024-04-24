import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

function Describe({ onInputChange, formData }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="name">Describe what the assignment entails</Label>
      <Textarea name="description" value={formData?.description} onChange={handleChange} placeholder="What the task entails, size of the task, frequency, whether special treatment of objects is required, etc" id="description" />
    </div>
  );
}

export default Describe