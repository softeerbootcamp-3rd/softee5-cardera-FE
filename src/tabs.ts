const tabContainer = document.getElementById('tab-container') as HTMLElement
const tabHeadings = document.getElementById('tab-headings') as HTMLElement
const tabButtons = document.getElementById('tab-buttons') as HTMLElement
const tabContents = document.getElementById('tab-contents') as HTMLElement

tabButtons.addEventListener('click', ({ target }) => {
  if (!target) return
  // @ts-ignore
  const selectedTabId = target.dataset.tabId
  // tab buttons
  Array.from(tabButtons.children).forEach((button) => {
    button.setAttribute('data-state', 'inactive')
    // @ts-ignore
    const tabId = button.dataset.tabId
    if (tabId === selectedTabId) {
      button.setAttribute('data-state', 'active')
    }
  })

  // headings
  Array.from(tabHeadings.children).forEach((heading) => {
    heading.removeAttribute('hidden')
    // @ts-ignore
    const tabId = heading.dataset.tabId
    if (tabId !== selectedTabId) {
      heading.setAttribute('hidden', '')
    }
  })
  // contents
  Array.from(tabContents.children).forEach((content) => {
    content.removeAttribute('hidden')
    // @ts-ignore
    const tabId = content.dataset.tabId
    if (tabId !== selectedTabId) {
      content.setAttribute('hidden', '')
    }
  })
})
