class ScrollSpy {
    private duration: number = 500

    constructor(duration?: number) {
        if (duration) this.duration = duration

        const links = document.querySelectorAll('[data-wg-link]')

        if (links) {
            links.forEach((link, index) => {
                if (index === 0) link.classList.add('active')
                link.addEventListener('click', this.handleClickOnLinkItem)
            })
        }
    }

    /*
     * It get two parameter:
     *   - The targetPosition argument specifies the destination point that you want to scroll to.
     *   - The duration argument determines how long the animation will take to be executed.
     * ------
     * note: The requestAnimationFrame method is a browser API method.
     */
    private smoothScroll = (targetPosition: number, duration = 500) => {
        const startPosition = window.scrollY
        let startTime = 0

        const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
            t /= d / 2
            if (t < 1) return (c / 2) * t * t + b
            t--
            return (-c / 2) * (t * (t - 2) - 1) + b
        }

        const animation = (currentTime: number) => {
            if (startTime === 0) startTime = currentTime
            const timeElapsed = currentTime - startTime
            const easedPosition = easeInOutQuad(
                timeElapsed,
                startPosition,
                targetPosition,
                duration
            )
            window.scrollTo(0, easedPosition)
            if (timeElapsed < duration) {
                requestAnimationFrame(animation)
            }
        }

        requestAnimationFrame(animation)
    }

    private getMainElement = (el: HTMLElement): HTMLElement => {
        if (!el) throw Error('Element does not exist!')
        if (el.hasAttribute('data-wg-link')) {
            return el
        }
        return this.getMainElement(el.parentElement!)
    }

    private handleClickOnLinkItem = (e: Event) => {
        e.preventDefault()
        const linkEl = this.getMainElement(e.target as HTMLElement)

        const sectionID = linkEl.getAttribute('data-wg-link')?.replace('#', '')
        if (!sectionID) throw new Error('section id is not valid!')

        const sectionEl = document.querySelector(
            `[data-wg-section="${sectionID}"]`
        ) as HTMLElement
        if (!sectionEl) throw new Error('section id not found!')

        const sectionRect = sectionEl.getBoundingClientRect()
        this.smoothScroll(Math.ceil(sectionRect.top), this.duration)
    }
}
