export const randomNumber = (max: number, min: number = 1): number =>
  Math.floor(Math.random() * (max - min)) + min

export const randomString = (): string =>
  (Math.random() + 1).toString(36).substring(7)
