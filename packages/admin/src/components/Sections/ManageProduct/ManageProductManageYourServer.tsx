import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Button } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'

const ManageProductManageYourServer = () => {
  const { i18n } = useLingui()

  return (
    <div className={clsx(`p-6`)}>
      <h3 className={clsx(`text-header-3`)}>{i18n._(t`Manage Your Server`)}</h3>

      <div className={clsx(`mt-5 grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
        <div className={clsx(`text-center`)}>{i18n._(t`Refresh Detail`)}</div>
        <div></div>
      </div>
      <div className={clsx(`grid grid-cols-2 rounded-lg py-2`)}>
        <div className={clsx(`text-center`)}>{i18n._(t`Booted`)}</div>
        <div className={clsx(`text-center`)}>Yes</div>
      </div>
      <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
        <div className={clsx(`text-center`)}>{i18n._(t`Built`)}</div>
        <div className={clsx(`text-center`)}>Yes</div>
      </div>
      <div className={clsx(`grid grid-cols-2 rounded-lg py-2`)}>
        <div className={clsx(`text-center`)}>{i18n._(t`Recovery Mode`)}</div>
        <div className={clsx(`text-center`)}>No</div>
      </div>
      <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
        <div className={clsx(`text-center`)}>{i18n._(t`Password`)}</div>
        <div className={clsx(`flex items-center justify-center space-x-2`, `sm:flex-col sm:space-x-0 sm:space-y-2`)}>
          <Button variant="success" size="small" className={clsx(`min-w-[100px]`)}>
            <span>{i18n._(t`Show`)}</span>
          </Button>
          <Button variant="success" size="small" className={clsx(`min-w-[100px]`)}>
            <span>{i18n._(t`Change`)}</span>
          </Button>
        </div>
      </div>
      <div className={clsx(`grid grid-cols-2 rounded-lg py-2`)}>
        <div className={clsx(`text-center`)}>{i18n._(t`CPU(s)`)}</div>
        <div className={clsx(`text-center`)}>6 Core 12 Thread</div>
      </div>
      <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
        <div className={clsx(`text-center`)}>{i18n._(t`Memory Size`)}</div>
        <div className={clsx(`text-center`)}>32456 MB</div>
      </div>
      <div className={clsx(`grid grid-cols-2 rounded-lg py-2`)}>
        <div className={clsx(`text-center`)}>{i18n._(t`Disk Size`)}</div>
        <div className={clsx(`text-center`)}>250 GB</div>
      </div>
      <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
        <div className={clsx(`text-center`)}>{i18n._(t`Monthly Bandwidth Allocation`)}</div>
        <div className={clsx(`text-center`)}>8122 GB</div>
      </div>
      <div className={clsx(`grid grid-cols-2 rounded-lg py-2`)}>
        <div className={clsx(`text-center`)}>{i18n._(t`Monthly Banwidth Used`)}</div>
        <div className={clsx(`text-center`)}>12.222345 GB</div>
      </div>
      <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
        <div className={clsx(`text-center`)}>{i18n._(t`IP Address`)}</div>
        <div className={clsx(`text-center`)}>112.343.111.33</div>
      </div>
      <div className={clsx(`grid grid-cols-2 rounded-lg py-2`)}>
        <div className={clsx(`text-center`)}>{i18n._(t`Template`)}</div>
        <div className={clsx(`text-center`)}>Ubuntu 18.04 x64</div>
      </div>
      <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
        <div className={clsx(`text-center`)}>{i18n._(t`Created At`)}</div>
        <div className={clsx(`text-center`)}>2021-02-22 11:20:33</div>
      </div>
      <div className={clsx(`grid grid-cols-2 rounded-lg py-2`)}>
        <div className={clsx(`text-center`)}>{i18n._(t`Last Update`)}</div>
        <div className={clsx(`text-center`)}>2021-02-22 11:20:33</div>
      </div>
      <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
        <div className={clsx(`text-center`)}>{i18n._(t`Domain`)}</div>
        <div className={clsx(`text-center`)}>Domainname.com</div>
      </div>
    </div>
  )
}

export default ManageProductManageYourServer
