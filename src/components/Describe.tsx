import { useEffect } from "react";
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

function Describe({ onInputChange, formData, setNext }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  useEffect(()=>{
    if(formData.beskrivelse && formData.beskrivelse.length > 0){
      setNext(true)
    }else{
      setNext(false)
    }
  },[formData.beskrivelse]) 

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="name">Beskriv hva oppdraget går ut på</Label>
      <Textarea name="beskrivelse" value={formData?.beskrivelse} onChange={handleChange} placeholder="Hva oppgaven innebærer, størrelse på oppgave, hyppighet, om det kreves spesialbehandling av objekter, osv" id="beskrivelse" />
    </div>
  );
}

export default Describe