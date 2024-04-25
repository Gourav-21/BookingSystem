import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import CompanySubmitDetail from "./company/company-submit-detail";
import Describe from "./Describe";
import RegularCleaning from "./company/RegularCleaning";
import RegularCleaning2 from "./company/RegularCleaning2";
import RegularCleaning3 from "./company/RegularCleaning3";
import RegularCleaning4 from "./company/RegularCleaning4";
import Success from "./Success";

function PageIndicator({ currentPage, totalPages }) {
  return (
    <div className="flex justify-center mt-4">
      {Array.from(Array(totalPages), (_, i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full mx-1 ${i < currentPage ? 'bg-black' : 'bg-gray-300'}`}
        />
      ))}
    </div>
  );
}

export default function Company({ page, setPage }) {
  const [choice, setChoice] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChoiceChange = (value) => {
    setFormData({
      type: "Company",
      cleaningType: value
    });

    setChoice(value);
  };

  const nextPage = () => setPage(page => Math.min(page + 1, getPages(choice).length));
  const prevPage = () => setPage(page => Math.max(page - 1, 0));

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const getPages = (choice) => {
    switch (choice) {
      case "regular-cleaning":
        // @ts-ignore
        if(formData?.what_type_of_premises_should_be_washed && formData?.what_type_of_premises_should_be_washed.includes("Office")){
          return [<RegularCleaning key="page1" onInputChange={handleInputChange} formData={formData} />, <RegularCleaning2 key="page2" onInputChange={handleInputChange} formData={formData} />, <RegularCleaning3 key="page3"  onInputChange={handleInputChange}  formData={formData} />, <RegularCleaning4 key="page4"  onInputChange={handleInputChange}  formData={formData} />,<CompanySubmitDetail key="page5" onInputChange={handleInputChange} formData={formData} />];
        }else{
          return [<RegularCleaning key="page1" onInputChange={handleInputChange} formData={formData} />,<RegularCleaning3 key="page3"  onInputChange={handleInputChange}  formData={formData} />, <RegularCleaning4 key="page4"  onInputChange={handleInputChange}  formData={formData} />,<CompanySubmitDetail key="page5" onInputChange={handleInputChange} formData={formData} />];
        }
      default:
        return [<Describe key="page1" onInputChange={handleInputChange} formData={formData} />, <CompanySubmitDetail key="page2" onInputChange={handleInputChange} formData={formData} />];
    }
  };

  const submitData = () => {
    console.log("Submitted Data:", formData);
    setSubmitted(true);
  };

  const goToHome = () => {
    setPage(0);
    setFormData({});
    setSubmitted(false);
  };

  return (
    <div>
      {!submitted ? (
        page === 0 ? (
          <ChoicePage choice={choice} onChoiceChange={handleChoiceChange} nextPage={nextPage} />
        ) : (
          <>
            {getPages(choice)[page - 1]}
            <div className="flex justify-between mt-4">
              <Button variant="outline" className="rounded-r-none" onClick={prevPage}>back</Button>
              {page === getPages(choice).length ? (
                <Button variant="outline" className="flex-1 rounded-l-none" onClick={submitData}>Submit</Button>
              ) : (
                <Button variant="outline" className="flex-1 rounded-l-none" onClick={nextPage}>Next</Button>
              )}
            </div>
          </>
        )
      ) : (
        <div className="text-center">
          <Success />
          <h2 className="text-2xl font-semibold mb-4">Successfully Submitted!</h2>
          <Button variant="secondary" onClick={goToHome}>go back</Button>
        </div>
      )}
      <PageIndicator currentPage={page + 1} totalPages={choice ? getPages(choice).length + 1 : 1} />
    </div>
  );
}

function ChoicePage({ choice, onChoiceChange, nextPage }) {
  return (
    <div className="space-y-1">
      <CardHeader>
        <CardTitle>What type of cleaning do you want?</CardTitle>
      </CardHeader>
      <CardContent >
        <RadioGroup defaultValue="comfortable" value={choice} onValueChange={onChoiceChange} className="space-y-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="regular-cleaning" id="r1" />
            <Label htmlFor="r1">Regular Cleaning</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="building-cleaning" id="r2" />
            <Label htmlFor="r2">Building Cleaning</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="graffiti-removal" id="r4" />
            <Label htmlFor="r4">Removal of Graffiti</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="moving-laundry" id="r5" />
            <Label htmlFor="r5">Moving Laundry</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="display-sink" id="r7" />
            <Label htmlFor="r7">Display Sink</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other-washing" id="r9" />
            <Label htmlFor="r9">Other Washing</Label>
          </div>
        </RadioGroup>
      </CardContent>

      <Button variant="outline" className="flex-1 w-full" onClick={nextPage} disabled={!choice}>Next</Button>
    </div>
  );
}
