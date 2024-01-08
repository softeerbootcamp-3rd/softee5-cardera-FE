export async function wait(cb: any) {
  return await new Promise((resolve) => {
    setTimeout(() => {
      const data = cb()
      resolve(data)
    }, 500)
  })
}

const checkedFetch = async <T = any>(...params: Parameters<typeof fetch>) => {
  try {
    const response = await fetch(...params)
    if (!response.ok) throw new Error(String(response.status))
    return (await response.json()) as T
  } catch (err) {
    console.error(err)
  }
}

interface Params {
  start: string
  goal: string
  passengerNumber: number
  carpoolCount: number
}

interface GetFuelPriceResponse {
  fuelPrice: number
  tipOptions: { multiple: number; choiceCount: number }[]
}
export async function getFuelPrice({
  start,
  goal,
  passengerNumber,
  carpoolCount,
}: Params) {
  return await checkedFetch<GetFuelPriceResponse>(
    `/calculation?start=${start}&goal=${goal}&passengerNumber=${passengerNumber}&carpoolCount=${carpoolCount}`
  )
}
export const dummyData = {
  fuelPrice: 12000,
  tipOptions: [
    {
      multiple: 1.0,
      choiceCount: 200,
    },
    {
      multiple: 1.2,
      choiceCount: 20230,
    },
    {
      multiple: 1.5,
      choiceCount: 1023,
    },
    {
      multiple: 2,
      choiceCount: 5000,
    },
  ],
}
