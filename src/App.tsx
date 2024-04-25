import './App.css'
import { MenuCard } from './components/MenuCard'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Lock } from 'lucide-react'

function App() {

  return (
    <div className='flex justify-center h-screen items-center'>
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Find the right cleaning company!</CardTitle>
          <CardDescription >The service is free and completely non-binding.</CardDescription>
        </CardHeader>
        <CardContent>
          <MenuCard />
          {/* <MovingLaundry11 formData={{}} onInputChange={e => {}} /> */}
        </CardContent>
        <CardFooter className="grid gap-3">
          <p className="text-xs text-gray-500 text-wrap text-center"> <b className="inline-flex text-center"> <Lock height={14} className='' />Your privacy is safeguarded:</b> We process all data in accordance with the Personal Data Protection Regulation (GDPR).</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
