export const stepElements = document.querySelectorAll(
  '[data-step]'
) as NodeListOf<HTMLSelectElement>

export class Step<T extends string[]> {
  observers: { [step: string]: any[] }
  steps: T
  currentStep: T[number]

  constructor(currentStep: T[number], steps: T) {
    this.observers = {}
    this.steps = steps
    this.currentStep = currentStep
  }

  subscribe(step: T[number], func) {
    if (typeof this.observers[step] === 'undefined') {
      this.observers[step] = []
    }
    this.observers[step].push(func)
  }

  unsubscribe(step: T[number], func) {
    this.observers[step] = this.observers[step]?.filter(
      (observer) => observer !== func
    )
  }

  setStep(step: T[number]) {
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
