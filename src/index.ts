import { showStep, getPrevStep, getNextStep } from './step'

const addressForm = document.getElementById('address') as HTMLUListElement
const carpoolTypeSelect = document.getElementById(
  'carpool-type-select'
) as HTMLUListElement
const passengerCountForm = document.getElementById(
  'passenger-count-form'
) as HTMLDivElement

const startRoadFullAddressInput = document.getElementById(
  'startRoadFullAddr'
) as HTMLInputElement
const destRoadFullAddressInput = document.getElementById(
  'destRoadFullAddr'
) as HTMLInputElement

function registerJusoStep() {
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
  carpoolTypeSelect.addEventListener('click', ({ target }) => {
    if (!target) return
    if (target instanceof Element) {
      // TODO: style 바꾸기
      const carpoolType = (target as HTMLButtonElement).dataset.carpoolType
      carpoolTypeSelect.dataset.value = carpoolType
    }
  })

  // 스텝 변경
  const prevButton = document.querySelector(
    '#juso-step-button > .prev-button'
  ) as HTMLElement
  const nextButton = document.querySelector(
    '#juso-step-button > .next-button'
  ) as HTMLElement
  prevButton.addEventListener('click', () => {
    const prevStep = getPrevStep()
    showStep(prevStep)
  })
  nextButton.addEventListener('click', () => {
    const nextStep = getNextStep()
    showStep(nextStep)
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
        const count = (target as HTMLButtonElement).value
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
    const prevStep = getPrevStep()
    showStep(prevStep)
  })
  nextButton.addEventListener('click', () => {
    const nextStep = getNextStep()
    showStep(nextStep)
  })
}

function registerCarpoolCountStep() {}

function registerResultStep() {}

function fetchFuelPrice() {
  // TODO: result step이 active 할 때 서버에서 유류비 값 가져오기
}

function main() {
  showStep('passenger-count')
  registerJusoStep()
  registerPassengerCountStep()
  registerCarpoolCountStep()
  registerResultStep()
}

main()
