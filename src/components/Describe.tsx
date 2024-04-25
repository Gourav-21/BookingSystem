import { useEffect } from "react";
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

function Describe({ onInputChange, formData, setNext }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  useEffect(()=>{
    if(formData.description && formData.description.length > 0){
      setNext(true)
    }else{
      setNext(false)
    }
  },[formData.description]) 

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="name">Describe what the assignment entails</Label>
      <Textarea name="description" value={formData?.description} onChange={handleChange} placeholder="What the task entails, size of the task, frequency, whether special treatment of objects is required, etc" id="description" />
    </div>
  );
}

export default Describe