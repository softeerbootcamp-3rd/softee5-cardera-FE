const steps = [
  'intro',
  'juso',
  'passenger-count',
  'carpool-count',
  'result',
  'presents',
  'thanks-phrases',
] as const
type Step = (typeof steps)[number]

const stepElements = document.querySelectorAll(
  '[data-step]'
) as NodeListOf<HTMLSelectElement>
const addressForm = document.getElementById('address') as HTMLUListElement
const carpoolTypeSelect = document.getElementById(
  'carpool-type-select'
) as HTMLUListElement
const startRoadFullAddressInput = document.getElementById(
  'startRoadFullAddr'
) as HTMLInputElement
const destRoadFullAddressInput = document.getElementById(
  'destRoadFullAddr'
) as HTMLInputElement

function getCurrentStep(): Step {
  return Array.from(stepElements).find(
    (element) => !element.classList.contains('hidden')
  )?.dataset.step as Step
}

function getCurrentStepIndex() {
  return steps.indexOf(getCurrentStep())
}
/**
 * step에 따라 화면에 스텝을 노출
 * TODO session storage 에서 data resotre 해오기
 * @param step 화면에 스텝
 */
function showStep(step: Step) {
  stepElements.forEach((stepElement) => {
    if (stepElement.dataset.step === step) {
      stepElement.classList.remove('hidden')
      return
    }
    if (stepElement.classList.contains('hidden') === false) {
      stepElement.classList.add('hidden')
    }
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

  // 편도, 왕복 선택
  carpoolTypeSelect.addEventListener('click', ({ target }) => {
    if (!target) return
    if (target instanceof Element) {
      // TODO: style 바꾸기, data-value 심기
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
    // TODO prev step 구하는 로직 분리
    const currentStep = getCurrentStep()
    const currentStepIndex = getCurrentStepIndex()
    const prevStep =
      currentStepIndex === 0 ? currentStep : steps[currentStepIndex - 1]
    showStep(prevStep)
  })
  nextButton.addEventListener('click', () => {
    // TODO next step 구하는 로직 분리
    const currentStep = getCurrentStep()
    const currentStepIndex = getCurrentStepIndex()
    const nextStep =
      currentStepIndex === steps.length - 1
        ? currentStep
        : steps[currentStepIndex + 1]
    showStep(nextStep)
  })
}

function registerPassengerCountStep() {}

function registerCarpoolCountStep() {}

function registerResultStep() {}

function fetchFuelPrice() {
  // TODO: result step이 active 할 때 서버에서 유류비 값 가져오기
}

function main() {
  showStep('juso')
  registerJusoStep()
  registerPassengerCountStep()
  registerCarpoolCountStep()
  registerResultStep()
}

main()
