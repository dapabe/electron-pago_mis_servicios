import semver from 'semver'
import type { z } from 'zod'
import type { ZodSemverUnbranded } from 'zod-semver'

export type IValidVersions<V> = Extract<keyof V, `${number}.${number}.${number}`>

export interface SchemaUtilities {
  getLastSchema(): z.ZodType
}

export class ZodSchemaManager<Instance, LastVersion extends string> {
  private versions = new Map<string, z.ZodType>()
  private lastVersion: LastVersion

  constructor(instance: Instance, lastVersion: LastVersion) {
    this.lastVersion = lastVersion
    this.populateManager(instance)
  }

  private populateManager(instance: Instance) {
    for (const [key, value] of Object.entries(instance!)) {
      if (semver.valid(key)) this.addVersion(key, value as any)
      else {
        console.log(`${this.constructor.name}: ${key} is invalid Semver.`)
      }
    }
  }

  private addVersion(version: ZodSemverUnbranded, schema: z.ZodType) {
    this.versions.set(version, schema)
  }

  public getLastVersion(): LastVersion {
    return this.lastVersion
  }

  migrate<T>(
    data: T,
    from: IValidVersions<Instance>,
    to: IValidVersions<Instance>
  ): z.SafeParseReturnType<T, T> {
    let currentData: z.SafeParseReturnType<T, T> = { success: true, data }
    let currentVersion = from

    const sortedVers = [...this.versions].map((x) => x[0]).sort(semver.compare)

    //  Forward migration
    if (semver.gt(to, from)) {
      for (const version of sortedVers) {
        if (semver.gt(version, currentVersion) && semver.lte(version, to)) {
          const schVersion = this.versions.get(version)
          if (schVersion) {
            console.log('Se ha detectado una versión antigua, actualizado..')
            currentData = schVersion.safeParse(data)
            currentVersion = version as any
          }
        }
      }
    }

    //  Backward migration
    if (semver.lt(to, from)) {
      for (const version of sortedVers.toReversed()) {
        if (semver.lt(version, currentVersion) && semver.gte(version, to)) {
          const schVersion = this.versions.get(version)
          if (schVersion) {
            console.log('La versión de tus datos está mas actualizada a la aceptada, actualizado..')
            currentData = schVersion.safeParse(data)
            currentVersion = version as any
          }
        }
      }
    }
    return currentData
  }
}
