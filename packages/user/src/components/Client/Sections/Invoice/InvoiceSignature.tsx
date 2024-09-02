import { Logo } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'

const InvoiceSignature = () => {
  return (
    <section className={clsx(`invoice-signature`)}>
      <div className={clsx(`flex`)}>
        <div className={clsx(`flex-1`)}>ในนาม บริษัท เพลย์โพสต์ จำกัด</div>
        <div className={clsx(`flex-1 text-right`)}>ในนาม บริษัท โอลูฟาย จำกัด</div>
      </div>
      <div className={clsx(`flex space-x-2`)}>
        <div className={clsx(`flex flex-1 space-x-2`)}>
          <div className={clsx(`flex-1`)}>
            <div className={clsx(`h-16 border-b border-white-300 px-10`)}></div>
            <div className={clsx(`mt-1 text-center`)}>ผู้จ่ายเงิน</div>
          </div>
          <div className={clsx(`flex-1`)}>
            <div className={clsx(`h-16 border-b border-white-300 px-10`)}></div>
            <div className={clsx(`mt-1 text-center`)}>วันที่</div>
          </div>
        </div>
        <div className={clsx(`flex justify-center px-12`)}>
          <Logo imageClassName={clsx(`aspect-square w-20 h-20`)} isShowText={false} />
        </div>
        <div className={clsx(`flex flex-1 space-x-2`)}>
          <div className={clsx(`flex-1`)}>
            <div className={clsx(`h-16 border-b border-white-300 px-10`)}></div>
            <div className={clsx(`mt-1 text-center`)}>ผู้รับเงิน</div>
          </div>
          <div className={clsx(`flex-1`)}>
            <div className={clsx(`h-16 border-b border-white-300 px-10`)}></div>
            <div className={clsx(`mt-1 text-center`)}>วันที่</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InvoiceSignature
