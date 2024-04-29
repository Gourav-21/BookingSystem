import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { CardContent, CardHeader } from "./ui/card";
import Describe from "./Describe";
import PrivateSubmitDetail from "./private/private-submit-detail";
import RegularCleaning from "./private/regularCleaning";
import RegularCleaning2 from "./private/regularCleaning2";
import RegularCleaning3 from "./private/regularCleaning3";
import RegularCleaning4 from "./private/regularCleaning4";
import BuildingCleaning1 from "./private/BuildingCleaning1";
import BuildingCleaning2 from "./private/BuildingCleaning2";
import BuildingCleaning3 from "./private/BuildingCleaning3";
import EstateWashing from "./private/EstateWashing";
import EstateWashing2 from "./private/EstateWashing2";
import EstateWashing3 from "./private/EstateWashing3";
import MovingLaundry from "./private/MovingLaundry";
import MovingLaundry2 from "./private/MovingLaundry2";
import MovingLaundry3 from "./private/MovingLaundry3";
import MajorCleaning from "./private/MajorCleaning";
import MajorCleaning2 from "./private/MajorCleaning2";
import MajorCleaning3 from "./private/MajorCleaning3";
import DisplayWash2 from "./private/DisplayWash2";
import DisplayWash3 from "./private/DisplayWash3";
import DisplayWash4 from "./private/DisplayWash4";
import DisplayWash from "./private/DisplayWash";
import MajorCleaning4 from "./private/MajorCleaning4";
import MovingLaundry5 from "./private/MovingLaundry5";
import MovingLaundry6 from "./private/MovingLaundry6";
import MovingLaundry7 from "./private/MovingLaundry7";
import MovingLaundry8 from "./private/MovingLaundry8";
import MovingLaundry9 from "./private/MovingLaundry9";
import MovingLaundry4 from "./private/MovingLaundry4";
import MovingLaundry10 from "./private/MovingLaundry10";
import MovingLaundry11 from "./private/MovingLaundry11";
import Success from "./Success";
import { useToast } from "./ui/use-toast";
import emailjs from '@emailjs/browser';

function ChoicePage({ choice, onChoiceChange, nextPage }) {
  return (
    <div className="flex flex-col justify-between space-y-1">
      <div>

        <CardHeader>
          <p className="text-white text-2xl font-semibold">Hva slags type rengjøring ønsker du?</p>

        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="comfortable" value={choice} onValueChange={onChoiceChange} className="space-y-1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Fast_renhold" id="r1" />
              <Label htmlFor="r1">Fast renhold</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Byggrengjøring" id="r2" />
              <Label htmlFor="r2">Byggrengjøring</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Dødsbovask" id="r3" />
              <Label htmlFor="r3">Dødsbovask</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moving-laundry" id="r5" />
              <Label htmlFor="r5">Moving Laundry</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Storrengjøring" id="r7" />
              <Label htmlFor="r7">Storrengjøring</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Visningsvask" id="r9" />
              <Label htmlFor="r9">Visningsvask</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Annen_vask" id="r10" />
              <Label htmlFor="r10">Annen vask</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </div>

      <div>
        <Button variant="outline" className="flex-1 w-full" onClick={nextPage} disabled={!choice}>Neste</Button>
      </div>
    </div>
  );
}

function PageIndicator({ currentPage, totalPages }) {
  return (
    <div className="flex justify-center mt-4">
      {Array.from(Array(totalPages), (_, i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full mx-1 ${i < currentPage ? 'bg-white' : 'bg-blue-400'}`}
        />
      ))}
    </div>
  );
}

export default function PrivateCleaning({ page, setPage }) {
  const { toast } = useToast()
  const [choice, setChoice] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [next, setNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChoiceChange = (value) => {
    setFormData({
      type: "Privat",
      type_rengjøring: value
    });

    setChoice(value);
  };

  useEffect(() => {
    if (page == 0)
      setNext(true)
  }, [page])

  const nextPage = () => {
    if (next) {
      setNext(false);
      setPage(page => Math.min(page + 1, getPages(choice).length));
    } else {
      toast({
        variant: "destructive",
        title: "Åh! Noe gikk galt.",
        description: "Vennligst fyll inn alle feltene",
      })
    }
  }
  const prevPage = () => setPage(page => Math.max(page - 1, 0));

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const getPages = (choice) => {
    switch (choice) {
      case "Fast_renhold":
        return [<RegularCleaning key="page1" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <RegularCleaning2 key="page2" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <RegularCleaning3 key="page0" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <RegularCleaning4 key="page3" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <PrivateSubmitDetail key="page4" setNext={setNext} onInputChange={handleInputChange} formData={formData} />];
      case "Byggrengjøring":
        return [<BuildingCleaning1 key="page1" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <BuildingCleaning2 key="page2" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <BuildingCleaning3 key="page0" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <PrivateSubmitDetail key="page4" setNext={setNext} onInputChange={handleInputChange} formData={formData} />];
      case "Dødsbovask":
        return [<EstateWashing key="page1" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <EstateWashing2 key="page2" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <EstateWashing3 key="page0" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <PrivateSubmitDetail key="page4" setNext={setNext} onInputChange={handleInputChange} formData={formData} />];
      case "moving-laundry":
        // @ts-ignore
        if (formData?.Ønsker_dere_også_flyttehjelp === "ja") {
          // @ts-ignore
          if (formData?.type_of_housing === "Apartment") {

            return [<MovingLaundry key="page1" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry2 key="page2" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry3 key="page3" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry4 key="page4" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry5 key="page5" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry6 key="page6" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry7 key="page7" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry8 key="page8" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry9 key="page9" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry10 key="page10" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry11 key="page11" setNext={setNext} onInputChange={handleInputChange} formData={formData} />];
          } else {
            return [<MovingLaundry key="page1" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry2 key="page2" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry3 key="page3" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry4 key="page4" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry5 key="page5" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry6 key="page6" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry7 key="page7" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry8 key="page8" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry10 key="page10" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry11 key="page11" setNext={setNext} onInputChange={handleInputChange} formData={formData} />];
          }
        } else {
          return [<MovingLaundry key="page1" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry2 key="page2" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry3 key="page3" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry4 key="page4" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <PrivateSubmitDetail key="page4" setNext={setNext} onInputChange={handleInputChange} formData={formData} />]
        }
      case "Storrengjøring":
        return [<MajorCleaning key="page1" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MajorCleaning2 key="page2" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MajorCleaning3 key="page0" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MajorCleaning4 key={"page4"} setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <PrivateSubmitDetail key="page4" setNext={setNext} onInputChange={handleInputChange} formData={formData} />];
      case "Visningsvask":
        return [<DisplayWash key="page1" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <DisplayWash2 key="page2" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <DisplayWash3 key="page0" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <DisplayWash4 key="page5" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <PrivateSubmitDetail key="page4" setNext={setNext} onInputChange={handleInputChange} formData={formData} />];
      default:
        return [<Describe key="page1" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <PrivateSubmitDetail key="page2" setNext={setNext} onInputChange={handleInputChange} formData={formData} />];
    }
  };

  const submitData = () => {
    if (isLoading) {
      return
    }
    setIsLoading(true);
    if (!next) {
      toast({
        variant: "destructive",
        title: "Åh! Noe gikk galt.",
        description: "Vennligst fyll inn alle feltene",
      })
      return
    }
    emailjs.send("service_s51bxmq", "template_z6fjeta", {
      // @ts-ignore
      Navn: formData.Navn,
      // @ts-ignore
      type: formData.type,
      // @ts-ignore
      type_rengjøring: formData.type_rengjøring,

      formData: JSON.stringify(formData, null, 2),
    }, "Ir-YjhpxWCxJ8yqh_")
      .then((result) => {
        console.log("Submitted Data:", formData);
        setSubmitted(true);
        setNext(true)
        console.log(result.text);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setIsLoading(false);
      });
  };
  console.log(formData)

  const goToHome = () => {
    setPage(0);
    setFormData({
      type: "Privat",
      // @ts-ignore
      type_rengjøring: formData?.type_rengjøring
    });
    setSubmitted(false);
  };

  return (
    <div>
      {!submitted ? (
        page === 0 ? (
          <div className="flex min-h-[460px]">

            <ChoicePage choice={choice} onChoiceChange={handleChoiceChange} nextPage={nextPage} />
          </ div>
        ) : (
          <>
            <div className="flex flex-col justify-between min-h-[500px]">
              {getPages(choice)[page - 1]}
              <div className="flex justify-between mt-4">
                <Button variant="outline" className="rounded-r-none" onClick={prevPage}>Tilbake</Button>
                {page === getPages(choice).length ? (
                  <Button variant="outline" className="flex-1 rounded-l-none" disabled={isLoading} onClick={submitData}>
                    {isLoading ? (
                      "Sender inn..."
                    ) : (
                      'Send inn'
                    )}
                  </Button>
                ) : (
                  <Button variant="outline" className="flex-1 rounded-l-none" onClick={nextPage}>Neste</Button>
                )}
              </div>
            </div>
          </>
        )
      ) : (
        <div className="text-center">
          <Success />
          <p className="text-2xl text-white font-semibold mb-4">Vellykket innsendt!</p>
          <Button variant="outline" onClick={goToHome}>gå tilbake</Button>
        </div>

      )}
      <PageIndicator currentPage={page + 1} totalPages={choice ? getPages(choice).length + 1 : 1} />
    </div>
  );
}


