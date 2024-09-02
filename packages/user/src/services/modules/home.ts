import type { PageContext } from '@/renderer/types'

import BaseService from './base'

export default class HomeService extends BaseService {
  /**
   * Get homepage data
   */
  static async homepageSsr(pageContext: PageContext): Promise<any> {
    return this._getSSR(pageContext, '/homepage')
  }
}
