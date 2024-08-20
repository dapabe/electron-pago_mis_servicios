type INavigationConfig = {
  loginURL: string
  dashboardURL: string
}

/**
 *  I feel like using this name, naming = hard
 *
 *
 */
export class ServiceNavigation {
  constructor(public config: INavigationConfig) {}
}
