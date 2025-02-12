import type { Place } from '../components/models'

export default function filterPlaces(places: Place[], searchTerm: string): Place[] {
  if (!searchTerm) return places

  const needle = searchTerm.toLowerCase()
  return places.filter(
    (place) =>
      place.name.toLowerCase().includes(needle) || place.state.name.toLowerCase().includes(needle),
  )
}
