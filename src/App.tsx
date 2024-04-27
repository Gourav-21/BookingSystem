import './App.css'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Lock } from 'lucide-react'
import { MenuCard } from './components/MenuCard'

function App() {

  return (
    <div className='flex justify-center h-screen items-center'>
      <Card className="w-[420px] bg-gradient-to-r from-blue-500 to-blue-900 relative rounded-lg">
        <CardHeader>
          <CardTitle className='text-white'>Find the right cleaning company!</CardTitle>
          <CardDescription className='text-gray-200 ' >The service is free and completely non-binding.</CardDescription>
        </CardHeader>
        <CardContent className='min-h-[500px]'>
          <MenuCard />
        </CardContent>
        <CardFooter className="grid gap-3">
          <p className="text-xs text-gray-200 text-wrap text-center"> <b className="inline-flex text-center"> <Lock height={14} className='' />Your privacy is safeguarded:</b> We process all data in accordance with the Personal Data Protection Regulation (GDPR).</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
