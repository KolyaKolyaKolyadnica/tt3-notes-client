function throttle(func: any, ms: number) {
  let isWaiting = false;

  return function (...args: any) {
    if (isWaiting) return;

    func(...args);
    isWaiting = true;

    setTimeout(function () {
      isWaiting = false;
    }, ms);
  };
}

export default throttle;
