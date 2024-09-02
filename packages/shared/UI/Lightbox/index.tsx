import type { FC } from 'react'
import { Fragment, useEffect, useMemo, useState } from 'react'

import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { AnimatePresence, wrap, motion } from 'framer-motion'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'

import Modal from '../Modal'
import type { IModalProps } from '../Modal/types'

import './styles.scss'

interface ILightboxProps extends IModalProps {
  images: string[]
  currentIndex?: number
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 0 : -0,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 0 : -0,
      opacity: 0,
    }
  },
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

const Lightbox: FC<ILightboxProps> = ({ images, currentIndex, ...props }) => {
  const { i18n } = useLingui()

  // _State
  const [[page, direction], setPage] = useState([0, 0])

  // _Memo
  const imageIndex = useMemo(() => wrap(0, images.length, page), [images.length, page])

  // _Events
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  // _Effect
  useEffect(() => {
    if (currentIndex) setPage([currentIndex, 0])
  }, [currentIndex])

  return (
    <Modal {...props} isDesktopFullScreen className={clsx(`preview-modal`)}>
      <div className={clsx(`preview-modal-images`)}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={images[imageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
          />
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <Fragment>
          <div className={clsx(`preview-modal-info`)}>{`${imageIndex + 1} / ${images.length}`}</div>

          <div className={clsx(`preview-modal-navigation`)}>
            <div className="next" onClick={() => paginate(1)}>
              <IoArrowForward />
            </div>
            <div className="prev" onClick={() => paginate(-1)}>
              <IoArrowBack />
            </div>
          </div>
        </Fragment>
      )}
    </Modal>
  )
}

export default Lightbox
