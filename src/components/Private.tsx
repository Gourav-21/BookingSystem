import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
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

function ChoicePage({ choice, onChoiceChange, nextPage }) {
  return (
    <div className="space-y-1">
      <CardHeader>
        <CardTitle>What type of cleaning do you want?</CardTitle>
      </CardHeader>
      <CardContent>
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
            <RadioGroupItem value="estate-washing" id="r3" />
            <Label htmlFor="r3">Estate Washing</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="moving-laundry" id="r5" />
            <Label htmlFor="r5">Moving Laundry</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="major-cleaning" id="r7" />
            <Label htmlFor="r7">Major Cleaning</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="display-wash" id="r9" />
            <Label htmlFor="r9">Display wash</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other-washing" id="r10" />
            <Label htmlFor="r10">Other Washing</Label>
          </div>
        </RadioGroup>
      </CardContent>

      <Button variant="outline" className="flex-1 w-full" onClick={nextPage} disabled={!choice}>Next</Button>
    </div>
  );
}

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

export default function PrivateCleaning({ page, setPage }) {
  const [choice, setChoice] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const
    handleChoiceChange = (value) => {
      setFormData({
        type: "private",
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
        return [<RegularCleaning key="page1" onInputChange={handleInputChange} formData={formData} />, <RegularCleaning2 key="page2" onInputChange={handleInputChange} formData={formData} />, <RegularCleaning3 key="page0" onInputChange={handleInputChange} formData={formData} />, <RegularCleaning4 key="page3" onInputChange={handleInputChange} formData={formData} />, <PrivateSubmitDetail key="page4" onInputChange={handleInputChange} formData={formData} />];
      case "building-cleaning":
        return [<BuildingCleaning1 key="page1" onInputChange={handleInputChange} formData={formData} />, <BuildingCleaning2 key="page2" onInputChange={handleInputChange} formData={formData} />, <BuildingCleaning3 key="page0" onInputChange={handleInputChange} formData={formData} />, <PrivateSubmitDetail key="page4" onInputChange={handleInputChange} formData={formData} />];
      case "estate-washing":
        return [<EstateWashing key="page1" onInputChange={handleInputChange} formData={formData} />, <EstateWashing2 key="page2" onInputChange={handleInputChange} formData={formData} />, <EstateWashing3 key="page0" onInputChange={handleInputChange} formData={formData} />, <PrivateSubmitDetail key="page4" onInputChange={handleInputChange} formData={formData} />];
      case "moving-laundry":
        // @ts-ignore
        if (formData?.relocation_assistance === "yes") {
          // @ts-ignore
          if (formData?.type_of_housing === "Apartment") {

            return [<MovingLaundry key="page1" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry2 key="page2" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry3 key="page3" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry4 key="page4" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry5 key="page5" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry6 key="page6" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry7 key="page7" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry8 key="page8" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry9 key="page9" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry10 key="page10" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry11 key="page11" onInputChange={handleInputChange} formData={formData} />];
          } else {
            return [<MovingLaundry key="page1" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry2 key="page2" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry3 key="page3" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry4 key="page4" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry5 key="page5" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry6 key="page6" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry7 key="page7" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry8 key="page8" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry10 key="page10" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry11 key="page11" onInputChange={handleInputChange} formData={formData} />];
          }
        } else {
          return [<MovingLaundry key="page1" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry2 key="page2" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry3 key="page3" onInputChange={handleInputChange} formData={formData} />, <MovingLaundry4 key="page4" onInputChange={handleInputChange} formData={formData} />, <PrivateSubmitDetail key="page4" onInputChange={handleInputChange} formData={formData} />]
        }
      case "major-cleaning":
        return [<MajorCleaning key="page1" onInputChange={handleInputChange} formData={formData} />, <MajorCleaning2 key="page2" onInputChange={handleInputChange} formData={formData} />, <MajorCleaning3 key="page0" onInputChange={handleInputChange} formData={formData} />, <MajorCleaning4 key={"page4"} onInputChange={handleInputChange} formData={formData} />, <PrivateSubmitDetail key="page4" onInputChange={handleInputChange} formData={formData} />];
      case "display-wash":
        return [<DisplayWash key="page1" onInputChange={handleInputChange} formData={formData} />, <DisplayWash2 key="page2" onInputChange={handleInputChange} formData={formData} />, <DisplayWash3 key="page0" onInputChange={handleInputChange} formData={formData} />, <DisplayWash4 key="page5" onInputChange={handleInputChange} formData={formData} />, <PrivateSubmitDetail key="page4" onInputChange={handleInputChange} formData={formData} />];
      default:
        return [<Describe key="page1" onInputChange={handleInputChange} formData={formData} />, <PrivateSubmitDetail key="page2" onInputChange={handleInputChange} formData={formData} />];
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


