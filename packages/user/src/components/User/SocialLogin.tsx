import { Fragment } from 'react'

import clsx from 'clsx'
import { SvgIcon } from '@olufy-frontend/shared/UI'
import { t } from '@lingui/macro'
import { useMutation } from '@tanstack/react-query'
import { useLingui } from '@lingui/react'

import { AuthService } from '@/services'

const UserSocialLogin = () => {
  const { i18n } = useLingui()

  // _Mutation
  const { mutate: loginGoogleMutate } = useMutation(() => AuthService.loginWithGoogleAccount())
  const { mutate: loginFacebookMutate } = useMutation(() => AuthService.loginWithFacebookAccount())
  const { mutate: loginGithubMutate } = useMutation(() => AuthService.loginWithGithubAccount())

  return (
    <Fragment>
      {/* Facebook Button */}
      <button
        className={clsx([
          `mt-4 rounded-lg border border-white-800`,
          `flex items-center justify-center space-x-2 py-2`,
          `transition-opacity hover:opacity-50`,
          `dark:border-dark-200`,
        ])}
        onClick={() => loginFacebookMutate()}
      >
        <SvgIcon name="social-facebook" className={clsx(`square-[30px]`)} />
        <span className={clsx(`text-header-5`)}>{i18n._(t`Continue with Facebook`)}</span>
      </button>

      {/* Google Button */}
      <button
        className={clsx([
          `mt-4 rounded-lg border border-white-800`,
          `flex items-center justify-center space-x-2 py-2`,
          `transition-opacity hover:opacity-50`,
          `dark:border-dark-200`,
        ])}
        onClick={() => loginGoogleMutate()}
      >
        <SvgIcon name="social-google" className={clsx(`square-[30px]`)} />
        <span className={clsx(`text-header-5`)}>{i18n._(t`Continue with Google`)}</span>
      </button>

      {/* GitHub Button */}
      <button
        className={clsx([
          `mt-4 rounded-lg border border-white-800`,
          `flex items-center justify-center space-x-2 py-2`,
          `transition-opacity hover:opacity-50`,
          `dark:border-dark-200`,
        ])}
        onClick={() => loginGithubMutate()}
      >
        <SvgIcon name="social-github" className={clsx(`square-[30px]`)} />
        <span className={clsx(`text-header-5`)}>{i18n._(t`Continue with GitHub`)}</span>
      </button>
    </Fragment>
  )
}

export default UserSocialLogin
