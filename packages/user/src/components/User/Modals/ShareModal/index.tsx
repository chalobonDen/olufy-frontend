import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Input, Modal, SvgIcon } from '@olufy-frontend/shared/UI'
import type { IModalProps } from '@olufy-frontend/shared/UI/Modal/types'
import clsx from 'clsx'
import { FaFacebookF, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { useCopyToClipboard } from 'usehooks-ts'
import { toast } from 'react-hot-toast'

import { useUserShareModal } from './hooks'

interface IUserShareModalProps extends IModalProps {}

enum ShareOption {
  FACEBOOK,
  TWITTER,
  LINKED_IN,
}

const configs = [
  {
    label: 'Facebook',
    key: ShareOption.FACEBOOK,
    icon: FaFacebookF,
    // url: `https://www.facebook.com/sharer.php?display=popup&u=`,
    url: `https://www.facebook.com/sharer/sharer.php?u=`,
  },
  {
    label: 'Twitter',
    key: ShareOption.TWITTER,
    icon: FaTwitter,
    // url: `https://twitter.com/intent/tweet?url=`,
    url: `https://twitter.com/share?url=`,
  },
  {
    label: 'LinkedIn',
    key: ShareOption.LINKED_IN,
    icon: FaLinkedin,
    // url: `https://www.linkedin.com/sharing/share-offsite/?url=`,
    url: `https://www.linkedin.com/shareArticle/?url=`,
  },
]

const UserShareModal: FC<IUserShareModalProps> = ({ ...props }) => {
  const { i18n } = useLingui()
  const { visible, close } = useUserShareModal()
  const [_, copy] = useCopyToClipboard()

  // _State
  const [currentUrl, setCurrentUrl] = useState<string | null>(null)

  // _Events
  const onCloseModal = () => {
    close()
  }

  const handleShare = (url: string) => {
    const left = screen.width / 2 - 640 / 2
    const top = screen.height / 2 - 640 / 2
    const options = `toolbar=0,status=0,resizable=1,width=${screen.width > 640 ? 640 : screen.width},height=${
      screen.width > 640 ? 640 : screen.height
    },top=${screen.width > 640 ? top : 0},left=${screen.width > 640 ? left : 0}`

    window.open(url + encodeURIComponent(currentUrl), 'sharer', options)
  }

  const onCopy = async () => {
    await copy(currentUrl)
    toast.success(i18n._(t`คัดลอกสำเร็จ`))
  }

  // _Effect
  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  return (
    <Modal visible={visible} closeModal={onCloseModal} title={i18n._(t`แชร์`)} {...props}>
      <div className={clsx(`mt-4 flex items-center justify-center space-x-6`)}>
        {configs.map((config) => {
          const Icon = config.icon

          return (
            <div
              key={config.key}
              className={clsx(`group cursor-pointer text-center`)}
              onClick={() => handleShare(config.url)}
            >
              <div
                className={clsx(
                  `flex items-center justify-center rounded-full bg-white-600 transition-colors square-[72px]`,
                  `group-hover:bg-primary-500/10`,
                  `dark:bg-dark-300`,
                )}
              >
                <Icon className={clsx(`transition-colors square-6`, `group-hover:text-primary-500`)} />
              </div>
              <span className={clsx(`mt-2 inline-block transition-colors`, `group-hover:text-primary-500`)}>
                {config.label}
              </span>
            </div>
          )
        })}
      </div>

      <Input
        className={clsx(`mt-4`)}
        value={currentUrl}
        readOnly
        onFocus={onCopy}
        suffix={
          <div className={clsx(`cursor-pointer`)} onClick={onCopy}>
            <SvgIcon name="copy" className={clsx(`text-primary-500 square-6`)} />
          </div>
        }
      />
    </Modal>
  )
}

export default UserShareModal
