export function delay(time = 500, fn?: () => void): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      if (fn) fn();
      resolve();
    }, time);
  });
}
