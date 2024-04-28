import './App.css'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Lock } from 'lucide-react'
import { MenuCard } from './components/MenuCard'

function App() {

  return (
    <div className='flex justify-center h-screen items-center'>
      <Card className="w-[420px] bg-gradient-to-r from-blue-500 to-blue-900 relative rounded-lg">
        <CardHeader>
          <p className='text-white text-2xl font-semibold'>Finn riktig rengjøringsfirma!</p>
          <CardDescription className='text-gray-200 ' >Tjenesten er gratis og helt uforpliktende.</CardDescription>
        </CardHeader>
        <CardContent className='min-h-[500px]'>
          <MenuCard />
        </CardContent>
        <CardFooter className="grid gap-3">
          <p className="text-xs text-gray-200 text-wrap text-center"> <b className="inline-flex text-center"> <Lock height={14} className='' />Personvernet ditt ivaretas:</b>  Vi behandler alle data etter personvernforordningen (GDPR).</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
