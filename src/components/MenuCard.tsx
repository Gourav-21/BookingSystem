
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Company from "./Company"
import Private from "./Private"
import { useState } from "react";
import HousingAssociationCleaning from "./Housing";


export function MenuCard() {
  const [page, setPage] = useState(0);

  return (
    <Tabs defaultValue="Privat" className="">
     {page === 0 && <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="Privat">Privat</TabsTrigger>
        <TabsTrigger className="col-span-2" value="Borettslag">Borettslag</TabsTrigger>
        <TabsTrigger value="Bedrift">Bedrift</TabsTrigger>
      </TabsList>}
      <TabsContent value="Privat">
        <Private page={page} setPage={setPage} />
      </TabsContent>
      <TabsContent value="Borettslag">
        <HousingAssociationCleaning page={page} setPage={setPage}  />
      </TabsContent>
      <TabsContent value="Bedrift">
        <Company page={page} setPage={setPage} />
      </TabsContent>
    </Tabs>

  )
}
