import { dummyData, getFuelPrice, petchChoice, wait } from './api'
import { renderGiftItems } from './presents'
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
  // WIP: mocking data 삭제 예정
  // const formData = {
  //   start: '서울 광진구 동일로 10',
  //   goal: '부산 부산진구 가야공원로 1',
  //   passengerNumber: 4,
  //   carpoolCount: 10,
  // }
  const data = await getFuelPrice(formData)

  const fuelPriceElement = document.getElementById('fuel-price') as HTMLElement

  fuelPriceElement.innerHTML = `${(data?.fuelPrice ?? 0).toLocaleString()} 원`
  tipOptionsElement.innerHTML = data
    ? data.tipOptions
        .map((option) => {
          return `
                <button
                  type="button"
                  name="tip-option"
                  data-value="${option.multiple}"
                  class="rounded-4 bg-gray-200 px-12 py-8 text-b3-semibold text-gray-900 data-[checked=true]:bg-gray-900 data-[checked=true]:text-white"
                  data-checked="false"
                >
                  x ${option.multiple}배
                </button>
              `
        })
        .join('')
    : ''

  const tipOptionButtons = document.querySelectorAll<HTMLInputElement>('button[name=tip-option]')
  const tipDescription = document.getElementById('tip-description') as HTMLElement
  tipDescription.innerHTML = '가장 많은 유저들이 1.5배의 팁을 선택해요!'

  tipOptionButtons.forEach((button, index) => {
    button.addEventListener('click', ({ target }) => {
      if (!target) return
      const tip = (target as HTMLButtonElement).dataset.value
      const checked = (target as HTMLButtonElement).dataset.checked === 'true'
      tipOptionButtons.forEach((el) => (el.dataset.checked = 'false'))

      if (checked) {
        tipOptionsElement.dataset.value = '1'
        button.dataset.checked = 'false'
        tipDescription.innerHTML = '가장 많은 유저들이 1.5배의 팁을 선택해요!'
        fuelPriceElement.innerHTML = `${(data?.fuelPrice ?? 0).toLocaleString()} 원`
      } else {
        tipOptionsElement.dataset.value = tip
        button.dataset.checked = 'true'
        tipDescription.innerHTML = `${data?.tipOptions[index].choiceCount.toLocaleString()}명의 유저가 선택했어요!`
        fuelPriceElement.innerHTML = `${(Number(tip) * (data?.fuelPrice ?? 0)).toLocaleString()} 원`
      }
    })
  })
})
step.subscribe('presents', () => {
  renderGiftItems()
})

function getFormData() {
  try {
    const start = startRoadFullAddressInput.value
    const goal = destRoadFullAddressInput.value
    const passengerNumber = passengerCountForm.dataset.value
    const carpoolCount = carpoolCountInput.value

    if (!start.trim() || typeof start !== 'string') {
      throw new Error('출발지 정보를 입력해주세요.')
    }
    if (!goal.trim() || typeof goal !== 'string') {
      throw new Error('도착지 정보를 입력해주세요.')
    }
    if (typeof passengerNumber === 'undefined' || Number.isNaN(passengerNumber)) {
      throw new Error('동승자 정보를 입력해주세요.')
    }
    if (!carpoolCount.trim() || Number.isNaN(carpoolCount)) {
      throw new Error('카풀 횟수를 입력해주세요.')
    }

    return { start, goal, carpoolCount: Number(carpoolCount), passengerNumber: Number(passengerNumber) }
  } catch (err) {
    throw err
  }
}

function validateFormData({
  onSuccess,
  onError,
}: {
  onSuccess?: (...arg: unknown[]) => unknown
  onError?: (...arg: unknown[]) => unknown
}) {
  try {
    getFormData()
    onSuccess?.()
  } catch (err) {
    onError?.(err.message)
  }
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
    validateFormData({ onSuccess: () => step.nextStep(), onError: (message) => alert(message) })
  })
}

function registerResultStep() {
  // 스텝 변경
  const prevButton = document.querySelector('#result-step-button > .thanks-button') as HTMLElement
  const nextButton = document.querySelector('#result-step-button > .presents-button') as HTMLElement
  prevButton.addEventListener('click', async () => {
    // TODO
    // - 감사 문구 리스트 스텝으로 이동
    // - 수고비 옵션 선택 api 호출
    alert('준비 중인 기능입니다!')
  })
  nextButton.addEventListener('click', async () => {
    step.setStep('presents')

    const multiple = Number(tipOptionsElement.dataset.value)
    if (multiple === 1) return
    await petchChoice({ multiple })
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
