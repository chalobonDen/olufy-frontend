import type { FC } from 'react'
import { useMemo, useCallback, useState, useEffect, Fragment } from 'react'

import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { range } from 'lodash-es'

import UserContainer from '@/components/UI/User/Container'
import UserTitle from '@/components/UI/User/Title'
import { useSetting } from '@/hooks/stores/useSetting'

import type { IPartner } from '@/types/modules/home'
import { Theme } from '@/enums'

interface IUserHomePartnerSectionProps {
  partners: IPartner[]
}

const UserHomePartnerSection: FC<IUserHomePartnerSectionProps> = ({ partners }) => {
  const { i18n } = useLingui()
  const { theme } = useSetting()

  // _State
  const [newPartners, setNewPartners] = useState<IPartner[]>([])

  // _Events
  const getImageDimension = async (url: string, maxHeight = 60) => {
    return new Promise((resolve, reject) => {
      const img = new Image()

      img.onload = () => {
        const { naturalWidth: width, naturalHeight: height } = img
        const ratio = maxHeight / height
        resolve({ width: width * ratio, height: maxHeight })
      }

      img.onerror = () => {
        reject('There was some problem with the image.')
      }

      img.src = url
    })
  }

  // _Callback
  const transformPartners = useCallback(async () => {
    const data = await Promise.all(
      partners.map(async (partner) => {
        const imageDarkDimension = await getImageDimension(partner.imageDark)
        const imageLightDimension = await getImageDimension(partner.imageLight)
        return {
          ...partner,
          dark: imageDarkDimension,
          light: imageLightDimension,
        }
      }),
    )

    setNewPartners(data as IPartner[])
  }, [partners])

  // _Memo
  const mobileLength = useMemo(() => {
    const max = 7
    const cal = (max / newPartners.length) * 3
    return cal > max ? max : Math.round(cal)
  }, [newPartners.length])

  // _Effect
  useEffect(() => {
    transformPartners()
  }, [transformPartners])

  return (
    <section className={clsx(`py-12`)}>
      {newPartners?.length > 0 && (
        <UserContainer>
          <UserTitle className={clsx(`text-center`)}>{i18n._(t`Partner`)}</UserTitle>

          <div className={clsx(`mt-12 flex flex-wrap items-center justify-around gap-6`, `lg:hidden`, `sm:gap-4`)}>
            {partners.map((partner, partnerIdx) => (
              <div key={`desktop-${partnerIdx}`} className={clsx(`inline-block`)}>
                {theme === Theme.LIGHT ? (
                  <img src={partner.imageLight} alt={partner.name} className={clsx(`h-20 object-contain`, `sm:h-14`)} />
                ) : (
                  <img src={partner.imageDark} alt={partner.name} className={clsx(`h-20 object-contain`, `sm:h-14`)} />
                )}
              </div>
            ))}
          </div>

          <div
            className={clsx(
              `relative mt-10 hidden overflow-hidden whitespace-nowrap`,
              `lg:block`,
              `before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16`,
              `after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16`,
              `before:bg-gradient-to-r before:from-white-900 dark:before:from-dark-500`,
              `after:bg-gradient-to-l after:from-white-900 dark:after:from-dark-500`,
            )}
          >
            <div
              className={clsx(`inline-flex`, {
                'anim-slider-loop': true,
              })}
              style={{
                animationDuration: '30s',
              }}
            >
              <div className={clsx(`inline-block whitespace-nowrap`)}>
                {range(1, mobileLength).map((e) => (
                  <Fragment key={e}>
                    {newPartners.map((partner, partnerIdx) => (
                      <div
                        key={`mobile-${partnerIdx}-${e}-1`}
                        className={clsx(`mx-4 inline-flex items-center justify-center`)}
                        style={{
                          width: partner.light.width,
                          height: partner.light.height,
                        }}
                      >
                        {theme === Theme.LIGHT ? (
                          <img
                            src={partner.imageLight}
                            alt={`${partner.name} light mode`}
                            style={{
                              width: partner.light.width,
                              height: partner.light.height,
                            }}
                            className={clsx(`object-contain`)}
                          />
                        ) : (
                          <img
                            src={partner.imageDark}
                            alt={`${partner.name} dark mode`}
                            style={{
                              width: partner.dark.width,
                              height: partner.dark.height,
                            }}
                            className={clsx(`object-contain`)}
                          />
                        )}
                      </div>
                    ))}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </UserContainer>
      )}
    </section>
  )
}

export default UserHomePartnerSection
