import * as pt from "@xieyuheng/partech"
import {
  type ParameterExp,
  type ParameterWithoutType,
} from "../../parameter/index.ts"
import * as matchers from "../matchers/index.ts"

export function parameter_matcher(tree: pt.Tree): ParameterExp {
  return pt.matcher<ParameterExp>({
    "parameter:normal": ({ name, t }) => ({
      name: pt.str(name),
      t: matchers.exp_matcher(t),
      isPrincipal: false,
    }),
    "parameter:is_principal": ({ name, t }) => ({
      name: pt.str(name),
      t: matchers.exp_matcher(t),
      isPrincipal: true,
    }),
  })(tree)
}

export function parameters_matcher(tree: pt.Tree): Array<ParameterExp> {
  return pt.matcher({
    "parameters:parameters": ({ entries, last_entry }) => [
      ...pt.matchers.zero_or_more_matcher(entries).map(parameter_matcher),
      parameter_matcher(last_entry),
    ],
  })(tree)
}

export function parameter_without_type_matcher(
  tree: pt.Tree,
): ParameterWithoutType {
  return pt.matcher<ParameterWithoutType>({
    "parameter_without_type:normal": ({ name, t }) => ({
      name: pt.str(name),
      isPrincipal: false,
    }),
    "parameter_without_type:is_principal": ({ name, t }) => ({
      name: pt.str(name),
      isPrincipal: true,
    }),
  })(tree)
}

export function parameters_without_type_matcher(
  tree: pt.Tree,
): Array<ParameterWithoutType> {
  return pt.matcher({
    "parameters_without_type:parameters_without_type": ({
      entries,
      last_entry,
    }) => [
      ...pt.matchers
        .zero_or_more_matcher(entries)
        .map(parameter_without_type_matcher),
      parameter_without_type_matcher(last_entry),
    ],
  })(tree)
}
