// hooks/use-media-query.ts
import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
    const getMatch = () => typeof window !== 'undefined' && window.matchMedia(query).matches

    const [matches, setMatches] = useState<boolean>(getMatch)

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query)

        const updateMatch = (event: MediaQueryListEvent) => {
            setMatches(event.matches)
        }

        // Set initial match
        setMatches(mediaQueryList.matches)

        // Add listener
        mediaQueryList.addEventListener('change', updateMatch)

        return () => {
            mediaQueryList.removeEventListener('change', updateMatch)
        }
    }, [query])

    return matches
}
