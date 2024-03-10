class ScrollSpy {
  private duration: number = 500;

  constructor(duration?: number) {
    if (duration) this.duration = duration;
  }

  private smoothScroll = (targetPosition: number, duration = 500) => {
    const startPosition = window.scrollY;
    let startTime = 0;

    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = (currentTime: number) => {
      if (startTime === 0) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const easedPosition = easeInOutQuad(
        timeElapsed,
        startPosition,
        targetPosition,
        duration
      );
      window.scrollTo(0, easedPosition);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };
}
