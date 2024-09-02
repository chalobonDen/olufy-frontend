import type { AxiosRequestConfig } from 'axios'

import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type { ITemplate, ITemplatePaginationResponse, ITemplateQueryParams } from '@/types/modules/template'

export default class TemplateService extends BaseService {
  /**
   *  Get template list
   */
  static async list(params: ITemplateQueryParams, config?: AxiosRequestConfig): Promise<ITemplatePaginationResponse> {
    return this._get(`/admin/templates`, {
      params,
      ...config,
    })
  }

  /**
   * Create template
   */
  static async create(payload: ITemplate): Promise<{ id: number }> {
    return this._post('/admin/templates', payload)
  }

  /**
   * Get template by id
   */
  static async byId(id: string): Promise<ITemplate> {
    return this._get('/admin/templates', { params: { id } })
  }

  /**
   * [SSR] Get template by id
   */
  static async byIdSsr(pageContext: PageContext, id: string): Promise<ITemplate> {
    return this._getSSR(pageContext, `/admin/templates/${id}`)
  }

  /**
   * Update template
   */
  static async update(id: number | string, payload: ITemplate): Promise<ITemplate> {
    return this._patch(`/admin/templates/${id}`, payload)
  }

  /**
   * Delete template by id
   */
  static async delete(id: string | number): Promise<void> {
    return this._delete(`/admin/templates/${id}`)
  }
}
