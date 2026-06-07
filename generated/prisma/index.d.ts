
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model Alumni
 * 
 */
export type Alumni = $Result.DefaultSelection<Prisma.$AlumniPayload>
/**
 * Model Employer
 * 
 */
export type Employer = $Result.DefaultSelection<Prisma.$EmployerPayload>
/**
 * Model CareerRecord
 * 
 */
export type CareerRecord = $Result.DefaultSelection<Prisma.$CareerRecordPayload>
/**
 * Model JobPosting
 * 
 */
export type JobPosting = $Result.DefaultSelection<Prisma.$JobPostingPayload>
/**
 * Model JobApplication
 * 
 */
export type JobApplication = $Result.DefaultSelection<Prisma.$JobApplicationPayload>
/**
 * Model Announcement
 * 
 */
export type Announcement = $Result.DefaultSelection<Prisma.$AnnouncementPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Profiles
 * const profiles = await prisma.profile.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Profiles
   * const profiles = await prisma.profile.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.alumni`: Exposes CRUD operations for the **Alumni** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alumni
    * const alumni = await prisma.alumni.findMany()
    * ```
    */
  get alumni(): Prisma.AlumniDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employer`: Exposes CRUD operations for the **Employer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employers
    * const employers = await prisma.employer.findMany()
    * ```
    */
  get employer(): Prisma.EmployerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.careerRecord`: Exposes CRUD operations for the **CareerRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CareerRecords
    * const careerRecords = await prisma.careerRecord.findMany()
    * ```
    */
  get careerRecord(): Prisma.CareerRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jobPosting`: Exposes CRUD operations for the **JobPosting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobPostings
    * const jobPostings = await prisma.jobPosting.findMany()
    * ```
    */
  get jobPosting(): Prisma.JobPostingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jobApplication`: Exposes CRUD operations for the **JobApplication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobApplications
    * const jobApplications = await prisma.jobApplication.findMany()
    * ```
    */
  get jobApplication(): Prisma.JobApplicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.announcement`: Exposes CRUD operations for the **Announcement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Announcements
    * const announcements = await prisma.announcement.findMany()
    * ```
    */
  get announcement(): Prisma.AnnouncementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Profile: 'Profile',
    Alumni: 'Alumni',
    Employer: 'Employer',
    CareerRecord: 'CareerRecord',
    JobPosting: 'JobPosting',
    JobApplication: 'JobApplication',
    Announcement: 'Announcement',
    AuditLog: 'AuditLog',
    Notification: 'Notification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "profile" | "alumni" | "employer" | "careerRecord" | "jobPosting" | "jobApplication" | "announcement" | "auditLog" | "notification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      Alumni: {
        payload: Prisma.$AlumniPayload<ExtArgs>
        fields: Prisma.AlumniFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlumniFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlumniFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload>
          }
          findFirst: {
            args: Prisma.AlumniFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlumniFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload>
          }
          findMany: {
            args: Prisma.AlumniFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload>[]
          }
          create: {
            args: Prisma.AlumniCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload>
          }
          createMany: {
            args: Prisma.AlumniCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlumniCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload>[]
          }
          delete: {
            args: Prisma.AlumniDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload>
          }
          update: {
            args: Prisma.AlumniUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload>
          }
          deleteMany: {
            args: Prisma.AlumniDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlumniUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AlumniUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload>[]
          }
          upsert: {
            args: Prisma.AlumniUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload>
          }
          aggregate: {
            args: Prisma.AlumniAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlumni>
          }
          groupBy: {
            args: Prisma.AlumniGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlumniGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlumniCountArgs<ExtArgs>
            result: $Utils.Optional<AlumniCountAggregateOutputType> | number
          }
        }
      }
      Employer: {
        payload: Prisma.$EmployerPayload<ExtArgs>
        fields: Prisma.EmployerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>
          }
          findFirst: {
            args: Prisma.EmployerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>
          }
          findMany: {
            args: Prisma.EmployerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>[]
          }
          create: {
            args: Prisma.EmployerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>
          }
          createMany: {
            args: Prisma.EmployerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>[]
          }
          delete: {
            args: Prisma.EmployerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>
          }
          update: {
            args: Prisma.EmployerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>
          }
          deleteMany: {
            args: Prisma.EmployerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>[]
          }
          upsert: {
            args: Prisma.EmployerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>
          }
          aggregate: {
            args: Prisma.EmployerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployer>
          }
          groupBy: {
            args: Prisma.EmployerGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployerGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployerCountArgs<ExtArgs>
            result: $Utils.Optional<EmployerCountAggregateOutputType> | number
          }
        }
      }
      CareerRecord: {
        payload: Prisma.$CareerRecordPayload<ExtArgs>
        fields: Prisma.CareerRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CareerRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CareerRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRecordPayload>
          }
          findFirst: {
            args: Prisma.CareerRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CareerRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRecordPayload>
          }
          findMany: {
            args: Prisma.CareerRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRecordPayload>[]
          }
          create: {
            args: Prisma.CareerRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRecordPayload>
          }
          createMany: {
            args: Prisma.CareerRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CareerRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRecordPayload>[]
          }
          delete: {
            args: Prisma.CareerRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRecordPayload>
          }
          update: {
            args: Prisma.CareerRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRecordPayload>
          }
          deleteMany: {
            args: Prisma.CareerRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CareerRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CareerRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRecordPayload>[]
          }
          upsert: {
            args: Prisma.CareerRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRecordPayload>
          }
          aggregate: {
            args: Prisma.CareerRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCareerRecord>
          }
          groupBy: {
            args: Prisma.CareerRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<CareerRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.CareerRecordCountArgs<ExtArgs>
            result: $Utils.Optional<CareerRecordCountAggregateOutputType> | number
          }
        }
      }
      JobPosting: {
        payload: Prisma.$JobPostingPayload<ExtArgs>
        fields: Prisma.JobPostingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobPostingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobPostingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          findFirst: {
            args: Prisma.JobPostingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobPostingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          findMany: {
            args: Prisma.JobPostingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>[]
          }
          create: {
            args: Prisma.JobPostingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          createMany: {
            args: Prisma.JobPostingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobPostingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>[]
          }
          delete: {
            args: Prisma.JobPostingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          update: {
            args: Prisma.JobPostingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          deleteMany: {
            args: Prisma.JobPostingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobPostingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobPostingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>[]
          }
          upsert: {
            args: Prisma.JobPostingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          aggregate: {
            args: Prisma.JobPostingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobPosting>
          }
          groupBy: {
            args: Prisma.JobPostingGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobPostingGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobPostingCountArgs<ExtArgs>
            result: $Utils.Optional<JobPostingCountAggregateOutputType> | number
          }
        }
      }
      JobApplication: {
        payload: Prisma.$JobApplicationPayload<ExtArgs>
        fields: Prisma.JobApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>
          }
          findFirst: {
            args: Prisma.JobApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>
          }
          findMany: {
            args: Prisma.JobApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>[]
          }
          create: {
            args: Prisma.JobApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>
          }
          createMany: {
            args: Prisma.JobApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobApplicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>[]
          }
          delete: {
            args: Prisma.JobApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>
          }
          update: {
            args: Prisma.JobApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>
          }
          deleteMany: {
            args: Prisma.JobApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobApplicationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>[]
          }
          upsert: {
            args: Prisma.JobApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>
          }
          aggregate: {
            args: Prisma.JobApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobApplication>
          }
          groupBy: {
            args: Prisma.JobApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<JobApplicationCountAggregateOutputType> | number
          }
        }
      }
      Announcement: {
        payload: Prisma.$AnnouncementPayload<ExtArgs>
        fields: Prisma.AnnouncementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnnouncementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnnouncementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          findFirst: {
            args: Prisma.AnnouncementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnnouncementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          findMany: {
            args: Prisma.AnnouncementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>[]
          }
          create: {
            args: Prisma.AnnouncementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          createMany: {
            args: Prisma.AnnouncementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnnouncementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>[]
          }
          delete: {
            args: Prisma.AnnouncementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          update: {
            args: Prisma.AnnouncementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          deleteMany: {
            args: Prisma.AnnouncementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnnouncementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnnouncementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>[]
          }
          upsert: {
            args: Prisma.AnnouncementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          aggregate: {
            args: Prisma.AnnouncementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnnouncement>
          }
          groupBy: {
            args: Prisma.AnnouncementGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnnouncementGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnnouncementCountArgs<ExtArgs>
            result: $Utils.Optional<AnnouncementCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    profile?: ProfileOmit
    alumni?: AlumniOmit
    employer?: EmployerOmit
    careerRecord?: CareerRecordOmit
    jobPosting?: JobPostingOmit
    jobApplication?: JobApplicationOmit
    announcement?: AnnouncementOmit
    auditLog?: AuditLogOmit
    notification?: NotificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProfileCountOutputType
   */

  export type ProfileCountOutputType = {
    notifications: number
    audit_logs: number
    announcements: number
    approved_employers: number
  }

  export type ProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notifications?: boolean | ProfileCountOutputTypeCountNotificationsArgs
    audit_logs?: boolean | ProfileCountOutputTypeCountAudit_logsArgs
    announcements?: boolean | ProfileCountOutputTypeCountAnnouncementsArgs
    approved_employers?: boolean | ProfileCountOutputTypeCountApproved_employersArgs
  }

  // Custom InputTypes
  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCountOutputType
     */
    select?: ProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountAudit_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountAnnouncementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountApproved_employersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployerWhereInput
  }


  /**
   * Count Type AlumniCountOutputType
   */

  export type AlumniCountOutputType = {
    career_records: number
    job_applications: number
  }

  export type AlumniCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    career_records?: boolean | AlumniCountOutputTypeCountCareer_recordsArgs
    job_applications?: boolean | AlumniCountOutputTypeCountJob_applicationsArgs
  }

  // Custom InputTypes
  /**
   * AlumniCountOutputType without action
   */
  export type AlumniCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlumniCountOutputType
     */
    select?: AlumniCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AlumniCountOutputType without action
   */
  export type AlumniCountOutputTypeCountCareer_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareerRecordWhereInput
  }

  /**
   * AlumniCountOutputType without action
   */
  export type AlumniCountOutputTypeCountJob_applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobApplicationWhereInput
  }


  /**
   * Count Type EmployerCountOutputType
   */

  export type EmployerCountOutputType = {
    job_postings: number
  }

  export type EmployerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job_postings?: boolean | EmployerCountOutputTypeCountJob_postingsArgs
  }

  // Custom InputTypes
  /**
   * EmployerCountOutputType without action
   */
  export type EmployerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployerCountOutputType
     */
    select?: EmployerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployerCountOutputType without action
   */
  export type EmployerCountOutputTypeCountJob_postingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobPostingWhereInput
  }


  /**
   * Count Type JobPostingCountOutputType
   */

  export type JobPostingCountOutputType = {
    applications: number
  }

  export type JobPostingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | JobPostingCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * JobPostingCountOutputType without action
   */
  export type JobPostingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPostingCountOutputType
     */
    select?: JobPostingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobPostingCountOutputType without action
   */
  export type JobPostingCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobApplicationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    role: string | null
    full_name: string | null
    email: string | null
    phone: string | null
    profile_photo_url: string | null
    is_verified: boolean | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    role: string | null
    full_name: string | null
    email: string | null
    phone: string | null
    profile_photo_url: string | null
    is_verified: boolean | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    role: number
    full_name: number
    email: number
    phone: number
    profile_photo_url: number
    is_verified: number
    is_active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ProfileMinAggregateInputType = {
    id?: true
    role?: true
    full_name?: true
    email?: true
    phone?: true
    profile_photo_url?: true
    is_verified?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    role?: true
    full_name?: true
    email?: true
    phone?: true
    profile_photo_url?: true
    is_verified?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    role?: true
    full_name?: true
    email?: true
    phone?: true
    profile_photo_url?: true
    is_verified?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    role: string
    full_name: string
    email: string
    phone: string | null
    profile_photo_url: string | null
    is_verified: boolean
    is_active: boolean
    created_at: Date
    updated_at: Date
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    full_name?: boolean
    email?: boolean
    phone?: boolean
    profile_photo_url?: boolean
    is_verified?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    alumni?: boolean | Profile$alumniArgs<ExtArgs>
    employer?: boolean | Profile$employerArgs<ExtArgs>
    notifications?: boolean | Profile$notificationsArgs<ExtArgs>
    audit_logs?: boolean | Profile$audit_logsArgs<ExtArgs>
    announcements?: boolean | Profile$announcementsArgs<ExtArgs>
    approved_employers?: boolean | Profile$approved_employersArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    full_name?: boolean
    email?: boolean
    phone?: boolean
    profile_photo_url?: boolean
    is_verified?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    full_name?: boolean
    email?: boolean
    phone?: boolean
    profile_photo_url?: boolean
    is_verified?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    role?: boolean
    full_name?: boolean
    email?: boolean
    phone?: boolean
    profile_photo_url?: boolean
    is_verified?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "role" | "full_name" | "email" | "phone" | "profile_photo_url" | "is_verified" | "is_active" | "created_at" | "updated_at", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alumni?: boolean | Profile$alumniArgs<ExtArgs>
    employer?: boolean | Profile$employerArgs<ExtArgs>
    notifications?: boolean | Profile$notificationsArgs<ExtArgs>
    audit_logs?: boolean | Profile$audit_logsArgs<ExtArgs>
    announcements?: boolean | Profile$announcementsArgs<ExtArgs>
    approved_employers?: boolean | Profile$approved_employersArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      alumni: Prisma.$AlumniPayload<ExtArgs> | null
      employer: Prisma.$EmployerPayload<ExtArgs> | null
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      audit_logs: Prisma.$AuditLogPayload<ExtArgs>[]
      announcements: Prisma.$AnnouncementPayload<ExtArgs>[]
      approved_employers: Prisma.$EmployerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role: string
      full_name: string
      email: string
      phone: string | null
      profile_photo_url: string | null
      is_verified: boolean
      is_active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {ProfileUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alumni<T extends Profile$alumniArgs<ExtArgs> = {}>(args?: Subset<T, Profile$alumniArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    employer<T extends Profile$employerArgs<ExtArgs> = {}>(args?: Subset<T, Profile$employerArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    notifications<T extends Profile$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    audit_logs<T extends Profile$audit_logsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$audit_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    announcements<T extends Profile$announcementsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$announcementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    approved_employers<T extends Profile$approved_employersArgs<ExtArgs> = {}>(args?: Subset<T, Profile$approved_employersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly role: FieldRef<"Profile", 'String'>
    readonly full_name: FieldRef<"Profile", 'String'>
    readonly email: FieldRef<"Profile", 'String'>
    readonly phone: FieldRef<"Profile", 'String'>
    readonly profile_photo_url: FieldRef<"Profile", 'String'>
    readonly is_verified: FieldRef<"Profile", 'Boolean'>
    readonly is_active: FieldRef<"Profile", 'Boolean'>
    readonly created_at: FieldRef<"Profile", 'DateTime'>
    readonly updated_at: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile updateManyAndReturn
   */
  export type ProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile.alumni
   */
  export type Profile$alumniArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    where?: AlumniWhereInput
  }

  /**
   * Profile.employer
   */
  export type Profile$employerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    where?: EmployerWhereInput
  }

  /**
   * Profile.notifications
   */
  export type Profile$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Profile.audit_logs
   */
  export type Profile$audit_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * Profile.announcements
   */
  export type Profile$announcementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    where?: AnnouncementWhereInput
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    cursor?: AnnouncementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Profile.approved_employers
   */
  export type Profile$approved_employersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    where?: EmployerWhereInput
    orderBy?: EmployerOrderByWithRelationInput | EmployerOrderByWithRelationInput[]
    cursor?: EmployerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployerScalarFieldEnum | EmployerScalarFieldEnum[]
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model Alumni
   */

  export type AggregateAlumni = {
    _count: AlumniCountAggregateOutputType | null
    _avg: AlumniAvgAggregateOutputType | null
    _sum: AlumniSumAggregateOutputType | null
    _min: AlumniMinAggregateOutputType | null
    _max: AlumniMaxAggregateOutputType | null
  }

  export type AlumniAvgAggregateOutputType = {
    batch_year: number | null
    graduation_year: number | null
  }

  export type AlumniSumAggregateOutputType = {
    batch_year: number | null
    graduation_year: number | null
  }

  export type AlumniMinAggregateOutputType = {
    id: string | null
    student_id: string | null
    course: string | null
    major: string | null
    batch_year: number | null
    graduation_year: number | null
    address: string | null
    city: string | null
    province: string | null
    linkedin_url: string | null
    resume_url: string | null
    is_profile_public: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AlumniMaxAggregateOutputType = {
    id: string | null
    student_id: string | null
    course: string | null
    major: string | null
    batch_year: number | null
    graduation_year: number | null
    address: string | null
    city: string | null
    province: string | null
    linkedin_url: string | null
    resume_url: string | null
    is_profile_public: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AlumniCountAggregateOutputType = {
    id: number
    student_id: number
    course: number
    major: number
    batch_year: number
    graduation_year: number
    address: number
    city: number
    province: number
    linkedin_url: number
    resume_url: number
    is_profile_public: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AlumniAvgAggregateInputType = {
    batch_year?: true
    graduation_year?: true
  }

  export type AlumniSumAggregateInputType = {
    batch_year?: true
    graduation_year?: true
  }

  export type AlumniMinAggregateInputType = {
    id?: true
    student_id?: true
    course?: true
    major?: true
    batch_year?: true
    graduation_year?: true
    address?: true
    city?: true
    province?: true
    linkedin_url?: true
    resume_url?: true
    is_profile_public?: true
    created_at?: true
    updated_at?: true
  }

  export type AlumniMaxAggregateInputType = {
    id?: true
    student_id?: true
    course?: true
    major?: true
    batch_year?: true
    graduation_year?: true
    address?: true
    city?: true
    province?: true
    linkedin_url?: true
    resume_url?: true
    is_profile_public?: true
    created_at?: true
    updated_at?: true
  }

  export type AlumniCountAggregateInputType = {
    id?: true
    student_id?: true
    course?: true
    major?: true
    batch_year?: true
    graduation_year?: true
    address?: true
    city?: true
    province?: true
    linkedin_url?: true
    resume_url?: true
    is_profile_public?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AlumniAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alumni to aggregate.
     */
    where?: AlumniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alumni to fetch.
     */
    orderBy?: AlumniOrderByWithRelationInput | AlumniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlumniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alumni from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alumni.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Alumni
    **/
    _count?: true | AlumniCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AlumniAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AlumniSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlumniMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlumniMaxAggregateInputType
  }

  export type GetAlumniAggregateType<T extends AlumniAggregateArgs> = {
        [P in keyof T & keyof AggregateAlumni]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlumni[P]>
      : GetScalarType<T[P], AggregateAlumni[P]>
  }




  export type AlumniGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlumniWhereInput
    orderBy?: AlumniOrderByWithAggregationInput | AlumniOrderByWithAggregationInput[]
    by: AlumniScalarFieldEnum[] | AlumniScalarFieldEnum
    having?: AlumniScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlumniCountAggregateInputType | true
    _avg?: AlumniAvgAggregateInputType
    _sum?: AlumniSumAggregateInputType
    _min?: AlumniMinAggregateInputType
    _max?: AlumniMaxAggregateInputType
  }

  export type AlumniGroupByOutputType = {
    id: string
    student_id: string | null
    course: string
    major: string | null
    batch_year: number
    graduation_year: number
    address: string | null
    city: string | null
    province: string | null
    linkedin_url: string | null
    resume_url: string | null
    is_profile_public: boolean
    created_at: Date
    updated_at: Date
    _count: AlumniCountAggregateOutputType | null
    _avg: AlumniAvgAggregateOutputType | null
    _sum: AlumniSumAggregateOutputType | null
    _min: AlumniMinAggregateOutputType | null
    _max: AlumniMaxAggregateOutputType | null
  }

  type GetAlumniGroupByPayload<T extends AlumniGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlumniGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlumniGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlumniGroupByOutputType[P]>
            : GetScalarType<T[P], AlumniGroupByOutputType[P]>
        }
      >
    >


  export type AlumniSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    course?: boolean
    major?: boolean
    batch_year?: boolean
    graduation_year?: boolean
    address?: boolean
    city?: boolean
    province?: boolean
    linkedin_url?: boolean
    resume_url?: boolean
    is_profile_public?: boolean
    created_at?: boolean
    updated_at?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    career_records?: boolean | Alumni$career_recordsArgs<ExtArgs>
    job_applications?: boolean | Alumni$job_applicationsArgs<ExtArgs>
    _count?: boolean | AlumniCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alumni"]>

  export type AlumniSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    course?: boolean
    major?: boolean
    batch_year?: boolean
    graduation_year?: boolean
    address?: boolean
    city?: boolean
    province?: boolean
    linkedin_url?: boolean
    resume_url?: boolean
    is_profile_public?: boolean
    created_at?: boolean
    updated_at?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alumni"]>

  export type AlumniSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    course?: boolean
    major?: boolean
    batch_year?: boolean
    graduation_year?: boolean
    address?: boolean
    city?: boolean
    province?: boolean
    linkedin_url?: boolean
    resume_url?: boolean
    is_profile_public?: boolean
    created_at?: boolean
    updated_at?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alumni"]>

  export type AlumniSelectScalar = {
    id?: boolean
    student_id?: boolean
    course?: boolean
    major?: boolean
    batch_year?: boolean
    graduation_year?: boolean
    address?: boolean
    city?: boolean
    province?: boolean
    linkedin_url?: boolean
    resume_url?: boolean
    is_profile_public?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AlumniOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "student_id" | "course" | "major" | "batch_year" | "graduation_year" | "address" | "city" | "province" | "linkedin_url" | "resume_url" | "is_profile_public" | "created_at" | "updated_at", ExtArgs["result"]["alumni"]>
  export type AlumniInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    career_records?: boolean | Alumni$career_recordsArgs<ExtArgs>
    job_applications?: boolean | Alumni$job_applicationsArgs<ExtArgs>
    _count?: boolean | AlumniCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AlumniIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type AlumniIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $AlumniPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Alumni"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
      career_records: Prisma.$CareerRecordPayload<ExtArgs>[]
      job_applications: Prisma.$JobApplicationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      student_id: string | null
      course: string
      major: string | null
      batch_year: number
      graduation_year: number
      address: string | null
      city: string | null
      province: string | null
      linkedin_url: string | null
      resume_url: string | null
      is_profile_public: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["alumni"]>
    composites: {}
  }

  type AlumniGetPayload<S extends boolean | null | undefined | AlumniDefaultArgs> = $Result.GetResult<Prisma.$AlumniPayload, S>

  type AlumniCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AlumniFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AlumniCountAggregateInputType | true
    }

  export interface AlumniDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Alumni'], meta: { name: 'Alumni' } }
    /**
     * Find zero or one Alumni that matches the filter.
     * @param {AlumniFindUniqueArgs} args - Arguments to find a Alumni
     * @example
     * // Get one Alumni
     * const alumni = await prisma.alumni.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlumniFindUniqueArgs>(args: SelectSubset<T, AlumniFindUniqueArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Alumni that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AlumniFindUniqueOrThrowArgs} args - Arguments to find a Alumni
     * @example
     * // Get one Alumni
     * const alumni = await prisma.alumni.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlumniFindUniqueOrThrowArgs>(args: SelectSubset<T, AlumniFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alumni that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlumniFindFirstArgs} args - Arguments to find a Alumni
     * @example
     * // Get one Alumni
     * const alumni = await prisma.alumni.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlumniFindFirstArgs>(args?: SelectSubset<T, AlumniFindFirstArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alumni that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlumniFindFirstOrThrowArgs} args - Arguments to find a Alumni
     * @example
     * // Get one Alumni
     * const alumni = await prisma.alumni.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlumniFindFirstOrThrowArgs>(args?: SelectSubset<T, AlumniFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Alumni that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlumniFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alumni
     * const alumni = await prisma.alumni.findMany()
     * 
     * // Get first 10 Alumni
     * const alumni = await prisma.alumni.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alumniWithIdOnly = await prisma.alumni.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlumniFindManyArgs>(args?: SelectSubset<T, AlumniFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Alumni.
     * @param {AlumniCreateArgs} args - Arguments to create a Alumni.
     * @example
     * // Create one Alumni
     * const Alumni = await prisma.alumni.create({
     *   data: {
     *     // ... data to create a Alumni
     *   }
     * })
     * 
     */
    create<T extends AlumniCreateArgs>(args: SelectSubset<T, AlumniCreateArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Alumni.
     * @param {AlumniCreateManyArgs} args - Arguments to create many Alumni.
     * @example
     * // Create many Alumni
     * const alumni = await prisma.alumni.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlumniCreateManyArgs>(args?: SelectSubset<T, AlumniCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Alumni and returns the data saved in the database.
     * @param {AlumniCreateManyAndReturnArgs} args - Arguments to create many Alumni.
     * @example
     * // Create many Alumni
     * const alumni = await prisma.alumni.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Alumni and only return the `id`
     * const alumniWithIdOnly = await prisma.alumni.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlumniCreateManyAndReturnArgs>(args?: SelectSubset<T, AlumniCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Alumni.
     * @param {AlumniDeleteArgs} args - Arguments to delete one Alumni.
     * @example
     * // Delete one Alumni
     * const Alumni = await prisma.alumni.delete({
     *   where: {
     *     // ... filter to delete one Alumni
     *   }
     * })
     * 
     */
    delete<T extends AlumniDeleteArgs>(args: SelectSubset<T, AlumniDeleteArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Alumni.
     * @param {AlumniUpdateArgs} args - Arguments to update one Alumni.
     * @example
     * // Update one Alumni
     * const alumni = await prisma.alumni.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlumniUpdateArgs>(args: SelectSubset<T, AlumniUpdateArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Alumni.
     * @param {AlumniDeleteManyArgs} args - Arguments to filter Alumni to delete.
     * @example
     * // Delete a few Alumni
     * const { count } = await prisma.alumni.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlumniDeleteManyArgs>(args?: SelectSubset<T, AlumniDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alumni.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlumniUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alumni
     * const alumni = await prisma.alumni.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlumniUpdateManyArgs>(args: SelectSubset<T, AlumniUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alumni and returns the data updated in the database.
     * @param {AlumniUpdateManyAndReturnArgs} args - Arguments to update many Alumni.
     * @example
     * // Update many Alumni
     * const alumni = await prisma.alumni.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Alumni and only return the `id`
     * const alumniWithIdOnly = await prisma.alumni.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AlumniUpdateManyAndReturnArgs>(args: SelectSubset<T, AlumniUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Alumni.
     * @param {AlumniUpsertArgs} args - Arguments to update or create a Alumni.
     * @example
     * // Update or create a Alumni
     * const alumni = await prisma.alumni.upsert({
     *   create: {
     *     // ... data to create a Alumni
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Alumni we want to update
     *   }
     * })
     */
    upsert<T extends AlumniUpsertArgs>(args: SelectSubset<T, AlumniUpsertArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Alumni.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlumniCountArgs} args - Arguments to filter Alumni to count.
     * @example
     * // Count the number of Alumni
     * const count = await prisma.alumni.count({
     *   where: {
     *     // ... the filter for the Alumni we want to count
     *   }
     * })
    **/
    count<T extends AlumniCountArgs>(
      args?: Subset<T, AlumniCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlumniCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Alumni.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlumniAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlumniAggregateArgs>(args: Subset<T, AlumniAggregateArgs>): Prisma.PrismaPromise<GetAlumniAggregateType<T>>

    /**
     * Group by Alumni.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlumniGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlumniGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlumniGroupByArgs['orderBy'] }
        : { orderBy?: AlumniGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlumniGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlumniGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Alumni model
   */
  readonly fields: AlumniFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Alumni.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlumniClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    career_records<T extends Alumni$career_recordsArgs<ExtArgs> = {}>(args?: Subset<T, Alumni$career_recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    job_applications<T extends Alumni$job_applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Alumni$job_applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Alumni model
   */
  interface AlumniFieldRefs {
    readonly id: FieldRef<"Alumni", 'String'>
    readonly student_id: FieldRef<"Alumni", 'String'>
    readonly course: FieldRef<"Alumni", 'String'>
    readonly major: FieldRef<"Alumni", 'String'>
    readonly batch_year: FieldRef<"Alumni", 'Int'>
    readonly graduation_year: FieldRef<"Alumni", 'Int'>
    readonly address: FieldRef<"Alumni", 'String'>
    readonly city: FieldRef<"Alumni", 'String'>
    readonly province: FieldRef<"Alumni", 'String'>
    readonly linkedin_url: FieldRef<"Alumni", 'String'>
    readonly resume_url: FieldRef<"Alumni", 'String'>
    readonly is_profile_public: FieldRef<"Alumni", 'Boolean'>
    readonly created_at: FieldRef<"Alumni", 'DateTime'>
    readonly updated_at: FieldRef<"Alumni", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Alumni findUnique
   */
  export type AlumniFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    /**
     * Filter, which Alumni to fetch.
     */
    where: AlumniWhereUniqueInput
  }

  /**
   * Alumni findUniqueOrThrow
   */
  export type AlumniFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    /**
     * Filter, which Alumni to fetch.
     */
    where: AlumniWhereUniqueInput
  }

  /**
   * Alumni findFirst
   */
  export type AlumniFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    /**
     * Filter, which Alumni to fetch.
     */
    where?: AlumniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alumni to fetch.
     */
    orderBy?: AlumniOrderByWithRelationInput | AlumniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alumni.
     */
    cursor?: AlumniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alumni from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alumni.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alumni.
     */
    distinct?: AlumniScalarFieldEnum | AlumniScalarFieldEnum[]
  }

  /**
   * Alumni findFirstOrThrow
   */
  export type AlumniFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    /**
     * Filter, which Alumni to fetch.
     */
    where?: AlumniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alumni to fetch.
     */
    orderBy?: AlumniOrderByWithRelationInput | AlumniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alumni.
     */
    cursor?: AlumniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alumni from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alumni.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alumni.
     */
    distinct?: AlumniScalarFieldEnum | AlumniScalarFieldEnum[]
  }

  /**
   * Alumni findMany
   */
  export type AlumniFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    /**
     * Filter, which Alumni to fetch.
     */
    where?: AlumniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alumni to fetch.
     */
    orderBy?: AlumniOrderByWithRelationInput | AlumniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Alumni.
     */
    cursor?: AlumniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alumni from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alumni.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alumni.
     */
    distinct?: AlumniScalarFieldEnum | AlumniScalarFieldEnum[]
  }

  /**
   * Alumni create
   */
  export type AlumniCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    /**
     * The data needed to create a Alumni.
     */
    data: XOR<AlumniCreateInput, AlumniUncheckedCreateInput>
  }

  /**
   * Alumni createMany
   */
  export type AlumniCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Alumni.
     */
    data: AlumniCreateManyInput | AlumniCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Alumni createManyAndReturn
   */
  export type AlumniCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * The data used to create many Alumni.
     */
    data: AlumniCreateManyInput | AlumniCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Alumni update
   */
  export type AlumniUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    /**
     * The data needed to update a Alumni.
     */
    data: XOR<AlumniUpdateInput, AlumniUncheckedUpdateInput>
    /**
     * Choose, which Alumni to update.
     */
    where: AlumniWhereUniqueInput
  }

  /**
   * Alumni updateMany
   */
  export type AlumniUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Alumni.
     */
    data: XOR<AlumniUpdateManyMutationInput, AlumniUncheckedUpdateManyInput>
    /**
     * Filter which Alumni to update
     */
    where?: AlumniWhereInput
    /**
     * Limit how many Alumni to update.
     */
    limit?: number
  }

  /**
   * Alumni updateManyAndReturn
   */
  export type AlumniUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * The data used to update Alumni.
     */
    data: XOR<AlumniUpdateManyMutationInput, AlumniUncheckedUpdateManyInput>
    /**
     * Filter which Alumni to update
     */
    where?: AlumniWhereInput
    /**
     * Limit how many Alumni to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Alumni upsert
   */
  export type AlumniUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    /**
     * The filter to search for the Alumni to update in case it exists.
     */
    where: AlumniWhereUniqueInput
    /**
     * In case the Alumni found by the `where` argument doesn't exist, create a new Alumni with this data.
     */
    create: XOR<AlumniCreateInput, AlumniUncheckedCreateInput>
    /**
     * In case the Alumni was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlumniUpdateInput, AlumniUncheckedUpdateInput>
  }

  /**
   * Alumni delete
   */
  export type AlumniDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    /**
     * Filter which Alumni to delete.
     */
    where: AlumniWhereUniqueInput
  }

  /**
   * Alumni deleteMany
   */
  export type AlumniDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alumni to delete
     */
    where?: AlumniWhereInput
    /**
     * Limit how many Alumni to delete.
     */
    limit?: number
  }

  /**
   * Alumni.career_records
   */
  export type Alumni$career_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRecord
     */
    select?: CareerRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRecord
     */
    omit?: CareerRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRecordInclude<ExtArgs> | null
    where?: CareerRecordWhereInput
    orderBy?: CareerRecordOrderByWithRelationInput | CareerRecordOrderByWithRelationInput[]
    cursor?: CareerRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CareerRecordScalarFieldEnum | CareerRecordScalarFieldEnum[]
  }

  /**
   * Alumni.job_applications
   */
  export type Alumni$job_applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    where?: JobApplicationWhereInput
    orderBy?: JobApplicationOrderByWithRelationInput | JobApplicationOrderByWithRelationInput[]
    cursor?: JobApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobApplicationScalarFieldEnum | JobApplicationScalarFieldEnum[]
  }

  /**
   * Alumni without action
   */
  export type AlumniDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
  }


  /**
   * Model Employer
   */

  export type AggregateEmployer = {
    _count: EmployerCountAggregateOutputType | null
    _min: EmployerMinAggregateOutputType | null
    _max: EmployerMaxAggregateOutputType | null
  }

  export type EmployerMinAggregateOutputType = {
    id: string | null
    company_name: string | null
    industry: string | null
    company_size: string | null
    business_permit_number: string | null
    company_address: string | null
    company_website: string | null
    company_logo_url: string | null
    company_description: string | null
    approval_status: string | null
    rejection_reason: string | null
    approved_at: Date | null
    approved_by: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EmployerMaxAggregateOutputType = {
    id: string | null
    company_name: string | null
    industry: string | null
    company_size: string | null
    business_permit_number: string | null
    company_address: string | null
    company_website: string | null
    company_logo_url: string | null
    company_description: string | null
    approval_status: string | null
    rejection_reason: string | null
    approved_at: Date | null
    approved_by: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EmployerCountAggregateOutputType = {
    id: number
    company_name: number
    industry: number
    company_size: number
    business_permit_number: number
    company_address: number
    company_website: number
    company_logo_url: number
    company_description: number
    approval_status: number
    rejection_reason: number
    approved_at: number
    approved_by: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type EmployerMinAggregateInputType = {
    id?: true
    company_name?: true
    industry?: true
    company_size?: true
    business_permit_number?: true
    company_address?: true
    company_website?: true
    company_logo_url?: true
    company_description?: true
    approval_status?: true
    rejection_reason?: true
    approved_at?: true
    approved_by?: true
    created_at?: true
    updated_at?: true
  }

  export type EmployerMaxAggregateInputType = {
    id?: true
    company_name?: true
    industry?: true
    company_size?: true
    business_permit_number?: true
    company_address?: true
    company_website?: true
    company_logo_url?: true
    company_description?: true
    approval_status?: true
    rejection_reason?: true
    approved_at?: true
    approved_by?: true
    created_at?: true
    updated_at?: true
  }

  export type EmployerCountAggregateInputType = {
    id?: true
    company_name?: true
    industry?: true
    company_size?: true
    business_permit_number?: true
    company_address?: true
    company_website?: true
    company_logo_url?: true
    company_description?: true
    approval_status?: true
    rejection_reason?: true
    approved_at?: true
    approved_by?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type EmployerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employer to aggregate.
     */
    where?: EmployerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employers to fetch.
     */
    orderBy?: EmployerOrderByWithRelationInput | EmployerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employers
    **/
    _count?: true | EmployerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployerMaxAggregateInputType
  }

  export type GetEmployerAggregateType<T extends EmployerAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployer[P]>
      : GetScalarType<T[P], AggregateEmployer[P]>
  }




  export type EmployerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployerWhereInput
    orderBy?: EmployerOrderByWithAggregationInput | EmployerOrderByWithAggregationInput[]
    by: EmployerScalarFieldEnum[] | EmployerScalarFieldEnum
    having?: EmployerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployerCountAggregateInputType | true
    _min?: EmployerMinAggregateInputType
    _max?: EmployerMaxAggregateInputType
  }

  export type EmployerGroupByOutputType = {
    id: string
    company_name: string
    industry: string
    company_size: string | null
    business_permit_number: string | null
    company_address: string | null
    company_website: string | null
    company_logo_url: string | null
    company_description: string | null
    approval_status: string
    rejection_reason: string | null
    approved_at: Date | null
    approved_by: string | null
    created_at: Date
    updated_at: Date
    _count: EmployerCountAggregateOutputType | null
    _min: EmployerMinAggregateOutputType | null
    _max: EmployerMaxAggregateOutputType | null
  }

  type GetEmployerGroupByPayload<T extends EmployerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployerGroupByOutputType[P]>
            : GetScalarType<T[P], EmployerGroupByOutputType[P]>
        }
      >
    >


  export type EmployerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company_name?: boolean
    industry?: boolean
    company_size?: boolean
    business_permit_number?: boolean
    company_address?: boolean
    company_website?: boolean
    company_logo_url?: boolean
    company_description?: boolean
    approval_status?: boolean
    rejection_reason?: boolean
    approved_at?: boolean
    approved_by?: boolean
    created_at?: boolean
    updated_at?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    approver?: boolean | Employer$approverArgs<ExtArgs>
    job_postings?: boolean | Employer$job_postingsArgs<ExtArgs>
    _count?: boolean | EmployerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employer"]>

  export type EmployerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company_name?: boolean
    industry?: boolean
    company_size?: boolean
    business_permit_number?: boolean
    company_address?: boolean
    company_website?: boolean
    company_logo_url?: boolean
    company_description?: boolean
    approval_status?: boolean
    rejection_reason?: boolean
    approved_at?: boolean
    approved_by?: boolean
    created_at?: boolean
    updated_at?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    approver?: boolean | Employer$approverArgs<ExtArgs>
  }, ExtArgs["result"]["employer"]>

  export type EmployerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company_name?: boolean
    industry?: boolean
    company_size?: boolean
    business_permit_number?: boolean
    company_address?: boolean
    company_website?: boolean
    company_logo_url?: boolean
    company_description?: boolean
    approval_status?: boolean
    rejection_reason?: boolean
    approved_at?: boolean
    approved_by?: boolean
    created_at?: boolean
    updated_at?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    approver?: boolean | Employer$approverArgs<ExtArgs>
  }, ExtArgs["result"]["employer"]>

  export type EmployerSelectScalar = {
    id?: boolean
    company_name?: boolean
    industry?: boolean
    company_size?: boolean
    business_permit_number?: boolean
    company_address?: boolean
    company_website?: boolean
    company_logo_url?: boolean
    company_description?: boolean
    approval_status?: boolean
    rejection_reason?: boolean
    approved_at?: boolean
    approved_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type EmployerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "company_name" | "industry" | "company_size" | "business_permit_number" | "company_address" | "company_website" | "company_logo_url" | "company_description" | "approval_status" | "rejection_reason" | "approved_at" | "approved_by" | "created_at" | "updated_at", ExtArgs["result"]["employer"]>
  export type EmployerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    approver?: boolean | Employer$approverArgs<ExtArgs>
    job_postings?: boolean | Employer$job_postingsArgs<ExtArgs>
    _count?: boolean | EmployerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmployerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    approver?: boolean | Employer$approverArgs<ExtArgs>
  }
  export type EmployerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    approver?: boolean | Employer$approverArgs<ExtArgs>
  }

  export type $EmployerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Employer"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
      approver: Prisma.$ProfilePayload<ExtArgs> | null
      job_postings: Prisma.$JobPostingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      company_name: string
      industry: string
      company_size: string | null
      business_permit_number: string | null
      company_address: string | null
      company_website: string | null
      company_logo_url: string | null
      company_description: string | null
      approval_status: string
      rejection_reason: string | null
      approved_at: Date | null
      approved_by: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["employer"]>
    composites: {}
  }

  type EmployerGetPayload<S extends boolean | null | undefined | EmployerDefaultArgs> = $Result.GetResult<Prisma.$EmployerPayload, S>

  type EmployerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployerCountAggregateInputType | true
    }

  export interface EmployerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Employer'], meta: { name: 'Employer' } }
    /**
     * Find zero or one Employer that matches the filter.
     * @param {EmployerFindUniqueArgs} args - Arguments to find a Employer
     * @example
     * // Get one Employer
     * const employer = await prisma.employer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployerFindUniqueArgs>(args: SelectSubset<T, EmployerFindUniqueArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployerFindUniqueOrThrowArgs} args - Arguments to find a Employer
     * @example
     * // Get one Employer
     * const employer = await prisma.employer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployerFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerFindFirstArgs} args - Arguments to find a Employer
     * @example
     * // Get one Employer
     * const employer = await prisma.employer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployerFindFirstArgs>(args?: SelectSubset<T, EmployerFindFirstArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerFindFirstOrThrowArgs} args - Arguments to find a Employer
     * @example
     * // Get one Employer
     * const employer = await prisma.employer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployerFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployerFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employers
     * const employers = await prisma.employer.findMany()
     * 
     * // Get first 10 Employers
     * const employers = await prisma.employer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employerWithIdOnly = await prisma.employer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployerFindManyArgs>(args?: SelectSubset<T, EmployerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employer.
     * @param {EmployerCreateArgs} args - Arguments to create a Employer.
     * @example
     * // Create one Employer
     * const Employer = await prisma.employer.create({
     *   data: {
     *     // ... data to create a Employer
     *   }
     * })
     * 
     */
    create<T extends EmployerCreateArgs>(args: SelectSubset<T, EmployerCreateArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employers.
     * @param {EmployerCreateManyArgs} args - Arguments to create many Employers.
     * @example
     * // Create many Employers
     * const employer = await prisma.employer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployerCreateManyArgs>(args?: SelectSubset<T, EmployerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Employers and returns the data saved in the database.
     * @param {EmployerCreateManyAndReturnArgs} args - Arguments to create many Employers.
     * @example
     * // Create many Employers
     * const employer = await prisma.employer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Employers and only return the `id`
     * const employerWithIdOnly = await prisma.employer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployerCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Employer.
     * @param {EmployerDeleteArgs} args - Arguments to delete one Employer.
     * @example
     * // Delete one Employer
     * const Employer = await prisma.employer.delete({
     *   where: {
     *     // ... filter to delete one Employer
     *   }
     * })
     * 
     */
    delete<T extends EmployerDeleteArgs>(args: SelectSubset<T, EmployerDeleteArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employer.
     * @param {EmployerUpdateArgs} args - Arguments to update one Employer.
     * @example
     * // Update one Employer
     * const employer = await prisma.employer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployerUpdateArgs>(args: SelectSubset<T, EmployerUpdateArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employers.
     * @param {EmployerDeleteManyArgs} args - Arguments to filter Employers to delete.
     * @example
     * // Delete a few Employers
     * const { count } = await prisma.employer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployerDeleteManyArgs>(args?: SelectSubset<T, EmployerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employers
     * const employer = await prisma.employer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployerUpdateManyArgs>(args: SelectSubset<T, EmployerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employers and returns the data updated in the database.
     * @param {EmployerUpdateManyAndReturnArgs} args - Arguments to update many Employers.
     * @example
     * // Update many Employers
     * const employer = await prisma.employer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Employers and only return the `id`
     * const employerWithIdOnly = await prisma.employer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmployerUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Employer.
     * @param {EmployerUpsertArgs} args - Arguments to update or create a Employer.
     * @example
     * // Update or create a Employer
     * const employer = await prisma.employer.upsert({
     *   create: {
     *     // ... data to create a Employer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employer we want to update
     *   }
     * })
     */
    upsert<T extends EmployerUpsertArgs>(args: SelectSubset<T, EmployerUpsertArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Employers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerCountArgs} args - Arguments to filter Employers to count.
     * @example
     * // Count the number of Employers
     * const count = await prisma.employer.count({
     *   where: {
     *     // ... the filter for the Employers we want to count
     *   }
     * })
    **/
    count<T extends EmployerCountArgs>(
      args?: Subset<T, EmployerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployerAggregateArgs>(args: Subset<T, EmployerAggregateArgs>): Prisma.PrismaPromise<GetEmployerAggregateType<T>>

    /**
     * Group by Employer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployerGroupByArgs['orderBy'] }
        : { orderBy?: EmployerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Employer model
   */
  readonly fields: EmployerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    approver<T extends Employer$approverArgs<ExtArgs> = {}>(args?: Subset<T, Employer$approverArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    job_postings<T extends Employer$job_postingsArgs<ExtArgs> = {}>(args?: Subset<T, Employer$job_postingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Employer model
   */
  interface EmployerFieldRefs {
    readonly id: FieldRef<"Employer", 'String'>
    readonly company_name: FieldRef<"Employer", 'String'>
    readonly industry: FieldRef<"Employer", 'String'>
    readonly company_size: FieldRef<"Employer", 'String'>
    readonly business_permit_number: FieldRef<"Employer", 'String'>
    readonly company_address: FieldRef<"Employer", 'String'>
    readonly company_website: FieldRef<"Employer", 'String'>
    readonly company_logo_url: FieldRef<"Employer", 'String'>
    readonly company_description: FieldRef<"Employer", 'String'>
    readonly approval_status: FieldRef<"Employer", 'String'>
    readonly rejection_reason: FieldRef<"Employer", 'String'>
    readonly approved_at: FieldRef<"Employer", 'DateTime'>
    readonly approved_by: FieldRef<"Employer", 'String'>
    readonly created_at: FieldRef<"Employer", 'DateTime'>
    readonly updated_at: FieldRef<"Employer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Employer findUnique
   */
  export type EmployerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * Filter, which Employer to fetch.
     */
    where: EmployerWhereUniqueInput
  }

  /**
   * Employer findUniqueOrThrow
   */
  export type EmployerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * Filter, which Employer to fetch.
     */
    where: EmployerWhereUniqueInput
  }

  /**
   * Employer findFirst
   */
  export type EmployerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * Filter, which Employer to fetch.
     */
    where?: EmployerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employers to fetch.
     */
    orderBy?: EmployerOrderByWithRelationInput | EmployerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employers.
     */
    cursor?: EmployerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employers.
     */
    distinct?: EmployerScalarFieldEnum | EmployerScalarFieldEnum[]
  }

  /**
   * Employer findFirstOrThrow
   */
  export type EmployerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * Filter, which Employer to fetch.
     */
    where?: EmployerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employers to fetch.
     */
    orderBy?: EmployerOrderByWithRelationInput | EmployerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employers.
     */
    cursor?: EmployerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employers.
     */
    distinct?: EmployerScalarFieldEnum | EmployerScalarFieldEnum[]
  }

  /**
   * Employer findMany
   */
  export type EmployerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * Filter, which Employers to fetch.
     */
    where?: EmployerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employers to fetch.
     */
    orderBy?: EmployerOrderByWithRelationInput | EmployerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employers.
     */
    cursor?: EmployerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employers.
     */
    distinct?: EmployerScalarFieldEnum | EmployerScalarFieldEnum[]
  }

  /**
   * Employer create
   */
  export type EmployerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * The data needed to create a Employer.
     */
    data: XOR<EmployerCreateInput, EmployerUncheckedCreateInput>
  }

  /**
   * Employer createMany
   */
  export type EmployerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Employers.
     */
    data: EmployerCreateManyInput | EmployerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Employer createManyAndReturn
   */
  export type EmployerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * The data used to create many Employers.
     */
    data: EmployerCreateManyInput | EmployerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employer update
   */
  export type EmployerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * The data needed to update a Employer.
     */
    data: XOR<EmployerUpdateInput, EmployerUncheckedUpdateInput>
    /**
     * Choose, which Employer to update.
     */
    where: EmployerWhereUniqueInput
  }

  /**
   * Employer updateMany
   */
  export type EmployerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Employers.
     */
    data: XOR<EmployerUpdateManyMutationInput, EmployerUncheckedUpdateManyInput>
    /**
     * Filter which Employers to update
     */
    where?: EmployerWhereInput
    /**
     * Limit how many Employers to update.
     */
    limit?: number
  }

  /**
   * Employer updateManyAndReturn
   */
  export type EmployerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * The data used to update Employers.
     */
    data: XOR<EmployerUpdateManyMutationInput, EmployerUncheckedUpdateManyInput>
    /**
     * Filter which Employers to update
     */
    where?: EmployerWhereInput
    /**
     * Limit how many Employers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employer upsert
   */
  export type EmployerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * The filter to search for the Employer to update in case it exists.
     */
    where: EmployerWhereUniqueInput
    /**
     * In case the Employer found by the `where` argument doesn't exist, create a new Employer with this data.
     */
    create: XOR<EmployerCreateInput, EmployerUncheckedCreateInput>
    /**
     * In case the Employer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployerUpdateInput, EmployerUncheckedUpdateInput>
  }

  /**
   * Employer delete
   */
  export type EmployerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * Filter which Employer to delete.
     */
    where: EmployerWhereUniqueInput
  }

  /**
   * Employer deleteMany
   */
  export type EmployerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employers to delete
     */
    where?: EmployerWhereInput
    /**
     * Limit how many Employers to delete.
     */
    limit?: number
  }

  /**
   * Employer.approver
   */
  export type Employer$approverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
  }

  /**
   * Employer.job_postings
   */
  export type Employer$job_postingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    where?: JobPostingWhereInput
    orderBy?: JobPostingOrderByWithRelationInput | JobPostingOrderByWithRelationInput[]
    cursor?: JobPostingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobPostingScalarFieldEnum | JobPostingScalarFieldEnum[]
  }

  /**
   * Employer without action
   */
  export type EmployerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
  }


  /**
   * Model CareerRecord
   */

  export type AggregateCareerRecord = {
    _count: CareerRecordCountAggregateOutputType | null
    _min: CareerRecordMinAggregateOutputType | null
    _max: CareerRecordMaxAggregateOutputType | null
  }

  export type CareerRecordMinAggregateOutputType = {
    id: string | null
    alumni_id: string | null
    employment_status: string | null
    employer_name: string | null
    job_title: string | null
    industry: string | null
    employment_type: string | null
    salary_range: string | null
    start_date: Date | null
    end_date: Date | null
    is_current: boolean | null
    country: string | null
    city: string | null
    job_description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CareerRecordMaxAggregateOutputType = {
    id: string | null
    alumni_id: string | null
    employment_status: string | null
    employer_name: string | null
    job_title: string | null
    industry: string | null
    employment_type: string | null
    salary_range: string | null
    start_date: Date | null
    end_date: Date | null
    is_current: boolean | null
    country: string | null
    city: string | null
    job_description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CareerRecordCountAggregateOutputType = {
    id: number
    alumni_id: number
    employment_status: number
    employer_name: number
    job_title: number
    industry: number
    employment_type: number
    salary_range: number
    start_date: number
    end_date: number
    is_current: number
    country: number
    city: number
    job_description: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type CareerRecordMinAggregateInputType = {
    id?: true
    alumni_id?: true
    employment_status?: true
    employer_name?: true
    job_title?: true
    industry?: true
    employment_type?: true
    salary_range?: true
    start_date?: true
    end_date?: true
    is_current?: true
    country?: true
    city?: true
    job_description?: true
    created_at?: true
    updated_at?: true
  }

  export type CareerRecordMaxAggregateInputType = {
    id?: true
    alumni_id?: true
    employment_status?: true
    employer_name?: true
    job_title?: true
    industry?: true
    employment_type?: true
    salary_range?: true
    start_date?: true
    end_date?: true
    is_current?: true
    country?: true
    city?: true
    job_description?: true
    created_at?: true
    updated_at?: true
  }

  export type CareerRecordCountAggregateInputType = {
    id?: true
    alumni_id?: true
    employment_status?: true
    employer_name?: true
    job_title?: true
    industry?: true
    employment_type?: true
    salary_range?: true
    start_date?: true
    end_date?: true
    is_current?: true
    country?: true
    city?: true
    job_description?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type CareerRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareerRecord to aggregate.
     */
    where?: CareerRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerRecords to fetch.
     */
    orderBy?: CareerRecordOrderByWithRelationInput | CareerRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CareerRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CareerRecords
    **/
    _count?: true | CareerRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CareerRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CareerRecordMaxAggregateInputType
  }

  export type GetCareerRecordAggregateType<T extends CareerRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateCareerRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCareerRecord[P]>
      : GetScalarType<T[P], AggregateCareerRecord[P]>
  }




  export type CareerRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareerRecordWhereInput
    orderBy?: CareerRecordOrderByWithAggregationInput | CareerRecordOrderByWithAggregationInput[]
    by: CareerRecordScalarFieldEnum[] | CareerRecordScalarFieldEnum
    having?: CareerRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CareerRecordCountAggregateInputType | true
    _min?: CareerRecordMinAggregateInputType
    _max?: CareerRecordMaxAggregateInputType
  }

  export type CareerRecordGroupByOutputType = {
    id: string
    alumni_id: string
    employment_status: string
    employer_name: string | null
    job_title: string | null
    industry: string | null
    employment_type: string | null
    salary_range: string | null
    start_date: Date | null
    end_date: Date | null
    is_current: boolean
    country: string
    city: string | null
    job_description: string | null
    created_at: Date
    updated_at: Date
    _count: CareerRecordCountAggregateOutputType | null
    _min: CareerRecordMinAggregateOutputType | null
    _max: CareerRecordMaxAggregateOutputType | null
  }

  type GetCareerRecordGroupByPayload<T extends CareerRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CareerRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CareerRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CareerRecordGroupByOutputType[P]>
            : GetScalarType<T[P], CareerRecordGroupByOutputType[P]>
        }
      >
    >


  export type CareerRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    alumni_id?: boolean
    employment_status?: boolean
    employer_name?: boolean
    job_title?: boolean
    industry?: boolean
    employment_type?: boolean
    salary_range?: boolean
    start_date?: boolean
    end_date?: boolean
    is_current?: boolean
    country?: boolean
    city?: boolean
    job_description?: boolean
    created_at?: boolean
    updated_at?: boolean
    alumni?: boolean | AlumniDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["careerRecord"]>

  export type CareerRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    alumni_id?: boolean
    employment_status?: boolean
    employer_name?: boolean
    job_title?: boolean
    industry?: boolean
    employment_type?: boolean
    salary_range?: boolean
    start_date?: boolean
    end_date?: boolean
    is_current?: boolean
    country?: boolean
    city?: boolean
    job_description?: boolean
    created_at?: boolean
    updated_at?: boolean
    alumni?: boolean | AlumniDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["careerRecord"]>

  export type CareerRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    alumni_id?: boolean
    employment_status?: boolean
    employer_name?: boolean
    job_title?: boolean
    industry?: boolean
    employment_type?: boolean
    salary_range?: boolean
    start_date?: boolean
    end_date?: boolean
    is_current?: boolean
    country?: boolean
    city?: boolean
    job_description?: boolean
    created_at?: boolean
    updated_at?: boolean
    alumni?: boolean | AlumniDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["careerRecord"]>

  export type CareerRecordSelectScalar = {
    id?: boolean
    alumni_id?: boolean
    employment_status?: boolean
    employer_name?: boolean
    job_title?: boolean
    industry?: boolean
    employment_type?: boolean
    salary_range?: boolean
    start_date?: boolean
    end_date?: boolean
    is_current?: boolean
    country?: boolean
    city?: boolean
    job_description?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type CareerRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "alumni_id" | "employment_status" | "employer_name" | "job_title" | "industry" | "employment_type" | "salary_range" | "start_date" | "end_date" | "is_current" | "country" | "city" | "job_description" | "created_at" | "updated_at", ExtArgs["result"]["careerRecord"]>
  export type CareerRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alumni?: boolean | AlumniDefaultArgs<ExtArgs>
  }
  export type CareerRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alumni?: boolean | AlumniDefaultArgs<ExtArgs>
  }
  export type CareerRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alumni?: boolean | AlumniDefaultArgs<ExtArgs>
  }

  export type $CareerRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CareerRecord"
    objects: {
      alumni: Prisma.$AlumniPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      alumni_id: string
      employment_status: string
      employer_name: string | null
      job_title: string | null
      industry: string | null
      employment_type: string | null
      salary_range: string | null
      start_date: Date | null
      end_date: Date | null
      is_current: boolean
      country: string
      city: string | null
      job_description: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["careerRecord"]>
    composites: {}
  }

  type CareerRecordGetPayload<S extends boolean | null | undefined | CareerRecordDefaultArgs> = $Result.GetResult<Prisma.$CareerRecordPayload, S>

  type CareerRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CareerRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CareerRecordCountAggregateInputType | true
    }

  export interface CareerRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CareerRecord'], meta: { name: 'CareerRecord' } }
    /**
     * Find zero or one CareerRecord that matches the filter.
     * @param {CareerRecordFindUniqueArgs} args - Arguments to find a CareerRecord
     * @example
     * // Get one CareerRecord
     * const careerRecord = await prisma.careerRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CareerRecordFindUniqueArgs>(args: SelectSubset<T, CareerRecordFindUniqueArgs<ExtArgs>>): Prisma__CareerRecordClient<$Result.GetResult<Prisma.$CareerRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CareerRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CareerRecordFindUniqueOrThrowArgs} args - Arguments to find a CareerRecord
     * @example
     * // Get one CareerRecord
     * const careerRecord = await prisma.careerRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CareerRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, CareerRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CareerRecordClient<$Result.GetResult<Prisma.$CareerRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CareerRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRecordFindFirstArgs} args - Arguments to find a CareerRecord
     * @example
     * // Get one CareerRecord
     * const careerRecord = await prisma.careerRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CareerRecordFindFirstArgs>(args?: SelectSubset<T, CareerRecordFindFirstArgs<ExtArgs>>): Prisma__CareerRecordClient<$Result.GetResult<Prisma.$CareerRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CareerRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRecordFindFirstOrThrowArgs} args - Arguments to find a CareerRecord
     * @example
     * // Get one CareerRecord
     * const careerRecord = await prisma.careerRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CareerRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, CareerRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__CareerRecordClient<$Result.GetResult<Prisma.$CareerRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CareerRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CareerRecords
     * const careerRecords = await prisma.careerRecord.findMany()
     * 
     * // Get first 10 CareerRecords
     * const careerRecords = await prisma.careerRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const careerRecordWithIdOnly = await prisma.careerRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CareerRecordFindManyArgs>(args?: SelectSubset<T, CareerRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CareerRecord.
     * @param {CareerRecordCreateArgs} args - Arguments to create a CareerRecord.
     * @example
     * // Create one CareerRecord
     * const CareerRecord = await prisma.careerRecord.create({
     *   data: {
     *     // ... data to create a CareerRecord
     *   }
     * })
     * 
     */
    create<T extends CareerRecordCreateArgs>(args: SelectSubset<T, CareerRecordCreateArgs<ExtArgs>>): Prisma__CareerRecordClient<$Result.GetResult<Prisma.$CareerRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CareerRecords.
     * @param {CareerRecordCreateManyArgs} args - Arguments to create many CareerRecords.
     * @example
     * // Create many CareerRecords
     * const careerRecord = await prisma.careerRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CareerRecordCreateManyArgs>(args?: SelectSubset<T, CareerRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CareerRecords and returns the data saved in the database.
     * @param {CareerRecordCreateManyAndReturnArgs} args - Arguments to create many CareerRecords.
     * @example
     * // Create many CareerRecords
     * const careerRecord = await prisma.careerRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CareerRecords and only return the `id`
     * const careerRecordWithIdOnly = await prisma.careerRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CareerRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, CareerRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CareerRecord.
     * @param {CareerRecordDeleteArgs} args - Arguments to delete one CareerRecord.
     * @example
     * // Delete one CareerRecord
     * const CareerRecord = await prisma.careerRecord.delete({
     *   where: {
     *     // ... filter to delete one CareerRecord
     *   }
     * })
     * 
     */
    delete<T extends CareerRecordDeleteArgs>(args: SelectSubset<T, CareerRecordDeleteArgs<ExtArgs>>): Prisma__CareerRecordClient<$Result.GetResult<Prisma.$CareerRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CareerRecord.
     * @param {CareerRecordUpdateArgs} args - Arguments to update one CareerRecord.
     * @example
     * // Update one CareerRecord
     * const careerRecord = await prisma.careerRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CareerRecordUpdateArgs>(args: SelectSubset<T, CareerRecordUpdateArgs<ExtArgs>>): Prisma__CareerRecordClient<$Result.GetResult<Prisma.$CareerRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CareerRecords.
     * @param {CareerRecordDeleteManyArgs} args - Arguments to filter CareerRecords to delete.
     * @example
     * // Delete a few CareerRecords
     * const { count } = await prisma.careerRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CareerRecordDeleteManyArgs>(args?: SelectSubset<T, CareerRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CareerRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CareerRecords
     * const careerRecord = await prisma.careerRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CareerRecordUpdateManyArgs>(args: SelectSubset<T, CareerRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CareerRecords and returns the data updated in the database.
     * @param {CareerRecordUpdateManyAndReturnArgs} args - Arguments to update many CareerRecords.
     * @example
     * // Update many CareerRecords
     * const careerRecord = await prisma.careerRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CareerRecords and only return the `id`
     * const careerRecordWithIdOnly = await prisma.careerRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CareerRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, CareerRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CareerRecord.
     * @param {CareerRecordUpsertArgs} args - Arguments to update or create a CareerRecord.
     * @example
     * // Update or create a CareerRecord
     * const careerRecord = await prisma.careerRecord.upsert({
     *   create: {
     *     // ... data to create a CareerRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CareerRecord we want to update
     *   }
     * })
     */
    upsert<T extends CareerRecordUpsertArgs>(args: SelectSubset<T, CareerRecordUpsertArgs<ExtArgs>>): Prisma__CareerRecordClient<$Result.GetResult<Prisma.$CareerRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CareerRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRecordCountArgs} args - Arguments to filter CareerRecords to count.
     * @example
     * // Count the number of CareerRecords
     * const count = await prisma.careerRecord.count({
     *   where: {
     *     // ... the filter for the CareerRecords we want to count
     *   }
     * })
    **/
    count<T extends CareerRecordCountArgs>(
      args?: Subset<T, CareerRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CareerRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CareerRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CareerRecordAggregateArgs>(args: Subset<T, CareerRecordAggregateArgs>): Prisma.PrismaPromise<GetCareerRecordAggregateType<T>>

    /**
     * Group by CareerRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CareerRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CareerRecordGroupByArgs['orderBy'] }
        : { orderBy?: CareerRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CareerRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCareerRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CareerRecord model
   */
  readonly fields: CareerRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CareerRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CareerRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alumni<T extends AlumniDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AlumniDefaultArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CareerRecord model
   */
  interface CareerRecordFieldRefs {
    readonly id: FieldRef<"CareerRecord", 'String'>
    readonly alumni_id: FieldRef<"CareerRecord", 'String'>
    readonly employment_status: FieldRef<"CareerRecord", 'String'>
    readonly employer_name: FieldRef<"CareerRecord", 'String'>
    readonly job_title: FieldRef<"CareerRecord", 'String'>
    readonly industry: FieldRef<"CareerRecord", 'String'>
    readonly employment_type: FieldRef<"CareerRecord", 'String'>
    readonly salary_range: FieldRef<"CareerRecord", 'String'>
    readonly start_date: FieldRef<"CareerRecord", 'DateTime'>
    readonly end_date: FieldRef<"CareerRecord", 'DateTime'>
    readonly is_current: FieldRef<"CareerRecord", 'Boolean'>
    readonly country: FieldRef<"CareerRecord", 'String'>
    readonly city: FieldRef<"CareerRecord", 'String'>
    readonly job_description: FieldRef<"CareerRecord", 'String'>
    readonly created_at: FieldRef<"CareerRecord", 'DateTime'>
    readonly updated_at: FieldRef<"CareerRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CareerRecord findUnique
   */
  export type CareerRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRecord
     */
    select?: CareerRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRecord
     */
    omit?: CareerRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRecordInclude<ExtArgs> | null
    /**
     * Filter, which CareerRecord to fetch.
     */
    where: CareerRecordWhereUniqueInput
  }

  /**
   * CareerRecord findUniqueOrThrow
   */
  export type CareerRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRecord
     */
    select?: CareerRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRecord
     */
    omit?: CareerRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRecordInclude<ExtArgs> | null
    /**
     * Filter, which CareerRecord to fetch.
     */
    where: CareerRecordWhereUniqueInput
  }

  /**
   * CareerRecord findFirst
   */
  export type CareerRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRecord
     */
    select?: CareerRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRecord
     */
    omit?: CareerRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRecordInclude<ExtArgs> | null
    /**
     * Filter, which CareerRecord to fetch.
     */
    where?: CareerRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerRecords to fetch.
     */
    orderBy?: CareerRecordOrderByWithRelationInput | CareerRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareerRecords.
     */
    cursor?: CareerRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareerRecords.
     */
    distinct?: CareerRecordScalarFieldEnum | CareerRecordScalarFieldEnum[]
  }

  /**
   * CareerRecord findFirstOrThrow
   */
  export type CareerRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRecord
     */
    select?: CareerRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRecord
     */
    omit?: CareerRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRecordInclude<ExtArgs> | null
    /**
     * Filter, which CareerRecord to fetch.
     */
    where?: CareerRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerRecords to fetch.
     */
    orderBy?: CareerRecordOrderByWithRelationInput | CareerRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareerRecords.
     */
    cursor?: CareerRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareerRecords.
     */
    distinct?: CareerRecordScalarFieldEnum | CareerRecordScalarFieldEnum[]
  }

  /**
   * CareerRecord findMany
   */
  export type CareerRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRecord
     */
    select?: CareerRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRecord
     */
    omit?: CareerRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRecordInclude<ExtArgs> | null
    /**
     * Filter, which CareerRecords to fetch.
     */
    where?: CareerRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerRecords to fetch.
     */
    orderBy?: CareerRecordOrderByWithRelationInput | CareerRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CareerRecords.
     */
    cursor?: CareerRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareerRecords.
     */
    distinct?: CareerRecordScalarFieldEnum | CareerRecordScalarFieldEnum[]
  }

  /**
   * CareerRecord create
   */
  export type CareerRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRecord
     */
    select?: CareerRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRecord
     */
    omit?: CareerRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a CareerRecord.
     */
    data: XOR<CareerRecordCreateInput, CareerRecordUncheckedCreateInput>
  }

  /**
   * CareerRecord createMany
   */
  export type CareerRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CareerRecords.
     */
    data: CareerRecordCreateManyInput | CareerRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CareerRecord createManyAndReturn
   */
  export type CareerRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRecord
     */
    select?: CareerRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRecord
     */
    omit?: CareerRecordOmit<ExtArgs> | null
    /**
     * The data used to create many CareerRecords.
     */
    data: CareerRecordCreateManyInput | CareerRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CareerRecord update
   */
  export type CareerRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRecord
     */
    select?: CareerRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRecord
     */
    omit?: CareerRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a CareerRecord.
     */
    data: XOR<CareerRecordUpdateInput, CareerRecordUncheckedUpdateInput>
    /**
     * Choose, which CareerRecord to update.
     */
    where: CareerRecordWhereUniqueInput
  }

  /**
   * CareerRecord updateMany
   */
  export type CareerRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CareerRecords.
     */
    data: XOR<CareerRecordUpdateManyMutationInput, CareerRecordUncheckedUpdateManyInput>
    /**
     * Filter which CareerRecords to update
     */
    where?: CareerRecordWhereInput
    /**
     * Limit how many CareerRecords to update.
     */
    limit?: number
  }

  /**
   * CareerRecord updateManyAndReturn
   */
  export type CareerRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRecord
     */
    select?: CareerRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRecord
     */
    omit?: CareerRecordOmit<ExtArgs> | null
    /**
     * The data used to update CareerRecords.
     */
    data: XOR<CareerRecordUpdateManyMutationInput, CareerRecordUncheckedUpdateManyInput>
    /**
     * Filter which CareerRecords to update
     */
    where?: CareerRecordWhereInput
    /**
     * Limit how many CareerRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CareerRecord upsert
   */
  export type CareerRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRecord
     */
    select?: CareerRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRecord
     */
    omit?: CareerRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the CareerRecord to update in case it exists.
     */
    where: CareerRecordWhereUniqueInput
    /**
     * In case the CareerRecord found by the `where` argument doesn't exist, create a new CareerRecord with this data.
     */
    create: XOR<CareerRecordCreateInput, CareerRecordUncheckedCreateInput>
    /**
     * In case the CareerRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CareerRecordUpdateInput, CareerRecordUncheckedUpdateInput>
  }

  /**
   * CareerRecord delete
   */
  export type CareerRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRecord
     */
    select?: CareerRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRecord
     */
    omit?: CareerRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRecordInclude<ExtArgs> | null
    /**
     * Filter which CareerRecord to delete.
     */
    where: CareerRecordWhereUniqueInput
  }

  /**
   * CareerRecord deleteMany
   */
  export type CareerRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareerRecords to delete
     */
    where?: CareerRecordWhereInput
    /**
     * Limit how many CareerRecords to delete.
     */
    limit?: number
  }

  /**
   * CareerRecord without action
   */
  export type CareerRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRecord
     */
    select?: CareerRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRecord
     */
    omit?: CareerRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRecordInclude<ExtArgs> | null
  }


  /**
   * Model JobPosting
   */

  export type AggregateJobPosting = {
    _count: JobPostingCountAggregateOutputType | null
    _avg: JobPostingAvgAggregateOutputType | null
    _sum: JobPostingSumAggregateOutputType | null
    _min: JobPostingMinAggregateOutputType | null
    _max: JobPostingMaxAggregateOutputType | null
  }

  export type JobPostingAvgAggregateOutputType = {
    salary_min: Decimal | null
    salary_max: Decimal | null
    slots: number | null
  }

  export type JobPostingSumAggregateOutputType = {
    salary_min: Decimal | null
    salary_max: Decimal | null
    slots: number | null
  }

  export type JobPostingMinAggregateOutputType = {
    id: string | null
    employer_id: string | null
    title: string | null
    description: string | null
    requirements: string | null
    job_type: string | null
    industry: string | null
    location: string | null
    is_remote: boolean | null
    salary_min: Decimal | null
    salary_max: Decimal | null
    slots: number | null
    expires_at: Date | null
    status: string | null
    rejection_reason: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type JobPostingMaxAggregateOutputType = {
    id: string | null
    employer_id: string | null
    title: string | null
    description: string | null
    requirements: string | null
    job_type: string | null
    industry: string | null
    location: string | null
    is_remote: boolean | null
    salary_min: Decimal | null
    salary_max: Decimal | null
    slots: number | null
    expires_at: Date | null
    status: string | null
    rejection_reason: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type JobPostingCountAggregateOutputType = {
    id: number
    employer_id: number
    title: number
    description: number
    requirements: number
    job_type: number
    industry: number
    location: number
    is_remote: number
    salary_min: number
    salary_max: number
    preferred_courses: number
    slots: number
    expires_at: number
    status: number
    rejection_reason: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type JobPostingAvgAggregateInputType = {
    salary_min?: true
    salary_max?: true
    slots?: true
  }

  export type JobPostingSumAggregateInputType = {
    salary_min?: true
    salary_max?: true
    slots?: true
  }

  export type JobPostingMinAggregateInputType = {
    id?: true
    employer_id?: true
    title?: true
    description?: true
    requirements?: true
    job_type?: true
    industry?: true
    location?: true
    is_remote?: true
    salary_min?: true
    salary_max?: true
    slots?: true
    expires_at?: true
    status?: true
    rejection_reason?: true
    created_at?: true
    updated_at?: true
  }

  export type JobPostingMaxAggregateInputType = {
    id?: true
    employer_id?: true
    title?: true
    description?: true
    requirements?: true
    job_type?: true
    industry?: true
    location?: true
    is_remote?: true
    salary_min?: true
    salary_max?: true
    slots?: true
    expires_at?: true
    status?: true
    rejection_reason?: true
    created_at?: true
    updated_at?: true
  }

  export type JobPostingCountAggregateInputType = {
    id?: true
    employer_id?: true
    title?: true
    description?: true
    requirements?: true
    job_type?: true
    industry?: true
    location?: true
    is_remote?: true
    salary_min?: true
    salary_max?: true
    preferred_courses?: true
    slots?: true
    expires_at?: true
    status?: true
    rejection_reason?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type JobPostingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobPosting to aggregate.
     */
    where?: JobPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPostings to fetch.
     */
    orderBy?: JobPostingOrderByWithRelationInput | JobPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPostings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobPostings
    **/
    _count?: true | JobPostingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobPostingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobPostingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobPostingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobPostingMaxAggregateInputType
  }

  export type GetJobPostingAggregateType<T extends JobPostingAggregateArgs> = {
        [P in keyof T & keyof AggregateJobPosting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobPosting[P]>
      : GetScalarType<T[P], AggregateJobPosting[P]>
  }




  export type JobPostingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobPostingWhereInput
    orderBy?: JobPostingOrderByWithAggregationInput | JobPostingOrderByWithAggregationInput[]
    by: JobPostingScalarFieldEnum[] | JobPostingScalarFieldEnum
    having?: JobPostingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobPostingCountAggregateInputType | true
    _avg?: JobPostingAvgAggregateInputType
    _sum?: JobPostingSumAggregateInputType
    _min?: JobPostingMinAggregateInputType
    _max?: JobPostingMaxAggregateInputType
  }

  export type JobPostingGroupByOutputType = {
    id: string
    employer_id: string
    title: string
    description: string
    requirements: string | null
    job_type: string
    industry: string
    location: string | null
    is_remote: boolean
    salary_min: Decimal | null
    salary_max: Decimal | null
    preferred_courses: string[]
    slots: number
    expires_at: Date
    status: string
    rejection_reason: string | null
    created_at: Date
    updated_at: Date
    _count: JobPostingCountAggregateOutputType | null
    _avg: JobPostingAvgAggregateOutputType | null
    _sum: JobPostingSumAggregateOutputType | null
    _min: JobPostingMinAggregateOutputType | null
    _max: JobPostingMaxAggregateOutputType | null
  }

  type GetJobPostingGroupByPayload<T extends JobPostingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobPostingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobPostingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobPostingGroupByOutputType[P]>
            : GetScalarType<T[P], JobPostingGroupByOutputType[P]>
        }
      >
    >


  export type JobPostingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employer_id?: boolean
    title?: boolean
    description?: boolean
    requirements?: boolean
    job_type?: boolean
    industry?: boolean
    location?: boolean
    is_remote?: boolean
    salary_min?: boolean
    salary_max?: boolean
    preferred_courses?: boolean
    slots?: boolean
    expires_at?: boolean
    status?: boolean
    rejection_reason?: boolean
    created_at?: boolean
    updated_at?: boolean
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
    applications?: boolean | JobPosting$applicationsArgs<ExtArgs>
    _count?: boolean | JobPostingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobPosting"]>

  export type JobPostingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employer_id?: boolean
    title?: boolean
    description?: boolean
    requirements?: boolean
    job_type?: boolean
    industry?: boolean
    location?: boolean
    is_remote?: boolean
    salary_min?: boolean
    salary_max?: boolean
    preferred_courses?: boolean
    slots?: boolean
    expires_at?: boolean
    status?: boolean
    rejection_reason?: boolean
    created_at?: boolean
    updated_at?: boolean
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobPosting"]>

  export type JobPostingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employer_id?: boolean
    title?: boolean
    description?: boolean
    requirements?: boolean
    job_type?: boolean
    industry?: boolean
    location?: boolean
    is_remote?: boolean
    salary_min?: boolean
    salary_max?: boolean
    preferred_courses?: boolean
    slots?: boolean
    expires_at?: boolean
    status?: boolean
    rejection_reason?: boolean
    created_at?: boolean
    updated_at?: boolean
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobPosting"]>

  export type JobPostingSelectScalar = {
    id?: boolean
    employer_id?: boolean
    title?: boolean
    description?: boolean
    requirements?: boolean
    job_type?: boolean
    industry?: boolean
    location?: boolean
    is_remote?: boolean
    salary_min?: boolean
    salary_max?: boolean
    preferred_courses?: boolean
    slots?: boolean
    expires_at?: boolean
    status?: boolean
    rejection_reason?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type JobPostingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employer_id" | "title" | "description" | "requirements" | "job_type" | "industry" | "location" | "is_remote" | "salary_min" | "salary_max" | "preferred_courses" | "slots" | "expires_at" | "status" | "rejection_reason" | "created_at" | "updated_at", ExtArgs["result"]["jobPosting"]>
  export type JobPostingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
    applications?: boolean | JobPosting$applicationsArgs<ExtArgs>
    _count?: boolean | JobPostingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JobPostingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
  }
  export type JobPostingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
  }

  export type $JobPostingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobPosting"
    objects: {
      employer: Prisma.$EmployerPayload<ExtArgs>
      applications: Prisma.$JobApplicationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employer_id: string
      title: string
      description: string
      requirements: string | null
      job_type: string
      industry: string
      location: string | null
      is_remote: boolean
      salary_min: Prisma.Decimal | null
      salary_max: Prisma.Decimal | null
      preferred_courses: string[]
      slots: number
      expires_at: Date
      status: string
      rejection_reason: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["jobPosting"]>
    composites: {}
  }

  type JobPostingGetPayload<S extends boolean | null | undefined | JobPostingDefaultArgs> = $Result.GetResult<Prisma.$JobPostingPayload, S>

  type JobPostingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobPostingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobPostingCountAggregateInputType | true
    }

  export interface JobPostingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobPosting'], meta: { name: 'JobPosting' } }
    /**
     * Find zero or one JobPosting that matches the filter.
     * @param {JobPostingFindUniqueArgs} args - Arguments to find a JobPosting
     * @example
     * // Get one JobPosting
     * const jobPosting = await prisma.jobPosting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobPostingFindUniqueArgs>(args: SelectSubset<T, JobPostingFindUniqueArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobPosting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobPostingFindUniqueOrThrowArgs} args - Arguments to find a JobPosting
     * @example
     * // Get one JobPosting
     * const jobPosting = await prisma.jobPosting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobPostingFindUniqueOrThrowArgs>(args: SelectSubset<T, JobPostingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobPosting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingFindFirstArgs} args - Arguments to find a JobPosting
     * @example
     * // Get one JobPosting
     * const jobPosting = await prisma.jobPosting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobPostingFindFirstArgs>(args?: SelectSubset<T, JobPostingFindFirstArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobPosting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingFindFirstOrThrowArgs} args - Arguments to find a JobPosting
     * @example
     * // Get one JobPosting
     * const jobPosting = await prisma.jobPosting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobPostingFindFirstOrThrowArgs>(args?: SelectSubset<T, JobPostingFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobPostings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobPostings
     * const jobPostings = await prisma.jobPosting.findMany()
     * 
     * // Get first 10 JobPostings
     * const jobPostings = await prisma.jobPosting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobPostingWithIdOnly = await prisma.jobPosting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobPostingFindManyArgs>(args?: SelectSubset<T, JobPostingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobPosting.
     * @param {JobPostingCreateArgs} args - Arguments to create a JobPosting.
     * @example
     * // Create one JobPosting
     * const JobPosting = await prisma.jobPosting.create({
     *   data: {
     *     // ... data to create a JobPosting
     *   }
     * })
     * 
     */
    create<T extends JobPostingCreateArgs>(args: SelectSubset<T, JobPostingCreateArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobPostings.
     * @param {JobPostingCreateManyArgs} args - Arguments to create many JobPostings.
     * @example
     * // Create many JobPostings
     * const jobPosting = await prisma.jobPosting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobPostingCreateManyArgs>(args?: SelectSubset<T, JobPostingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobPostings and returns the data saved in the database.
     * @param {JobPostingCreateManyAndReturnArgs} args - Arguments to create many JobPostings.
     * @example
     * // Create many JobPostings
     * const jobPosting = await prisma.jobPosting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobPostings and only return the `id`
     * const jobPostingWithIdOnly = await prisma.jobPosting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobPostingCreateManyAndReturnArgs>(args?: SelectSubset<T, JobPostingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JobPosting.
     * @param {JobPostingDeleteArgs} args - Arguments to delete one JobPosting.
     * @example
     * // Delete one JobPosting
     * const JobPosting = await prisma.jobPosting.delete({
     *   where: {
     *     // ... filter to delete one JobPosting
     *   }
     * })
     * 
     */
    delete<T extends JobPostingDeleteArgs>(args: SelectSubset<T, JobPostingDeleteArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobPosting.
     * @param {JobPostingUpdateArgs} args - Arguments to update one JobPosting.
     * @example
     * // Update one JobPosting
     * const jobPosting = await prisma.jobPosting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobPostingUpdateArgs>(args: SelectSubset<T, JobPostingUpdateArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobPostings.
     * @param {JobPostingDeleteManyArgs} args - Arguments to filter JobPostings to delete.
     * @example
     * // Delete a few JobPostings
     * const { count } = await prisma.jobPosting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobPostingDeleteManyArgs>(args?: SelectSubset<T, JobPostingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobPostings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobPostings
     * const jobPosting = await prisma.jobPosting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobPostingUpdateManyArgs>(args: SelectSubset<T, JobPostingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobPostings and returns the data updated in the database.
     * @param {JobPostingUpdateManyAndReturnArgs} args - Arguments to update many JobPostings.
     * @example
     * // Update many JobPostings
     * const jobPosting = await prisma.jobPosting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JobPostings and only return the `id`
     * const jobPostingWithIdOnly = await prisma.jobPosting.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JobPostingUpdateManyAndReturnArgs>(args: SelectSubset<T, JobPostingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JobPosting.
     * @param {JobPostingUpsertArgs} args - Arguments to update or create a JobPosting.
     * @example
     * // Update or create a JobPosting
     * const jobPosting = await prisma.jobPosting.upsert({
     *   create: {
     *     // ... data to create a JobPosting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobPosting we want to update
     *   }
     * })
     */
    upsert<T extends JobPostingUpsertArgs>(args: SelectSubset<T, JobPostingUpsertArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobPostings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingCountArgs} args - Arguments to filter JobPostings to count.
     * @example
     * // Count the number of JobPostings
     * const count = await prisma.jobPosting.count({
     *   where: {
     *     // ... the filter for the JobPostings we want to count
     *   }
     * })
    **/
    count<T extends JobPostingCountArgs>(
      args?: Subset<T, JobPostingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobPostingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobPosting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobPostingAggregateArgs>(args: Subset<T, JobPostingAggregateArgs>): Prisma.PrismaPromise<GetJobPostingAggregateType<T>>

    /**
     * Group by JobPosting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobPostingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobPostingGroupByArgs['orderBy'] }
        : { orderBy?: JobPostingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobPostingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobPostingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobPosting model
   */
  readonly fields: JobPostingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobPosting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobPostingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employer<T extends EmployerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployerDefaultArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    applications<T extends JobPosting$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, JobPosting$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JobPosting model
   */
  interface JobPostingFieldRefs {
    readonly id: FieldRef<"JobPosting", 'String'>
    readonly employer_id: FieldRef<"JobPosting", 'String'>
    readonly title: FieldRef<"JobPosting", 'String'>
    readonly description: FieldRef<"JobPosting", 'String'>
    readonly requirements: FieldRef<"JobPosting", 'String'>
    readonly job_type: FieldRef<"JobPosting", 'String'>
    readonly industry: FieldRef<"JobPosting", 'String'>
    readonly location: FieldRef<"JobPosting", 'String'>
    readonly is_remote: FieldRef<"JobPosting", 'Boolean'>
    readonly salary_min: FieldRef<"JobPosting", 'Decimal'>
    readonly salary_max: FieldRef<"JobPosting", 'Decimal'>
    readonly preferred_courses: FieldRef<"JobPosting", 'String[]'>
    readonly slots: FieldRef<"JobPosting", 'Int'>
    readonly expires_at: FieldRef<"JobPosting", 'DateTime'>
    readonly status: FieldRef<"JobPosting", 'String'>
    readonly rejection_reason: FieldRef<"JobPosting", 'String'>
    readonly created_at: FieldRef<"JobPosting", 'DateTime'>
    readonly updated_at: FieldRef<"JobPosting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JobPosting findUnique
   */
  export type JobPostingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPosting to fetch.
     */
    where: JobPostingWhereUniqueInput
  }

  /**
   * JobPosting findUniqueOrThrow
   */
  export type JobPostingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPosting to fetch.
     */
    where: JobPostingWhereUniqueInput
  }

  /**
   * JobPosting findFirst
   */
  export type JobPostingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPosting to fetch.
     */
    where?: JobPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPostings to fetch.
     */
    orderBy?: JobPostingOrderByWithRelationInput | JobPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobPostings.
     */
    cursor?: JobPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPostings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobPostings.
     */
    distinct?: JobPostingScalarFieldEnum | JobPostingScalarFieldEnum[]
  }

  /**
   * JobPosting findFirstOrThrow
   */
  export type JobPostingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPosting to fetch.
     */
    where?: JobPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPostings to fetch.
     */
    orderBy?: JobPostingOrderByWithRelationInput | JobPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobPostings.
     */
    cursor?: JobPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPostings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobPostings.
     */
    distinct?: JobPostingScalarFieldEnum | JobPostingScalarFieldEnum[]
  }

  /**
   * JobPosting findMany
   */
  export type JobPostingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPostings to fetch.
     */
    where?: JobPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPostings to fetch.
     */
    orderBy?: JobPostingOrderByWithRelationInput | JobPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobPostings.
     */
    cursor?: JobPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPostings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobPostings.
     */
    distinct?: JobPostingScalarFieldEnum | JobPostingScalarFieldEnum[]
  }

  /**
   * JobPosting create
   */
  export type JobPostingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * The data needed to create a JobPosting.
     */
    data: XOR<JobPostingCreateInput, JobPostingUncheckedCreateInput>
  }

  /**
   * JobPosting createMany
   */
  export type JobPostingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobPostings.
     */
    data: JobPostingCreateManyInput | JobPostingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobPosting createManyAndReturn
   */
  export type JobPostingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * The data used to create many JobPostings.
     */
    data: JobPostingCreateManyInput | JobPostingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobPosting update
   */
  export type JobPostingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * The data needed to update a JobPosting.
     */
    data: XOR<JobPostingUpdateInput, JobPostingUncheckedUpdateInput>
    /**
     * Choose, which JobPosting to update.
     */
    where: JobPostingWhereUniqueInput
  }

  /**
   * JobPosting updateMany
   */
  export type JobPostingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobPostings.
     */
    data: XOR<JobPostingUpdateManyMutationInput, JobPostingUncheckedUpdateManyInput>
    /**
     * Filter which JobPostings to update
     */
    where?: JobPostingWhereInput
    /**
     * Limit how many JobPostings to update.
     */
    limit?: number
  }

  /**
   * JobPosting updateManyAndReturn
   */
  export type JobPostingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * The data used to update JobPostings.
     */
    data: XOR<JobPostingUpdateManyMutationInput, JobPostingUncheckedUpdateManyInput>
    /**
     * Filter which JobPostings to update
     */
    where?: JobPostingWhereInput
    /**
     * Limit how many JobPostings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobPosting upsert
   */
  export type JobPostingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * The filter to search for the JobPosting to update in case it exists.
     */
    where: JobPostingWhereUniqueInput
    /**
     * In case the JobPosting found by the `where` argument doesn't exist, create a new JobPosting with this data.
     */
    create: XOR<JobPostingCreateInput, JobPostingUncheckedCreateInput>
    /**
     * In case the JobPosting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobPostingUpdateInput, JobPostingUncheckedUpdateInput>
  }

  /**
   * JobPosting delete
   */
  export type JobPostingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter which JobPosting to delete.
     */
    where: JobPostingWhereUniqueInput
  }

  /**
   * JobPosting deleteMany
   */
  export type JobPostingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobPostings to delete
     */
    where?: JobPostingWhereInput
    /**
     * Limit how many JobPostings to delete.
     */
    limit?: number
  }

  /**
   * JobPosting.applications
   */
  export type JobPosting$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    where?: JobApplicationWhereInput
    orderBy?: JobApplicationOrderByWithRelationInput | JobApplicationOrderByWithRelationInput[]
    cursor?: JobApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobApplicationScalarFieldEnum | JobApplicationScalarFieldEnum[]
  }

  /**
   * JobPosting without action
   */
  export type JobPostingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
  }


  /**
   * Model JobApplication
   */

  export type AggregateJobApplication = {
    _count: JobApplicationCountAggregateOutputType | null
    _min: JobApplicationMinAggregateOutputType | null
    _max: JobApplicationMaxAggregateOutputType | null
  }

  export type JobApplicationMinAggregateOutputType = {
    id: string | null
    job_id: string | null
    alumni_id: string | null
    cover_letter: string | null
    resume_url: string | null
    application_status: string | null
    employer_notes: string | null
    applied_at: Date | null
    updated_at: Date | null
  }

  export type JobApplicationMaxAggregateOutputType = {
    id: string | null
    job_id: string | null
    alumni_id: string | null
    cover_letter: string | null
    resume_url: string | null
    application_status: string | null
    employer_notes: string | null
    applied_at: Date | null
    updated_at: Date | null
  }

  export type JobApplicationCountAggregateOutputType = {
    id: number
    job_id: number
    alumni_id: number
    cover_letter: number
    resume_url: number
    application_status: number
    employer_notes: number
    applied_at: number
    updated_at: number
    _all: number
  }


  export type JobApplicationMinAggregateInputType = {
    id?: true
    job_id?: true
    alumni_id?: true
    cover_letter?: true
    resume_url?: true
    application_status?: true
    employer_notes?: true
    applied_at?: true
    updated_at?: true
  }

  export type JobApplicationMaxAggregateInputType = {
    id?: true
    job_id?: true
    alumni_id?: true
    cover_letter?: true
    resume_url?: true
    application_status?: true
    employer_notes?: true
    applied_at?: true
    updated_at?: true
  }

  export type JobApplicationCountAggregateInputType = {
    id?: true
    job_id?: true
    alumni_id?: true
    cover_letter?: true
    resume_url?: true
    application_status?: true
    employer_notes?: true
    applied_at?: true
    updated_at?: true
    _all?: true
  }

  export type JobApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobApplication to aggregate.
     */
    where?: JobApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobApplications to fetch.
     */
    orderBy?: JobApplicationOrderByWithRelationInput | JobApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobApplications
    **/
    _count?: true | JobApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobApplicationMaxAggregateInputType
  }

  export type GetJobApplicationAggregateType<T extends JobApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateJobApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobApplication[P]>
      : GetScalarType<T[P], AggregateJobApplication[P]>
  }




  export type JobApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobApplicationWhereInput
    orderBy?: JobApplicationOrderByWithAggregationInput | JobApplicationOrderByWithAggregationInput[]
    by: JobApplicationScalarFieldEnum[] | JobApplicationScalarFieldEnum
    having?: JobApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobApplicationCountAggregateInputType | true
    _min?: JobApplicationMinAggregateInputType
    _max?: JobApplicationMaxAggregateInputType
  }

  export type JobApplicationGroupByOutputType = {
    id: string
    job_id: string
    alumni_id: string
    cover_letter: string | null
    resume_url: string | null
    application_status: string
    employer_notes: string | null
    applied_at: Date
    updated_at: Date
    _count: JobApplicationCountAggregateOutputType | null
    _min: JobApplicationMinAggregateOutputType | null
    _max: JobApplicationMaxAggregateOutputType | null
  }

  type GetJobApplicationGroupByPayload<T extends JobApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], JobApplicationGroupByOutputType[P]>
        }
      >
    >


  export type JobApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    job_id?: boolean
    alumni_id?: boolean
    cover_letter?: boolean
    resume_url?: boolean
    application_status?: boolean
    employer_notes?: boolean
    applied_at?: boolean
    updated_at?: boolean
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
    alumni?: boolean | AlumniDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobApplication"]>

  export type JobApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    job_id?: boolean
    alumni_id?: boolean
    cover_letter?: boolean
    resume_url?: boolean
    application_status?: boolean
    employer_notes?: boolean
    applied_at?: boolean
    updated_at?: boolean
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
    alumni?: boolean | AlumniDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobApplication"]>

  export type JobApplicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    job_id?: boolean
    alumni_id?: boolean
    cover_letter?: boolean
    resume_url?: boolean
    application_status?: boolean
    employer_notes?: boolean
    applied_at?: boolean
    updated_at?: boolean
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
    alumni?: boolean | AlumniDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobApplication"]>

  export type JobApplicationSelectScalar = {
    id?: boolean
    job_id?: boolean
    alumni_id?: boolean
    cover_letter?: boolean
    resume_url?: boolean
    application_status?: boolean
    employer_notes?: boolean
    applied_at?: boolean
    updated_at?: boolean
  }

  export type JobApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "job_id" | "alumni_id" | "cover_letter" | "resume_url" | "application_status" | "employer_notes" | "applied_at" | "updated_at", ExtArgs["result"]["jobApplication"]>
  export type JobApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
    alumni?: boolean | AlumniDefaultArgs<ExtArgs>
  }
  export type JobApplicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
    alumni?: boolean | AlumniDefaultArgs<ExtArgs>
  }
  export type JobApplicationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
    alumni?: boolean | AlumniDefaultArgs<ExtArgs>
  }

  export type $JobApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobApplication"
    objects: {
      job: Prisma.$JobPostingPayload<ExtArgs>
      alumni: Prisma.$AlumniPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      job_id: string
      alumni_id: string
      cover_letter: string | null
      resume_url: string | null
      application_status: string
      employer_notes: string | null
      applied_at: Date
      updated_at: Date
    }, ExtArgs["result"]["jobApplication"]>
    composites: {}
  }

  type JobApplicationGetPayload<S extends boolean | null | undefined | JobApplicationDefaultArgs> = $Result.GetResult<Prisma.$JobApplicationPayload, S>

  type JobApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobApplicationCountAggregateInputType | true
    }

  export interface JobApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobApplication'], meta: { name: 'JobApplication' } }
    /**
     * Find zero or one JobApplication that matches the filter.
     * @param {JobApplicationFindUniqueArgs} args - Arguments to find a JobApplication
     * @example
     * // Get one JobApplication
     * const jobApplication = await prisma.jobApplication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobApplicationFindUniqueArgs>(args: SelectSubset<T, JobApplicationFindUniqueArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobApplication that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobApplicationFindUniqueOrThrowArgs} args - Arguments to find a JobApplication
     * @example
     * // Get one JobApplication
     * const jobApplication = await prisma.jobApplication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, JobApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobApplication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationFindFirstArgs} args - Arguments to find a JobApplication
     * @example
     * // Get one JobApplication
     * const jobApplication = await prisma.jobApplication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobApplicationFindFirstArgs>(args?: SelectSubset<T, JobApplicationFindFirstArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobApplication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationFindFirstOrThrowArgs} args - Arguments to find a JobApplication
     * @example
     * // Get one JobApplication
     * const jobApplication = await prisma.jobApplication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, JobApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobApplications
     * const jobApplications = await prisma.jobApplication.findMany()
     * 
     * // Get first 10 JobApplications
     * const jobApplications = await prisma.jobApplication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobApplicationWithIdOnly = await prisma.jobApplication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobApplicationFindManyArgs>(args?: SelectSubset<T, JobApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobApplication.
     * @param {JobApplicationCreateArgs} args - Arguments to create a JobApplication.
     * @example
     * // Create one JobApplication
     * const JobApplication = await prisma.jobApplication.create({
     *   data: {
     *     // ... data to create a JobApplication
     *   }
     * })
     * 
     */
    create<T extends JobApplicationCreateArgs>(args: SelectSubset<T, JobApplicationCreateArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobApplications.
     * @param {JobApplicationCreateManyArgs} args - Arguments to create many JobApplications.
     * @example
     * // Create many JobApplications
     * const jobApplication = await prisma.jobApplication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobApplicationCreateManyArgs>(args?: SelectSubset<T, JobApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobApplications and returns the data saved in the database.
     * @param {JobApplicationCreateManyAndReturnArgs} args - Arguments to create many JobApplications.
     * @example
     * // Create many JobApplications
     * const jobApplication = await prisma.jobApplication.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobApplications and only return the `id`
     * const jobApplicationWithIdOnly = await prisma.jobApplication.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobApplicationCreateManyAndReturnArgs>(args?: SelectSubset<T, JobApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JobApplication.
     * @param {JobApplicationDeleteArgs} args - Arguments to delete one JobApplication.
     * @example
     * // Delete one JobApplication
     * const JobApplication = await prisma.jobApplication.delete({
     *   where: {
     *     // ... filter to delete one JobApplication
     *   }
     * })
     * 
     */
    delete<T extends JobApplicationDeleteArgs>(args: SelectSubset<T, JobApplicationDeleteArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobApplication.
     * @param {JobApplicationUpdateArgs} args - Arguments to update one JobApplication.
     * @example
     * // Update one JobApplication
     * const jobApplication = await prisma.jobApplication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobApplicationUpdateArgs>(args: SelectSubset<T, JobApplicationUpdateArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobApplications.
     * @param {JobApplicationDeleteManyArgs} args - Arguments to filter JobApplications to delete.
     * @example
     * // Delete a few JobApplications
     * const { count } = await prisma.jobApplication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobApplicationDeleteManyArgs>(args?: SelectSubset<T, JobApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobApplications
     * const jobApplication = await prisma.jobApplication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobApplicationUpdateManyArgs>(args: SelectSubset<T, JobApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobApplications and returns the data updated in the database.
     * @param {JobApplicationUpdateManyAndReturnArgs} args - Arguments to update many JobApplications.
     * @example
     * // Update many JobApplications
     * const jobApplication = await prisma.jobApplication.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JobApplications and only return the `id`
     * const jobApplicationWithIdOnly = await prisma.jobApplication.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JobApplicationUpdateManyAndReturnArgs>(args: SelectSubset<T, JobApplicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JobApplication.
     * @param {JobApplicationUpsertArgs} args - Arguments to update or create a JobApplication.
     * @example
     * // Update or create a JobApplication
     * const jobApplication = await prisma.jobApplication.upsert({
     *   create: {
     *     // ... data to create a JobApplication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobApplication we want to update
     *   }
     * })
     */
    upsert<T extends JobApplicationUpsertArgs>(args: SelectSubset<T, JobApplicationUpsertArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationCountArgs} args - Arguments to filter JobApplications to count.
     * @example
     * // Count the number of JobApplications
     * const count = await prisma.jobApplication.count({
     *   where: {
     *     // ... the filter for the JobApplications we want to count
     *   }
     * })
    **/
    count<T extends JobApplicationCountArgs>(
      args?: Subset<T, JobApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobApplicationAggregateArgs>(args: Subset<T, JobApplicationAggregateArgs>): Prisma.PrismaPromise<GetJobApplicationAggregateType<T>>

    /**
     * Group by JobApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobApplicationGroupByArgs['orderBy'] }
        : { orderBy?: JobApplicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobApplication model
   */
  readonly fields: JobApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobApplication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job<T extends JobPostingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobPostingDefaultArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    alumni<T extends AlumniDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AlumniDefaultArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JobApplication model
   */
  interface JobApplicationFieldRefs {
    readonly id: FieldRef<"JobApplication", 'String'>
    readonly job_id: FieldRef<"JobApplication", 'String'>
    readonly alumni_id: FieldRef<"JobApplication", 'String'>
    readonly cover_letter: FieldRef<"JobApplication", 'String'>
    readonly resume_url: FieldRef<"JobApplication", 'String'>
    readonly application_status: FieldRef<"JobApplication", 'String'>
    readonly employer_notes: FieldRef<"JobApplication", 'String'>
    readonly applied_at: FieldRef<"JobApplication", 'DateTime'>
    readonly updated_at: FieldRef<"JobApplication", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JobApplication findUnique
   */
  export type JobApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * Filter, which JobApplication to fetch.
     */
    where: JobApplicationWhereUniqueInput
  }

  /**
   * JobApplication findUniqueOrThrow
   */
  export type JobApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * Filter, which JobApplication to fetch.
     */
    where: JobApplicationWhereUniqueInput
  }

  /**
   * JobApplication findFirst
   */
  export type JobApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * Filter, which JobApplication to fetch.
     */
    where?: JobApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobApplications to fetch.
     */
    orderBy?: JobApplicationOrderByWithRelationInput | JobApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobApplications.
     */
    cursor?: JobApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobApplications.
     */
    distinct?: JobApplicationScalarFieldEnum | JobApplicationScalarFieldEnum[]
  }

  /**
   * JobApplication findFirstOrThrow
   */
  export type JobApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * Filter, which JobApplication to fetch.
     */
    where?: JobApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobApplications to fetch.
     */
    orderBy?: JobApplicationOrderByWithRelationInput | JobApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobApplications.
     */
    cursor?: JobApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobApplications.
     */
    distinct?: JobApplicationScalarFieldEnum | JobApplicationScalarFieldEnum[]
  }

  /**
   * JobApplication findMany
   */
  export type JobApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * Filter, which JobApplications to fetch.
     */
    where?: JobApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobApplications to fetch.
     */
    orderBy?: JobApplicationOrderByWithRelationInput | JobApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobApplications.
     */
    cursor?: JobApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobApplications.
     */
    distinct?: JobApplicationScalarFieldEnum | JobApplicationScalarFieldEnum[]
  }

  /**
   * JobApplication create
   */
  export type JobApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a JobApplication.
     */
    data: XOR<JobApplicationCreateInput, JobApplicationUncheckedCreateInput>
  }

  /**
   * JobApplication createMany
   */
  export type JobApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobApplications.
     */
    data: JobApplicationCreateManyInput | JobApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobApplication createManyAndReturn
   */
  export type JobApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * The data used to create many JobApplications.
     */
    data: JobApplicationCreateManyInput | JobApplicationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobApplication update
   */
  export type JobApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a JobApplication.
     */
    data: XOR<JobApplicationUpdateInput, JobApplicationUncheckedUpdateInput>
    /**
     * Choose, which JobApplication to update.
     */
    where: JobApplicationWhereUniqueInput
  }

  /**
   * JobApplication updateMany
   */
  export type JobApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobApplications.
     */
    data: XOR<JobApplicationUpdateManyMutationInput, JobApplicationUncheckedUpdateManyInput>
    /**
     * Filter which JobApplications to update
     */
    where?: JobApplicationWhereInput
    /**
     * Limit how many JobApplications to update.
     */
    limit?: number
  }

  /**
   * JobApplication updateManyAndReturn
   */
  export type JobApplicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * The data used to update JobApplications.
     */
    data: XOR<JobApplicationUpdateManyMutationInput, JobApplicationUncheckedUpdateManyInput>
    /**
     * Filter which JobApplications to update
     */
    where?: JobApplicationWhereInput
    /**
     * Limit how many JobApplications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobApplication upsert
   */
  export type JobApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the JobApplication to update in case it exists.
     */
    where: JobApplicationWhereUniqueInput
    /**
     * In case the JobApplication found by the `where` argument doesn't exist, create a new JobApplication with this data.
     */
    create: XOR<JobApplicationCreateInput, JobApplicationUncheckedCreateInput>
    /**
     * In case the JobApplication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobApplicationUpdateInput, JobApplicationUncheckedUpdateInput>
  }

  /**
   * JobApplication delete
   */
  export type JobApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * Filter which JobApplication to delete.
     */
    where: JobApplicationWhereUniqueInput
  }

  /**
   * JobApplication deleteMany
   */
  export type JobApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobApplications to delete
     */
    where?: JobApplicationWhereInput
    /**
     * Limit how many JobApplications to delete.
     */
    limit?: number
  }

  /**
   * JobApplication without action
   */
  export type JobApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
  }


  /**
   * Model Announcement
   */

  export type AggregateAnnouncement = {
    _count: AnnouncementCountAggregateOutputType | null
    _min: AnnouncementMinAggregateOutputType | null
    _max: AnnouncementMaxAggregateOutputType | null
  }

  export type AnnouncementMinAggregateOutputType = {
    id: string | null
    admin_id: string | null
    title: string | null
    content: string | null
    category: string | null
    image_url: string | null
    is_published: boolean | null
    published_at: Date | null
    expires_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AnnouncementMaxAggregateOutputType = {
    id: string | null
    admin_id: string | null
    title: string | null
    content: string | null
    category: string | null
    image_url: string | null
    is_published: boolean | null
    published_at: Date | null
    expires_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AnnouncementCountAggregateOutputType = {
    id: number
    admin_id: number
    title: number
    content: number
    category: number
    image_url: number
    is_published: number
    published_at: number
    expires_at: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AnnouncementMinAggregateInputType = {
    id?: true
    admin_id?: true
    title?: true
    content?: true
    category?: true
    image_url?: true
    is_published?: true
    published_at?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
  }

  export type AnnouncementMaxAggregateInputType = {
    id?: true
    admin_id?: true
    title?: true
    content?: true
    category?: true
    image_url?: true
    is_published?: true
    published_at?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
  }

  export type AnnouncementCountAggregateInputType = {
    id?: true
    admin_id?: true
    title?: true
    content?: true
    category?: true
    image_url?: true
    is_published?: true
    published_at?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AnnouncementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Announcement to aggregate.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Announcements
    **/
    _count?: true | AnnouncementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnnouncementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnnouncementMaxAggregateInputType
  }

  export type GetAnnouncementAggregateType<T extends AnnouncementAggregateArgs> = {
        [P in keyof T & keyof AggregateAnnouncement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnnouncement[P]>
      : GetScalarType<T[P], AggregateAnnouncement[P]>
  }




  export type AnnouncementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementWhereInput
    orderBy?: AnnouncementOrderByWithAggregationInput | AnnouncementOrderByWithAggregationInput[]
    by: AnnouncementScalarFieldEnum[] | AnnouncementScalarFieldEnum
    having?: AnnouncementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnnouncementCountAggregateInputType | true
    _min?: AnnouncementMinAggregateInputType
    _max?: AnnouncementMaxAggregateInputType
  }

  export type AnnouncementGroupByOutputType = {
    id: string
    admin_id: string
    title: string
    content: string
    category: string
    image_url: string | null
    is_published: boolean
    published_at: Date | null
    expires_at: Date | null
    created_at: Date
    updated_at: Date
    _count: AnnouncementCountAggregateOutputType | null
    _min: AnnouncementMinAggregateOutputType | null
    _max: AnnouncementMaxAggregateOutputType | null
  }

  type GetAnnouncementGroupByPayload<T extends AnnouncementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnnouncementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnnouncementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnnouncementGroupByOutputType[P]>
            : GetScalarType<T[P], AnnouncementGroupByOutputType[P]>
        }
      >
    >


  export type AnnouncementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    admin_id?: boolean
    title?: boolean
    content?: boolean
    category?: boolean
    image_url?: boolean
    is_published?: boolean
    published_at?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    admin?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["announcement"]>

  export type AnnouncementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    admin_id?: boolean
    title?: boolean
    content?: boolean
    category?: boolean
    image_url?: boolean
    is_published?: boolean
    published_at?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    admin?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["announcement"]>

  export type AnnouncementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    admin_id?: boolean
    title?: boolean
    content?: boolean
    category?: boolean
    image_url?: boolean
    is_published?: boolean
    published_at?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    admin?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["announcement"]>

  export type AnnouncementSelectScalar = {
    id?: boolean
    admin_id?: boolean
    title?: boolean
    content?: boolean
    category?: boolean
    image_url?: boolean
    is_published?: boolean
    published_at?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AnnouncementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "admin_id" | "title" | "content" | "category" | "image_url" | "is_published" | "published_at" | "expires_at" | "created_at" | "updated_at", ExtArgs["result"]["announcement"]>
  export type AnnouncementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type AnnouncementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type AnnouncementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $AnnouncementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Announcement"
    objects: {
      admin: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      admin_id: string
      title: string
      content: string
      category: string
      image_url: string | null
      is_published: boolean
      published_at: Date | null
      expires_at: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["announcement"]>
    composites: {}
  }

  type AnnouncementGetPayload<S extends boolean | null | undefined | AnnouncementDefaultArgs> = $Result.GetResult<Prisma.$AnnouncementPayload, S>

  type AnnouncementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnnouncementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnnouncementCountAggregateInputType | true
    }

  export interface AnnouncementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Announcement'], meta: { name: 'Announcement' } }
    /**
     * Find zero or one Announcement that matches the filter.
     * @param {AnnouncementFindUniqueArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnnouncementFindUniqueArgs>(args: SelectSubset<T, AnnouncementFindUniqueArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Announcement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnnouncementFindUniqueOrThrowArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnnouncementFindUniqueOrThrowArgs>(args: SelectSubset<T, AnnouncementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Announcement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindFirstArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnnouncementFindFirstArgs>(args?: SelectSubset<T, AnnouncementFindFirstArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Announcement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindFirstOrThrowArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnnouncementFindFirstOrThrowArgs>(args?: SelectSubset<T, AnnouncementFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Announcements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Announcements
     * const announcements = await prisma.announcement.findMany()
     * 
     * // Get first 10 Announcements
     * const announcements = await prisma.announcement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const announcementWithIdOnly = await prisma.announcement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnnouncementFindManyArgs>(args?: SelectSubset<T, AnnouncementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Announcement.
     * @param {AnnouncementCreateArgs} args - Arguments to create a Announcement.
     * @example
     * // Create one Announcement
     * const Announcement = await prisma.announcement.create({
     *   data: {
     *     // ... data to create a Announcement
     *   }
     * })
     * 
     */
    create<T extends AnnouncementCreateArgs>(args: SelectSubset<T, AnnouncementCreateArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Announcements.
     * @param {AnnouncementCreateManyArgs} args - Arguments to create many Announcements.
     * @example
     * // Create many Announcements
     * const announcement = await prisma.announcement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnnouncementCreateManyArgs>(args?: SelectSubset<T, AnnouncementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Announcements and returns the data saved in the database.
     * @param {AnnouncementCreateManyAndReturnArgs} args - Arguments to create many Announcements.
     * @example
     * // Create many Announcements
     * const announcement = await prisma.announcement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Announcements and only return the `id`
     * const announcementWithIdOnly = await prisma.announcement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnnouncementCreateManyAndReturnArgs>(args?: SelectSubset<T, AnnouncementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Announcement.
     * @param {AnnouncementDeleteArgs} args - Arguments to delete one Announcement.
     * @example
     * // Delete one Announcement
     * const Announcement = await prisma.announcement.delete({
     *   where: {
     *     // ... filter to delete one Announcement
     *   }
     * })
     * 
     */
    delete<T extends AnnouncementDeleteArgs>(args: SelectSubset<T, AnnouncementDeleteArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Announcement.
     * @param {AnnouncementUpdateArgs} args - Arguments to update one Announcement.
     * @example
     * // Update one Announcement
     * const announcement = await prisma.announcement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnnouncementUpdateArgs>(args: SelectSubset<T, AnnouncementUpdateArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Announcements.
     * @param {AnnouncementDeleteManyArgs} args - Arguments to filter Announcements to delete.
     * @example
     * // Delete a few Announcements
     * const { count } = await prisma.announcement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnnouncementDeleteManyArgs>(args?: SelectSubset<T, AnnouncementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Announcements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Announcements
     * const announcement = await prisma.announcement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnnouncementUpdateManyArgs>(args: SelectSubset<T, AnnouncementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Announcements and returns the data updated in the database.
     * @param {AnnouncementUpdateManyAndReturnArgs} args - Arguments to update many Announcements.
     * @example
     * // Update many Announcements
     * const announcement = await prisma.announcement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Announcements and only return the `id`
     * const announcementWithIdOnly = await prisma.announcement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnnouncementUpdateManyAndReturnArgs>(args: SelectSubset<T, AnnouncementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Announcement.
     * @param {AnnouncementUpsertArgs} args - Arguments to update or create a Announcement.
     * @example
     * // Update or create a Announcement
     * const announcement = await prisma.announcement.upsert({
     *   create: {
     *     // ... data to create a Announcement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Announcement we want to update
     *   }
     * })
     */
    upsert<T extends AnnouncementUpsertArgs>(args: SelectSubset<T, AnnouncementUpsertArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Announcements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementCountArgs} args - Arguments to filter Announcements to count.
     * @example
     * // Count the number of Announcements
     * const count = await prisma.announcement.count({
     *   where: {
     *     // ... the filter for the Announcements we want to count
     *   }
     * })
    **/
    count<T extends AnnouncementCountArgs>(
      args?: Subset<T, AnnouncementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnnouncementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Announcement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnnouncementAggregateArgs>(args: Subset<T, AnnouncementAggregateArgs>): Prisma.PrismaPromise<GetAnnouncementAggregateType<T>>

    /**
     * Group by Announcement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnnouncementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnnouncementGroupByArgs['orderBy'] }
        : { orderBy?: AnnouncementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnnouncementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnnouncementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Announcement model
   */
  readonly fields: AnnouncementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Announcement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnnouncementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Announcement model
   */
  interface AnnouncementFieldRefs {
    readonly id: FieldRef<"Announcement", 'String'>
    readonly admin_id: FieldRef<"Announcement", 'String'>
    readonly title: FieldRef<"Announcement", 'String'>
    readonly content: FieldRef<"Announcement", 'String'>
    readonly category: FieldRef<"Announcement", 'String'>
    readonly image_url: FieldRef<"Announcement", 'String'>
    readonly is_published: FieldRef<"Announcement", 'Boolean'>
    readonly published_at: FieldRef<"Announcement", 'DateTime'>
    readonly expires_at: FieldRef<"Announcement", 'DateTime'>
    readonly created_at: FieldRef<"Announcement", 'DateTime'>
    readonly updated_at: FieldRef<"Announcement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Announcement findUnique
   */
  export type AnnouncementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement findUniqueOrThrow
   */
  export type AnnouncementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement findFirst
   */
  export type AnnouncementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Announcements.
     */
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement findFirstOrThrow
   */
  export type AnnouncementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Announcements.
     */
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement findMany
   */
  export type AnnouncementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcements to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Announcements.
     */
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement create
   */
  export type AnnouncementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * The data needed to create a Announcement.
     */
    data: XOR<AnnouncementCreateInput, AnnouncementUncheckedCreateInput>
  }

  /**
   * Announcement createMany
   */
  export type AnnouncementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Announcements.
     */
    data: AnnouncementCreateManyInput | AnnouncementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Announcement createManyAndReturn
   */
  export type AnnouncementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * The data used to create many Announcements.
     */
    data: AnnouncementCreateManyInput | AnnouncementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Announcement update
   */
  export type AnnouncementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * The data needed to update a Announcement.
     */
    data: XOR<AnnouncementUpdateInput, AnnouncementUncheckedUpdateInput>
    /**
     * Choose, which Announcement to update.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement updateMany
   */
  export type AnnouncementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Announcements.
     */
    data: XOR<AnnouncementUpdateManyMutationInput, AnnouncementUncheckedUpdateManyInput>
    /**
     * Filter which Announcements to update
     */
    where?: AnnouncementWhereInput
    /**
     * Limit how many Announcements to update.
     */
    limit?: number
  }

  /**
   * Announcement updateManyAndReturn
   */
  export type AnnouncementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * The data used to update Announcements.
     */
    data: XOR<AnnouncementUpdateManyMutationInput, AnnouncementUncheckedUpdateManyInput>
    /**
     * Filter which Announcements to update
     */
    where?: AnnouncementWhereInput
    /**
     * Limit how many Announcements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Announcement upsert
   */
  export type AnnouncementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * The filter to search for the Announcement to update in case it exists.
     */
    where: AnnouncementWhereUniqueInput
    /**
     * In case the Announcement found by the `where` argument doesn't exist, create a new Announcement with this data.
     */
    create: XOR<AnnouncementCreateInput, AnnouncementUncheckedCreateInput>
    /**
     * In case the Announcement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnnouncementUpdateInput, AnnouncementUncheckedUpdateInput>
  }

  /**
   * Announcement delete
   */
  export type AnnouncementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter which Announcement to delete.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement deleteMany
   */
  export type AnnouncementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Announcements to delete
     */
    where?: AnnouncementWhereInput
    /**
     * Limit how many Announcements to delete.
     */
    limit?: number
  }

  /**
   * Announcement without action
   */
  export type AnnouncementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    action: string | null
    table_name: string | null
    record_id: string | null
    ip_address: string | null
    user_agent: string | null
    created_at: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    action: string | null
    table_name: string | null
    record_id: string | null
    ip_address: string | null
    user_agent: string | null
    created_at: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    user_id: number
    action: number
    table_name: number
    record_id: number
    old_values: number
    new_values: number
    ip_address: number
    user_agent: number
    created_at: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    user_id?: true
    action?: true
    table_name?: true
    record_id?: true
    ip_address?: true
    user_agent?: true
    created_at?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    user_id?: true
    action?: true
    table_name?: true
    record_id?: true
    ip_address?: true
    user_agent?: true
    created_at?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    user_id?: true
    action?: true
    table_name?: true
    record_id?: true
    old_values?: true
    new_values?: true
    ip_address?: true
    user_agent?: true
    created_at?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    user_id: string | null
    action: string
    table_name: string | null
    record_id: string | null
    old_values: JsonValue | null
    new_values: JsonValue | null
    ip_address: string | null
    user_agent: string | null
    created_at: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    action?: boolean
    table_name?: boolean
    record_id?: boolean
    old_values?: boolean
    new_values?: boolean
    ip_address?: boolean
    user_agent?: boolean
    created_at?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    action?: boolean
    table_name?: boolean
    record_id?: boolean
    old_values?: boolean
    new_values?: boolean
    ip_address?: boolean
    user_agent?: boolean
    created_at?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    action?: boolean
    table_name?: boolean
    record_id?: boolean
    old_values?: boolean
    new_values?: boolean
    ip_address?: boolean
    user_agent?: boolean
    created_at?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    user_id?: boolean
    action?: boolean
    table_name?: boolean
    record_id?: boolean
    old_values?: boolean
    new_values?: boolean
    ip_address?: boolean
    user_agent?: boolean
    created_at?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "action" | "table_name" | "record_id" | "old_values" | "new_values" | "ip_address" | "user_agent" | "created_at", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$ProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string | null
      action: string
      table_name: string | null
      record_id: string | null
      old_values: Prisma.JsonValue | null
      new_values: Prisma.JsonValue | null
      ip_address: string | null
      user_agent: string | null
      created_at: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AuditLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$userArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly user_id: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly table_name: FieldRef<"AuditLog", 'String'>
    readonly record_id: FieldRef<"AuditLog", 'String'>
    readonly old_values: FieldRef<"AuditLog", 'Json'>
    readonly new_values: FieldRef<"AuditLog", 'Json'>
    readonly ip_address: FieldRef<"AuditLog", 'String'>
    readonly user_agent: FieldRef<"AuditLog", 'String'>
    readonly created_at: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog.user
   */
  export type AuditLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    title: string | null
    message: string | null
    type: string | null
    is_read: boolean | null
    action_url: string | null
    created_at: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    title: string | null
    message: string | null
    type: string | null
    is_read: boolean | null
    action_url: string | null
    created_at: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    user_id: number
    title: number
    message: number
    type: number
    is_read: number
    action_url: number
    created_at: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    message?: true
    type?: true
    is_read?: true
    action_url?: true
    created_at?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    message?: true
    type?: true
    is_read?: true
    action_url?: true
    created_at?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    message?: true
    type?: true
    is_read?: true
    action_url?: true
    created_at?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    user_id: string
    title: string
    message: string
    type: string | null
    is_read: boolean
    action_url: string | null
    created_at: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    is_read?: boolean
    action_url?: boolean
    created_at?: boolean
    user?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    is_read?: boolean
    action_url?: boolean
    created_at?: boolean
    user?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    is_read?: boolean
    action_url?: boolean
    created_at?: boolean
    user?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    user_id?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    is_read?: boolean
    action_url?: boolean
    created_at?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "title" | "message" | "type" | "is_read" | "action_url" | "created_at", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      title: string
      message: string
      type: string | null
      is_read: boolean
      action_url: string | null
      created_at: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly user_id: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly is_read: FieldRef<"Notification", 'Boolean'>
    readonly action_url: FieldRef<"Notification", 'String'>
    readonly created_at: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    role: 'role',
    full_name: 'full_name',
    email: 'email',
    phone: 'phone',
    profile_photo_url: 'profile_photo_url',
    is_verified: 'is_verified',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const AlumniScalarFieldEnum: {
    id: 'id',
    student_id: 'student_id',
    course: 'course',
    major: 'major',
    batch_year: 'batch_year',
    graduation_year: 'graduation_year',
    address: 'address',
    city: 'city',
    province: 'province',
    linkedin_url: 'linkedin_url',
    resume_url: 'resume_url',
    is_profile_public: 'is_profile_public',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AlumniScalarFieldEnum = (typeof AlumniScalarFieldEnum)[keyof typeof AlumniScalarFieldEnum]


  export const EmployerScalarFieldEnum: {
    id: 'id',
    company_name: 'company_name',
    industry: 'industry',
    company_size: 'company_size',
    business_permit_number: 'business_permit_number',
    company_address: 'company_address',
    company_website: 'company_website',
    company_logo_url: 'company_logo_url',
    company_description: 'company_description',
    approval_status: 'approval_status',
    rejection_reason: 'rejection_reason',
    approved_at: 'approved_at',
    approved_by: 'approved_by',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type EmployerScalarFieldEnum = (typeof EmployerScalarFieldEnum)[keyof typeof EmployerScalarFieldEnum]


  export const CareerRecordScalarFieldEnum: {
    id: 'id',
    alumni_id: 'alumni_id',
    employment_status: 'employment_status',
    employer_name: 'employer_name',
    job_title: 'job_title',
    industry: 'industry',
    employment_type: 'employment_type',
    salary_range: 'salary_range',
    start_date: 'start_date',
    end_date: 'end_date',
    is_current: 'is_current',
    country: 'country',
    city: 'city',
    job_description: 'job_description',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type CareerRecordScalarFieldEnum = (typeof CareerRecordScalarFieldEnum)[keyof typeof CareerRecordScalarFieldEnum]


  export const JobPostingScalarFieldEnum: {
    id: 'id',
    employer_id: 'employer_id',
    title: 'title',
    description: 'description',
    requirements: 'requirements',
    job_type: 'job_type',
    industry: 'industry',
    location: 'location',
    is_remote: 'is_remote',
    salary_min: 'salary_min',
    salary_max: 'salary_max',
    preferred_courses: 'preferred_courses',
    slots: 'slots',
    expires_at: 'expires_at',
    status: 'status',
    rejection_reason: 'rejection_reason',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type JobPostingScalarFieldEnum = (typeof JobPostingScalarFieldEnum)[keyof typeof JobPostingScalarFieldEnum]


  export const JobApplicationScalarFieldEnum: {
    id: 'id',
    job_id: 'job_id',
    alumni_id: 'alumni_id',
    cover_letter: 'cover_letter',
    resume_url: 'resume_url',
    application_status: 'application_status',
    employer_notes: 'employer_notes',
    applied_at: 'applied_at',
    updated_at: 'updated_at'
  };

  export type JobApplicationScalarFieldEnum = (typeof JobApplicationScalarFieldEnum)[keyof typeof JobApplicationScalarFieldEnum]


  export const AnnouncementScalarFieldEnum: {
    id: 'id',
    admin_id: 'admin_id',
    title: 'title',
    content: 'content',
    category: 'category',
    image_url: 'image_url',
    is_published: 'is_published',
    published_at: 'published_at',
    expires_at: 'expires_at',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AnnouncementScalarFieldEnum = (typeof AnnouncementScalarFieldEnum)[keyof typeof AnnouncementScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    action: 'action',
    table_name: 'table_name',
    record_id: 'record_id',
    old_values: 'old_values',
    new_values: 'new_values',
    ip_address: 'ip_address',
    user_agent: 'user_agent',
    created_at: 'created_at'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    title: 'title',
    message: 'message',
    type: 'type',
    is_read: 'is_read',
    action_url: 'action_url',
    created_at: 'created_at'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: UuidFilter<"Profile"> | string
    role?: StringFilter<"Profile"> | string
    full_name?: StringFilter<"Profile"> | string
    email?: StringFilter<"Profile"> | string
    phone?: StringNullableFilter<"Profile"> | string | null
    profile_photo_url?: StringNullableFilter<"Profile"> | string | null
    is_verified?: BoolFilter<"Profile"> | boolean
    is_active?: BoolFilter<"Profile"> | boolean
    created_at?: DateTimeFilter<"Profile"> | Date | string
    updated_at?: DateTimeFilter<"Profile"> | Date | string
    alumni?: XOR<AlumniNullableScalarRelationFilter, AlumniWhereInput> | null
    employer?: XOR<EmployerNullableScalarRelationFilter, EmployerWhereInput> | null
    notifications?: NotificationListRelationFilter
    audit_logs?: AuditLogListRelationFilter
    announcements?: AnnouncementListRelationFilter
    approved_employers?: EmployerListRelationFilter
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    profile_photo_url?: SortOrderInput | SortOrder
    is_verified?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    alumni?: AlumniOrderByWithRelationInput
    employer?: EmployerOrderByWithRelationInput
    notifications?: NotificationOrderByRelationAggregateInput
    audit_logs?: AuditLogOrderByRelationAggregateInput
    announcements?: AnnouncementOrderByRelationAggregateInput
    approved_employers?: EmployerOrderByRelationAggregateInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    role?: StringFilter<"Profile"> | string
    full_name?: StringFilter<"Profile"> | string
    phone?: StringNullableFilter<"Profile"> | string | null
    profile_photo_url?: StringNullableFilter<"Profile"> | string | null
    is_verified?: BoolFilter<"Profile"> | boolean
    is_active?: BoolFilter<"Profile"> | boolean
    created_at?: DateTimeFilter<"Profile"> | Date | string
    updated_at?: DateTimeFilter<"Profile"> | Date | string
    alumni?: XOR<AlumniNullableScalarRelationFilter, AlumniWhereInput> | null
    employer?: XOR<EmployerNullableScalarRelationFilter, EmployerWhereInput> | null
    notifications?: NotificationListRelationFilter
    audit_logs?: AuditLogListRelationFilter
    announcements?: AnnouncementListRelationFilter
    approved_employers?: EmployerListRelationFilter
  }, "id" | "email">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    profile_photo_url?: SortOrderInput | SortOrder
    is_verified?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Profile"> | string
    role?: StringWithAggregatesFilter<"Profile"> | string
    full_name?: StringWithAggregatesFilter<"Profile"> | string
    email?: StringWithAggregatesFilter<"Profile"> | string
    phone?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    profile_photo_url?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    is_verified?: BoolWithAggregatesFilter<"Profile"> | boolean
    is_active?: BoolWithAggregatesFilter<"Profile"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type AlumniWhereInput = {
    AND?: AlumniWhereInput | AlumniWhereInput[]
    OR?: AlumniWhereInput[]
    NOT?: AlumniWhereInput | AlumniWhereInput[]
    id?: UuidFilter<"Alumni"> | string
    student_id?: StringNullableFilter<"Alumni"> | string | null
    course?: StringFilter<"Alumni"> | string
    major?: StringNullableFilter<"Alumni"> | string | null
    batch_year?: IntFilter<"Alumni"> | number
    graduation_year?: IntFilter<"Alumni"> | number
    address?: StringNullableFilter<"Alumni"> | string | null
    city?: StringNullableFilter<"Alumni"> | string | null
    province?: StringNullableFilter<"Alumni"> | string | null
    linkedin_url?: StringNullableFilter<"Alumni"> | string | null
    resume_url?: StringNullableFilter<"Alumni"> | string | null
    is_profile_public?: BoolFilter<"Alumni"> | boolean
    created_at?: DateTimeFilter<"Alumni"> | Date | string
    updated_at?: DateTimeFilter<"Alumni"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    career_records?: CareerRecordListRelationFilter
    job_applications?: JobApplicationListRelationFilter
  }

  export type AlumniOrderByWithRelationInput = {
    id?: SortOrder
    student_id?: SortOrderInput | SortOrder
    course?: SortOrder
    major?: SortOrderInput | SortOrder
    batch_year?: SortOrder
    graduation_year?: SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    province?: SortOrderInput | SortOrder
    linkedin_url?: SortOrderInput | SortOrder
    resume_url?: SortOrderInput | SortOrder
    is_profile_public?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    career_records?: CareerRecordOrderByRelationAggregateInput
    job_applications?: JobApplicationOrderByRelationAggregateInput
  }

  export type AlumniWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    student_id?: string
    AND?: AlumniWhereInput | AlumniWhereInput[]
    OR?: AlumniWhereInput[]
    NOT?: AlumniWhereInput | AlumniWhereInput[]
    course?: StringFilter<"Alumni"> | string
    major?: StringNullableFilter<"Alumni"> | string | null
    batch_year?: IntFilter<"Alumni"> | number
    graduation_year?: IntFilter<"Alumni"> | number
    address?: StringNullableFilter<"Alumni"> | string | null
    city?: StringNullableFilter<"Alumni"> | string | null
    province?: StringNullableFilter<"Alumni"> | string | null
    linkedin_url?: StringNullableFilter<"Alumni"> | string | null
    resume_url?: StringNullableFilter<"Alumni"> | string | null
    is_profile_public?: BoolFilter<"Alumni"> | boolean
    created_at?: DateTimeFilter<"Alumni"> | Date | string
    updated_at?: DateTimeFilter<"Alumni"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    career_records?: CareerRecordListRelationFilter
    job_applications?: JobApplicationListRelationFilter
  }, "id" | "student_id">

  export type AlumniOrderByWithAggregationInput = {
    id?: SortOrder
    student_id?: SortOrderInput | SortOrder
    course?: SortOrder
    major?: SortOrderInput | SortOrder
    batch_year?: SortOrder
    graduation_year?: SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    province?: SortOrderInput | SortOrder
    linkedin_url?: SortOrderInput | SortOrder
    resume_url?: SortOrderInput | SortOrder
    is_profile_public?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AlumniCountOrderByAggregateInput
    _avg?: AlumniAvgOrderByAggregateInput
    _max?: AlumniMaxOrderByAggregateInput
    _min?: AlumniMinOrderByAggregateInput
    _sum?: AlumniSumOrderByAggregateInput
  }

  export type AlumniScalarWhereWithAggregatesInput = {
    AND?: AlumniScalarWhereWithAggregatesInput | AlumniScalarWhereWithAggregatesInput[]
    OR?: AlumniScalarWhereWithAggregatesInput[]
    NOT?: AlumniScalarWhereWithAggregatesInput | AlumniScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Alumni"> | string
    student_id?: StringNullableWithAggregatesFilter<"Alumni"> | string | null
    course?: StringWithAggregatesFilter<"Alumni"> | string
    major?: StringNullableWithAggregatesFilter<"Alumni"> | string | null
    batch_year?: IntWithAggregatesFilter<"Alumni"> | number
    graduation_year?: IntWithAggregatesFilter<"Alumni"> | number
    address?: StringNullableWithAggregatesFilter<"Alumni"> | string | null
    city?: StringNullableWithAggregatesFilter<"Alumni"> | string | null
    province?: StringNullableWithAggregatesFilter<"Alumni"> | string | null
    linkedin_url?: StringNullableWithAggregatesFilter<"Alumni"> | string | null
    resume_url?: StringNullableWithAggregatesFilter<"Alumni"> | string | null
    is_profile_public?: BoolWithAggregatesFilter<"Alumni"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Alumni"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Alumni"> | Date | string
  }

  export type EmployerWhereInput = {
    AND?: EmployerWhereInput | EmployerWhereInput[]
    OR?: EmployerWhereInput[]
    NOT?: EmployerWhereInput | EmployerWhereInput[]
    id?: UuidFilter<"Employer"> | string
    company_name?: StringFilter<"Employer"> | string
    industry?: StringFilter<"Employer"> | string
    company_size?: StringNullableFilter<"Employer"> | string | null
    business_permit_number?: StringNullableFilter<"Employer"> | string | null
    company_address?: StringNullableFilter<"Employer"> | string | null
    company_website?: StringNullableFilter<"Employer"> | string | null
    company_logo_url?: StringNullableFilter<"Employer"> | string | null
    company_description?: StringNullableFilter<"Employer"> | string | null
    approval_status?: StringFilter<"Employer"> | string
    rejection_reason?: StringNullableFilter<"Employer"> | string | null
    approved_at?: DateTimeNullableFilter<"Employer"> | Date | string | null
    approved_by?: UuidNullableFilter<"Employer"> | string | null
    created_at?: DateTimeFilter<"Employer"> | Date | string
    updated_at?: DateTimeFilter<"Employer"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    approver?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    job_postings?: JobPostingListRelationFilter
  }

  export type EmployerOrderByWithRelationInput = {
    id?: SortOrder
    company_name?: SortOrder
    industry?: SortOrder
    company_size?: SortOrderInput | SortOrder
    business_permit_number?: SortOrderInput | SortOrder
    company_address?: SortOrderInput | SortOrder
    company_website?: SortOrderInput | SortOrder
    company_logo_url?: SortOrderInput | SortOrder
    company_description?: SortOrderInput | SortOrder
    approval_status?: SortOrder
    rejection_reason?: SortOrderInput | SortOrder
    approved_at?: SortOrderInput | SortOrder
    approved_by?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    approver?: ProfileOrderByWithRelationInput
    job_postings?: JobPostingOrderByRelationAggregateInput
  }

  export type EmployerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmployerWhereInput | EmployerWhereInput[]
    OR?: EmployerWhereInput[]
    NOT?: EmployerWhereInput | EmployerWhereInput[]
    company_name?: StringFilter<"Employer"> | string
    industry?: StringFilter<"Employer"> | string
    company_size?: StringNullableFilter<"Employer"> | string | null
    business_permit_number?: StringNullableFilter<"Employer"> | string | null
    company_address?: StringNullableFilter<"Employer"> | string | null
    company_website?: StringNullableFilter<"Employer"> | string | null
    company_logo_url?: StringNullableFilter<"Employer"> | string | null
    company_description?: StringNullableFilter<"Employer"> | string | null
    approval_status?: StringFilter<"Employer"> | string
    rejection_reason?: StringNullableFilter<"Employer"> | string | null
    approved_at?: DateTimeNullableFilter<"Employer"> | Date | string | null
    approved_by?: UuidNullableFilter<"Employer"> | string | null
    created_at?: DateTimeFilter<"Employer"> | Date | string
    updated_at?: DateTimeFilter<"Employer"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    approver?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    job_postings?: JobPostingListRelationFilter
  }, "id">

  export type EmployerOrderByWithAggregationInput = {
    id?: SortOrder
    company_name?: SortOrder
    industry?: SortOrder
    company_size?: SortOrderInput | SortOrder
    business_permit_number?: SortOrderInput | SortOrder
    company_address?: SortOrderInput | SortOrder
    company_website?: SortOrderInput | SortOrder
    company_logo_url?: SortOrderInput | SortOrder
    company_description?: SortOrderInput | SortOrder
    approval_status?: SortOrder
    rejection_reason?: SortOrderInput | SortOrder
    approved_at?: SortOrderInput | SortOrder
    approved_by?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: EmployerCountOrderByAggregateInput
    _max?: EmployerMaxOrderByAggregateInput
    _min?: EmployerMinOrderByAggregateInput
  }

  export type EmployerScalarWhereWithAggregatesInput = {
    AND?: EmployerScalarWhereWithAggregatesInput | EmployerScalarWhereWithAggregatesInput[]
    OR?: EmployerScalarWhereWithAggregatesInput[]
    NOT?: EmployerScalarWhereWithAggregatesInput | EmployerScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Employer"> | string
    company_name?: StringWithAggregatesFilter<"Employer"> | string
    industry?: StringWithAggregatesFilter<"Employer"> | string
    company_size?: StringNullableWithAggregatesFilter<"Employer"> | string | null
    business_permit_number?: StringNullableWithAggregatesFilter<"Employer"> | string | null
    company_address?: StringNullableWithAggregatesFilter<"Employer"> | string | null
    company_website?: StringNullableWithAggregatesFilter<"Employer"> | string | null
    company_logo_url?: StringNullableWithAggregatesFilter<"Employer"> | string | null
    company_description?: StringNullableWithAggregatesFilter<"Employer"> | string | null
    approval_status?: StringWithAggregatesFilter<"Employer"> | string
    rejection_reason?: StringNullableWithAggregatesFilter<"Employer"> | string | null
    approved_at?: DateTimeNullableWithAggregatesFilter<"Employer"> | Date | string | null
    approved_by?: UuidNullableWithAggregatesFilter<"Employer"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Employer"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Employer"> | Date | string
  }

  export type CareerRecordWhereInput = {
    AND?: CareerRecordWhereInput | CareerRecordWhereInput[]
    OR?: CareerRecordWhereInput[]
    NOT?: CareerRecordWhereInput | CareerRecordWhereInput[]
    id?: UuidFilter<"CareerRecord"> | string
    alumni_id?: UuidFilter<"CareerRecord"> | string
    employment_status?: StringFilter<"CareerRecord"> | string
    employer_name?: StringNullableFilter<"CareerRecord"> | string | null
    job_title?: StringNullableFilter<"CareerRecord"> | string | null
    industry?: StringNullableFilter<"CareerRecord"> | string | null
    employment_type?: StringNullableFilter<"CareerRecord"> | string | null
    salary_range?: StringNullableFilter<"CareerRecord"> | string | null
    start_date?: DateTimeNullableFilter<"CareerRecord"> | Date | string | null
    end_date?: DateTimeNullableFilter<"CareerRecord"> | Date | string | null
    is_current?: BoolFilter<"CareerRecord"> | boolean
    country?: StringFilter<"CareerRecord"> | string
    city?: StringNullableFilter<"CareerRecord"> | string | null
    job_description?: StringNullableFilter<"CareerRecord"> | string | null
    created_at?: DateTimeFilter<"CareerRecord"> | Date | string
    updated_at?: DateTimeFilter<"CareerRecord"> | Date | string
    alumni?: XOR<AlumniScalarRelationFilter, AlumniWhereInput>
  }

  export type CareerRecordOrderByWithRelationInput = {
    id?: SortOrder
    alumni_id?: SortOrder
    employment_status?: SortOrder
    employer_name?: SortOrderInput | SortOrder
    job_title?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    employment_type?: SortOrderInput | SortOrder
    salary_range?: SortOrderInput | SortOrder
    start_date?: SortOrderInput | SortOrder
    end_date?: SortOrderInput | SortOrder
    is_current?: SortOrder
    country?: SortOrder
    city?: SortOrderInput | SortOrder
    job_description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    alumni?: AlumniOrderByWithRelationInput
  }

  export type CareerRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CareerRecordWhereInput | CareerRecordWhereInput[]
    OR?: CareerRecordWhereInput[]
    NOT?: CareerRecordWhereInput | CareerRecordWhereInput[]
    alumni_id?: UuidFilter<"CareerRecord"> | string
    employment_status?: StringFilter<"CareerRecord"> | string
    employer_name?: StringNullableFilter<"CareerRecord"> | string | null
    job_title?: StringNullableFilter<"CareerRecord"> | string | null
    industry?: StringNullableFilter<"CareerRecord"> | string | null
    employment_type?: StringNullableFilter<"CareerRecord"> | string | null
    salary_range?: StringNullableFilter<"CareerRecord"> | string | null
    start_date?: DateTimeNullableFilter<"CareerRecord"> | Date | string | null
    end_date?: DateTimeNullableFilter<"CareerRecord"> | Date | string | null
    is_current?: BoolFilter<"CareerRecord"> | boolean
    country?: StringFilter<"CareerRecord"> | string
    city?: StringNullableFilter<"CareerRecord"> | string | null
    job_description?: StringNullableFilter<"CareerRecord"> | string | null
    created_at?: DateTimeFilter<"CareerRecord"> | Date | string
    updated_at?: DateTimeFilter<"CareerRecord"> | Date | string
    alumni?: XOR<AlumniScalarRelationFilter, AlumniWhereInput>
  }, "id">

  export type CareerRecordOrderByWithAggregationInput = {
    id?: SortOrder
    alumni_id?: SortOrder
    employment_status?: SortOrder
    employer_name?: SortOrderInput | SortOrder
    job_title?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    employment_type?: SortOrderInput | SortOrder
    salary_range?: SortOrderInput | SortOrder
    start_date?: SortOrderInput | SortOrder
    end_date?: SortOrderInput | SortOrder
    is_current?: SortOrder
    country?: SortOrder
    city?: SortOrderInput | SortOrder
    job_description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: CareerRecordCountOrderByAggregateInput
    _max?: CareerRecordMaxOrderByAggregateInput
    _min?: CareerRecordMinOrderByAggregateInput
  }

  export type CareerRecordScalarWhereWithAggregatesInput = {
    AND?: CareerRecordScalarWhereWithAggregatesInput | CareerRecordScalarWhereWithAggregatesInput[]
    OR?: CareerRecordScalarWhereWithAggregatesInput[]
    NOT?: CareerRecordScalarWhereWithAggregatesInput | CareerRecordScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CareerRecord"> | string
    alumni_id?: UuidWithAggregatesFilter<"CareerRecord"> | string
    employment_status?: StringWithAggregatesFilter<"CareerRecord"> | string
    employer_name?: StringNullableWithAggregatesFilter<"CareerRecord"> | string | null
    job_title?: StringNullableWithAggregatesFilter<"CareerRecord"> | string | null
    industry?: StringNullableWithAggregatesFilter<"CareerRecord"> | string | null
    employment_type?: StringNullableWithAggregatesFilter<"CareerRecord"> | string | null
    salary_range?: StringNullableWithAggregatesFilter<"CareerRecord"> | string | null
    start_date?: DateTimeNullableWithAggregatesFilter<"CareerRecord"> | Date | string | null
    end_date?: DateTimeNullableWithAggregatesFilter<"CareerRecord"> | Date | string | null
    is_current?: BoolWithAggregatesFilter<"CareerRecord"> | boolean
    country?: StringWithAggregatesFilter<"CareerRecord"> | string
    city?: StringNullableWithAggregatesFilter<"CareerRecord"> | string | null
    job_description?: StringNullableWithAggregatesFilter<"CareerRecord"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"CareerRecord"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"CareerRecord"> | Date | string
  }

  export type JobPostingWhereInput = {
    AND?: JobPostingWhereInput | JobPostingWhereInput[]
    OR?: JobPostingWhereInput[]
    NOT?: JobPostingWhereInput | JobPostingWhereInput[]
    id?: UuidFilter<"JobPosting"> | string
    employer_id?: UuidFilter<"JobPosting"> | string
    title?: StringFilter<"JobPosting"> | string
    description?: StringFilter<"JobPosting"> | string
    requirements?: StringNullableFilter<"JobPosting"> | string | null
    job_type?: StringFilter<"JobPosting"> | string
    industry?: StringFilter<"JobPosting"> | string
    location?: StringNullableFilter<"JobPosting"> | string | null
    is_remote?: BoolFilter<"JobPosting"> | boolean
    salary_min?: DecimalNullableFilter<"JobPosting"> | Decimal | DecimalJsLike | number | string | null
    salary_max?: DecimalNullableFilter<"JobPosting"> | Decimal | DecimalJsLike | number | string | null
    preferred_courses?: StringNullableListFilter<"JobPosting">
    slots?: IntFilter<"JobPosting"> | number
    expires_at?: DateTimeFilter<"JobPosting"> | Date | string
    status?: StringFilter<"JobPosting"> | string
    rejection_reason?: StringNullableFilter<"JobPosting"> | string | null
    created_at?: DateTimeFilter<"JobPosting"> | Date | string
    updated_at?: DateTimeFilter<"JobPosting"> | Date | string
    employer?: XOR<EmployerScalarRelationFilter, EmployerWhereInput>
    applications?: JobApplicationListRelationFilter
  }

  export type JobPostingOrderByWithRelationInput = {
    id?: SortOrder
    employer_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    requirements?: SortOrderInput | SortOrder
    job_type?: SortOrder
    industry?: SortOrder
    location?: SortOrderInput | SortOrder
    is_remote?: SortOrder
    salary_min?: SortOrderInput | SortOrder
    salary_max?: SortOrderInput | SortOrder
    preferred_courses?: SortOrder
    slots?: SortOrder
    expires_at?: SortOrder
    status?: SortOrder
    rejection_reason?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    employer?: EmployerOrderByWithRelationInput
    applications?: JobApplicationOrderByRelationAggregateInput
  }

  export type JobPostingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobPostingWhereInput | JobPostingWhereInput[]
    OR?: JobPostingWhereInput[]
    NOT?: JobPostingWhereInput | JobPostingWhereInput[]
    employer_id?: UuidFilter<"JobPosting"> | string
    title?: StringFilter<"JobPosting"> | string
    description?: StringFilter<"JobPosting"> | string
    requirements?: StringNullableFilter<"JobPosting"> | string | null
    job_type?: StringFilter<"JobPosting"> | string
    industry?: StringFilter<"JobPosting"> | string
    location?: StringNullableFilter<"JobPosting"> | string | null
    is_remote?: BoolFilter<"JobPosting"> | boolean
    salary_min?: DecimalNullableFilter<"JobPosting"> | Decimal | DecimalJsLike | number | string | null
    salary_max?: DecimalNullableFilter<"JobPosting"> | Decimal | DecimalJsLike | number | string | null
    preferred_courses?: StringNullableListFilter<"JobPosting">
    slots?: IntFilter<"JobPosting"> | number
    expires_at?: DateTimeFilter<"JobPosting"> | Date | string
    status?: StringFilter<"JobPosting"> | string
    rejection_reason?: StringNullableFilter<"JobPosting"> | string | null
    created_at?: DateTimeFilter<"JobPosting"> | Date | string
    updated_at?: DateTimeFilter<"JobPosting"> | Date | string
    employer?: XOR<EmployerScalarRelationFilter, EmployerWhereInput>
    applications?: JobApplicationListRelationFilter
  }, "id">

  export type JobPostingOrderByWithAggregationInput = {
    id?: SortOrder
    employer_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    requirements?: SortOrderInput | SortOrder
    job_type?: SortOrder
    industry?: SortOrder
    location?: SortOrderInput | SortOrder
    is_remote?: SortOrder
    salary_min?: SortOrderInput | SortOrder
    salary_max?: SortOrderInput | SortOrder
    preferred_courses?: SortOrder
    slots?: SortOrder
    expires_at?: SortOrder
    status?: SortOrder
    rejection_reason?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: JobPostingCountOrderByAggregateInput
    _avg?: JobPostingAvgOrderByAggregateInput
    _max?: JobPostingMaxOrderByAggregateInput
    _min?: JobPostingMinOrderByAggregateInput
    _sum?: JobPostingSumOrderByAggregateInput
  }

  export type JobPostingScalarWhereWithAggregatesInput = {
    AND?: JobPostingScalarWhereWithAggregatesInput | JobPostingScalarWhereWithAggregatesInput[]
    OR?: JobPostingScalarWhereWithAggregatesInput[]
    NOT?: JobPostingScalarWhereWithAggregatesInput | JobPostingScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"JobPosting"> | string
    employer_id?: UuidWithAggregatesFilter<"JobPosting"> | string
    title?: StringWithAggregatesFilter<"JobPosting"> | string
    description?: StringWithAggregatesFilter<"JobPosting"> | string
    requirements?: StringNullableWithAggregatesFilter<"JobPosting"> | string | null
    job_type?: StringWithAggregatesFilter<"JobPosting"> | string
    industry?: StringWithAggregatesFilter<"JobPosting"> | string
    location?: StringNullableWithAggregatesFilter<"JobPosting"> | string | null
    is_remote?: BoolWithAggregatesFilter<"JobPosting"> | boolean
    salary_min?: DecimalNullableWithAggregatesFilter<"JobPosting"> | Decimal | DecimalJsLike | number | string | null
    salary_max?: DecimalNullableWithAggregatesFilter<"JobPosting"> | Decimal | DecimalJsLike | number | string | null
    preferred_courses?: StringNullableListFilter<"JobPosting">
    slots?: IntWithAggregatesFilter<"JobPosting"> | number
    expires_at?: DateTimeWithAggregatesFilter<"JobPosting"> | Date | string
    status?: StringWithAggregatesFilter<"JobPosting"> | string
    rejection_reason?: StringNullableWithAggregatesFilter<"JobPosting"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"JobPosting"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"JobPosting"> | Date | string
  }

  export type JobApplicationWhereInput = {
    AND?: JobApplicationWhereInput | JobApplicationWhereInput[]
    OR?: JobApplicationWhereInput[]
    NOT?: JobApplicationWhereInput | JobApplicationWhereInput[]
    id?: UuidFilter<"JobApplication"> | string
    job_id?: UuidFilter<"JobApplication"> | string
    alumni_id?: UuidFilter<"JobApplication"> | string
    cover_letter?: StringNullableFilter<"JobApplication"> | string | null
    resume_url?: StringNullableFilter<"JobApplication"> | string | null
    application_status?: StringFilter<"JobApplication"> | string
    employer_notes?: StringNullableFilter<"JobApplication"> | string | null
    applied_at?: DateTimeFilter<"JobApplication"> | Date | string
    updated_at?: DateTimeFilter<"JobApplication"> | Date | string
    job?: XOR<JobPostingScalarRelationFilter, JobPostingWhereInput>
    alumni?: XOR<AlumniScalarRelationFilter, AlumniWhereInput>
  }

  export type JobApplicationOrderByWithRelationInput = {
    id?: SortOrder
    job_id?: SortOrder
    alumni_id?: SortOrder
    cover_letter?: SortOrderInput | SortOrder
    resume_url?: SortOrderInput | SortOrder
    application_status?: SortOrder
    employer_notes?: SortOrderInput | SortOrder
    applied_at?: SortOrder
    updated_at?: SortOrder
    job?: JobPostingOrderByWithRelationInput
    alumni?: AlumniOrderByWithRelationInput
  }

  export type JobApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    job_id_alumni_id?: JobApplicationJob_idAlumni_idCompoundUniqueInput
    AND?: JobApplicationWhereInput | JobApplicationWhereInput[]
    OR?: JobApplicationWhereInput[]
    NOT?: JobApplicationWhereInput | JobApplicationWhereInput[]
    job_id?: UuidFilter<"JobApplication"> | string
    alumni_id?: UuidFilter<"JobApplication"> | string
    cover_letter?: StringNullableFilter<"JobApplication"> | string | null
    resume_url?: StringNullableFilter<"JobApplication"> | string | null
    application_status?: StringFilter<"JobApplication"> | string
    employer_notes?: StringNullableFilter<"JobApplication"> | string | null
    applied_at?: DateTimeFilter<"JobApplication"> | Date | string
    updated_at?: DateTimeFilter<"JobApplication"> | Date | string
    job?: XOR<JobPostingScalarRelationFilter, JobPostingWhereInput>
    alumni?: XOR<AlumniScalarRelationFilter, AlumniWhereInput>
  }, "id" | "job_id_alumni_id">

  export type JobApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    job_id?: SortOrder
    alumni_id?: SortOrder
    cover_letter?: SortOrderInput | SortOrder
    resume_url?: SortOrderInput | SortOrder
    application_status?: SortOrder
    employer_notes?: SortOrderInput | SortOrder
    applied_at?: SortOrder
    updated_at?: SortOrder
    _count?: JobApplicationCountOrderByAggregateInput
    _max?: JobApplicationMaxOrderByAggregateInput
    _min?: JobApplicationMinOrderByAggregateInput
  }

  export type JobApplicationScalarWhereWithAggregatesInput = {
    AND?: JobApplicationScalarWhereWithAggregatesInput | JobApplicationScalarWhereWithAggregatesInput[]
    OR?: JobApplicationScalarWhereWithAggregatesInput[]
    NOT?: JobApplicationScalarWhereWithAggregatesInput | JobApplicationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"JobApplication"> | string
    job_id?: UuidWithAggregatesFilter<"JobApplication"> | string
    alumni_id?: UuidWithAggregatesFilter<"JobApplication"> | string
    cover_letter?: StringNullableWithAggregatesFilter<"JobApplication"> | string | null
    resume_url?: StringNullableWithAggregatesFilter<"JobApplication"> | string | null
    application_status?: StringWithAggregatesFilter<"JobApplication"> | string
    employer_notes?: StringNullableWithAggregatesFilter<"JobApplication"> | string | null
    applied_at?: DateTimeWithAggregatesFilter<"JobApplication"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"JobApplication"> | Date | string
  }

  export type AnnouncementWhereInput = {
    AND?: AnnouncementWhereInput | AnnouncementWhereInput[]
    OR?: AnnouncementWhereInput[]
    NOT?: AnnouncementWhereInput | AnnouncementWhereInput[]
    id?: UuidFilter<"Announcement"> | string
    admin_id?: UuidFilter<"Announcement"> | string
    title?: StringFilter<"Announcement"> | string
    content?: StringFilter<"Announcement"> | string
    category?: StringFilter<"Announcement"> | string
    image_url?: StringNullableFilter<"Announcement"> | string | null
    is_published?: BoolFilter<"Announcement"> | boolean
    published_at?: DateTimeNullableFilter<"Announcement"> | Date | string | null
    expires_at?: DateTimeNullableFilter<"Announcement"> | Date | string | null
    created_at?: DateTimeFilter<"Announcement"> | Date | string
    updated_at?: DateTimeFilter<"Announcement"> | Date | string
    admin?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type AnnouncementOrderByWithRelationInput = {
    id?: SortOrder
    admin_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    image_url?: SortOrderInput | SortOrder
    is_published?: SortOrder
    published_at?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    admin?: ProfileOrderByWithRelationInput
  }

  export type AnnouncementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnnouncementWhereInput | AnnouncementWhereInput[]
    OR?: AnnouncementWhereInput[]
    NOT?: AnnouncementWhereInput | AnnouncementWhereInput[]
    admin_id?: UuidFilter<"Announcement"> | string
    title?: StringFilter<"Announcement"> | string
    content?: StringFilter<"Announcement"> | string
    category?: StringFilter<"Announcement"> | string
    image_url?: StringNullableFilter<"Announcement"> | string | null
    is_published?: BoolFilter<"Announcement"> | boolean
    published_at?: DateTimeNullableFilter<"Announcement"> | Date | string | null
    expires_at?: DateTimeNullableFilter<"Announcement"> | Date | string | null
    created_at?: DateTimeFilter<"Announcement"> | Date | string
    updated_at?: DateTimeFilter<"Announcement"> | Date | string
    admin?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id">

  export type AnnouncementOrderByWithAggregationInput = {
    id?: SortOrder
    admin_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    image_url?: SortOrderInput | SortOrder
    is_published?: SortOrder
    published_at?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AnnouncementCountOrderByAggregateInput
    _max?: AnnouncementMaxOrderByAggregateInput
    _min?: AnnouncementMinOrderByAggregateInput
  }

  export type AnnouncementScalarWhereWithAggregatesInput = {
    AND?: AnnouncementScalarWhereWithAggregatesInput | AnnouncementScalarWhereWithAggregatesInput[]
    OR?: AnnouncementScalarWhereWithAggregatesInput[]
    NOT?: AnnouncementScalarWhereWithAggregatesInput | AnnouncementScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Announcement"> | string
    admin_id?: UuidWithAggregatesFilter<"Announcement"> | string
    title?: StringWithAggregatesFilter<"Announcement"> | string
    content?: StringWithAggregatesFilter<"Announcement"> | string
    category?: StringWithAggregatesFilter<"Announcement"> | string
    image_url?: StringNullableWithAggregatesFilter<"Announcement"> | string | null
    is_published?: BoolWithAggregatesFilter<"Announcement"> | boolean
    published_at?: DateTimeNullableWithAggregatesFilter<"Announcement"> | Date | string | null
    expires_at?: DateTimeNullableWithAggregatesFilter<"Announcement"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"Announcement"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Announcement"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: UuidFilter<"AuditLog"> | string
    user_id?: UuidNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    table_name?: StringNullableFilter<"AuditLog"> | string | null
    record_id?: UuidNullableFilter<"AuditLog"> | string | null
    old_values?: JsonNullableFilter<"AuditLog">
    new_values?: JsonNullableFilter<"AuditLog">
    ip_address?: StringNullableFilter<"AuditLog"> | string | null
    user_agent?: StringNullableFilter<"AuditLog"> | string | null
    created_at?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    action?: SortOrder
    table_name?: SortOrderInput | SortOrder
    record_id?: SortOrderInput | SortOrder
    old_values?: SortOrderInput | SortOrder
    new_values?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: ProfileOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    user_id?: UuidNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    table_name?: StringNullableFilter<"AuditLog"> | string | null
    record_id?: UuidNullableFilter<"AuditLog"> | string | null
    old_values?: JsonNullableFilter<"AuditLog">
    new_values?: JsonNullableFilter<"AuditLog">
    ip_address?: StringNullableFilter<"AuditLog"> | string | null
    user_agent?: StringNullableFilter<"AuditLog"> | string | null
    created_at?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    action?: SortOrder
    table_name?: SortOrderInput | SortOrder
    record_id?: SortOrderInput | SortOrder
    old_values?: SortOrderInput | SortOrder
    new_values?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"AuditLog"> | string
    user_id?: UuidNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    table_name?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    record_id?: UuidNullableWithAggregatesFilter<"AuditLog"> | string | null
    old_values?: JsonNullableWithAggregatesFilter<"AuditLog">
    new_values?: JsonNullableWithAggregatesFilter<"AuditLog">
    ip_address?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    user_agent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: UuidFilter<"Notification"> | string
    user_id?: UuidFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringNullableFilter<"Notification"> | string | null
    is_read?: BoolFilter<"Notification"> | boolean
    action_url?: StringNullableFilter<"Notification"> | string | null
    created_at?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrderInput | SortOrder
    is_read?: SortOrder
    action_url?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: ProfileOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    user_id?: UuidFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringNullableFilter<"Notification"> | string | null
    is_read?: BoolFilter<"Notification"> | boolean
    action_url?: StringNullableFilter<"Notification"> | string | null
    created_at?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrderInput | SortOrder
    is_read?: SortOrder
    action_url?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Notification"> | string
    user_id?: UuidWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    type?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    is_read?: BoolWithAggregatesFilter<"Notification"> | boolean
    action_url?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type ProfileCreateInput = {
    id: string
    role: string
    full_name: string
    email: string
    phone?: string | null
    profile_photo_url?: string | null
    is_verified?: boolean
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    alumni?: AlumniCreateNestedOneWithoutProfileInput
    employer?: EmployerCreateNestedOneWithoutProfileInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    audit_logs?: AuditLogCreateNestedManyWithoutUserInput
    announcements?: AnnouncementCreateNestedManyWithoutAdminInput
    approved_employers?: EmployerCreateNestedManyWithoutApproverInput
  }

  export type ProfileUncheckedCreateInput = {
    id: string
    role: string
    full_name: string
    email: string
    phone?: string | null
    profile_photo_url?: string | null
    is_verified?: boolean
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    alumni?: AlumniUncheckedCreateNestedOneWithoutProfileInput
    employer?: EmployerUncheckedCreateNestedOneWithoutProfileInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAdminInput
    approved_employers?: EmployerUncheckedCreateNestedManyWithoutApproverInput
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profile_photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alumni?: AlumniUpdateOneWithoutProfileNestedInput
    employer?: EmployerUpdateOneWithoutProfileNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    audit_logs?: AuditLogUpdateManyWithoutUserNestedInput
    announcements?: AnnouncementUpdateManyWithoutAdminNestedInput
    approved_employers?: EmployerUpdateManyWithoutApproverNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profile_photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alumni?: AlumniUncheckedUpdateOneWithoutProfileNestedInput
    employer?: EmployerUncheckedUpdateOneWithoutProfileNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAdminNestedInput
    approved_employers?: EmployerUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type ProfileCreateManyInput = {
    id: string
    role: string
    full_name: string
    email: string
    phone?: string | null
    profile_photo_url?: string | null
    is_verified?: boolean
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profile_photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profile_photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlumniCreateInput = {
    student_id?: string | null
    course: string
    major?: string | null
    batch_year: number
    graduation_year: number
    address?: string | null
    city?: string | null
    province?: string | null
    linkedin_url?: string | null
    resume_url?: string | null
    is_profile_public?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    profile: ProfileCreateNestedOneWithoutAlumniInput
    career_records?: CareerRecordCreateNestedManyWithoutAlumniInput
    job_applications?: JobApplicationCreateNestedManyWithoutAlumniInput
  }

  export type AlumniUncheckedCreateInput = {
    id: string
    student_id?: string | null
    course: string
    major?: string | null
    batch_year: number
    graduation_year: number
    address?: string | null
    city?: string | null
    province?: string | null
    linkedin_url?: string | null
    resume_url?: string | null
    is_profile_public?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    career_records?: CareerRecordUncheckedCreateNestedManyWithoutAlumniInput
    job_applications?: JobApplicationUncheckedCreateNestedManyWithoutAlumniInput
  }

  export type AlumniUpdateInput = {
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    course?: StringFieldUpdateOperationsInput | string
    major?: NullableStringFieldUpdateOperationsInput | string | null
    batch_year?: IntFieldUpdateOperationsInput | number
    graduation_year?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin_url?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_public?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutAlumniNestedInput
    career_records?: CareerRecordUpdateManyWithoutAlumniNestedInput
    job_applications?: JobApplicationUpdateManyWithoutAlumniNestedInput
  }

  export type AlumniUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    course?: StringFieldUpdateOperationsInput | string
    major?: NullableStringFieldUpdateOperationsInput | string | null
    batch_year?: IntFieldUpdateOperationsInput | number
    graduation_year?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin_url?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_public?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    career_records?: CareerRecordUncheckedUpdateManyWithoutAlumniNestedInput
    job_applications?: JobApplicationUncheckedUpdateManyWithoutAlumniNestedInput
  }

  export type AlumniCreateManyInput = {
    id: string
    student_id?: string | null
    course: string
    major?: string | null
    batch_year: number
    graduation_year: number
    address?: string | null
    city?: string | null
    province?: string | null
    linkedin_url?: string | null
    resume_url?: string | null
    is_profile_public?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AlumniUpdateManyMutationInput = {
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    course?: StringFieldUpdateOperationsInput | string
    major?: NullableStringFieldUpdateOperationsInput | string | null
    batch_year?: IntFieldUpdateOperationsInput | number
    graduation_year?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin_url?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_public?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlumniUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    course?: StringFieldUpdateOperationsInput | string
    major?: NullableStringFieldUpdateOperationsInput | string | null
    batch_year?: IntFieldUpdateOperationsInput | number
    graduation_year?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin_url?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_public?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployerCreateInput = {
    company_name: string
    industry: string
    company_size?: string | null
    business_permit_number?: string | null
    company_address?: string | null
    company_website?: string | null
    company_logo_url?: string | null
    company_description?: string | null
    approval_status?: string
    rejection_reason?: string | null
    approved_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    profile: ProfileCreateNestedOneWithoutEmployerInput
    approver?: ProfileCreateNestedOneWithoutApproved_employersInput
    job_postings?: JobPostingCreateNestedManyWithoutEmployerInput
  }

  export type EmployerUncheckedCreateInput = {
    id: string
    company_name: string
    industry: string
    company_size?: string | null
    business_permit_number?: string | null
    company_address?: string | null
    company_website?: string | null
    company_logo_url?: string | null
    company_description?: string | null
    approval_status?: string
    rejection_reason?: string | null
    approved_at?: Date | string | null
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    job_postings?: JobPostingUncheckedCreateNestedManyWithoutEmployerInput
  }

  export type EmployerUpdateInput = {
    company_name?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    business_permit_number?: NullableStringFieldUpdateOperationsInput | string | null
    company_address?: NullableStringFieldUpdateOperationsInput | string | null
    company_website?: NullableStringFieldUpdateOperationsInput | string | null
    company_logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutEmployerNestedInput
    approver?: ProfileUpdateOneWithoutApproved_employersNestedInput
    job_postings?: JobPostingUpdateManyWithoutEmployerNestedInput
  }

  export type EmployerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    business_permit_number?: NullableStringFieldUpdateOperationsInput | string | null
    company_address?: NullableStringFieldUpdateOperationsInput | string | null
    company_website?: NullableStringFieldUpdateOperationsInput | string | null
    company_logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    job_postings?: JobPostingUncheckedUpdateManyWithoutEmployerNestedInput
  }

  export type EmployerCreateManyInput = {
    id: string
    company_name: string
    industry: string
    company_size?: string | null
    business_permit_number?: string | null
    company_address?: string | null
    company_website?: string | null
    company_logo_url?: string | null
    company_description?: string | null
    approval_status?: string
    rejection_reason?: string | null
    approved_at?: Date | string | null
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmployerUpdateManyMutationInput = {
    company_name?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    business_permit_number?: NullableStringFieldUpdateOperationsInput | string | null
    company_address?: NullableStringFieldUpdateOperationsInput | string | null
    company_website?: NullableStringFieldUpdateOperationsInput | string | null
    company_logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    business_permit_number?: NullableStringFieldUpdateOperationsInput | string | null
    company_address?: NullableStringFieldUpdateOperationsInput | string | null
    company_website?: NullableStringFieldUpdateOperationsInput | string | null
    company_logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerRecordCreateInput = {
    id?: string
    employment_status: string
    employer_name?: string | null
    job_title?: string | null
    industry?: string | null
    employment_type?: string | null
    salary_range?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    is_current?: boolean
    country?: string
    city?: string | null
    job_description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    alumni: AlumniCreateNestedOneWithoutCareer_recordsInput
  }

  export type CareerRecordUncheckedCreateInput = {
    id?: string
    alumni_id: string
    employment_status: string
    employer_name?: string | null
    job_title?: string | null
    industry?: string | null
    employment_type?: string | null
    salary_range?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    is_current?: boolean
    country?: string
    city?: string | null
    job_description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CareerRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employment_status?: StringFieldUpdateOperationsInput | string
    employer_name?: NullableStringFieldUpdateOperationsInput | string | null
    job_title?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    employment_type?: NullableStringFieldUpdateOperationsInput | string | null
    salary_range?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_current?: BoolFieldUpdateOperationsInput | boolean
    country?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    job_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alumni?: AlumniUpdateOneRequiredWithoutCareer_recordsNestedInput
  }

  export type CareerRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    alumni_id?: StringFieldUpdateOperationsInput | string
    employment_status?: StringFieldUpdateOperationsInput | string
    employer_name?: NullableStringFieldUpdateOperationsInput | string | null
    job_title?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    employment_type?: NullableStringFieldUpdateOperationsInput | string | null
    salary_range?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_current?: BoolFieldUpdateOperationsInput | boolean
    country?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    job_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerRecordCreateManyInput = {
    id?: string
    alumni_id: string
    employment_status: string
    employer_name?: string | null
    job_title?: string | null
    industry?: string | null
    employment_type?: string | null
    salary_range?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    is_current?: boolean
    country?: string
    city?: string | null
    job_description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CareerRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employment_status?: StringFieldUpdateOperationsInput | string
    employer_name?: NullableStringFieldUpdateOperationsInput | string | null
    job_title?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    employment_type?: NullableStringFieldUpdateOperationsInput | string | null
    salary_range?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_current?: BoolFieldUpdateOperationsInput | boolean
    country?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    job_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    alumni_id?: StringFieldUpdateOperationsInput | string
    employment_status?: StringFieldUpdateOperationsInput | string
    employer_name?: NullableStringFieldUpdateOperationsInput | string | null
    job_title?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    employment_type?: NullableStringFieldUpdateOperationsInput | string | null
    salary_range?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_current?: BoolFieldUpdateOperationsInput | boolean
    country?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    job_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobPostingCreateInput = {
    id?: string
    title: string
    description: string
    requirements?: string | null
    job_type: string
    industry: string
    location?: string | null
    is_remote?: boolean
    salary_min?: Decimal | DecimalJsLike | number | string | null
    salary_max?: Decimal | DecimalJsLike | number | string | null
    preferred_courses?: JobPostingCreatepreferred_coursesInput | string[]
    slots?: number
    expires_at: Date | string
    status?: string
    rejection_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    employer: EmployerCreateNestedOneWithoutJob_postingsInput
    applications?: JobApplicationCreateNestedManyWithoutJobInput
  }

  export type JobPostingUncheckedCreateInput = {
    id?: string
    employer_id: string
    title: string
    description: string
    requirements?: string | null
    job_type: string
    industry: string
    location?: string | null
    is_remote?: boolean
    salary_min?: Decimal | DecimalJsLike | number | string | null
    salary_max?: Decimal | DecimalJsLike | number | string | null
    preferred_courses?: JobPostingCreatepreferred_coursesInput | string[]
    slots?: number
    expires_at: Date | string
    status?: string
    rejection_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    applications?: JobApplicationUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobPostingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    is_remote?: BoolFieldUpdateOperationsInput | boolean
    salary_min?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    salary_max?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preferred_courses?: JobPostingUpdatepreferred_coursesInput | string[]
    slots?: IntFieldUpdateOperationsInput | number
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employer?: EmployerUpdateOneRequiredWithoutJob_postingsNestedInput
    applications?: JobApplicationUpdateManyWithoutJobNestedInput
  }

  export type JobPostingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employer_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    is_remote?: BoolFieldUpdateOperationsInput | boolean
    salary_min?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    salary_max?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preferred_courses?: JobPostingUpdatepreferred_coursesInput | string[]
    slots?: IntFieldUpdateOperationsInput | number
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: JobApplicationUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobPostingCreateManyInput = {
    id?: string
    employer_id: string
    title: string
    description: string
    requirements?: string | null
    job_type: string
    industry: string
    location?: string | null
    is_remote?: boolean
    salary_min?: Decimal | DecimalJsLike | number | string | null
    salary_max?: Decimal | DecimalJsLike | number | string | null
    preferred_courses?: JobPostingCreatepreferred_coursesInput | string[]
    slots?: number
    expires_at: Date | string
    status?: string
    rejection_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type JobPostingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    is_remote?: BoolFieldUpdateOperationsInput | boolean
    salary_min?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    salary_max?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preferred_courses?: JobPostingUpdatepreferred_coursesInput | string[]
    slots?: IntFieldUpdateOperationsInput | number
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobPostingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employer_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    is_remote?: BoolFieldUpdateOperationsInput | boolean
    salary_min?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    salary_max?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preferred_courses?: JobPostingUpdatepreferred_coursesInput | string[]
    slots?: IntFieldUpdateOperationsInput | number
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobApplicationCreateInput = {
    id?: string
    cover_letter?: string | null
    resume_url?: string | null
    application_status?: string
    employer_notes?: string | null
    applied_at?: Date | string
    updated_at?: Date | string
    job: JobPostingCreateNestedOneWithoutApplicationsInput
    alumni: AlumniCreateNestedOneWithoutJob_applicationsInput
  }

  export type JobApplicationUncheckedCreateInput = {
    id?: string
    job_id: string
    alumni_id: string
    cover_letter?: string | null
    resume_url?: string | null
    application_status?: string
    employer_notes?: string | null
    applied_at?: Date | string
    updated_at?: Date | string
  }

  export type JobApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    application_status?: StringFieldUpdateOperationsInput | string
    employer_notes?: NullableStringFieldUpdateOperationsInput | string | null
    applied_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobPostingUpdateOneRequiredWithoutApplicationsNestedInput
    alumni?: AlumniUpdateOneRequiredWithoutJob_applicationsNestedInput
  }

  export type JobApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    job_id?: StringFieldUpdateOperationsInput | string
    alumni_id?: StringFieldUpdateOperationsInput | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    application_status?: StringFieldUpdateOperationsInput | string
    employer_notes?: NullableStringFieldUpdateOperationsInput | string | null
    applied_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobApplicationCreateManyInput = {
    id?: string
    job_id: string
    alumni_id: string
    cover_letter?: string | null
    resume_url?: string | null
    application_status?: string
    employer_notes?: string | null
    applied_at?: Date | string
    updated_at?: Date | string
  }

  export type JobApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    application_status?: StringFieldUpdateOperationsInput | string
    employer_notes?: NullableStringFieldUpdateOperationsInput | string | null
    applied_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    job_id?: StringFieldUpdateOperationsInput | string
    alumni_id?: StringFieldUpdateOperationsInput | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    application_status?: StringFieldUpdateOperationsInput | string
    employer_notes?: NullableStringFieldUpdateOperationsInput | string | null
    applied_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementCreateInput = {
    id?: string
    title: string
    content: string
    category?: string
    image_url?: string | null
    is_published?: boolean
    published_at?: Date | string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    admin: ProfileCreateNestedOneWithoutAnnouncementsInput
  }

  export type AnnouncementUncheckedCreateInput = {
    id?: string
    admin_id: string
    title: string
    content: string
    category?: string
    image_url?: string | null
    is_published?: boolean
    published_at?: Date | string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AnnouncementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_published?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: ProfileUpdateOneRequiredWithoutAnnouncementsNestedInput
  }

  export type AnnouncementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    admin_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_published?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementCreateManyInput = {
    id?: string
    admin_id: string
    title: string
    content: string
    category?: string
    image_url?: string | null
    is_published?: boolean
    published_at?: Date | string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AnnouncementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_published?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    admin_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_published?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    table_name?: string | null
    record_id?: string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: string | null
    user_agent?: string | null
    created_at?: Date | string
    user?: ProfileCreateNestedOneWithoutAudit_logsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    user_id?: string | null
    action: string
    table_name?: string | null
    record_id?: string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: string | null
    user_agent?: string | null
    created_at?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    table_name?: NullableStringFieldUpdateOperationsInput | string | null
    record_id?: NullableStringFieldUpdateOperationsInput | string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: ProfileUpdateOneWithoutAudit_logsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    table_name?: NullableStringFieldUpdateOperationsInput | string | null
    record_id?: NullableStringFieldUpdateOperationsInput | string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    user_id?: string | null
    action: string
    table_name?: string | null
    record_id?: string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: string | null
    user_agent?: string | null
    created_at?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    table_name?: NullableStringFieldUpdateOperationsInput | string | null
    record_id?: NullableStringFieldUpdateOperationsInput | string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    table_name?: NullableStringFieldUpdateOperationsInput | string | null
    record_id?: NullableStringFieldUpdateOperationsInput | string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    title: string
    message: string
    type?: string | null
    is_read?: boolean
    action_url?: string | null
    created_at?: Date | string
    user: ProfileCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    user_id: string
    title: string
    message: string
    type?: string | null
    is_read?: boolean
    action_url?: string | null
    created_at?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    is_read?: BoolFieldUpdateOperationsInput | boolean
    action_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: ProfileUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    is_read?: BoolFieldUpdateOperationsInput | boolean
    action_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    user_id: string
    title: string
    message: string
    type?: string | null
    is_read?: boolean
    action_url?: string | null
    created_at?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    is_read?: BoolFieldUpdateOperationsInput | boolean
    action_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    is_read?: BoolFieldUpdateOperationsInput | boolean
    action_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AlumniNullableScalarRelationFilter = {
    is?: AlumniWhereInput | null
    isNot?: AlumniWhereInput | null
  }

  export type EmployerNullableScalarRelationFilter = {
    is?: EmployerWhereInput | null
    isNot?: EmployerWhereInput | null
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type AnnouncementListRelationFilter = {
    every?: AnnouncementWhereInput
    some?: AnnouncementWhereInput
    none?: AnnouncementWhereInput
  }

  export type EmployerListRelationFilter = {
    every?: EmployerWhereInput
    some?: EmployerWhereInput
    none?: EmployerWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnnouncementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    profile_photo_url?: SortOrder
    is_verified?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    profile_photo_url?: SortOrder
    is_verified?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    profile_photo_url?: SortOrder
    is_verified?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ProfileScalarRelationFilter = {
    is?: ProfileWhereInput
    isNot?: ProfileWhereInput
  }

  export type CareerRecordListRelationFilter = {
    every?: CareerRecordWhereInput
    some?: CareerRecordWhereInput
    none?: CareerRecordWhereInput
  }

  export type JobApplicationListRelationFilter = {
    every?: JobApplicationWhereInput
    some?: JobApplicationWhereInput
    none?: JobApplicationWhereInput
  }

  export type CareerRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AlumniCountOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    course?: SortOrder
    major?: SortOrder
    batch_year?: SortOrder
    graduation_year?: SortOrder
    address?: SortOrder
    city?: SortOrder
    province?: SortOrder
    linkedin_url?: SortOrder
    resume_url?: SortOrder
    is_profile_public?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AlumniAvgOrderByAggregateInput = {
    batch_year?: SortOrder
    graduation_year?: SortOrder
  }

  export type AlumniMaxOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    course?: SortOrder
    major?: SortOrder
    batch_year?: SortOrder
    graduation_year?: SortOrder
    address?: SortOrder
    city?: SortOrder
    province?: SortOrder
    linkedin_url?: SortOrder
    resume_url?: SortOrder
    is_profile_public?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AlumniMinOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    course?: SortOrder
    major?: SortOrder
    batch_year?: SortOrder
    graduation_year?: SortOrder
    address?: SortOrder
    city?: SortOrder
    province?: SortOrder
    linkedin_url?: SortOrder
    resume_url?: SortOrder
    is_profile_public?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AlumniSumOrderByAggregateInput = {
    batch_year?: SortOrder
    graduation_year?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type ProfileNullableScalarRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type JobPostingListRelationFilter = {
    every?: JobPostingWhereInput
    some?: JobPostingWhereInput
    none?: JobPostingWhereInput
  }

  export type JobPostingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployerCountOrderByAggregateInput = {
    id?: SortOrder
    company_name?: SortOrder
    industry?: SortOrder
    company_size?: SortOrder
    business_permit_number?: SortOrder
    company_address?: SortOrder
    company_website?: SortOrder
    company_logo_url?: SortOrder
    company_description?: SortOrder
    approval_status?: SortOrder
    rejection_reason?: SortOrder
    approved_at?: SortOrder
    approved_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EmployerMaxOrderByAggregateInput = {
    id?: SortOrder
    company_name?: SortOrder
    industry?: SortOrder
    company_size?: SortOrder
    business_permit_number?: SortOrder
    company_address?: SortOrder
    company_website?: SortOrder
    company_logo_url?: SortOrder
    company_description?: SortOrder
    approval_status?: SortOrder
    rejection_reason?: SortOrder
    approved_at?: SortOrder
    approved_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EmployerMinOrderByAggregateInput = {
    id?: SortOrder
    company_name?: SortOrder
    industry?: SortOrder
    company_size?: SortOrder
    business_permit_number?: SortOrder
    company_address?: SortOrder
    company_website?: SortOrder
    company_logo_url?: SortOrder
    company_description?: SortOrder
    approval_status?: SortOrder
    rejection_reason?: SortOrder
    approved_at?: SortOrder
    approved_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type AlumniScalarRelationFilter = {
    is?: AlumniWhereInput
    isNot?: AlumniWhereInput
  }

  export type CareerRecordCountOrderByAggregateInput = {
    id?: SortOrder
    alumni_id?: SortOrder
    employment_status?: SortOrder
    employer_name?: SortOrder
    job_title?: SortOrder
    industry?: SortOrder
    employment_type?: SortOrder
    salary_range?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    is_current?: SortOrder
    country?: SortOrder
    city?: SortOrder
    job_description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CareerRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    alumni_id?: SortOrder
    employment_status?: SortOrder
    employer_name?: SortOrder
    job_title?: SortOrder
    industry?: SortOrder
    employment_type?: SortOrder
    salary_range?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    is_current?: SortOrder
    country?: SortOrder
    city?: SortOrder
    job_description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CareerRecordMinOrderByAggregateInput = {
    id?: SortOrder
    alumni_id?: SortOrder
    employment_status?: SortOrder
    employer_name?: SortOrder
    job_title?: SortOrder
    industry?: SortOrder
    employment_type?: SortOrder
    salary_range?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    is_current?: SortOrder
    country?: SortOrder
    city?: SortOrder
    job_description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EmployerScalarRelationFilter = {
    is?: EmployerWhereInput
    isNot?: EmployerWhereInput
  }

  export type JobPostingCountOrderByAggregateInput = {
    id?: SortOrder
    employer_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    requirements?: SortOrder
    job_type?: SortOrder
    industry?: SortOrder
    location?: SortOrder
    is_remote?: SortOrder
    salary_min?: SortOrder
    salary_max?: SortOrder
    preferred_courses?: SortOrder
    slots?: SortOrder
    expires_at?: SortOrder
    status?: SortOrder
    rejection_reason?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type JobPostingAvgOrderByAggregateInput = {
    salary_min?: SortOrder
    salary_max?: SortOrder
    slots?: SortOrder
  }

  export type JobPostingMaxOrderByAggregateInput = {
    id?: SortOrder
    employer_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    requirements?: SortOrder
    job_type?: SortOrder
    industry?: SortOrder
    location?: SortOrder
    is_remote?: SortOrder
    salary_min?: SortOrder
    salary_max?: SortOrder
    slots?: SortOrder
    expires_at?: SortOrder
    status?: SortOrder
    rejection_reason?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type JobPostingMinOrderByAggregateInput = {
    id?: SortOrder
    employer_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    requirements?: SortOrder
    job_type?: SortOrder
    industry?: SortOrder
    location?: SortOrder
    is_remote?: SortOrder
    salary_min?: SortOrder
    salary_max?: SortOrder
    slots?: SortOrder
    expires_at?: SortOrder
    status?: SortOrder
    rejection_reason?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type JobPostingSumOrderByAggregateInput = {
    salary_min?: SortOrder
    salary_max?: SortOrder
    slots?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type JobPostingScalarRelationFilter = {
    is?: JobPostingWhereInput
    isNot?: JobPostingWhereInput
  }

  export type JobApplicationJob_idAlumni_idCompoundUniqueInput = {
    job_id: string
    alumni_id: string
  }

  export type JobApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    alumni_id?: SortOrder
    cover_letter?: SortOrder
    resume_url?: SortOrder
    application_status?: SortOrder
    employer_notes?: SortOrder
    applied_at?: SortOrder
    updated_at?: SortOrder
  }

  export type JobApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    alumni_id?: SortOrder
    cover_letter?: SortOrder
    resume_url?: SortOrder
    application_status?: SortOrder
    employer_notes?: SortOrder
    applied_at?: SortOrder
    updated_at?: SortOrder
  }

  export type JobApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    alumni_id?: SortOrder
    cover_letter?: SortOrder
    resume_url?: SortOrder
    application_status?: SortOrder
    employer_notes?: SortOrder
    applied_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AnnouncementCountOrderByAggregateInput = {
    id?: SortOrder
    admin_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    image_url?: SortOrder
    is_published?: SortOrder
    published_at?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AnnouncementMaxOrderByAggregateInput = {
    id?: SortOrder
    admin_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    image_url?: SortOrder
    is_published?: SortOrder
    published_at?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AnnouncementMinOrderByAggregateInput = {
    id?: SortOrder
    admin_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    image_url?: SortOrder
    is_published?: SortOrder
    published_at?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    action?: SortOrder
    table_name?: SortOrder
    record_id?: SortOrder
    old_values?: SortOrder
    new_values?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    created_at?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    action?: SortOrder
    table_name?: SortOrder
    record_id?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    created_at?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    action?: SortOrder
    table_name?: SortOrder
    record_id?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    created_at?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    is_read?: SortOrder
    action_url?: SortOrder
    created_at?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    is_read?: SortOrder
    action_url?: SortOrder
    created_at?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    is_read?: SortOrder
    action_url?: SortOrder
    created_at?: SortOrder
  }

  export type AlumniCreateNestedOneWithoutProfileInput = {
    create?: XOR<AlumniCreateWithoutProfileInput, AlumniUncheckedCreateWithoutProfileInput>
    connectOrCreate?: AlumniCreateOrConnectWithoutProfileInput
    connect?: AlumniWhereUniqueInput
  }

  export type EmployerCreateNestedOneWithoutProfileInput = {
    create?: XOR<EmployerCreateWithoutProfileInput, EmployerUncheckedCreateWithoutProfileInput>
    connectOrCreate?: EmployerCreateOrConnectWithoutProfileInput
    connect?: EmployerWhereUniqueInput
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type AnnouncementCreateNestedManyWithoutAdminInput = {
    create?: XOR<AnnouncementCreateWithoutAdminInput, AnnouncementUncheckedCreateWithoutAdminInput> | AnnouncementCreateWithoutAdminInput[] | AnnouncementUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAdminInput | AnnouncementCreateOrConnectWithoutAdminInput[]
    createMany?: AnnouncementCreateManyAdminInputEnvelope
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
  }

  export type EmployerCreateNestedManyWithoutApproverInput = {
    create?: XOR<EmployerCreateWithoutApproverInput, EmployerUncheckedCreateWithoutApproverInput> | EmployerCreateWithoutApproverInput[] | EmployerUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: EmployerCreateOrConnectWithoutApproverInput | EmployerCreateOrConnectWithoutApproverInput[]
    createMany?: EmployerCreateManyApproverInputEnvelope
    connect?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
  }

  export type AlumniUncheckedCreateNestedOneWithoutProfileInput = {
    create?: XOR<AlumniCreateWithoutProfileInput, AlumniUncheckedCreateWithoutProfileInput>
    connectOrCreate?: AlumniCreateOrConnectWithoutProfileInput
    connect?: AlumniWhereUniqueInput
  }

  export type EmployerUncheckedCreateNestedOneWithoutProfileInput = {
    create?: XOR<EmployerCreateWithoutProfileInput, EmployerUncheckedCreateWithoutProfileInput>
    connectOrCreate?: EmployerCreateOrConnectWithoutProfileInput
    connect?: EmployerWhereUniqueInput
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type AnnouncementUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<AnnouncementCreateWithoutAdminInput, AnnouncementUncheckedCreateWithoutAdminInput> | AnnouncementCreateWithoutAdminInput[] | AnnouncementUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAdminInput | AnnouncementCreateOrConnectWithoutAdminInput[]
    createMany?: AnnouncementCreateManyAdminInputEnvelope
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
  }

  export type EmployerUncheckedCreateNestedManyWithoutApproverInput = {
    create?: XOR<EmployerCreateWithoutApproverInput, EmployerUncheckedCreateWithoutApproverInput> | EmployerCreateWithoutApproverInput[] | EmployerUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: EmployerCreateOrConnectWithoutApproverInput | EmployerCreateOrConnectWithoutApproverInput[]
    createMany?: EmployerCreateManyApproverInputEnvelope
    connect?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AlumniUpdateOneWithoutProfileNestedInput = {
    create?: XOR<AlumniCreateWithoutProfileInput, AlumniUncheckedCreateWithoutProfileInput>
    connectOrCreate?: AlumniCreateOrConnectWithoutProfileInput
    upsert?: AlumniUpsertWithoutProfileInput
    disconnect?: AlumniWhereInput | boolean
    delete?: AlumniWhereInput | boolean
    connect?: AlumniWhereUniqueInput
    update?: XOR<XOR<AlumniUpdateToOneWithWhereWithoutProfileInput, AlumniUpdateWithoutProfileInput>, AlumniUncheckedUpdateWithoutProfileInput>
  }

  export type EmployerUpdateOneWithoutProfileNestedInput = {
    create?: XOR<EmployerCreateWithoutProfileInput, EmployerUncheckedCreateWithoutProfileInput>
    connectOrCreate?: EmployerCreateOrConnectWithoutProfileInput
    upsert?: EmployerUpsertWithoutProfileInput
    disconnect?: EmployerWhereInput | boolean
    delete?: EmployerWhereInput | boolean
    connect?: EmployerWhereUniqueInput
    update?: XOR<XOR<EmployerUpdateToOneWithWhereWithoutProfileInput, EmployerUpdateWithoutProfileInput>, EmployerUncheckedUpdateWithoutProfileInput>
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type AnnouncementUpdateManyWithoutAdminNestedInput = {
    create?: XOR<AnnouncementCreateWithoutAdminInput, AnnouncementUncheckedCreateWithoutAdminInput> | AnnouncementCreateWithoutAdminInput[] | AnnouncementUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAdminInput | AnnouncementCreateOrConnectWithoutAdminInput[]
    upsert?: AnnouncementUpsertWithWhereUniqueWithoutAdminInput | AnnouncementUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: AnnouncementCreateManyAdminInputEnvelope
    set?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    disconnect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    delete?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    update?: AnnouncementUpdateWithWhereUniqueWithoutAdminInput | AnnouncementUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: AnnouncementUpdateManyWithWhereWithoutAdminInput | AnnouncementUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
  }

  export type EmployerUpdateManyWithoutApproverNestedInput = {
    create?: XOR<EmployerCreateWithoutApproverInput, EmployerUncheckedCreateWithoutApproverInput> | EmployerCreateWithoutApproverInput[] | EmployerUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: EmployerCreateOrConnectWithoutApproverInput | EmployerCreateOrConnectWithoutApproverInput[]
    upsert?: EmployerUpsertWithWhereUniqueWithoutApproverInput | EmployerUpsertWithWhereUniqueWithoutApproverInput[]
    createMany?: EmployerCreateManyApproverInputEnvelope
    set?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    disconnect?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    delete?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    connect?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    update?: EmployerUpdateWithWhereUniqueWithoutApproverInput | EmployerUpdateWithWhereUniqueWithoutApproverInput[]
    updateMany?: EmployerUpdateManyWithWhereWithoutApproverInput | EmployerUpdateManyWithWhereWithoutApproverInput[]
    deleteMany?: EmployerScalarWhereInput | EmployerScalarWhereInput[]
  }

  export type AlumniUncheckedUpdateOneWithoutProfileNestedInput = {
    create?: XOR<AlumniCreateWithoutProfileInput, AlumniUncheckedCreateWithoutProfileInput>
    connectOrCreate?: AlumniCreateOrConnectWithoutProfileInput
    upsert?: AlumniUpsertWithoutProfileInput
    disconnect?: AlumniWhereInput | boolean
    delete?: AlumniWhereInput | boolean
    connect?: AlumniWhereUniqueInput
    update?: XOR<XOR<AlumniUpdateToOneWithWhereWithoutProfileInput, AlumniUpdateWithoutProfileInput>, AlumniUncheckedUpdateWithoutProfileInput>
  }

  export type EmployerUncheckedUpdateOneWithoutProfileNestedInput = {
    create?: XOR<EmployerCreateWithoutProfileInput, EmployerUncheckedCreateWithoutProfileInput>
    connectOrCreate?: EmployerCreateOrConnectWithoutProfileInput
    upsert?: EmployerUpsertWithoutProfileInput
    disconnect?: EmployerWhereInput | boolean
    delete?: EmployerWhereInput | boolean
    connect?: EmployerWhereUniqueInput
    update?: XOR<XOR<EmployerUpdateToOneWithWhereWithoutProfileInput, EmployerUpdateWithoutProfileInput>, EmployerUncheckedUpdateWithoutProfileInput>
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type AnnouncementUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<AnnouncementCreateWithoutAdminInput, AnnouncementUncheckedCreateWithoutAdminInput> | AnnouncementCreateWithoutAdminInput[] | AnnouncementUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAdminInput | AnnouncementCreateOrConnectWithoutAdminInput[]
    upsert?: AnnouncementUpsertWithWhereUniqueWithoutAdminInput | AnnouncementUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: AnnouncementCreateManyAdminInputEnvelope
    set?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    disconnect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    delete?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    update?: AnnouncementUpdateWithWhereUniqueWithoutAdminInput | AnnouncementUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: AnnouncementUpdateManyWithWhereWithoutAdminInput | AnnouncementUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
  }

  export type EmployerUncheckedUpdateManyWithoutApproverNestedInput = {
    create?: XOR<EmployerCreateWithoutApproverInput, EmployerUncheckedCreateWithoutApproverInput> | EmployerCreateWithoutApproverInput[] | EmployerUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: EmployerCreateOrConnectWithoutApproverInput | EmployerCreateOrConnectWithoutApproverInput[]
    upsert?: EmployerUpsertWithWhereUniqueWithoutApproverInput | EmployerUpsertWithWhereUniqueWithoutApproverInput[]
    createMany?: EmployerCreateManyApproverInputEnvelope
    set?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    disconnect?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    delete?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    connect?: EmployerWhereUniqueInput | EmployerWhereUniqueInput[]
    update?: EmployerUpdateWithWhereUniqueWithoutApproverInput | EmployerUpdateWithWhereUniqueWithoutApproverInput[]
    updateMany?: EmployerUpdateManyWithWhereWithoutApproverInput | EmployerUpdateManyWithWhereWithoutApproverInput[]
    deleteMany?: EmployerScalarWhereInput | EmployerScalarWhereInput[]
  }

  export type ProfileCreateNestedOneWithoutAlumniInput = {
    create?: XOR<ProfileCreateWithoutAlumniInput, ProfileUncheckedCreateWithoutAlumniInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutAlumniInput
    connect?: ProfileWhereUniqueInput
  }

  export type CareerRecordCreateNestedManyWithoutAlumniInput = {
    create?: XOR<CareerRecordCreateWithoutAlumniInput, CareerRecordUncheckedCreateWithoutAlumniInput> | CareerRecordCreateWithoutAlumniInput[] | CareerRecordUncheckedCreateWithoutAlumniInput[]
    connectOrCreate?: CareerRecordCreateOrConnectWithoutAlumniInput | CareerRecordCreateOrConnectWithoutAlumniInput[]
    createMany?: CareerRecordCreateManyAlumniInputEnvelope
    connect?: CareerRecordWhereUniqueInput | CareerRecordWhereUniqueInput[]
  }

  export type JobApplicationCreateNestedManyWithoutAlumniInput = {
    create?: XOR<JobApplicationCreateWithoutAlumniInput, JobApplicationUncheckedCreateWithoutAlumniInput> | JobApplicationCreateWithoutAlumniInput[] | JobApplicationUncheckedCreateWithoutAlumniInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutAlumniInput | JobApplicationCreateOrConnectWithoutAlumniInput[]
    createMany?: JobApplicationCreateManyAlumniInputEnvelope
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
  }

  export type CareerRecordUncheckedCreateNestedManyWithoutAlumniInput = {
    create?: XOR<CareerRecordCreateWithoutAlumniInput, CareerRecordUncheckedCreateWithoutAlumniInput> | CareerRecordCreateWithoutAlumniInput[] | CareerRecordUncheckedCreateWithoutAlumniInput[]
    connectOrCreate?: CareerRecordCreateOrConnectWithoutAlumniInput | CareerRecordCreateOrConnectWithoutAlumniInput[]
    createMany?: CareerRecordCreateManyAlumniInputEnvelope
    connect?: CareerRecordWhereUniqueInput | CareerRecordWhereUniqueInput[]
  }

  export type JobApplicationUncheckedCreateNestedManyWithoutAlumniInput = {
    create?: XOR<JobApplicationCreateWithoutAlumniInput, JobApplicationUncheckedCreateWithoutAlumniInput> | JobApplicationCreateWithoutAlumniInput[] | JobApplicationUncheckedCreateWithoutAlumniInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutAlumniInput | JobApplicationCreateOrConnectWithoutAlumniInput[]
    createMany?: JobApplicationCreateManyAlumniInputEnvelope
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProfileUpdateOneRequiredWithoutAlumniNestedInput = {
    create?: XOR<ProfileCreateWithoutAlumniInput, ProfileUncheckedCreateWithoutAlumniInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutAlumniInput
    upsert?: ProfileUpsertWithoutAlumniInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutAlumniInput, ProfileUpdateWithoutAlumniInput>, ProfileUncheckedUpdateWithoutAlumniInput>
  }

  export type CareerRecordUpdateManyWithoutAlumniNestedInput = {
    create?: XOR<CareerRecordCreateWithoutAlumniInput, CareerRecordUncheckedCreateWithoutAlumniInput> | CareerRecordCreateWithoutAlumniInput[] | CareerRecordUncheckedCreateWithoutAlumniInput[]
    connectOrCreate?: CareerRecordCreateOrConnectWithoutAlumniInput | CareerRecordCreateOrConnectWithoutAlumniInput[]
    upsert?: CareerRecordUpsertWithWhereUniqueWithoutAlumniInput | CareerRecordUpsertWithWhereUniqueWithoutAlumniInput[]
    createMany?: CareerRecordCreateManyAlumniInputEnvelope
    set?: CareerRecordWhereUniqueInput | CareerRecordWhereUniqueInput[]
    disconnect?: CareerRecordWhereUniqueInput | CareerRecordWhereUniqueInput[]
    delete?: CareerRecordWhereUniqueInput | CareerRecordWhereUniqueInput[]
    connect?: CareerRecordWhereUniqueInput | CareerRecordWhereUniqueInput[]
    update?: CareerRecordUpdateWithWhereUniqueWithoutAlumniInput | CareerRecordUpdateWithWhereUniqueWithoutAlumniInput[]
    updateMany?: CareerRecordUpdateManyWithWhereWithoutAlumniInput | CareerRecordUpdateManyWithWhereWithoutAlumniInput[]
    deleteMany?: CareerRecordScalarWhereInput | CareerRecordScalarWhereInput[]
  }

  export type JobApplicationUpdateManyWithoutAlumniNestedInput = {
    create?: XOR<JobApplicationCreateWithoutAlumniInput, JobApplicationUncheckedCreateWithoutAlumniInput> | JobApplicationCreateWithoutAlumniInput[] | JobApplicationUncheckedCreateWithoutAlumniInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutAlumniInput | JobApplicationCreateOrConnectWithoutAlumniInput[]
    upsert?: JobApplicationUpsertWithWhereUniqueWithoutAlumniInput | JobApplicationUpsertWithWhereUniqueWithoutAlumniInput[]
    createMany?: JobApplicationCreateManyAlumniInputEnvelope
    set?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    disconnect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    delete?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    update?: JobApplicationUpdateWithWhereUniqueWithoutAlumniInput | JobApplicationUpdateWithWhereUniqueWithoutAlumniInput[]
    updateMany?: JobApplicationUpdateManyWithWhereWithoutAlumniInput | JobApplicationUpdateManyWithWhereWithoutAlumniInput[]
    deleteMany?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
  }

  export type CareerRecordUncheckedUpdateManyWithoutAlumniNestedInput = {
    create?: XOR<CareerRecordCreateWithoutAlumniInput, CareerRecordUncheckedCreateWithoutAlumniInput> | CareerRecordCreateWithoutAlumniInput[] | CareerRecordUncheckedCreateWithoutAlumniInput[]
    connectOrCreate?: CareerRecordCreateOrConnectWithoutAlumniInput | CareerRecordCreateOrConnectWithoutAlumniInput[]
    upsert?: CareerRecordUpsertWithWhereUniqueWithoutAlumniInput | CareerRecordUpsertWithWhereUniqueWithoutAlumniInput[]
    createMany?: CareerRecordCreateManyAlumniInputEnvelope
    set?: CareerRecordWhereUniqueInput | CareerRecordWhereUniqueInput[]
    disconnect?: CareerRecordWhereUniqueInput | CareerRecordWhereUniqueInput[]
    delete?: CareerRecordWhereUniqueInput | CareerRecordWhereUniqueInput[]
    connect?: CareerRecordWhereUniqueInput | CareerRecordWhereUniqueInput[]
    update?: CareerRecordUpdateWithWhereUniqueWithoutAlumniInput | CareerRecordUpdateWithWhereUniqueWithoutAlumniInput[]
    updateMany?: CareerRecordUpdateManyWithWhereWithoutAlumniInput | CareerRecordUpdateManyWithWhereWithoutAlumniInput[]
    deleteMany?: CareerRecordScalarWhereInput | CareerRecordScalarWhereInput[]
  }

  export type JobApplicationUncheckedUpdateManyWithoutAlumniNestedInput = {
    create?: XOR<JobApplicationCreateWithoutAlumniInput, JobApplicationUncheckedCreateWithoutAlumniInput> | JobApplicationCreateWithoutAlumniInput[] | JobApplicationUncheckedCreateWithoutAlumniInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutAlumniInput | JobApplicationCreateOrConnectWithoutAlumniInput[]
    upsert?: JobApplicationUpsertWithWhereUniqueWithoutAlumniInput | JobApplicationUpsertWithWhereUniqueWithoutAlumniInput[]
    createMany?: JobApplicationCreateManyAlumniInputEnvelope
    set?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    disconnect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    delete?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    update?: JobApplicationUpdateWithWhereUniqueWithoutAlumniInput | JobApplicationUpdateWithWhereUniqueWithoutAlumniInput[]
    updateMany?: JobApplicationUpdateManyWithWhereWithoutAlumniInput | JobApplicationUpdateManyWithWhereWithoutAlumniInput[]
    deleteMany?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
  }

  export type ProfileCreateNestedOneWithoutEmployerInput = {
    create?: XOR<ProfileCreateWithoutEmployerInput, ProfileUncheckedCreateWithoutEmployerInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutEmployerInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileCreateNestedOneWithoutApproved_employersInput = {
    create?: XOR<ProfileCreateWithoutApproved_employersInput, ProfileUncheckedCreateWithoutApproved_employersInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutApproved_employersInput
    connect?: ProfileWhereUniqueInput
  }

  export type JobPostingCreateNestedManyWithoutEmployerInput = {
    create?: XOR<JobPostingCreateWithoutEmployerInput, JobPostingUncheckedCreateWithoutEmployerInput> | JobPostingCreateWithoutEmployerInput[] | JobPostingUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: JobPostingCreateOrConnectWithoutEmployerInput | JobPostingCreateOrConnectWithoutEmployerInput[]
    createMany?: JobPostingCreateManyEmployerInputEnvelope
    connect?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
  }

  export type JobPostingUncheckedCreateNestedManyWithoutEmployerInput = {
    create?: XOR<JobPostingCreateWithoutEmployerInput, JobPostingUncheckedCreateWithoutEmployerInput> | JobPostingCreateWithoutEmployerInput[] | JobPostingUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: JobPostingCreateOrConnectWithoutEmployerInput | JobPostingCreateOrConnectWithoutEmployerInput[]
    createMany?: JobPostingCreateManyEmployerInputEnvelope
    connect?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ProfileUpdateOneRequiredWithoutEmployerNestedInput = {
    create?: XOR<ProfileCreateWithoutEmployerInput, ProfileUncheckedCreateWithoutEmployerInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutEmployerInput
    upsert?: ProfileUpsertWithoutEmployerInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutEmployerInput, ProfileUpdateWithoutEmployerInput>, ProfileUncheckedUpdateWithoutEmployerInput>
  }

  export type ProfileUpdateOneWithoutApproved_employersNestedInput = {
    create?: XOR<ProfileCreateWithoutApproved_employersInput, ProfileUncheckedCreateWithoutApproved_employersInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutApproved_employersInput
    upsert?: ProfileUpsertWithoutApproved_employersInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutApproved_employersInput, ProfileUpdateWithoutApproved_employersInput>, ProfileUncheckedUpdateWithoutApproved_employersInput>
  }

  export type JobPostingUpdateManyWithoutEmployerNestedInput = {
    create?: XOR<JobPostingCreateWithoutEmployerInput, JobPostingUncheckedCreateWithoutEmployerInput> | JobPostingCreateWithoutEmployerInput[] | JobPostingUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: JobPostingCreateOrConnectWithoutEmployerInput | JobPostingCreateOrConnectWithoutEmployerInput[]
    upsert?: JobPostingUpsertWithWhereUniqueWithoutEmployerInput | JobPostingUpsertWithWhereUniqueWithoutEmployerInput[]
    createMany?: JobPostingCreateManyEmployerInputEnvelope
    set?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
    disconnect?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
    delete?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
    connect?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
    update?: JobPostingUpdateWithWhereUniqueWithoutEmployerInput | JobPostingUpdateWithWhereUniqueWithoutEmployerInput[]
    updateMany?: JobPostingUpdateManyWithWhereWithoutEmployerInput | JobPostingUpdateManyWithWhereWithoutEmployerInput[]
    deleteMany?: JobPostingScalarWhereInput | JobPostingScalarWhereInput[]
  }

  export type JobPostingUncheckedUpdateManyWithoutEmployerNestedInput = {
    create?: XOR<JobPostingCreateWithoutEmployerInput, JobPostingUncheckedCreateWithoutEmployerInput> | JobPostingCreateWithoutEmployerInput[] | JobPostingUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: JobPostingCreateOrConnectWithoutEmployerInput | JobPostingCreateOrConnectWithoutEmployerInput[]
    upsert?: JobPostingUpsertWithWhereUniqueWithoutEmployerInput | JobPostingUpsertWithWhereUniqueWithoutEmployerInput[]
    createMany?: JobPostingCreateManyEmployerInputEnvelope
    set?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
    disconnect?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
    delete?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
    connect?: JobPostingWhereUniqueInput | JobPostingWhereUniqueInput[]
    update?: JobPostingUpdateWithWhereUniqueWithoutEmployerInput | JobPostingUpdateWithWhereUniqueWithoutEmployerInput[]
    updateMany?: JobPostingUpdateManyWithWhereWithoutEmployerInput | JobPostingUpdateManyWithWhereWithoutEmployerInput[]
    deleteMany?: JobPostingScalarWhereInput | JobPostingScalarWhereInput[]
  }

  export type AlumniCreateNestedOneWithoutCareer_recordsInput = {
    create?: XOR<AlumniCreateWithoutCareer_recordsInput, AlumniUncheckedCreateWithoutCareer_recordsInput>
    connectOrCreate?: AlumniCreateOrConnectWithoutCareer_recordsInput
    connect?: AlumniWhereUniqueInput
  }

  export type AlumniUpdateOneRequiredWithoutCareer_recordsNestedInput = {
    create?: XOR<AlumniCreateWithoutCareer_recordsInput, AlumniUncheckedCreateWithoutCareer_recordsInput>
    connectOrCreate?: AlumniCreateOrConnectWithoutCareer_recordsInput
    upsert?: AlumniUpsertWithoutCareer_recordsInput
    connect?: AlumniWhereUniqueInput
    update?: XOR<XOR<AlumniUpdateToOneWithWhereWithoutCareer_recordsInput, AlumniUpdateWithoutCareer_recordsInput>, AlumniUncheckedUpdateWithoutCareer_recordsInput>
  }

  export type JobPostingCreatepreferred_coursesInput = {
    set: string[]
  }

  export type EmployerCreateNestedOneWithoutJob_postingsInput = {
    create?: XOR<EmployerCreateWithoutJob_postingsInput, EmployerUncheckedCreateWithoutJob_postingsInput>
    connectOrCreate?: EmployerCreateOrConnectWithoutJob_postingsInput
    connect?: EmployerWhereUniqueInput
  }

  export type JobApplicationCreateNestedManyWithoutJobInput = {
    create?: XOR<JobApplicationCreateWithoutJobInput, JobApplicationUncheckedCreateWithoutJobInput> | JobApplicationCreateWithoutJobInput[] | JobApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJobInput | JobApplicationCreateOrConnectWithoutJobInput[]
    createMany?: JobApplicationCreateManyJobInputEnvelope
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
  }

  export type JobApplicationUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<JobApplicationCreateWithoutJobInput, JobApplicationUncheckedCreateWithoutJobInput> | JobApplicationCreateWithoutJobInput[] | JobApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJobInput | JobApplicationCreateOrConnectWithoutJobInput[]
    createMany?: JobApplicationCreateManyJobInputEnvelope
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type JobPostingUpdatepreferred_coursesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EmployerUpdateOneRequiredWithoutJob_postingsNestedInput = {
    create?: XOR<EmployerCreateWithoutJob_postingsInput, EmployerUncheckedCreateWithoutJob_postingsInput>
    connectOrCreate?: EmployerCreateOrConnectWithoutJob_postingsInput
    upsert?: EmployerUpsertWithoutJob_postingsInput
    connect?: EmployerWhereUniqueInput
    update?: XOR<XOR<EmployerUpdateToOneWithWhereWithoutJob_postingsInput, EmployerUpdateWithoutJob_postingsInput>, EmployerUncheckedUpdateWithoutJob_postingsInput>
  }

  export type JobApplicationUpdateManyWithoutJobNestedInput = {
    create?: XOR<JobApplicationCreateWithoutJobInput, JobApplicationUncheckedCreateWithoutJobInput> | JobApplicationCreateWithoutJobInput[] | JobApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJobInput | JobApplicationCreateOrConnectWithoutJobInput[]
    upsert?: JobApplicationUpsertWithWhereUniqueWithoutJobInput | JobApplicationUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: JobApplicationCreateManyJobInputEnvelope
    set?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    disconnect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    delete?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    update?: JobApplicationUpdateWithWhereUniqueWithoutJobInput | JobApplicationUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: JobApplicationUpdateManyWithWhereWithoutJobInput | JobApplicationUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
  }

  export type JobApplicationUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<JobApplicationCreateWithoutJobInput, JobApplicationUncheckedCreateWithoutJobInput> | JobApplicationCreateWithoutJobInput[] | JobApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJobInput | JobApplicationCreateOrConnectWithoutJobInput[]
    upsert?: JobApplicationUpsertWithWhereUniqueWithoutJobInput | JobApplicationUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: JobApplicationCreateManyJobInputEnvelope
    set?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    disconnect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    delete?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    update?: JobApplicationUpdateWithWhereUniqueWithoutJobInput | JobApplicationUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: JobApplicationUpdateManyWithWhereWithoutJobInput | JobApplicationUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
  }

  export type JobPostingCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<JobPostingCreateWithoutApplicationsInput, JobPostingUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobPostingCreateOrConnectWithoutApplicationsInput
    connect?: JobPostingWhereUniqueInput
  }

  export type AlumniCreateNestedOneWithoutJob_applicationsInput = {
    create?: XOR<AlumniCreateWithoutJob_applicationsInput, AlumniUncheckedCreateWithoutJob_applicationsInput>
    connectOrCreate?: AlumniCreateOrConnectWithoutJob_applicationsInput
    connect?: AlumniWhereUniqueInput
  }

  export type JobPostingUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<JobPostingCreateWithoutApplicationsInput, JobPostingUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobPostingCreateOrConnectWithoutApplicationsInput
    upsert?: JobPostingUpsertWithoutApplicationsInput
    connect?: JobPostingWhereUniqueInput
    update?: XOR<XOR<JobPostingUpdateToOneWithWhereWithoutApplicationsInput, JobPostingUpdateWithoutApplicationsInput>, JobPostingUncheckedUpdateWithoutApplicationsInput>
  }

  export type AlumniUpdateOneRequiredWithoutJob_applicationsNestedInput = {
    create?: XOR<AlumniCreateWithoutJob_applicationsInput, AlumniUncheckedCreateWithoutJob_applicationsInput>
    connectOrCreate?: AlumniCreateOrConnectWithoutJob_applicationsInput
    upsert?: AlumniUpsertWithoutJob_applicationsInput
    connect?: AlumniWhereUniqueInput
    update?: XOR<XOR<AlumniUpdateToOneWithWhereWithoutJob_applicationsInput, AlumniUpdateWithoutJob_applicationsInput>, AlumniUncheckedUpdateWithoutJob_applicationsInput>
  }

  export type ProfileCreateNestedOneWithoutAnnouncementsInput = {
    create?: XOR<ProfileCreateWithoutAnnouncementsInput, ProfileUncheckedCreateWithoutAnnouncementsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutAnnouncementsInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutAnnouncementsNestedInput = {
    create?: XOR<ProfileCreateWithoutAnnouncementsInput, ProfileUncheckedCreateWithoutAnnouncementsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutAnnouncementsInput
    upsert?: ProfileUpsertWithoutAnnouncementsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutAnnouncementsInput, ProfileUpdateWithoutAnnouncementsInput>, ProfileUncheckedUpdateWithoutAnnouncementsInput>
  }

  export type ProfileCreateNestedOneWithoutAudit_logsInput = {
    create?: XOR<ProfileCreateWithoutAudit_logsInput, ProfileUncheckedCreateWithoutAudit_logsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutAudit_logsInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileUpdateOneWithoutAudit_logsNestedInput = {
    create?: XOR<ProfileCreateWithoutAudit_logsInput, ProfileUncheckedCreateWithoutAudit_logsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutAudit_logsInput
    upsert?: ProfileUpsertWithoutAudit_logsInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutAudit_logsInput, ProfileUpdateWithoutAudit_logsInput>, ProfileUncheckedUpdateWithoutAudit_logsInput>
  }

  export type ProfileCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<ProfileCreateWithoutNotificationsInput, ProfileUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutNotificationsInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<ProfileCreateWithoutNotificationsInput, ProfileUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutNotificationsInput
    upsert?: ProfileUpsertWithoutNotificationsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutNotificationsInput, ProfileUpdateWithoutNotificationsInput>, ProfileUncheckedUpdateWithoutNotificationsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AlumniCreateWithoutProfileInput = {
    student_id?: string | null
    course: string
    major?: string | null
    batch_year: number
    graduation_year: number
    address?: string | null
    city?: string | null
    province?: string | null
    linkedin_url?: string | null
    resume_url?: string | null
    is_profile_public?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    career_records?: CareerRecordCreateNestedManyWithoutAlumniInput
    job_applications?: JobApplicationCreateNestedManyWithoutAlumniInput
  }

  export type AlumniUncheckedCreateWithoutProfileInput = {
    student_id?: string | null
    course: string
    major?: string | null
    batch_year: number
    graduation_year: number
    address?: string | null
    city?: string | null
    province?: string | null
    linkedin_url?: string | null
    resume_url?: string | null
    is_profile_public?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    career_records?: CareerRecordUncheckedCreateNestedManyWithoutAlumniInput
    job_applications?: JobApplicationUncheckedCreateNestedManyWithoutAlumniInput
  }

  export type AlumniCreateOrConnectWithoutProfileInput = {
    where: AlumniWhereUniqueInput
    create: XOR<AlumniCreateWithoutProfileInput, AlumniUncheckedCreateWithoutProfileInput>
  }

  export type EmployerCreateWithoutProfileInput = {
    company_name: string
    industry: string
    company_size?: string | null
    business_permit_number?: string | null
    company_address?: string | null
    company_website?: string | null
    company_logo_url?: string | null
    company_description?: string | null
    approval_status?: string
    rejection_reason?: string | null
    approved_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    approver?: ProfileCreateNestedOneWithoutApproved_employersInput
    job_postings?: JobPostingCreateNestedManyWithoutEmployerInput
  }

  export type EmployerUncheckedCreateWithoutProfileInput = {
    company_name: string
    industry: string
    company_size?: string | null
    business_permit_number?: string | null
    company_address?: string | null
    company_website?: string | null
    company_logo_url?: string | null
    company_description?: string | null
    approval_status?: string
    rejection_reason?: string | null
    approved_at?: Date | string | null
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    job_postings?: JobPostingUncheckedCreateNestedManyWithoutEmployerInput
  }

  export type EmployerCreateOrConnectWithoutProfileInput = {
    where: EmployerWhereUniqueInput
    create: XOR<EmployerCreateWithoutProfileInput, EmployerUncheckedCreateWithoutProfileInput>
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    type?: string | null
    is_read?: boolean
    action_url?: string | null
    created_at?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    type?: string | null
    is_read?: boolean
    action_url?: string | null
    created_at?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    action: string
    table_name?: string | null
    record_id?: string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: string | null
    user_agent?: string | null
    created_at?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: string
    table_name?: string | null
    record_id?: string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: string | null
    user_agent?: string | null
    created_at?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AnnouncementCreateWithoutAdminInput = {
    id?: string
    title: string
    content: string
    category?: string
    image_url?: string | null
    is_published?: boolean
    published_at?: Date | string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AnnouncementUncheckedCreateWithoutAdminInput = {
    id?: string
    title: string
    content: string
    category?: string
    image_url?: string | null
    is_published?: boolean
    published_at?: Date | string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AnnouncementCreateOrConnectWithoutAdminInput = {
    where: AnnouncementWhereUniqueInput
    create: XOR<AnnouncementCreateWithoutAdminInput, AnnouncementUncheckedCreateWithoutAdminInput>
  }

  export type AnnouncementCreateManyAdminInputEnvelope = {
    data: AnnouncementCreateManyAdminInput | AnnouncementCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type EmployerCreateWithoutApproverInput = {
    company_name: string
    industry: string
    company_size?: string | null
    business_permit_number?: string | null
    company_address?: string | null
    company_website?: string | null
    company_logo_url?: string | null
    company_description?: string | null
    approval_status?: string
    rejection_reason?: string | null
    approved_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    profile: ProfileCreateNestedOneWithoutEmployerInput
    job_postings?: JobPostingCreateNestedManyWithoutEmployerInput
  }

  export type EmployerUncheckedCreateWithoutApproverInput = {
    id: string
    company_name: string
    industry: string
    company_size?: string | null
    business_permit_number?: string | null
    company_address?: string | null
    company_website?: string | null
    company_logo_url?: string | null
    company_description?: string | null
    approval_status?: string
    rejection_reason?: string | null
    approved_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    job_postings?: JobPostingUncheckedCreateNestedManyWithoutEmployerInput
  }

  export type EmployerCreateOrConnectWithoutApproverInput = {
    where: EmployerWhereUniqueInput
    create: XOR<EmployerCreateWithoutApproverInput, EmployerUncheckedCreateWithoutApproverInput>
  }

  export type EmployerCreateManyApproverInputEnvelope = {
    data: EmployerCreateManyApproverInput | EmployerCreateManyApproverInput[]
    skipDuplicates?: boolean
  }

  export type AlumniUpsertWithoutProfileInput = {
    update: XOR<AlumniUpdateWithoutProfileInput, AlumniUncheckedUpdateWithoutProfileInput>
    create: XOR<AlumniCreateWithoutProfileInput, AlumniUncheckedCreateWithoutProfileInput>
    where?: AlumniWhereInput
  }

  export type AlumniUpdateToOneWithWhereWithoutProfileInput = {
    where?: AlumniWhereInput
    data: XOR<AlumniUpdateWithoutProfileInput, AlumniUncheckedUpdateWithoutProfileInput>
  }

  export type AlumniUpdateWithoutProfileInput = {
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    course?: StringFieldUpdateOperationsInput | string
    major?: NullableStringFieldUpdateOperationsInput | string | null
    batch_year?: IntFieldUpdateOperationsInput | number
    graduation_year?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin_url?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_public?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    career_records?: CareerRecordUpdateManyWithoutAlumniNestedInput
    job_applications?: JobApplicationUpdateManyWithoutAlumniNestedInput
  }

  export type AlumniUncheckedUpdateWithoutProfileInput = {
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    course?: StringFieldUpdateOperationsInput | string
    major?: NullableStringFieldUpdateOperationsInput | string | null
    batch_year?: IntFieldUpdateOperationsInput | number
    graduation_year?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin_url?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_public?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    career_records?: CareerRecordUncheckedUpdateManyWithoutAlumniNestedInput
    job_applications?: JobApplicationUncheckedUpdateManyWithoutAlumniNestedInput
  }

  export type EmployerUpsertWithoutProfileInput = {
    update: XOR<EmployerUpdateWithoutProfileInput, EmployerUncheckedUpdateWithoutProfileInput>
    create: XOR<EmployerCreateWithoutProfileInput, EmployerUncheckedCreateWithoutProfileInput>
    where?: EmployerWhereInput
  }

  export type EmployerUpdateToOneWithWhereWithoutProfileInput = {
    where?: EmployerWhereInput
    data: XOR<EmployerUpdateWithoutProfileInput, EmployerUncheckedUpdateWithoutProfileInput>
  }

  export type EmployerUpdateWithoutProfileInput = {
    company_name?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    business_permit_number?: NullableStringFieldUpdateOperationsInput | string | null
    company_address?: NullableStringFieldUpdateOperationsInput | string | null
    company_website?: NullableStringFieldUpdateOperationsInput | string | null
    company_logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    approver?: ProfileUpdateOneWithoutApproved_employersNestedInput
    job_postings?: JobPostingUpdateManyWithoutEmployerNestedInput
  }

  export type EmployerUncheckedUpdateWithoutProfileInput = {
    company_name?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    business_permit_number?: NullableStringFieldUpdateOperationsInput | string | null
    company_address?: NullableStringFieldUpdateOperationsInput | string | null
    company_website?: NullableStringFieldUpdateOperationsInput | string | null
    company_logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    job_postings?: JobPostingUncheckedUpdateManyWithoutEmployerNestedInput
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: UuidFilter<"Notification"> | string
    user_id?: UuidFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringNullableFilter<"Notification"> | string | null
    is_read?: BoolFilter<"Notification"> | boolean
    action_url?: StringNullableFilter<"Notification"> | string | null
    created_at?: DateTimeFilter<"Notification"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: UuidFilter<"AuditLog"> | string
    user_id?: UuidNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    table_name?: StringNullableFilter<"AuditLog"> | string | null
    record_id?: UuidNullableFilter<"AuditLog"> | string | null
    old_values?: JsonNullableFilter<"AuditLog">
    new_values?: JsonNullableFilter<"AuditLog">
    ip_address?: StringNullableFilter<"AuditLog"> | string | null
    user_agent?: StringNullableFilter<"AuditLog"> | string | null
    created_at?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AnnouncementUpsertWithWhereUniqueWithoutAdminInput = {
    where: AnnouncementWhereUniqueInput
    update: XOR<AnnouncementUpdateWithoutAdminInput, AnnouncementUncheckedUpdateWithoutAdminInput>
    create: XOR<AnnouncementCreateWithoutAdminInput, AnnouncementUncheckedCreateWithoutAdminInput>
  }

  export type AnnouncementUpdateWithWhereUniqueWithoutAdminInput = {
    where: AnnouncementWhereUniqueInput
    data: XOR<AnnouncementUpdateWithoutAdminInput, AnnouncementUncheckedUpdateWithoutAdminInput>
  }

  export type AnnouncementUpdateManyWithWhereWithoutAdminInput = {
    where: AnnouncementScalarWhereInput
    data: XOR<AnnouncementUpdateManyMutationInput, AnnouncementUncheckedUpdateManyWithoutAdminInput>
  }

  export type AnnouncementScalarWhereInput = {
    AND?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
    OR?: AnnouncementScalarWhereInput[]
    NOT?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
    id?: UuidFilter<"Announcement"> | string
    admin_id?: UuidFilter<"Announcement"> | string
    title?: StringFilter<"Announcement"> | string
    content?: StringFilter<"Announcement"> | string
    category?: StringFilter<"Announcement"> | string
    image_url?: StringNullableFilter<"Announcement"> | string | null
    is_published?: BoolFilter<"Announcement"> | boolean
    published_at?: DateTimeNullableFilter<"Announcement"> | Date | string | null
    expires_at?: DateTimeNullableFilter<"Announcement"> | Date | string | null
    created_at?: DateTimeFilter<"Announcement"> | Date | string
    updated_at?: DateTimeFilter<"Announcement"> | Date | string
  }

  export type EmployerUpsertWithWhereUniqueWithoutApproverInput = {
    where: EmployerWhereUniqueInput
    update: XOR<EmployerUpdateWithoutApproverInput, EmployerUncheckedUpdateWithoutApproverInput>
    create: XOR<EmployerCreateWithoutApproverInput, EmployerUncheckedCreateWithoutApproverInput>
  }

  export type EmployerUpdateWithWhereUniqueWithoutApproverInput = {
    where: EmployerWhereUniqueInput
    data: XOR<EmployerUpdateWithoutApproverInput, EmployerUncheckedUpdateWithoutApproverInput>
  }

  export type EmployerUpdateManyWithWhereWithoutApproverInput = {
    where: EmployerScalarWhereInput
    data: XOR<EmployerUpdateManyMutationInput, EmployerUncheckedUpdateManyWithoutApproverInput>
  }

  export type EmployerScalarWhereInput = {
    AND?: EmployerScalarWhereInput | EmployerScalarWhereInput[]
    OR?: EmployerScalarWhereInput[]
    NOT?: EmployerScalarWhereInput | EmployerScalarWhereInput[]
    id?: UuidFilter<"Employer"> | string
    company_name?: StringFilter<"Employer"> | string
    industry?: StringFilter<"Employer"> | string
    company_size?: StringNullableFilter<"Employer"> | string | null
    business_permit_number?: StringNullableFilter<"Employer"> | string | null
    company_address?: StringNullableFilter<"Employer"> | string | null
    company_website?: StringNullableFilter<"Employer"> | string | null
    company_logo_url?: StringNullableFilter<"Employer"> | string | null
    company_description?: StringNullableFilter<"Employer"> | string | null
    approval_status?: StringFilter<"Employer"> | string
    rejection_reason?: StringNullableFilter<"Employer"> | string | null
    approved_at?: DateTimeNullableFilter<"Employer"> | Date | string | null
    approved_by?: UuidNullableFilter<"Employer"> | string | null
    created_at?: DateTimeFilter<"Employer"> | Date | string
    updated_at?: DateTimeFilter<"Employer"> | Date | string
  }

  export type ProfileCreateWithoutAlumniInput = {
    id: string
    role: string
    full_name: string
    email: string
    phone?: string | null
    profile_photo_url?: string | null
    is_verified?: boolean
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    employer?: EmployerCreateNestedOneWithoutProfileInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    audit_logs?: AuditLogCreateNestedManyWithoutUserInput
    announcements?: AnnouncementCreateNestedManyWithoutAdminInput
    approved_employers?: EmployerCreateNestedManyWithoutApproverInput
  }

  export type ProfileUncheckedCreateWithoutAlumniInput = {
    id: string
    role: string
    full_name: string
    email: string
    phone?: string | null
    profile_photo_url?: string | null
    is_verified?: boolean
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    employer?: EmployerUncheckedCreateNestedOneWithoutProfileInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAdminInput
    approved_employers?: EmployerUncheckedCreateNestedManyWithoutApproverInput
  }

  export type ProfileCreateOrConnectWithoutAlumniInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutAlumniInput, ProfileUncheckedCreateWithoutAlumniInput>
  }

  export type CareerRecordCreateWithoutAlumniInput = {
    id?: string
    employment_status: string
    employer_name?: string | null
    job_title?: string | null
    industry?: string | null
    employment_type?: string | null
    salary_range?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    is_current?: boolean
    country?: string
    city?: string | null
    job_description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CareerRecordUncheckedCreateWithoutAlumniInput = {
    id?: string
    employment_status: string
    employer_name?: string | null
    job_title?: string | null
    industry?: string | null
    employment_type?: string | null
    salary_range?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    is_current?: boolean
    country?: string
    city?: string | null
    job_description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CareerRecordCreateOrConnectWithoutAlumniInput = {
    where: CareerRecordWhereUniqueInput
    create: XOR<CareerRecordCreateWithoutAlumniInput, CareerRecordUncheckedCreateWithoutAlumniInput>
  }

  export type CareerRecordCreateManyAlumniInputEnvelope = {
    data: CareerRecordCreateManyAlumniInput | CareerRecordCreateManyAlumniInput[]
    skipDuplicates?: boolean
  }

  export type JobApplicationCreateWithoutAlumniInput = {
    id?: string
    cover_letter?: string | null
    resume_url?: string | null
    application_status?: string
    employer_notes?: string | null
    applied_at?: Date | string
    updated_at?: Date | string
    job: JobPostingCreateNestedOneWithoutApplicationsInput
  }

  export type JobApplicationUncheckedCreateWithoutAlumniInput = {
    id?: string
    job_id: string
    cover_letter?: string | null
    resume_url?: string | null
    application_status?: string
    employer_notes?: string | null
    applied_at?: Date | string
    updated_at?: Date | string
  }

  export type JobApplicationCreateOrConnectWithoutAlumniInput = {
    where: JobApplicationWhereUniqueInput
    create: XOR<JobApplicationCreateWithoutAlumniInput, JobApplicationUncheckedCreateWithoutAlumniInput>
  }

  export type JobApplicationCreateManyAlumniInputEnvelope = {
    data: JobApplicationCreateManyAlumniInput | JobApplicationCreateManyAlumniInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutAlumniInput = {
    update: XOR<ProfileUpdateWithoutAlumniInput, ProfileUncheckedUpdateWithoutAlumniInput>
    create: XOR<ProfileCreateWithoutAlumniInput, ProfileUncheckedCreateWithoutAlumniInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutAlumniInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutAlumniInput, ProfileUncheckedUpdateWithoutAlumniInput>
  }

  export type ProfileUpdateWithoutAlumniInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profile_photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employer?: EmployerUpdateOneWithoutProfileNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    audit_logs?: AuditLogUpdateManyWithoutUserNestedInput
    announcements?: AnnouncementUpdateManyWithoutAdminNestedInput
    approved_employers?: EmployerUpdateManyWithoutApproverNestedInput
  }

  export type ProfileUncheckedUpdateWithoutAlumniInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profile_photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employer?: EmployerUncheckedUpdateOneWithoutProfileNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAdminNestedInput
    approved_employers?: EmployerUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type CareerRecordUpsertWithWhereUniqueWithoutAlumniInput = {
    where: CareerRecordWhereUniqueInput
    update: XOR<CareerRecordUpdateWithoutAlumniInput, CareerRecordUncheckedUpdateWithoutAlumniInput>
    create: XOR<CareerRecordCreateWithoutAlumniInput, CareerRecordUncheckedCreateWithoutAlumniInput>
  }

  export type CareerRecordUpdateWithWhereUniqueWithoutAlumniInput = {
    where: CareerRecordWhereUniqueInput
    data: XOR<CareerRecordUpdateWithoutAlumniInput, CareerRecordUncheckedUpdateWithoutAlumniInput>
  }

  export type CareerRecordUpdateManyWithWhereWithoutAlumniInput = {
    where: CareerRecordScalarWhereInput
    data: XOR<CareerRecordUpdateManyMutationInput, CareerRecordUncheckedUpdateManyWithoutAlumniInput>
  }

  export type CareerRecordScalarWhereInput = {
    AND?: CareerRecordScalarWhereInput | CareerRecordScalarWhereInput[]
    OR?: CareerRecordScalarWhereInput[]
    NOT?: CareerRecordScalarWhereInput | CareerRecordScalarWhereInput[]
    id?: UuidFilter<"CareerRecord"> | string
    alumni_id?: UuidFilter<"CareerRecord"> | string
    employment_status?: StringFilter<"CareerRecord"> | string
    employer_name?: StringNullableFilter<"CareerRecord"> | string | null
    job_title?: StringNullableFilter<"CareerRecord"> | string | null
    industry?: StringNullableFilter<"CareerRecord"> | string | null
    employment_type?: StringNullableFilter<"CareerRecord"> | string | null
    salary_range?: StringNullableFilter<"CareerRecord"> | string | null
    start_date?: DateTimeNullableFilter<"CareerRecord"> | Date | string | null
    end_date?: DateTimeNullableFilter<"CareerRecord"> | Date | string | null
    is_current?: BoolFilter<"CareerRecord"> | boolean
    country?: StringFilter<"CareerRecord"> | string
    city?: StringNullableFilter<"CareerRecord"> | string | null
    job_description?: StringNullableFilter<"CareerRecord"> | string | null
    created_at?: DateTimeFilter<"CareerRecord"> | Date | string
    updated_at?: DateTimeFilter<"CareerRecord"> | Date | string
  }

  export type JobApplicationUpsertWithWhereUniqueWithoutAlumniInput = {
    where: JobApplicationWhereUniqueInput
    update: XOR<JobApplicationUpdateWithoutAlumniInput, JobApplicationUncheckedUpdateWithoutAlumniInput>
    create: XOR<JobApplicationCreateWithoutAlumniInput, JobApplicationUncheckedCreateWithoutAlumniInput>
  }

  export type JobApplicationUpdateWithWhereUniqueWithoutAlumniInput = {
    where: JobApplicationWhereUniqueInput
    data: XOR<JobApplicationUpdateWithoutAlumniInput, JobApplicationUncheckedUpdateWithoutAlumniInput>
  }

  export type JobApplicationUpdateManyWithWhereWithoutAlumniInput = {
    where: JobApplicationScalarWhereInput
    data: XOR<JobApplicationUpdateManyMutationInput, JobApplicationUncheckedUpdateManyWithoutAlumniInput>
  }

  export type JobApplicationScalarWhereInput = {
    AND?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
    OR?: JobApplicationScalarWhereInput[]
    NOT?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
    id?: UuidFilter<"JobApplication"> | string
    job_id?: UuidFilter<"JobApplication"> | string
    alumni_id?: UuidFilter<"JobApplication"> | string
    cover_letter?: StringNullableFilter<"JobApplication"> | string | null
    resume_url?: StringNullableFilter<"JobApplication"> | string | null
    application_status?: StringFilter<"JobApplication"> | string
    employer_notes?: StringNullableFilter<"JobApplication"> | string | null
    applied_at?: DateTimeFilter<"JobApplication"> | Date | string
    updated_at?: DateTimeFilter<"JobApplication"> | Date | string
  }

  export type ProfileCreateWithoutEmployerInput = {
    id: string
    role: string
    full_name: string
    email: string
    phone?: string | null
    profile_photo_url?: string | null
    is_verified?: boolean
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    alumni?: AlumniCreateNestedOneWithoutProfileInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    audit_logs?: AuditLogCreateNestedManyWithoutUserInput
    announcements?: AnnouncementCreateNestedManyWithoutAdminInput
    approved_employers?: EmployerCreateNestedManyWithoutApproverInput
  }

  export type ProfileUncheckedCreateWithoutEmployerInput = {
    id: string
    role: string
    full_name: string
    email: string
    phone?: string | null
    profile_photo_url?: string | null
    is_verified?: boolean
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    alumni?: AlumniUncheckedCreateNestedOneWithoutProfileInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAdminInput
    approved_employers?: EmployerUncheckedCreateNestedManyWithoutApproverInput
  }

  export type ProfileCreateOrConnectWithoutEmployerInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutEmployerInput, ProfileUncheckedCreateWithoutEmployerInput>
  }

  export type ProfileCreateWithoutApproved_employersInput = {
    id: string
    role: string
    full_name: string
    email: string
    phone?: string | null
    profile_photo_url?: string | null
    is_verified?: boolean
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    alumni?: AlumniCreateNestedOneWithoutProfileInput
    employer?: EmployerCreateNestedOneWithoutProfileInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    audit_logs?: AuditLogCreateNestedManyWithoutUserInput
    announcements?: AnnouncementCreateNestedManyWithoutAdminInput
  }

  export type ProfileUncheckedCreateWithoutApproved_employersInput = {
    id: string
    role: string
    full_name: string
    email: string
    phone?: string | null
    profile_photo_url?: string | null
    is_verified?: boolean
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    alumni?: AlumniUncheckedCreateNestedOneWithoutProfileInput
    employer?: EmployerUncheckedCreateNestedOneWithoutProfileInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAdminInput
  }

  export type ProfileCreateOrConnectWithoutApproved_employersInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutApproved_employersInput, ProfileUncheckedCreateWithoutApproved_employersInput>
  }

  export type JobPostingCreateWithoutEmployerInput = {
    id?: string
    title: string
    description: string
    requirements?: string | null
    job_type: string
    industry: string
    location?: string | null
    is_remote?: boolean
    salary_min?: Decimal | DecimalJsLike | number | string | null
    salary_max?: Decimal | DecimalJsLike | number | string | null
    preferred_courses?: JobPostingCreatepreferred_coursesInput | string[]
    slots?: number
    expires_at: Date | string
    status?: string
    rejection_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    applications?: JobApplicationCreateNestedManyWithoutJobInput
  }

  export type JobPostingUncheckedCreateWithoutEmployerInput = {
    id?: string
    title: string
    description: string
    requirements?: string | null
    job_type: string
    industry: string
    location?: string | null
    is_remote?: boolean
    salary_min?: Decimal | DecimalJsLike | number | string | null
    salary_max?: Decimal | DecimalJsLike | number | string | null
    preferred_courses?: JobPostingCreatepreferred_coursesInput | string[]
    slots?: number
    expires_at: Date | string
    status?: string
    rejection_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    applications?: JobApplicationUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobPostingCreateOrConnectWithoutEmployerInput = {
    where: JobPostingWhereUniqueInput
    create: XOR<JobPostingCreateWithoutEmployerInput, JobPostingUncheckedCreateWithoutEmployerInput>
  }

  export type JobPostingCreateManyEmployerInputEnvelope = {
    data: JobPostingCreateManyEmployerInput | JobPostingCreateManyEmployerInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutEmployerInput = {
    update: XOR<ProfileUpdateWithoutEmployerInput, ProfileUncheckedUpdateWithoutEmployerInput>
    create: XOR<ProfileCreateWithoutEmployerInput, ProfileUncheckedCreateWithoutEmployerInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutEmployerInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutEmployerInput, ProfileUncheckedUpdateWithoutEmployerInput>
  }

  export type ProfileUpdateWithoutEmployerInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profile_photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alumni?: AlumniUpdateOneWithoutProfileNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    audit_logs?: AuditLogUpdateManyWithoutUserNestedInput
    announcements?: AnnouncementUpdateManyWithoutAdminNestedInput
    approved_employers?: EmployerUpdateManyWithoutApproverNestedInput
  }

  export type ProfileUncheckedUpdateWithoutEmployerInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profile_photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alumni?: AlumniUncheckedUpdateOneWithoutProfileNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAdminNestedInput
    approved_employers?: EmployerUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type ProfileUpsertWithoutApproved_employersInput = {
    update: XOR<ProfileUpdateWithoutApproved_employersInput, ProfileUncheckedUpdateWithoutApproved_employersInput>
    create: XOR<ProfileCreateWithoutApproved_employersInput, ProfileUncheckedCreateWithoutApproved_employersInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutApproved_employersInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutApproved_employersInput, ProfileUncheckedUpdateWithoutApproved_employersInput>
  }

  export type ProfileUpdateWithoutApproved_employersInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profile_photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alumni?: AlumniUpdateOneWithoutProfileNestedInput
    employer?: EmployerUpdateOneWithoutProfileNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    audit_logs?: AuditLogUpdateManyWithoutUserNestedInput
    announcements?: AnnouncementUpdateManyWithoutAdminNestedInput
  }

  export type ProfileUncheckedUpdateWithoutApproved_employersInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profile_photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alumni?: AlumniUncheckedUpdateOneWithoutProfileNestedInput
    employer?: EmployerUncheckedUpdateOneWithoutProfileNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type JobPostingUpsertWithWhereUniqueWithoutEmployerInput = {
    where: JobPostingWhereUniqueInput
    update: XOR<JobPostingUpdateWithoutEmployerInput, JobPostingUncheckedUpdateWithoutEmployerInput>
    create: XOR<JobPostingCreateWithoutEmployerInput, JobPostingUncheckedCreateWithoutEmployerInput>
  }

  export type JobPostingUpdateWithWhereUniqueWithoutEmployerInput = {
    where: JobPostingWhereUniqueInput
    data: XOR<JobPostingUpdateWithoutEmployerInput, JobPostingUncheckedUpdateWithoutEmployerInput>
  }

  export type JobPostingUpdateManyWithWhereWithoutEmployerInput = {
    where: JobPostingScalarWhereInput
    data: XOR<JobPostingUpdateManyMutationInput, JobPostingUncheckedUpdateManyWithoutEmployerInput>
  }

  export type JobPostingScalarWhereInput = {
    AND?: JobPostingScalarWhereInput | JobPostingScalarWhereInput[]
    OR?: JobPostingScalarWhereInput[]
    NOT?: JobPostingScalarWhereInput | JobPostingScalarWhereInput[]
    id?: UuidFilter<"JobPosting"> | string
    employer_id?: UuidFilter<"JobPosting"> | string
    title?: StringFilter<"JobPosting"> | string
    description?: StringFilter<"JobPosting"> | string
    requirements?: StringNullableFilter<"JobPosting"> | string | null
    job_type?: StringFilter<"JobPosting"> | string
    industry?: StringFilter<"JobPosting"> | string
    location?: StringNullableFilter<"JobPosting"> | string | null
    is_remote?: BoolFilter<"JobPosting"> | boolean
    salary_min?: DecimalNullableFilter<"JobPosting"> | Decimal | DecimalJsLike | number | string | null
    salary_max?: DecimalNullableFilter<"JobPosting"> | Decimal | DecimalJsLike | number | string | null
    preferred_courses?: StringNullableListFilter<"JobPosting">
    slots?: IntFilter<"JobPosting"> | number
    expires_at?: DateTimeFilter<"JobPosting"> | Date | string
    status?: StringFilter<"JobPosting"> | string
    rejection_reason?: StringNullableFilter<"JobPosting"> | string | null
    created_at?: DateTimeFilter<"JobPosting"> | Date | string
    updated_at?: DateTimeFilter<"JobPosting"> | Date | string
  }

  export type AlumniCreateWithoutCareer_recordsInput = {
    student_id?: string | null
    course: string
    major?: string | null
    batch_year: number
    graduation_year: number
    address?: string | null
    city?: string | null
    province?: string | null
    linkedin_url?: string | null
    resume_url?: string | null
    is_profile_public?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    profile: ProfileCreateNestedOneWithoutAlumniInput
    job_applications?: JobApplicationCreateNestedManyWithoutAlumniInput
  }

  export type AlumniUncheckedCreateWithoutCareer_recordsInput = {
    id: string
    student_id?: string | null
    course: string
    major?: string | null
    batch_year: number
    graduation_year: number
    address?: string | null
    city?: string | null
    province?: string | null
    linkedin_url?: string | null
    resume_url?: string | null
    is_profile_public?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    job_applications?: JobApplicationUncheckedCreateNestedManyWithoutAlumniInput
  }

  export type AlumniCreateOrConnectWithoutCareer_recordsInput = {
    where: AlumniWhereUniqueInput
    create: XOR<AlumniCreateWithoutCareer_recordsInput, AlumniUncheckedCreateWithoutCareer_recordsInput>
  }

  export type AlumniUpsertWithoutCareer_recordsInput = {
    update: XOR<AlumniUpdateWithoutCareer_recordsInput, AlumniUncheckedUpdateWithoutCareer_recordsInput>
    create: XOR<AlumniCreateWithoutCareer_recordsInput, AlumniUncheckedCreateWithoutCareer_recordsInput>
    where?: AlumniWhereInput
  }

  export type AlumniUpdateToOneWithWhereWithoutCareer_recordsInput = {
    where?: AlumniWhereInput
    data: XOR<AlumniUpdateWithoutCareer_recordsInput, AlumniUncheckedUpdateWithoutCareer_recordsInput>
  }

  export type AlumniUpdateWithoutCareer_recordsInput = {
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    course?: StringFieldUpdateOperationsInput | string
    major?: NullableStringFieldUpdateOperationsInput | string | null
    batch_year?: IntFieldUpdateOperationsInput | number
    graduation_year?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin_url?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_public?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutAlumniNestedInput
    job_applications?: JobApplicationUpdateManyWithoutAlumniNestedInput
  }

  export type AlumniUncheckedUpdateWithoutCareer_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    course?: StringFieldUpdateOperationsInput | string
    major?: NullableStringFieldUpdateOperationsInput | string | null
    batch_year?: IntFieldUpdateOperationsInput | number
    graduation_year?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin_url?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_public?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    job_applications?: JobApplicationUncheckedUpdateManyWithoutAlumniNestedInput
  }

  export type EmployerCreateWithoutJob_postingsInput = {
    company_name: string
    industry: string
    company_size?: string | null
    business_permit_number?: string | null
    company_address?: string | null
    company_website?: string | null
    company_logo_url?: string | null
    company_description?: string | null
    approval_status?: string
    rejection_reason?: string | null
    approved_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    profile: ProfileCreateNestedOneWithoutEmployerInput
    approver?: ProfileCreateNestedOneWithoutApproved_employersInput
  }

  export type EmployerUncheckedCreateWithoutJob_postingsInput = {
    id: string
    company_name: string
    industry: string
    company_size?: string | null
    business_permit_number?: string | null
    company_address?: string | null
    company_website?: string | null
    company_logo_url?: string | null
    company_description?: string | null
    approval_status?: string
    rejection_reason?: string | null
    approved_at?: Date | string | null
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmployerCreateOrConnectWithoutJob_postingsInput = {
    where: EmployerWhereUniqueInput
    create: XOR<EmployerCreateWithoutJob_postingsInput, EmployerUncheckedCreateWithoutJob_postingsInput>
  }

  export type JobApplicationCreateWithoutJobInput = {
    id?: string
    cover_letter?: string | null
    resume_url?: string | null
    application_status?: string
    employer_notes?: string | null
    applied_at?: Date | string
    updated_at?: Date | string
    alumni: AlumniCreateNestedOneWithoutJob_applicationsInput
  }

  export type JobApplicationUncheckedCreateWithoutJobInput = {
    id?: string
    alumni_id: string
    cover_letter?: string | null
    resume_url?: string | null
    application_status?: string
    employer_notes?: string | null
    applied_at?: Date | string
    updated_at?: Date | string
  }

  export type JobApplicationCreateOrConnectWithoutJobInput = {
    where: JobApplicationWhereUniqueInput
    create: XOR<JobApplicationCreateWithoutJobInput, JobApplicationUncheckedCreateWithoutJobInput>
  }

  export type JobApplicationCreateManyJobInputEnvelope = {
    data: JobApplicationCreateManyJobInput | JobApplicationCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type EmployerUpsertWithoutJob_postingsInput = {
    update: XOR<EmployerUpdateWithoutJob_postingsInput, EmployerUncheckedUpdateWithoutJob_postingsInput>
    create: XOR<EmployerCreateWithoutJob_postingsInput, EmployerUncheckedCreateWithoutJob_postingsInput>
    where?: EmployerWhereInput
  }

  export type EmployerUpdateToOneWithWhereWithoutJob_postingsInput = {
    where?: EmployerWhereInput
    data: XOR<EmployerUpdateWithoutJob_postingsInput, EmployerUncheckedUpdateWithoutJob_postingsInput>
  }

  export type EmployerUpdateWithoutJob_postingsInput = {
    company_name?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    business_permit_number?: NullableStringFieldUpdateOperationsInput | string | null
    company_address?: NullableStringFieldUpdateOperationsInput | string | null
    company_website?: NullableStringFieldUpdateOperationsInput | string | null
    company_logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutEmployerNestedInput
    approver?: ProfileUpdateOneWithoutApproved_employersNestedInput
  }

  export type EmployerUncheckedUpdateWithoutJob_postingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    business_permit_number?: NullableStringFieldUpdateOperationsInput | string | null
    company_address?: NullableStringFieldUpdateOperationsInput | string | null
    company_website?: NullableStringFieldUpdateOperationsInput | string | null
    company_logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobApplicationUpsertWithWhereUniqueWithoutJobInput = {
    where: JobApplicationWhereUniqueInput
    update: XOR<JobApplicationUpdateWithoutJobInput, JobApplicationUncheckedUpdateWithoutJobInput>
    create: XOR<JobApplicationCreateWithoutJobInput, JobApplicationUncheckedCreateWithoutJobInput>
  }

  export type JobApplicationUpdateWithWhereUniqueWithoutJobInput = {
    where: JobApplicationWhereUniqueInput
    data: XOR<JobApplicationUpdateWithoutJobInput, JobApplicationUncheckedUpdateWithoutJobInput>
  }

  export type JobApplicationUpdateManyWithWhereWithoutJobInput = {
    where: JobApplicationScalarWhereInput
    data: XOR<JobApplicationUpdateManyMutationInput, JobApplicationUncheckedUpdateManyWithoutJobInput>
  }

  export type JobPostingCreateWithoutApplicationsInput = {
    id?: string
    title: string
    description: string
    requirements?: string | null
    job_type: string
    industry: string
    location?: string | null
    is_remote?: boolean
    salary_min?: Decimal | DecimalJsLike | number | string | null
    salary_max?: Decimal | DecimalJsLike | number | string | null
    preferred_courses?: JobPostingCreatepreferred_coursesInput | string[]
    slots?: number
    expires_at: Date | string
    status?: string
    rejection_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    employer: EmployerCreateNestedOneWithoutJob_postingsInput
  }

  export type JobPostingUncheckedCreateWithoutApplicationsInput = {
    id?: string
    employer_id: string
    title: string
    description: string
    requirements?: string | null
    job_type: string
    industry: string
    location?: string | null
    is_remote?: boolean
    salary_min?: Decimal | DecimalJsLike | number | string | null
    salary_max?: Decimal | DecimalJsLike | number | string | null
    preferred_courses?: JobPostingCreatepreferred_coursesInput | string[]
    slots?: number
    expires_at: Date | string
    status?: string
    rejection_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type JobPostingCreateOrConnectWithoutApplicationsInput = {
    where: JobPostingWhereUniqueInput
    create: XOR<JobPostingCreateWithoutApplicationsInput, JobPostingUncheckedCreateWithoutApplicationsInput>
  }

  export type AlumniCreateWithoutJob_applicationsInput = {
    student_id?: string | null
    course: string
    major?: string | null
    batch_year: number
    graduation_year: number
    address?: string | null
    city?: string | null
    province?: string | null
    linkedin_url?: string | null
    resume_url?: string | null
    is_profile_public?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    profile: ProfileCreateNestedOneWithoutAlumniInput
    career_records?: CareerRecordCreateNestedManyWithoutAlumniInput
  }

  export type AlumniUncheckedCreateWithoutJob_applicationsInput = {
    id: string
    student_id?: string | null
    course: string
    major?: string | null
    batch_year: number
    graduation_year: number
    address?: string | null
    city?: string | null
    province?: string | null
    linkedin_url?: string | null
    resume_url?: string | null
    is_profile_public?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    career_records?: CareerRecordUncheckedCreateNestedManyWithoutAlumniInput
  }

  export type AlumniCreateOrConnectWithoutJob_applicationsInput = {
    where: AlumniWhereUniqueInput
    create: XOR<AlumniCreateWithoutJob_applicationsInput, AlumniUncheckedCreateWithoutJob_applicationsInput>
  }

  export type JobPostingUpsertWithoutApplicationsInput = {
    update: XOR<JobPostingUpdateWithoutApplicationsInput, JobPostingUncheckedUpdateWithoutApplicationsInput>
    create: XOR<JobPostingCreateWithoutApplicationsInput, JobPostingUncheckedCreateWithoutApplicationsInput>
    where?: JobPostingWhereInput
  }

  export type JobPostingUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: JobPostingWhereInput
    data: XOR<JobPostingUpdateWithoutApplicationsInput, JobPostingUncheckedUpdateWithoutApplicationsInput>
  }

  export type JobPostingUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    is_remote?: BoolFieldUpdateOperationsInput | boolean
    salary_min?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    salary_max?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preferred_courses?: JobPostingUpdatepreferred_coursesInput | string[]
    slots?: IntFieldUpdateOperationsInput | number
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employer?: EmployerUpdateOneRequiredWithoutJob_postingsNestedInput
  }

  export type JobPostingUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employer_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    is_remote?: BoolFieldUpdateOperationsInput | boolean
    salary_min?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    salary_max?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preferred_courses?: JobPostingUpdatepreferred_coursesInput | string[]
    slots?: IntFieldUpdateOperationsInput | number
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlumniUpsertWithoutJob_applicationsInput = {
    update: XOR<AlumniUpdateWithoutJob_applicationsInput, AlumniUncheckedUpdateWithoutJob_applicationsInput>
    create: XOR<AlumniCreateWithoutJob_applicationsInput, AlumniUncheckedCreateWithoutJob_applicationsInput>
    where?: AlumniWhereInput
  }

  export type AlumniUpdateToOneWithWhereWithoutJob_applicationsInput = {
    where?: AlumniWhereInput
    data: XOR<AlumniUpdateWithoutJob_applicationsInput, AlumniUncheckedUpdateWithoutJob_applicationsInput>
  }

  export type AlumniUpdateWithoutJob_applicationsInput = {
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    course?: StringFieldUpdateOperationsInput | string
    major?: NullableStringFieldUpdateOperationsInput | string | null
    batch_year?: IntFieldUpdateOperationsInput | number
    graduation_year?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin_url?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_public?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutAlumniNestedInput
    career_records?: CareerRecordUpdateManyWithoutAlumniNestedInput
  }

  export type AlumniUncheckedUpdateWithoutJob_applicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    course?: StringFieldUpdateOperationsInput | string
    major?: NullableStringFieldUpdateOperationsInput | string | null
    batch_year?: IntFieldUpdateOperationsInput | number
    graduation_year?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin_url?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_public?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    career_records?: CareerRecordUncheckedUpdateManyWithoutAlumniNestedInput
  }

  export type ProfileCreateWithoutAnnouncementsInput = {
    id: string
    role: string
    full_name: string
    email: string
    phone?: string | null
    profile_photo_url?: string | null
    is_verified?: boolean
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    alumni?: AlumniCreateNestedOneWithoutProfileInput
    employer?: EmployerCreateNestedOneWithoutProfileInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    audit_logs?: AuditLogCreateNestedManyWithoutUserInput
    approved_employers?: EmployerCreateNestedManyWithoutApproverInput
  }

  export type ProfileUncheckedCreateWithoutAnnouncementsInput = {
    id: string
    role: string
    full_name: string
    email: string
    phone?: string | null
    profile_photo_url?: string | null
    is_verified?: boolean
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    alumni?: AlumniUncheckedCreateNestedOneWithoutProfileInput
    employer?: EmployerUncheckedCreateNestedOneWithoutProfileInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    approved_employers?: EmployerUncheckedCreateNestedManyWithoutApproverInput
  }

  export type ProfileCreateOrConnectWithoutAnnouncementsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutAnnouncementsInput, ProfileUncheckedCreateWithoutAnnouncementsInput>
  }

  export type ProfileUpsertWithoutAnnouncementsInput = {
    update: XOR<ProfileUpdateWithoutAnnouncementsInput, ProfileUncheckedUpdateWithoutAnnouncementsInput>
    create: XOR<ProfileCreateWithoutAnnouncementsInput, ProfileUncheckedCreateWithoutAnnouncementsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutAnnouncementsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutAnnouncementsInput, ProfileUncheckedUpdateWithoutAnnouncementsInput>
  }

  export type ProfileUpdateWithoutAnnouncementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profile_photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alumni?: AlumniUpdateOneWithoutProfileNestedInput
    employer?: EmployerUpdateOneWithoutProfileNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    audit_logs?: AuditLogUpdateManyWithoutUserNestedInput
    approved_employers?: EmployerUpdateManyWithoutApproverNestedInput
  }

  export type ProfileUncheckedUpdateWithoutAnnouncementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profile_photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alumni?: AlumniUncheckedUpdateOneWithoutProfileNestedInput
    employer?: EmployerUncheckedUpdateOneWithoutProfileNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    approved_employers?: EmployerUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type ProfileCreateWithoutAudit_logsInput = {
    id: string
    role: string
    full_name: string
    email: string
    phone?: string | null
    profile_photo_url?: string | null
    is_verified?: boolean
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    alumni?: AlumniCreateNestedOneWithoutProfileInput
    employer?: EmployerCreateNestedOneWithoutProfileInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    announcements?: AnnouncementCreateNestedManyWithoutAdminInput
    approved_employers?: EmployerCreateNestedManyWithoutApproverInput
  }

  export type ProfileUncheckedCreateWithoutAudit_logsInput = {
    id: string
    role: string
    full_name: string
    email: string
    phone?: string | null
    profile_photo_url?: string | null
    is_verified?: boolean
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    alumni?: AlumniUncheckedCreateNestedOneWithoutProfileInput
    employer?: EmployerUncheckedCreateNestedOneWithoutProfileInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAdminInput
    approved_employers?: EmployerUncheckedCreateNestedManyWithoutApproverInput
  }

  export type ProfileCreateOrConnectWithoutAudit_logsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutAudit_logsInput, ProfileUncheckedCreateWithoutAudit_logsInput>
  }

  export type ProfileUpsertWithoutAudit_logsInput = {
    update: XOR<ProfileUpdateWithoutAudit_logsInput, ProfileUncheckedUpdateWithoutAudit_logsInput>
    create: XOR<ProfileCreateWithoutAudit_logsInput, ProfileUncheckedCreateWithoutAudit_logsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutAudit_logsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutAudit_logsInput, ProfileUncheckedUpdateWithoutAudit_logsInput>
  }

  export type ProfileUpdateWithoutAudit_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profile_photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alumni?: AlumniUpdateOneWithoutProfileNestedInput
    employer?: EmployerUpdateOneWithoutProfileNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    announcements?: AnnouncementUpdateManyWithoutAdminNestedInput
    approved_employers?: EmployerUpdateManyWithoutApproverNestedInput
  }

  export type ProfileUncheckedUpdateWithoutAudit_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profile_photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alumni?: AlumniUncheckedUpdateOneWithoutProfileNestedInput
    employer?: EmployerUncheckedUpdateOneWithoutProfileNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAdminNestedInput
    approved_employers?: EmployerUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type ProfileCreateWithoutNotificationsInput = {
    id: string
    role: string
    full_name: string
    email: string
    phone?: string | null
    profile_photo_url?: string | null
    is_verified?: boolean
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    alumni?: AlumniCreateNestedOneWithoutProfileInput
    employer?: EmployerCreateNestedOneWithoutProfileInput
    audit_logs?: AuditLogCreateNestedManyWithoutUserInput
    announcements?: AnnouncementCreateNestedManyWithoutAdminInput
    approved_employers?: EmployerCreateNestedManyWithoutApproverInput
  }

  export type ProfileUncheckedCreateWithoutNotificationsInput = {
    id: string
    role: string
    full_name: string
    email: string
    phone?: string | null
    profile_photo_url?: string | null
    is_verified?: boolean
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    alumni?: AlumniUncheckedCreateNestedOneWithoutProfileInput
    employer?: EmployerUncheckedCreateNestedOneWithoutProfileInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAdminInput
    approved_employers?: EmployerUncheckedCreateNestedManyWithoutApproverInput
  }

  export type ProfileCreateOrConnectWithoutNotificationsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutNotificationsInput, ProfileUncheckedCreateWithoutNotificationsInput>
  }

  export type ProfileUpsertWithoutNotificationsInput = {
    update: XOR<ProfileUpdateWithoutNotificationsInput, ProfileUncheckedUpdateWithoutNotificationsInput>
    create: XOR<ProfileCreateWithoutNotificationsInput, ProfileUncheckedCreateWithoutNotificationsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutNotificationsInput, ProfileUncheckedUpdateWithoutNotificationsInput>
  }

  export type ProfileUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profile_photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alumni?: AlumniUpdateOneWithoutProfileNestedInput
    employer?: EmployerUpdateOneWithoutProfileNestedInput
    audit_logs?: AuditLogUpdateManyWithoutUserNestedInput
    announcements?: AnnouncementUpdateManyWithoutAdminNestedInput
    approved_employers?: EmployerUpdateManyWithoutApproverNestedInput
  }

  export type ProfileUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profile_photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alumni?: AlumniUncheckedUpdateOneWithoutProfileNestedInput
    employer?: EmployerUncheckedUpdateOneWithoutProfileNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAdminNestedInput
    approved_employers?: EmployerUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    title: string
    message: string
    type?: string | null
    is_read?: boolean
    action_url?: string | null
    created_at?: Date | string
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    action: string
    table_name?: string | null
    record_id?: string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: string | null
    user_agent?: string | null
    created_at?: Date | string
  }

  export type AnnouncementCreateManyAdminInput = {
    id?: string
    title: string
    content: string
    category?: string
    image_url?: string | null
    is_published?: boolean
    published_at?: Date | string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmployerCreateManyApproverInput = {
    id: string
    company_name: string
    industry: string
    company_size?: string | null
    business_permit_number?: string | null
    company_address?: string | null
    company_website?: string | null
    company_logo_url?: string | null
    company_description?: string | null
    approval_status?: string
    rejection_reason?: string | null
    approved_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    is_read?: BoolFieldUpdateOperationsInput | boolean
    action_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    is_read?: BoolFieldUpdateOperationsInput | boolean
    action_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    is_read?: BoolFieldUpdateOperationsInput | boolean
    action_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    table_name?: NullableStringFieldUpdateOperationsInput | string | null
    record_id?: NullableStringFieldUpdateOperationsInput | string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    table_name?: NullableStringFieldUpdateOperationsInput | string | null
    record_id?: NullableStringFieldUpdateOperationsInput | string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    table_name?: NullableStringFieldUpdateOperationsInput | string | null
    record_id?: NullableStringFieldUpdateOperationsInput | string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_published?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_published?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementUncheckedUpdateManyWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_published?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployerUpdateWithoutApproverInput = {
    company_name?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    business_permit_number?: NullableStringFieldUpdateOperationsInput | string | null
    company_address?: NullableStringFieldUpdateOperationsInput | string | null
    company_website?: NullableStringFieldUpdateOperationsInput | string | null
    company_logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutEmployerNestedInput
    job_postings?: JobPostingUpdateManyWithoutEmployerNestedInput
  }

  export type EmployerUncheckedUpdateWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    business_permit_number?: NullableStringFieldUpdateOperationsInput | string | null
    company_address?: NullableStringFieldUpdateOperationsInput | string | null
    company_website?: NullableStringFieldUpdateOperationsInput | string | null
    company_logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    job_postings?: JobPostingUncheckedUpdateManyWithoutEmployerNestedInput
  }

  export type EmployerUncheckedUpdateManyWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    business_permit_number?: NullableStringFieldUpdateOperationsInput | string | null
    company_address?: NullableStringFieldUpdateOperationsInput | string | null
    company_website?: NullableStringFieldUpdateOperationsInput | string | null
    company_logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    approval_status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerRecordCreateManyAlumniInput = {
    id?: string
    employment_status: string
    employer_name?: string | null
    job_title?: string | null
    industry?: string | null
    employment_type?: string | null
    salary_range?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    is_current?: boolean
    country?: string
    city?: string | null
    job_description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type JobApplicationCreateManyAlumniInput = {
    id?: string
    job_id: string
    cover_letter?: string | null
    resume_url?: string | null
    application_status?: string
    employer_notes?: string | null
    applied_at?: Date | string
    updated_at?: Date | string
  }

  export type CareerRecordUpdateWithoutAlumniInput = {
    id?: StringFieldUpdateOperationsInput | string
    employment_status?: StringFieldUpdateOperationsInput | string
    employer_name?: NullableStringFieldUpdateOperationsInput | string | null
    job_title?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    employment_type?: NullableStringFieldUpdateOperationsInput | string | null
    salary_range?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_current?: BoolFieldUpdateOperationsInput | boolean
    country?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    job_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerRecordUncheckedUpdateWithoutAlumniInput = {
    id?: StringFieldUpdateOperationsInput | string
    employment_status?: StringFieldUpdateOperationsInput | string
    employer_name?: NullableStringFieldUpdateOperationsInput | string | null
    job_title?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    employment_type?: NullableStringFieldUpdateOperationsInput | string | null
    salary_range?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_current?: BoolFieldUpdateOperationsInput | boolean
    country?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    job_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerRecordUncheckedUpdateManyWithoutAlumniInput = {
    id?: StringFieldUpdateOperationsInput | string
    employment_status?: StringFieldUpdateOperationsInput | string
    employer_name?: NullableStringFieldUpdateOperationsInput | string | null
    job_title?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    employment_type?: NullableStringFieldUpdateOperationsInput | string | null
    salary_range?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_current?: BoolFieldUpdateOperationsInput | boolean
    country?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    job_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobApplicationUpdateWithoutAlumniInput = {
    id?: StringFieldUpdateOperationsInput | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    application_status?: StringFieldUpdateOperationsInput | string
    employer_notes?: NullableStringFieldUpdateOperationsInput | string | null
    applied_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobPostingUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type JobApplicationUncheckedUpdateWithoutAlumniInput = {
    id?: StringFieldUpdateOperationsInput | string
    job_id?: StringFieldUpdateOperationsInput | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    application_status?: StringFieldUpdateOperationsInput | string
    employer_notes?: NullableStringFieldUpdateOperationsInput | string | null
    applied_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobApplicationUncheckedUpdateManyWithoutAlumniInput = {
    id?: StringFieldUpdateOperationsInput | string
    job_id?: StringFieldUpdateOperationsInput | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    application_status?: StringFieldUpdateOperationsInput | string
    employer_notes?: NullableStringFieldUpdateOperationsInput | string | null
    applied_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobPostingCreateManyEmployerInput = {
    id?: string
    title: string
    description: string
    requirements?: string | null
    job_type: string
    industry: string
    location?: string | null
    is_remote?: boolean
    salary_min?: Decimal | DecimalJsLike | number | string | null
    salary_max?: Decimal | DecimalJsLike | number | string | null
    preferred_courses?: JobPostingCreatepreferred_coursesInput | string[]
    slots?: number
    expires_at: Date | string
    status?: string
    rejection_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type JobPostingUpdateWithoutEmployerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    is_remote?: BoolFieldUpdateOperationsInput | boolean
    salary_min?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    salary_max?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preferred_courses?: JobPostingUpdatepreferred_coursesInput | string[]
    slots?: IntFieldUpdateOperationsInput | number
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: JobApplicationUpdateManyWithoutJobNestedInput
  }

  export type JobPostingUncheckedUpdateWithoutEmployerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    is_remote?: BoolFieldUpdateOperationsInput | boolean
    salary_min?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    salary_max?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preferred_courses?: JobPostingUpdatepreferred_coursesInput | string[]
    slots?: IntFieldUpdateOperationsInput | number
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: JobApplicationUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobPostingUncheckedUpdateManyWithoutEmployerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    is_remote?: BoolFieldUpdateOperationsInput | boolean
    salary_min?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    salary_max?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preferred_courses?: JobPostingUpdatepreferred_coursesInput | string[]
    slots?: IntFieldUpdateOperationsInput | number
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobApplicationCreateManyJobInput = {
    id?: string
    alumni_id: string
    cover_letter?: string | null
    resume_url?: string | null
    application_status?: string
    employer_notes?: string | null
    applied_at?: Date | string
    updated_at?: Date | string
  }

  export type JobApplicationUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    application_status?: StringFieldUpdateOperationsInput | string
    employer_notes?: NullableStringFieldUpdateOperationsInput | string | null
    applied_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alumni?: AlumniUpdateOneRequiredWithoutJob_applicationsNestedInput
  }

  export type JobApplicationUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    alumni_id?: StringFieldUpdateOperationsInput | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    application_status?: StringFieldUpdateOperationsInput | string
    employer_notes?: NullableStringFieldUpdateOperationsInput | string | null
    applied_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobApplicationUncheckedUpdateManyWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    alumni_id?: StringFieldUpdateOperationsInput | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    application_status?: StringFieldUpdateOperationsInput | string
    employer_notes?: NullableStringFieldUpdateOperationsInput | string | null
    applied_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}