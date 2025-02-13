import type { Hotel, Place } from 'src/components/models'

export const mockHotel: Hotel = {
  id: 1,
  name: 'Hotel de Teste',
  description: 'Hotel de Teste Description',
  stars: '5',
  thumb: 'https://fakeimg.pl/600x400',
  favorite: false,
  amenities: [
    {
      key: 'WIFI',
      label: 'Wi-Fi',
    },
    {
      key: 'BREAKFAST',
      label: 'Café da manhã',
    },
    {
      key: 'GIFT_SHOP',
      label: 'Loja de presentes',
    },
    {
      key: 'JACUZZI',
      label: 'Jacuzzi',
    },
    {
      key: 'GIFT_SHOP',
      label: 'Loja de presentes',
    },
    {
      key: 'MEDICAL_SERVICE',
      label: 'Serviço médico',
    },
    {
      key: 'LIBRARY',
      label: 'Biblioteca',
    },
    {
      key: 'GOLF_COURSE',
      label: 'Campo de golfe',
    },
    {
      key: 'WATER_SPORTS',
      label: 'Esportes aquáticos',
    },
    {
      key: 'KIDS_CLUB',
      label: 'Clube de crianças',
    },
  ],
  hasBreakFast: false,
  hasRefundableRoom: false,
  hasAgreement: false,
  nonRefundable: null,
  address: {
    street: 'Av. Antônio Abrahão Caram',
    number: '1001',
    district: 'São José',
    city: 'Belo Horizonte',
    state: 'MG',
    country: 'Brasil',
    zipCode: '31275-000',
    fullAddress: 'Av. Antônio Abrahão Caram, 1001, São José, Belo Horizonte, MG, Brasil, 31275-000',
  },
  images: [
    'https://fakeimg.pl/600x400',
    'https://fakeimg.pl/600x400',
    'https://fakeimg.pl/600x400',
  ],
  deals: null,
  roomsQuantity: 0,
  price: 0,
}

export const mockSaoPauloHotel: Hotel = {
  ...mockHotel,
  id: 2,
  name: 'Hotel de Teste 2',
  stars: '4',
  thumb: 'https://fakeimg.pl/600x400',
  address: {
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    zipCode: '30123-456',
    fullAddress: 'Rua Teste, 123, Bairro Teste, São Paulo, SP, Brasil, 30123-456',
    street: 'Rua Teste',
    number: '123',
    district: 'Bairro Teste',
  },
}

export const mockPlace: Place = {
  name: 'Belo Horizonte',
  state: {
    name: 'Minas Gerais',
    shortname: 'MG',
  },
  placeId: 1,
}
