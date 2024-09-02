import clsx from 'clsx'

const InvoiceSummary = () => {
  return (
    <section className={clsx(`invoice-summary`)}>
      <div className={clsx(`flex items-end`)}>
        <div className="text-word-price flex-1">(แปดพันสองร้อยสี่สิบเจ็ดบาทสี่สิบสองสตางค์)</div>

        <div className={clsx(`flex-1`)}>
          <table className="summary-table">
            <tbody>
              <tr>
                <td className={clsx(`text-right`)}>รวมเป็นเงิน</td>
                <td className={clsx(`text-right text-dark-500`)}>
                  <span>8,247.42</span>&nbsp;&nbsp;บาท
                </td>
              </tr>
              <tr>
                <td className={clsx(`text-right`)}>จำนวนเงินรวมทั้งสิ้น</td>
                <td className={clsx(`text-right text-dark-500`)}>
                  <span>8,247.42</span>&nbsp;&nbsp;บาท
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={clsx(`flex items-end`)}>
        <div className={clsx(`flex-1`)}></div>
        <div className={clsx(`mt-3 flex-1 border-t border-white-300 pt-3`)}>
          <table className="summary-table">
            <tbody>
              <tr>
                <td className={clsx(`text-right`)}>หักภาษี ณ ที่จ่าย 3%</td>
                <td className={clsx(`text-right text-dark-500`)}>
                  <span>8,247.42</span>&nbsp;&nbsp;บาท
                </td>
              </tr>
              <tr>
                <td className={clsx(`text-right`)}>ยอดชำระ</td>
                <td className={clsx(`text-right text-dark-500`)}>
                  <span>8,247.42</span>&nbsp;&nbsp;บาท
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default InvoiceSummary
