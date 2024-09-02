import { Fragment, useState } from 'react'

import clsx from 'clsx'
import { Card, Pagination } from '@olufy-frontend/shared/UI'
import { useQuery } from '@tanstack/react-query'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Client/Buttons/BackButton'
import VpsServerRentCard from '@/components/Client/Cards/VpsServer/VpsServerRentCard'
import { VpsServerService } from '@/services'
import { useUserStore } from '@/stores/user'

import type { IVpsServerQueryParams } from '@/types/modules/vps-server'

export const Page = () => {
  const { profile } = useUserStore()

  // _State
  const [queryParams, setQueryParams] = useState<IVpsServerQueryParams>({
    page: 1,
    perPage: 10,
    search: '',
  })

  // _Query
  const { data } = useQuery(
    ['get-vps-server-list', queryParams],
    ({ signal }) => VpsServerService.list(queryParams, { signal }),
    {
      enabled: !!profile,
    },
  )

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <h3 className={clsx(`mt-4 text-header-3`)}>VPS Server</h3>
      <Card className={clsx(`mt-6 p-10`, `sm:mt-4 sm:p-6`)}>
        <div>
          <h1 className={clsx(`text-header-2`, `sm:text-header-3`)}>ORDER VPS SERVER</h1>
          <p className={clsx(`font-light`)}>Rent a server (Rent a server (automatic system))</p>
        </div>
        <div className={clsx(`mt-6`)}>
          <h3 className={clsx(`text-header-3`, `sm:text-header-4`)}>INSTANT FAST DEPLOY</h3>
          <p className={clsx(`font-light`)}>
            The system is installed with automatic system, receive the machine within 5 minutes immediately
          </p>
          <p className={clsx(`font-light`)}>
            (When the order is successful, the system will take time to install and send the usage information to you
            immediately)
          </p>
        </div>
        <div className={clsx(`mt-6`)}>
          <h3 className={clsx(`text-header-3`, `sm:text-header-4`)}>CONTROL YOUR SELF</h3>
          <p className={clsx(`font-light`)}>
            You can control everything by yourself, order on-off, order to install a new OS by yourself at any time.
          </p>
          <p className={clsx(`font-light`)}>
            (Control your own private server via website including installing a new OS by yourself)
          </p>
        </div>
        <div className={clsx(`mt-6`)}>
          <h3 className={clsx(`text-header-3`, `sm:text-header-4`)}>FIREWALL PROTECTION</h3>
          <p className={clsx(`font-light`)}>More powerful Firewall protection</p>
          <p className={clsx(`font-light`)}>
            (Can choose special protection for Game Firewall such as FiveM, TS3, SAMP, Minecraft)
          </p>
        </div>
      </Card>

      <div
        className={clsx(
          `mt-6 grid grid-cols-4 gap-6`,
          `2xl:gap-4`,
          `xl:grid-cols-3`,
          `lg:grid-cols-2`,
          `sm:grid-cols-1`,
        )}
      >
        {data?.items?.map((item, idx) => (
          <VpsServerRentCard data={item} key={idx} />
        ))}
      </div>

      {data?.items?.length > 0 && (
        <div className={clsx(`mt-6 flex w-full justify-center`)}>
          <Pagination
            current={queryParams.page}
            total={data?.total}
            pageSize={queryParams.perPage}
            showLessItems
            onChange={(e) => {
              setQueryParams((state) => ({
                ...state,
                page: e,
              }))
            }}
          />
        </div>
      )}
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: `VPS Server`,
}
