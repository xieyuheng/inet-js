import * as pt from "@xieyuheng/partech"

export const zero_or_more = pt.grammars.zero_or_more
export const one_or_more = pt.grammars.one_or_more
export const optional = pt.grammars.optional
export const dashline = pt.grammars.dashline

export * from "./arg.ts"
export * from "./block_stmt.ts"
export * from "./exp.ts"
export * from "./import_binding.ts"
export * from "./name.ts"
export * from "./parameter.ts"
export * from "./rule_target.ts"
export * from "./stmt.ts"
