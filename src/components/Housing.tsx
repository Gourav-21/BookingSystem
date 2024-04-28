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

  const [formData, setFormData] = useState({});

  const handleChoiceChange = (value) => {
    setFormData({
      type: "Housing association",
      cleaningType: value
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
        title: "Uh oh! Something went wrong.",
        description: "Please fill in all the fields",
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
    if (selectedOptions.includes("Stair and Corridor Washing")) {
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
    if(isLoading){
      return
    }
    if (!next) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please fill in all the fields",
      })
      return
    }
    emailjs.send("service_s51bxmq", "template_z6fjeta", {
      // @ts-ignore      
      name: formData.name,
      // @ts-ignore
      type: formData.type,
      // @ts-ignore
      cleaningType: formData.cleaningType,

      formData: JSON.stringify(formData, null, 2),
    }, "Ir-YjhpxWCxJ8yqh_")
      .then((result) => {
        console.log("Submitted Data:", formData);
        setSubmitted(true);
        setNext(true)
        console.log(result.text);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
      setIsLoading(false);
  };

  const goToHome = () => {
    setPage(0);
    setFormData({
      type: "Housing association",
      // @ts-ignore
      cleaningType: formData?.cleaningType
    });
    setSubmitted(false);
  };

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
                <Button variant="outline" className="rounded-r-none" onClick={prevPage}>back</Button>
                {page === getPages().length ? (
                  <Button variant="outline" className="flex-1 rounded-l-none" disabled={isLoading} onClick={submitData}>
                     {isLoading ? (
                     "Submitting..."
                      ) : (
                        'Submit'
                      )}
                  </Button>
                ) : (
                  <Button variant="outline" className="flex-1 rounded-l-none" onClick={nextPage}>Next</Button>
                )}
              </div>
            </div>
          </>
        )
      ) : (
        <div className="text-center">
          <Success />
          <p className="text-2xl text-white font-semibold mb-4">Successfully Submitted!</p>
          <Button variant="outline" onClick={goToHome}>go back</Button>
        </div>
      )}
      <PageIndicator currentPage={page + 1} totalPages={choice ? getPages().length + 1 : 1} />
    </div>
  );
}

function ChoicePage({ selectedOptions, setSelectedOptions, onChoiceChange, nextPage }) {
  const options = [
    "Stair and Corridor Washing",
    "Balcony Sink",
    "Storeroom Washing",
    "Removal of Graffiti",
    "Garage Wash",
    "Elevator Laundry",
    "Other Washing"
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
        <p className="text-white text-2xl font-semibold">What type of cleaning do you want?</p>

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

        <Button variant="outline" className="flex-1 w-full" onClick={handleNextPage} disabled={!selectedOptions.length}>Next</Button>
      </div>
    </div>
  );
}



