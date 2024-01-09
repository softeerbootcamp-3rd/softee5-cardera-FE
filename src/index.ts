import { dummyData, wait } from './api'
import { Step } from './step'

const header = document.getElementById('header') as HTMLHeadElement

const addressForm = document.getElementById('address') as HTMLUListElement

const passengerCountForm = document.getElementById('passenger-count-form') as HTMLDivElement
const startRoadFullAddressInput = document.getElementById('startRoadFullAddr') as HTMLInputElement
const destRoadFullAddressInput = document.getElementById('destRoadFullAddr') as HTMLInputElement
const carpoolCountInput = document.getElementById('carpool-count') as HTMLInputElement
const tipOptionsElement = document.getElementById('tip-options') as HTMLElement

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

function setHeader() {
  // see https://parceljs.org/languages/svg/#svg-in-javascript
  const back = new URL('../assets/back.svg', import.meta.url)
  const menu = new URL('../assets/menu.svg', import.meta.url)
  header.innerHTML = `
    <button type="button" class="prev-button">
      <img src=${back} />
      </button>
    <button type="button">
      <img src=${menu} />
    </button>
  `
  header.querySelector('.prev-button')?.addEventListener('click', () => {
    step.prevStep()
  })
}

step.subscribe('intro', () => {
  header.innerHTML = ''
})
step.subscribe('juso', () => {
  setHeader()
})
step.subscribe('passenger-count', () => {
  setHeader()
})
step.subscribe('carpool-count', () => {
  setHeader()
})
step.subscribe('presents', () => {
  setHeader()
})
step.subscribe('result', async () => {
  setHeader()
  const formData = getFormData()
  // FIX: 더미 데이터를 실제 API 로 변경
  const { fuelPrice, tipOptions } = await wait(() => dummyData)

  const fuelPriceElement = document.getElementById('fuel-price') as HTMLElement

  fuelPriceElement.innerHTML = `${fuelPrice.toLocaleString()} 원`
  tipOptionsElement.innerHTML = tipOptions
    .map((option) => {
      return `
        <label>
          <input
            type="radio"
            class="peer"
            name="tip-option"
            value="${option.multiple}"
            hidden
          />
          <div class="text-b3-semibold rounded-4 bg-gray-200 text-gray-900 px-12 py-8 peer-checked:bg-gray-900 peer-checked:text-white">x ${option.multiple}배</div>
        </label>
      `
    })
    .join('')

  const tipOptionRadios = document.querySelectorAll("input[name='tip-option']")
  const tipDescription = document.getElementById('tip-description')

  tipOptionRadios.forEach((radio, index) => {
    radio.addEventListener('change', ({ target }) => {
      if (!target) return
      const tip = (target as HTMLInputElement).value
      tipOptionsElement.dataset.value = tip
      tipDescription!.innerHTML = `${tipOptions[index].choiceCount.toLocaleString()}명의 유저가 선택했어요!`
      fuelPriceElement.innerHTML = `${(Number(tip) * fuelPrice).toLocaleString()} 원`
    })
  })
})

function getFormData() {
  const start = startRoadFullAddressInput.value
  const goal = destRoadFullAddressInput.value
  const passengerNumber = Number(passengerCountForm.dataset.value)
  const carpoolCount = Number(carpoolCountInput.value)
  return { start, goal, carpoolCount, passengerNumber }
}

function registerIntroStep() {
  // 스텝 변경
  const nextButton = document.querySelector('#intro-step-button > .next-button') as HTMLElement
  nextButton.addEventListener('click', () => {
    step.nextStep()
  })
}

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

  // 스텝 변경
  const nextButton = document.querySelector('#juso-step-button > .next-button') as HTMLElement
  nextButton.addEventListener('click', () => {
    step.nextStep()
  })
}

function registerPassengerCountStep() {
  const passengerCountRadios = document.querySelectorAll<HTMLInputElement>("input[name='passenger-count']")
  const passengerCountInput = document.getElementById('passenger-count-input') as HTMLInputElement

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
  const prevButton = document.querySelector('#passenger-count-step-button > .prev-button') as HTMLElement
  const nextButton = document.querySelector('#passenger-count-step-button > .next-button') as HTMLElement
  prevButton.addEventListener('click', () => {
    step.prevStep()
  })
  nextButton.addEventListener('click', () => {
    step.nextStep()
  })
}

function registerCarpoolCountStep() {
  // 스텝 변경
  const prevButton = document.querySelector('#carpool-count-step-button > .prev-button') as HTMLElement
  const nextButton = document.querySelector('#carpool-count-step-button > .next-button') as HTMLElement
  prevButton.addEventListener('click', () => {
    step.prevStep()
  })
  nextButton.addEventListener('click', () => {
    step.nextStep()
  })
}

function registerResultStep() {
  // 스텝 변경
  const prevButton = document.querySelector('#result-step-button > .thanks-button') as HTMLElement
  const nextButton = document.querySelector('#result-step-button > .presents-button') as HTMLElement
  prevButton.addEventListener('click', () => {
    step.setStep('thanks-phrases')
  })
  nextButton.addEventListener('click', () => {
    step.setStep('presents')
  })
}

function main() {
  step.setStep('juso')
  registerIntroStep()
  registerJusoStep()
  registerPassengerCountStep()
  registerCarpoolCountStep()
  registerResultStep()
}

main()
