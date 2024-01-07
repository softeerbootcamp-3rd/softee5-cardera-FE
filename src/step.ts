export const steps = [
  'intro',
  'juso',
  'passenger-count',
  'carpool-count',
  'result',
  'presents',
  'thanks-phrases',
] as const

export type Step = (typeof steps)[number]

export const stepElements = document.querySelectorAll(
  '[data-step]'
) as NodeListOf<HTMLSelectElement>

/**
 * 현재 step 이름 반환 함수
 * @returns 현재 step 이름
 */
export function getCurrentStep(): Step {
  return Array.from(stepElements).find(
    (element) => !element.classList.contains('hidden')
  )?.dataset.step as Step
}

/**
 * 현재 step의 index를 반환하는 함수
 * @returns 현재 step의 index
 */
export function getCurrentStepIndex() {
  return steps.indexOf(getCurrentStep())
}

/**
 * 이전 step 반환 함수
 * @returns 이전 step
 */
export function getPrevStep() {
  const currentStep = getCurrentStep()
  const currentStepIndex = getCurrentStepIndex()
  const prevStep =
    currentStepIndex === 0 ? currentStep : steps[currentStepIndex - 1]
  return prevStep
}

/**
 * 다음 step 반환 함수
 * @returns 다음 step
 */
export function getNextStep() {
  const currentStep = getCurrentStep()
  const currentStepIndex = getCurrentStepIndex()
  const nextStep =
    currentStepIndex === steps.length - 1
      ? currentStep
      : steps[currentStepIndex + 1]
  return nextStep
}

/**
 * step에 따라 화면에 스텝을 노출
 * TODO session storage 에서 data resotre 해오기
 * @param step 화면에 스텝
 */
export function setStep(step: Step) {
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
