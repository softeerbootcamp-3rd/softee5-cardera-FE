import { dummyData, wait } from './api'
import { Step } from './step'

const addressForm = document.getElementById('address') as HTMLUListElement

const passengerCountForm = document.getElementById(
  'passenger-count-form'
) as HTMLDivElement
const carpoolTypeForm = document.getElementById(
  'carpool-type-form'
) as HTMLDivElement
const startRoadFullAddressInput = document.getElementById(
  'startRoadFullAddr'
) as HTMLInputElement
const destRoadFullAddressInput = document.getElementById(
  'destRoadFullAddr'
) as HTMLInputElement
const carpoolCountInput = document.getElementById(
  'carpool-count'
) as HTMLInputElement

// step 정의
const step = new Step('intro', [
  'intro',
  'juso',
  'passenger-count',
  'carpool-count',
  'result',
  'presents',
  'thanks-phrases',
] as const)

step.subscribe('result', async () => {
  async function onNextStep() {
    const formData = getFormData()
    // FIX: 더미 데이터
    const data = await wait(() => dummyData)
  }
  await onNextStep()
})

function getFormData() {
  const start = startRoadFullAddressInput.value
  const goal = destRoadFullAddressInput.value
  const carpoolType = carpoolTypeForm.dataset.value as 'oneWay' | 'roundTrip'
  const passengerNumber = Number(passengerCountForm.dataset.value)
  const carpoolCount = Number(carpoolCountInput.value)
  return { start, goal, carpoolType, carpoolCount, passengerNumber }
}

function registerIntroStep() {
  // 스텝 변경
  const nextButton = document.querySelector(
    '#intro-step-button > .next-button'
  ) as HTMLElement
  nextButton.addEventListener('click', () => {
    step.nextStep()
  })
}

function registerJusoStep() {
  const carpoolTypeRadios = document.querySelectorAll(
    "input[name='carpool-type']"
  )

  // 출발지, 도착지 주소 정보 검색
  addressForm.addEventListener('click', ({ target }) => {
    if (!target) return
    if (target instanceof HTMLInputElement) {
      // @ts-ignore
      new daum.Postcode({
        oncomplete: (data) => {
          let address = data.address
          if (target.id === 'startRoadFullAddr') {
            target.value = address
          }
          if (target.id === 'destRoadFullAddr') {
            target.value = address
          }
        },
      }).open()
    }
  })

  // 편도, 왕복 선택
  carpoolTypeRadios.forEach((radio) => {
    radio.addEventListener('change', ({ target }) => {
      if (!target) return
      if (target instanceof Element) {
        const carpoolType = (target as HTMLInputElement).value
        carpoolTypeForm.dataset.value = carpoolType
      }
    })
  })

  // 스텝 변경
  const prevButton = document.querySelector(
    '#juso-step-button > .prev-button'
  ) as HTMLElement
  const nextButton = document.querySelector(
    '#juso-step-button > .next-button'
  ) as HTMLElement
  prevButton.addEventListener('click', () => {
    step.prevStep()
  })
  nextButton.addEventListener('click', () => {
    step.nextStep()
  })
}

function registerPassengerCountStep() {
  const passengerCountRadios = document.querySelectorAll<HTMLInputElement>(
    "input[name='passenger-count']"
  )
  const passengerCountInput = document.getElementById(
    'passenger-count-input'
  ) as HTMLInputElement

  passengerCountRadios.forEach((radio) => {
    radio.addEventListener('change', ({ target }) => {
      if (!target) return
      if (target instanceof Element) {
        const count = (target as HTMLInputElement).value
        passengerCountForm.dataset.value = count
        passengerCountInput.value = ''
      }
    })
  })
  passengerCountInput.addEventListener('change', (event) => {
    // @ts-ignore
    passengerCountForm.dataset.value = event.target.value
    // 기존에 선택된 것 모두 제거
    passengerCountRadios.forEach((ele) => {
      ele.checked = false
    })
  })

  // 스텝 변경
  const prevButton = document.querySelector(
    '#passenger-count-step-button > .prev-button'
  ) as HTMLElement
  const nextButton = document.querySelector(
    '#passenger-count-step-button > .next-button'
  ) as HTMLElement
  prevButton.addEventListener('click', () => {
    step.prevStep()
  })
  nextButton.addEventListener('click', () => {
    step.nextStep()
  })
}

function registerCarpoolCountStep() {
  // 스텝 변경
  const prevButton = document.querySelector(
    '#carpool-count-step-button > .prev-button'
  ) as HTMLElement
  const nextButton = document.querySelector(
    '#carpool-count-step-button > .next-button'
  ) as HTMLElement
  prevButton.addEventListener('click', () => {
    step.prevStep()
  })
  nextButton.addEventListener('click', () => {
    step.nextStep()
  })
}

function registerResultStep() {
  // 스텝 변경
  const prevButton = document.querySelector(
    '#result-step-button > .thanks-button'
  ) as HTMLElement
  const nextButton = document.querySelector(
    '#result-step-button > .presents-button'
  ) as HTMLElement
  prevButton.addEventListener('click', () => {
    step.setStep('thanks-phrases')
  })
  nextButton.addEventListener('click', () => {
    step.setStep('presents')
  })
}

function main() {
  step.setStep('intro')
  registerIntroStep()
  registerJusoStep()
  registerPassengerCountStep()
  registerCarpoolCountStep()
  registerResultStep()
}

main()
