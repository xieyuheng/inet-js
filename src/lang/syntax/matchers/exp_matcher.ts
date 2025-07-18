import * as pt from "@xieyuheng/partech"
import { type Exp } from "../../exp/index.ts"
import * as matchers from "../matchers/index.ts"

export function exp_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "exp:operator": ({ operator }) => operator_matcher(operator),
    "exp:operand": ({ operand }) => operand_matcher(operand),
  })(tree)
}

export function operator_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "operator:var": ({ name }, { span }) => ({
      "@type": "Exp",
      "@kind": "Var",
      name: pt.str(name),
      span,
    }),
    "operator:builtin": ({ name }, { span }) => ({
      "@type": "Exp",
      "@kind": "Builtin",
      name: pt.str(name),
      span,
    }),
  })(tree)
}

export function operand_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "operand:ap": ({ target, args }, { span }) => ({
      "@type": "Exp",
      "@kind": "Ap",
      target: operator_matcher(target),
      args: matchers.args_matcher(args),
      span,
    }),
    "operand:ap_nullary": ({ target }, { span }) => ({
      "@type": "Exp",
      "@kind": "Ap",
      target: operator_matcher(target),
      args: [],
      span,
    }),
    "operand:quote_symbol": ({ name }, { span }) => ({
      "@type": "Exp",
      "@kind": "QuoteSymbol",
      name: pt.str(name),
      span,
    }),
    "operand:block": ({ body }, { span }) => ({
      "@type": "Exp",
      "@kind": "Block",
      body: matchers.block_stmts_matcher(body),
      span,
    }),
  })(tree)
}
