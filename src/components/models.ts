export interface Amenity {
  key: string
  label: string
}

export interface Address {
  street: string
  number: string
  district: string
  city: string
  state: string
  country: string
  zipCode: string | null
  fullAddress: string
}

export interface Hotel {
  id: number
  favorite: boolean
  name: string
  description: string
  stars: string
  thumb: string
  amenities: Amenity[]
  hasBreakFast: boolean
  hasRefundableRoom: boolean
  hasAgreement: boolean
  nonRefundable: boolean | null
  address: Address
  images: string[]
  deals: null
  roomsQuantity: number
  price: number
}

export interface HotelAmenities {
  amenities: Amenity[]
  showLabels?: boolean
}

export interface State {
  name: string
  shortname: string
}

export interface Place {
  name: string
  state: State
  placeId: number
}
