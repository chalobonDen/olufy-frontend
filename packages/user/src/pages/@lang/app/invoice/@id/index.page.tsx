import { Fragment, useEffect } from 'react'

import { t } from '@lingui/macro'
import clsx from 'clsx'
import { range } from 'lodash-es'

import type { DocumentProps } from '@/renderer/types'
import Button from '@/components/Button'
import InvoiceHeader from '@/components/Client/Sections/Invoice/InvoiceHeader'
import InvoiceSummary from '@/components/Client/Sections/Invoice/InvoiceSummary'
import InvoiceRemark from '@/components/Client/Sections/Invoice/InvoiceRemark'
import InvoiceSignature from '@/components/Client/Sections/Invoice/InvoiceSignature'

export const Page = () => {
  // _Effect
  useEffect(() => {
    const maxHeight = 240
    const wrapper = document.querySelector('.invoice-page-wrap')
    const productSection = wrapper.querySelector('.invoice-product')
    const productItems = productSection.querySelector('.product-items')
    const items = productItems.querySelectorAll('tr')

    let trHeight = 0
    const arr = []
    items.forEach((e) => {
      trHeight += e.clientHeight

      if (trHeight < maxHeight) {
        arr.push(e)
      }
    })
  }, [])

  return (
    <Fragment>
      <div className={clsx(`invoice-container`)}>
        <div className={clsx(`invoice-page-wrap`)}>
          <div className={clsx(`invoice-page tax-invoice`)}>
            <div className="triangle"></div>

            <InvoiceHeader />

            <section className={clsx(`invoice-product`)}>
              <table className={clsx(`products-table`)}>
                <tbody className={clsx`products-table-header`}>
                  <tr>
                    <th>#</th>
                    <th>รายละเอียด</th>
                    <th className={clsx(`text-right`)}>จำนวน</th>
                    <th className={clsx(`text-right`)}>ราคาต่อหน่วย</th>
                    <th className={clsx(`text-right`)}>ส่วนลด</th>
                    <th className={clsx(`text-right`)}>มูลค่า</th>
                  </tr>
                </tbody>
                <tbody className={clsx(`product-items`)}>
                  {range(1, 5).map((item, idx) => (
                    <tr key={idx}>
                      <td>{item}</td>
                      <td>
                        Server & Management ( Monthly Plan / 2022 ) บริการ บริหารและดูแลจัดการเซิร์ฟเวอร์ รายเดือน /
                        ประจำ เดือนธันวาคม 2565
                      </td>
                      <td>1</td>
                      <td>18,247.42</td>
                      <td></td>
                      <td>8,247.42</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <InvoiceSummary />

            <InvoiceRemark />

            <InvoiceSignature />
          </div>
        </div>

        <div className={clsx(`button-continue`)}>
          <Button variant="success" size="medium" className={clsx(`w-full`)}>
            <span>{clsx(`ดำเนินการต่อ`)}</span>
          </Button>
        </div>
      </div>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Invoice`,
}
