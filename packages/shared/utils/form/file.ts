const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] }

export const isValidFileType = (fileName: string, fileType: string) => {
  return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1
}
