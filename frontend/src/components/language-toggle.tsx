import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { Language, languages } from "@/constants/languages"

export function LanguageToggle() {
  const [t, i18n] = useTranslation("translation")
  const [selectedLanguage, setLanguage] = useState(i18n.language)

  const handleLanguage = (language: string) => {
    i18n.changeLanguage(language)
    setLanguage(i18n.language)
  }
  return (
    <DropdownMenu dir={i18n.dir()}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          <img
            className="h-6 w-6 rounded"
            alt={`langauge-${selectedLanguage}`}
            src={selectedLanguage === "ar" ? "/flags/ar.svg" : `/flags/en.svg`}
          />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={i18n.dir() == "rtl" ? "start" : "end"}>
        {
          languages.map((language: Language) => (
            <DropdownMenuItem key={language.code} onClick={() => handleLanguage(language.code)}>
              {t(language.name)}
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
