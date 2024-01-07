export const stepElements = document.querySelectorAll(
  '[data-step]'
) as NodeListOf<HTMLSelectElement>

type NonEmptyArray<T> = readonly [T, ...T[]]

export class Step<Steps extends NonEmptyArray<string>> {
  observers: { [step: string]: any[] }
  steps: Steps
  currentStep: Steps[number]

  constructor(currentStep: Steps[number], steps: Steps) {
    this.observers = {}
    this.steps = steps
    this.currentStep = currentStep
  }

  subscribe(step: Steps[number], func) {
    if (typeof this.observers[step] === 'undefined') {
      this.observers[step] = []
    }
    this.observers[step].push(func)
  }

  unsubscribe(step: Steps[number], func) {
    this.observers[step] = this.observers[step]?.filter(
      (observer) => observer !== func
    )
  }

  setStep(step: Steps[number]) {
    stepElements.forEach(async (stepElement) => {
      if (stepElement.dataset.step === step) {
        stepElement.classList.remove('hidden')
        return
      }
      if (stepElement.classList.contains('hidden') === false) {
        stepElement.classList.add('hidden')
      }
    })
    this.observers[step]?.forEach((observer) => observer())
    this.currentStep = step
  }

  prevStep() {
    const currentStepIndex = this.steps.indexOf(this.currentStep)
    const prevStep =
      currentStepIndex === 0
        ? this.currentStep
        : this.steps[currentStepIndex - 1]
    this.setStep(prevStep)
  }

  nextStep() {
    const currentStepIndex = this.steps.indexOf(this.currentStep)
    const nextStep =
      currentStepIndex === this.steps.length - 1
        ? this.currentStep
        : this.steps[currentStepIndex + 1]
    this.setStep(nextStep)
  }
}
