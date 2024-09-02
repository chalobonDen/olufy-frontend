import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

import type { TemplateType } from '@/enums/template'

export interface ITemplate {
  id?: number
  name: string
  vmid: string
  type: string
}

export interface ITemplates {
  templates: ITemplate[]
}

export interface ISimpleTemplate extends Pick<ITemplate, 'id' | 'name' | 'vmid' | 'type'> {}

export interface ITemplateQueryParams extends IPaginationQuery<ISimpleTemplate> {
  search?: string
}

export interface ITemplatePaginationResponse extends IPaginatedResponse<ITemplate> {}
