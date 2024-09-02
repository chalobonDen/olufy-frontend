import BaseService from './base'

import type { IProductsList } from '@/types/modules/product'

export default class ProductService extends BaseService {
  /**
   *  Get product all
   */
  static async all(): Promise<IProductsList> {
    return this._get(`/admin/products/all`)
  }
}
