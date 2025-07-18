import * as pt from "@xieyuheng/partech"
import { type BlockStmt } from "../../exp/BlockStmt.ts"
import * as matchers from "../matchers/index.ts"

export function block_stmt_matcher(tree: pt.Tree): BlockStmt {
  return pt.matcher<BlockStmt>({
    "block_stmt:let": ({ names, exp }, { span }) => ({
      "@type": "BlockStmt",
      "@kind": "Let",
      names: matchers.variable_names_matcher(names),
      exp: matchers.exp_matcher(exp),
      span,
    }),
    "block_stmt:evaluate": ({ exp }, { span }) => ({
      "@type": "BlockStmt",
      "@kind": "Evaluate",
      exp: matchers.exp_matcher(exp),
      span,
    }),
    "block_stmt:return": ({ exp }, { span }) => ({
      "@type": "BlockStmt",
      "@kind": "Return",
      exp: matchers.exp_matcher(exp),
      span,
    }),
  })(tree)
}

export function block_stmts_matcher(tree: pt.Tree): Array<BlockStmt> {
  return pt.matcher<Array<BlockStmt>>({
    "block_stmts:block_stmts": ({ entries }) =>
      pt.matchers.zero_or_more_matcher(entries).map(block_stmt_matcher),
  })(tree)
}
