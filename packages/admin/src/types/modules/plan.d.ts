export interface IPlan {
  id?: number
  name: string
}

export interface IPlanAll extends Pick<IPlan, 'id', 'name'> {
  plans: IPlan[]
}
