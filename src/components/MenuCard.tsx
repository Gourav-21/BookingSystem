
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Company from "./Company"
import Private from "./Private"
import { useState } from "react";
import HousingAssociationCleaning from "./Housing";


export function MenuCard() {
  const [page, setPage] = useState(0);

  return (
    <Tabs defaultValue="private" className="">
     {page === 0 && <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="private">Private</TabsTrigger>
        <TabsTrigger className="col-span-2" value="Housing association">Housing association</TabsTrigger>
        <TabsTrigger value="Company">Company</TabsTrigger>
      </TabsList>}
      <TabsContent value="private">
        <Private page={page} setPage={setPage} />
      </TabsContent>
      <TabsContent value="Housing association">
        <HousingAssociationCleaning page={page} setPage={setPage}  />
      </TabsContent>
      <TabsContent value="Company">
        <Company page={page} setPage={setPage} />
      </TabsContent>
    </Tabs>

  )
}
