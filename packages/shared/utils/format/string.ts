export const getOnlyNumber = (val: string) => {
  return val.match(/[-]{0,1}[\d]*[.]{0,1}[\d]+/g)[0]
}

export const getOnlyString = (val: string) => {
  return val.replace(/\d+/g, '')
}
