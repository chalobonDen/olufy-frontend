import { t } from '@lingui/macro'
import { formatNoRound } from '@olufy-frontend/shared/utils'

export const showRangeAndTotalPagination = (total: number, range: [number, number]) => {
  return t`แสดง ${formatNoRound(range[0])} ถึง ${formatNoRound(range[1])} จาก ${formatNoRound(total)} รายการ`
}
