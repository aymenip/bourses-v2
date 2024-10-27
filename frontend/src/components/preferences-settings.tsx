import { Button } from './ui/button'
import { Settings } from 'lucide-react'

function PreferencesSettings() {
    return (
        <Button variant={"secondary"}  size={"icon"} >
            <Settings className='animate-spin-slow hover:animate-none' />
        </Button>
    )
}

export default PreferencesSettings