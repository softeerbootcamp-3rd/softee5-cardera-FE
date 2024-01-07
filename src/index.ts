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

/**
 * step에 따라 화면에 스텝을 노출
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

/**
 * 뒤로가기, 앞으로가기 버튼 클릭 시 step 전환하는 클릭 이벤트 등록
 */
function clickPrevAndNextButton() {
  stepElements.forEach((stepElement) => {
    const currentStep = stepElement.dataset.step as Step
    const currentStepIndex = steps.findIndex((step) => step === currentStep)
    const prevStep =
      currentStepIndex === 0 ? currentStep : steps[currentStepIndex - 1]
    const nextStep =
      currentStepIndex === steps.length - 1
        ? currentStep
        : steps[currentStepIndex + 1]

    stepElement.addEventListener('click', ({ target }) => {
      if (!target) return

      if (target instanceof Element) {
        if (target.id === 'prev-step') {
          showStep(prevStep)
        }
        if (target.id === 'next-step') {
          showStep(nextStep)
        }
      }
    })
  })
}

function main() {
  showStep('intro')
  clickPrevAndNextButton()
}

main()
