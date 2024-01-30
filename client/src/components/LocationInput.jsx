import { useEffect } from "react"

const LocationInput = () => {
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch('https://psgc.gitlab.io/api/island-groups.json')
                
                const data = await response.json()
                console.log(data)
            } catch (error) {
                console.log('error', error)
            }
        }
        fetchLocation()
    })

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await fetch('https://psgc.gitlab.io/api/provinces.json')
                
                const data = await response.json()
                console.log(data)
            } catch (error) {
                console.log('error', error)
            }
        }
        fetchRegions()
    }, [])

  return (
    <div>
        Location

    </div>
  )
}

export default LocationInput