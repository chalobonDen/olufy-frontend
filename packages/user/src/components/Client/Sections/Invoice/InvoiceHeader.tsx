import { Logo } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'

const InvoiceHeader = () => {
  return (
    <section className={clsx(`invoice-header`)}>
      <div className={clsx(`flex-1`)}>
        <Logo className={clsx(`invoice-logo`)} />
        <div className="invoice-company invoice-company-section">
          <ul>
            <li>
              <label>บริษัท โอลูฟาย จำกัด (สำนักงานใหญ่)</label>
            </li>
            <li>
              <label>138/37 ซอย ลาดพร้าว 41 แยก 6-9 แขวง จันทีเกษม เขต จตุจักร กรุมเทพมหานคร 10900</label>
            </li>
            <li>
              <label>เลขประจำตัวผู้เสียภาษี 0105561066896</label>
            </li>
            <li>
              <label>เบอร์มือถือ 0851404042</label>
            </li>
          </ul>
        </div>
        <div className="invoice-customer invoice-customer-section">
          <ul>
            <li>
              <label>ลูกค้า</label>
            </li>
            <li>
              <label>บริษัท เดโม่ เนม จำกัด (สำนักงานใหญ่)</label>
            </li>
            <li>
              <label>120/8 หมู่ 12 ตำบลไร่ขิง อำเภอสามพราน นครปฐม 73210</label>
            </li>
            <li>
              <label>เลขประจำตัวผู้เสียภาษี 0115563011070</label>
            </li>
          </ul>
        </div>
      </div>
      <div className={clsx(`flex-1`)}>
        <div className={clsx(`invoice-title`)}>
          <h1>ใบแจ้งหนี้</h1>
          <p>ต้นฉบับ</p>
        </div>
        <div className={clsx(`invoice-info`)}>
          <div>
            <span className={clsx(`title-info`)}>เลขที่</span>
            <span className={clsx(`detail-info`)}>INV000001</span>
          </div>
          <div>
            <label className={clsx(`title-info`)}>วันที่</label>
            <label className={clsx(`detail-info`)}>31/10/2017</label>
          </div>
          <div>
            <label className={clsx(`title-info`)}>ครบกำหนด</label>
            <label className={clsx(`detail-info`)}>31/10/2017</label>
          </div>
          <div>
            <label className={clsx(`title-info`)}>ผู้ขาย </label>
            <label className={clsx(`detail-info`)}>Nut Piyawat</label>
          </div>
        </div>
        <div className={clsx(`invoice-details`)}>
          <div>
            <span className={clsx(`title-info`)}>ชื่องาน</span>
            <span className={clsx(`detail-info`)}>XXX</span>
          </div>
          <div>
            <label className={clsx(`title-info`)}>ผู้ติดต่อ</label>
            <label className={clsx(`detail-info`)}>Something!!</label>
          </div>
          <div>
            <label className={clsx(`title-info`)}>เบอร์โทร</label>
            <label className={clsx(`detail-info`)}>0926145218181</label>
          </div>
          <div>
            <label className={clsx(`title-info`)}>อีเมล </label>
            <label className={clsx(`detail-info`)}>AFFASFFA@dsgasdgdgs.com</label>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InvoiceHeader
