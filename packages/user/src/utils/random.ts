export const generateString = (length = 8) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let retVal = ''
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n))
  }
  return retVal
}

export const generatePassword = (length = 12): string => {
  const symbols = '!@#$%^&*(){}[]=<>/,.'

  const lower = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)
  const upper = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65)
  const number = () => String.fromCharCode(Math.floor(Math.random() * 10) + 48)
  const symbol = () => symbols[Math.floor(Math.random() * symbols.length)]
  const typesArr = [{ lower }, { upper }, { number }, { symbol }]

  let generatedPassword = ''

  for (let i = 0; i < length; i++) {
    typesArr.forEach((type) => {
      generatedPassword += Object.values(type)[0]()
    })
  }
  return generatedPassword.slice(0, length)
}
