import { Fragment } from 'react'

import { Card, SvgIcon } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { useUserStore } from '@/stores/user'
import { AuthService } from '@/services'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import Button from '@/components/Button'

import type { IAuthResponse } from '@/types/auth'

const socialList = [
  {
    iconName: 'social-facebook',
    label: 'Facebook',
    providerId: '',
    linkSocial: AuthService.loginWithFacebookAccount,
  },
  {
    iconName: 'social-google',
    label: 'Google',
    providerId: 'google.com',
    linkSocial: AuthService.loginWithGoogleAccount,
  },
  {
    iconName: 'social-github',
    label: 'GitHub',
    providerId: '',
    linkSocial: AuthService.loginWithGithubAccount,
  },
]

const ClientSettingProfileSocialAuthCard = () => {
  const { i18n } = useLingui()
  const {
    firebase: { providerData },
  } = useUserStore()
  const { setSimplePageLoadingVisible } = useBackofficeLayout()

  // _Mutation
  const { mutateAsync: unlinkMutate } = useMutation((providerId: string) => AuthService.unlink(providerId))
  const { mutateAsync: linkSocialMutate } = useMutation((fn: () => Promise<IAuthResponse>) => fn())

  // _Events
  const getIsLinked = (providerId: string) => {
    return Boolean(providerData?.find((e) => e.providerId === providerId))
  }

  const onUnlinkSocial = async (label: string, providerId: string) => {
    setSimplePageLoadingVisible(true)

    try {
      await unlinkMutate(providerId)
      toast.success(i18n._(t`ยกเลิกเชื่อมต่อ ${label} สำเร็จ`))
    } catch (error) {
      // toast.error(error.code)
    } finally {
      setSimplePageLoadingVisible(false)
    }
  }

  const onLinkSocial = async (label: string, fn: () => Promise<IAuthResponse>) => {
    setSimplePageLoadingVisible(true)

    try {
      await linkSocialMutate(fn)
      toast.success(i18n._(t`เชื่อมต่อ ${label} สำเร็จ`))
    } catch (error) {
      // toast.error(error.code)
    } finally {
      setSimplePageLoadingVisible(false)
    }
  }

  return (
    <Fragment>
      <Card title={i18n._(t`เข้าสู่ระบบผ่านโซเซียล`)} className={clsx(`space-y-4`)}>
        {socialList.map((item, itemIdx) => (
          <div key={itemIdx} className={clsx(`flex items-center`)}>
            <div className={clsx(`flex flex-1 items-center space-x-2`)}>
              <SvgIcon name={item.iconName} className={clsx(`square-[30px]`)} />
              <span>{item.label}</span>
            </div>

            {getIsLinked(item.providerId) && (
              <Button
                variant="error"
                size="small"
                className={clsx(`!px-2`)}
                onClick={() => onUnlinkSocial(item.label, item.providerId)}
              >
                {i18n._(t`ยกเลิกการเชื่อมต่อ`)}
              </Button>
            )}
            {!getIsLinked(item.providerId) && (
              <Button
                variant="primary-solid"
                size="small"
                className={clsx(`!px-2`)}
                onClick={() => onLinkSocial(item.label, item.linkSocial)}
              >
                {i18n._(t`เชื่อมต่อ`)}
              </Button>
            )}
          </div>
        ))}
      </Card>

      {/* <Card title={i18n._(t`รหัสผ่าน`)} className={clsx(`space-y-4`)}>
        {getIsLinked('password') && (
          <Button variant="info" className={clsx(`w-full`)}>
            {i18n._(t`เปลี่ยนรหัสผ่าน`)}
          </Button>
        )}

        {!getIsLinked('password') && (
          <Button variant="info" className={clsx(`w-full`)}>
            {i18n._(t`สร้างรหัสผ่าน`)}
          </Button>
        )}
      </Card> */}
    </Fragment>
  )
}

export default ClientSettingProfileSocialAuthCard
