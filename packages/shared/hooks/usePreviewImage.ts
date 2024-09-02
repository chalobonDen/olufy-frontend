import { useState } from 'react'

export const usePreviewImage = () => {
  // _State
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState<number | null>(null)

  // _Events
  const handleShowPreviewImages = (images: string[], idx: number) => {
    setPreviewImages(images)
    setCurrentPreviewIndex(idx)
  }

  const handleClosePreviewImages = () => {
    setPreviewImages([])
    setCurrentPreviewIndex(0)
  }

  return {
    previewImages,
    currentPreviewIndex,
    handleShowPreviewImages,
    handleClosePreviewImages,
  }
}
