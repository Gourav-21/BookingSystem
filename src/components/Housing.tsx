import {
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Checkbox } from "./ui/checkbox"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Describe from "./Describe";
import HousingSubmitDetail from "./housing/housing-submit-detail copy";
import Page1 from "./housing/stairAndCoridorWashing/page1";
import Page2 from "./housing/stairAndCoridorWashing/page2";
import Success from "./Success";
import { useToast } from "./ui/use-toast";
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

export default function HousingAssociationCleaning({ page, setPage }) {
  const { toast } = useToast()
  const [choice, setChoice] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [next, setNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: "Borettslag",
    type_rengjøring: "",
  });

  const handleChoiceChange = (value) => {
    setFormData({
      type: "Borettslag",
      type_rengjøring: value
    });

    setChoice(value);
  };

  const nextPage = () => {
    if (next) {
      setNext(false);
      setPage(page => Math.min(page + 1, getPages().length));
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

  useEffect(() => {
    if (page == 0)
      setNext(true)
  }, [page])

  const getPages = () => {
    if (selectedOptions.includes("Trapp- og gangvask")) {
      return [
        <Page1 key="page4" setNext={setNext} onInputChange={handleInputChange} formData={formData} />,
        <Page2 key="page5" setNext={setNext} onInputChange={handleInputChange} formData={formData} />,
        <HousingSubmitDetail key="page2" setNext={setNext} onInputChange={handleInputChange} formData={formData} />,
      ];
    } else {
      return [
        <Describe key="page1" setNext={setNext} onInputChange={handleInputChange} formData={formData} />,
        <HousingSubmitDetail key="page2" setNext={setNext} onInputChange={handleInputChange} formData={formData} />,
      ];
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
    setFormData({
      type: "Borettslag",
      // @ts-ignore
      type_rengjøring: formData?.type_rengjøring
    });
    setSubmitted(false);
  };
  console.log(formData)

  return (
    <div>
      {!submitted ? (
        page === 0 ? (
          <div className="flex min-h-[460px]">
            <ChoicePage selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} onChoiceChange={handleChoiceChange} nextPage={nextPage} />
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-between min-h-[500px]">
              {getPages()[page - 1]}
              <div className="flex justify-between mt-4">
                <Button variant="outline" className="rounded-r-none" onClick={prevPage}>Tilbake</Button>
                {page === getPages().length ? (
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
      <PageIndicator currentPage={page + 1} totalPages={choice ? getPages().length + 1 : 1} />
    </div>
  );
}

function ChoicePage({ selectedOptions, setSelectedOptions, onChoiceChange, nextPage }) {
  const options = [
    "Trapp- og gangvask",
    "Balkongvask",
    "Bodvask",
    "Fjerning av grafitti",
    "Garasjevask",
    "Heisvask",
    "Annen vask"
  ];


  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleNextPage = () => {
    onChoiceChange(selectedOptions.join(", "));
    nextPage();
  };

  return (
    <div className="flex flex-col justify-between space-y-1">
      <div>

        <CardHeader>
          <p className="text-white text-2xl font-semibold">Hva slags type rengjøring ønsker du?</p>

        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`option-${index}`}
                  checked={selectedOptions.includes(option)}
                  onCheckedChange={() => handleCheckboxChange(option)}
                />
                <label htmlFor={`option-${index}`} className="text-sm font-medium leading-none">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
      <div>

        <Button variant="outline" className="flex-1 w-full" onClick={handleNextPage} disabled={!selectedOptions.length}>Neste</Button>
      </div>
    </div>
  );
}



