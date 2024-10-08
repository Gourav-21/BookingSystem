import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { CardContent, CardHeader } from "./ui/card";
import CompanySubmitDetail from "./company/company-submit-detail";
import Describe from "./Describe";
import RegularCleaning from "./company/RegularCleaning";
import RegularCleaning2 from "./company/RegularCleaning2";
import RegularCleaning3 from "./company/RegularCleaning3";
import RegularCleaning4 from "./company/RegularCleaning4";
import Success from "./Success";
import { useToast } from "./ui/use-toast";
import MovingLaundry from "./company/MovingLaundry";
import MovingLaundry2 from "./company/MovingLaundry2";
import MovingLaundry3 from "./company/MovingLaundry3";
import MovingLaundry4 from "./company/MovingLaundry4";
import MovingLaundry5 from "./company/MovingLaundry5";
import MovingLaundry6 from "./company/MovingLaundry6";
import MovingLaundry7 from "./company/MovingLaundry7";
import MovingLaundry8 from "./company/MovingLaundry8";
import MovingLaundry9 from "./company/MovingLaundry9";
import MovingLaundry10 from "./company/MovingLaundry10";
import emailjs from '@emailjs/browser';
import { generateHTML } from "@/lib/utils";

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

export default function Company({ page, setPage }) {
  const { toast } = useToast()
  const [choice, setChoice] = useState(null);
  const [formData, setFormData] = useState({
    type: "Bedrift",
    type_rengjøring: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [next, setNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChoiceChange = (value) => {
    setFormData({
      type: "Bedrift",
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
      case "Fast-renhold":
        // @ts-ignore
        if (formData?.Hva_slags_type_lokale_skal_vaskes && formData?.Hva_slags_type_lokale_skal_vaskes.includes("Kontor")) {
          return [<RegularCleaning key="page1" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <RegularCleaning2 key="page2" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <RegularCleaning3 key="page3" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <RegularCleaning4 key="page4" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <CompanySubmitDetail key="page5" onInputChange={handleInputChange} formData={formData} setNext={setNext} />];
        } else {
          return [<RegularCleaning key="page1" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <RegularCleaning3 key="page3" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <RegularCleaning4 key="page4" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <CompanySubmitDetail key="page5" onInputChange={handleInputChange} formData={formData} setNext={setNext} />];
        }
      case "Flyttevask":
        // @ts-ignore
        if (formData?.Ønsker_dere_også_flyttehjelp === "ja") {
          return [<MovingLaundry key="page1" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry2 key="page2" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry3 key="page3" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry4 key="page4" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry5 key="page5" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry6 key="page6" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry7 key="page7" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry8 key="page8" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry9 key="page9" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry10 key="page10" setNext={setNext} onInputChange={handleInputChange} formData={formData} />];
        } else {
          return [<MovingLaundry key="page1" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry2 key="page2" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry3 key="page3" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <MovingLaundry4 key="page4" setNext={setNext} onInputChange={handleInputChange} formData={formData} />, <CompanySubmitDetail key="page4" setNext={setNext} onInputChange={handleInputChange} formData={formData} />]
        }

      default:
        return [<Describe key="page1" onInputChange={handleInputChange} formData={formData} setNext={setNext} />, <CompanySubmitDetail key="page2" onInputChange={handleInputChange} formData={formData} setNext={setNext} />];
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
      setIsLoading(false);
      return
    }
    emailjs.send("service_s51bxmq", "template_z6fjeta", {
      // @ts-ignore      
      Navn: formData.Navn,
      // @ts-ignore
      type: formData.type,
      // @ts-ignore
      type_rengjøring: formData.type_rengjøring,

      formData: generateHTML(formData)
    }, "Ir-YjhpxWCxJ8yqh_")
      .then((result) => {
        console.log("Submitted Data:", formData);
        setSubmitted(true);
        setNext(true)
        console.log(result.text);
        setIsLoading(false);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Åh! Noe gikk galt.",
          description:error,
        })
        console.error('Error sending email:', error);
        setIsLoading(false);
      });
  };

  const goToHome = () => {
    setPage(0);
    // prevPage()
    setFormData({
      type: "Bedrift",
      // @ts-ignore
      type_rengjøring: formData?.type_rengjøring
    });
    setSubmitted(false);
  };
  console.log(next)

  return (
    <div>
      {!submitted ? (
        page === 0 ? (
          <div className="flex min-h-[460px]">

            <ChoicePage choice={choice} onChoiceChange={handleChoiceChange} nextPage={nextPage} />
          </div>
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
          <p className="text-2xl text-white font-semibold mb-4">Tusen takk for din henvendelse!</p>
          <p className="text-xs text-white font-semibold mb-4">Vi har videreformidlet din forespørsel om {formData?.type_rengjøring} til tre selskaper. Du kan forvente å bli kontaktet av dem innen 1-2 dager. Vennligst vær oppmerksom på anrop fra ukjente numre, og sjekk din søppelpost jevnlig for sikkerhets skyld.</p>
          <Button variant="outline" onClick={goToHome}>gå tilbake</Button>
        </div>
      )}
      <PageIndicator currentPage={page + 1} totalPages={choice ? getPages(choice).length + 1 : 1} />
    </div>
  );
}

function ChoicePage({ choice, onChoiceChange, nextPage }) {
  return (
    <div className="flex flex-col justify-between space-y-1">
      <div>

        <CardHeader>
          <p className="text-white text-2xl font-semibold">Hva slags type rengjøring ønsker du?</p>
        </CardHeader>
        <CardContent >
          <RadioGroup defaultValue="comfortable" value={choice} onValueChange={onChoiceChange} className="space-y-1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Fast-renhold" id="r1" />
              <Label htmlFor="r1">Fast renhold</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Byggrengjøring" id="r2" />
              <Label htmlFor="r2">Byggrengjøring</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Fjerning-av-grafitti" id="r4" />
              <Label htmlFor="r4">Fjerning av grafitti</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Flyttevask" id="r5" />
              <Label htmlFor="r5">Flyttevask</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Visningsvask" id="r7" />
              <Label htmlFor="r7">Visningsvask</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Annen-vask" id="r9" />
              <Label htmlFor="r9">Annen vask</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </div>
      <div>


        <Button variant="outline" className="flex-1 w-full " onClick={nextPage} disabled={!choice}>Neste</Button>
      </div>
    </div>
  );
}
