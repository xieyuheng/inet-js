import * as pt from "@xieyuheng/partech"
import { type RuleTarget } from "../../rule/index.ts"
import * as matchers from "../matchers/index.ts"

export function rule_target_matcher(tree: pt.Tree): RuleTarget {
  return pt.matcher<RuleTarget>({
    "rule_target:rule_target": ({ name, parameters }, { span }) => ({
      name: pt.str(name),
      parameters: matchers.parameters_without_type_matcher(parameters),
    }),
  })(tree)
}
