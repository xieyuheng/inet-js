# inet-js

[ [website](https://inet.xieyuheng.com) ]

This is an implementation of [interaction nets](https://en.wikipedia.org/wiki/Interaction_nets).
It introduces you to the bizarre world of graph-based computation and linear logic,
using a familiar JavaScript-like syntax.

## Usage

### Command line tool

Install it by the following command:

```sh
npm install --global @xieyuheng/inet-js
```

The command-line program is called `inet-js`.

```sh
inet-js repl         # Open an interactive REPL
inet-js run [path]   # Run an inet program
inet-js help [name]  # Display help for a command
```

## Examples

### Nat

[ [Goto The Playground](https://inet.xieyuheng.com/playground/dHlwZSBOYXQKCm5vZGUgemVybygKICAtLS0tLS0KICB2YWx1ZSE6IE5hdAopCgpub2RlIGFkZDEoCiAgcHJldjogTmF0CiAgLS0tLS0tLS0tLQogIHZhbHVlITogTmF0CikKCm5vZGUgYWRkKAogIHRhcmdldCE6IE5hdCwKICBhZGRlbmQ6IE5hdAogIC0tLS0tLS0tCiAgcmVzdWx0OiBOYXQKKQoKcnVsZSBhZGQodGFyZ2V0ISwgYWRkZW5kLCByZXN1bHQpIHplcm8odmFsdWUhKSB7CiAgQGNvbm5lY3QoYWRkZW5kLCByZXN1bHQpCn0KCnJ1bGUgYWRkKHRhcmdldCEsIGFkZGVuZCwgcmVzdWx0KSBhZGQxKHByZXYsIHZhbHVlISkgewogIGFkZDEoYWRkKHByZXYsIGFkZGVuZCksIHJlc3VsdCkKfQoKZnVuY3Rpb24gb25lKCk6IE5hdCB7CiAgcmV0dXJuIGFkZDEoemVybygpKQp9CgpmdW5jdGlvbiB0d28oKTogTmF0IHsKICByZXR1cm4gYWRkKG9uZSgpLCBvbmUoKSkKfQoKZnVuY3Rpb24gdGhyZWUoKTogTmF0IHsKICByZXR1cm4gYWRkKHR3bygpLCBvbmUoKSkKfQoKZnVuY3Rpb24gZm91cigpOiBOYXQgewogIHJldHVybiBhZGQodHdvKCksIHR3bygpKQp9CgovLyBURVNUCgpldmFsIEBpbnNwZWN0KEBydW4oYWRkKHR3bygpLCB0d28oKSkpKQpldmFsIEBpbnNwZWN0KGFkZCh0d28oKSwgdHdvKCkpKQ) ]

```inet
type Nat

node zero(
  ------
  value!: Nat
)

node add1(
  prev: Nat
  ----------
  value!: Nat
)

node add(
  target!: Nat,
  addend: Nat
  --------
  result: Nat
)

rule add(target!, addend, result) zero(value!) {
  @connect(addend, result)
}

rule add(target!, addend, result) add1(prev, value!) {
  add1(add(prev, addend), result)
}

function one(): Nat {
  return add1(zero())
}

function two(): Nat {
  return add(one(), one())
}

function three(): Nat {
  return add(two(), one())
}

function four(): Nat {
  return add(two(), two())
}

// TEST

eval @inspect(@run(add(two(), two())))
eval @inspect(add(two(), two()))
```

### List

[ [Goto The Playground](https://inet.xieyuheng.com/playground/dHlwZSBMaXN0KEVsZW1lbnQ6IEBUeXBlKQoKbm9kZSBudWxsKAogIC0tLS0tLS0tCiAgdmFsdWUhOiBMaXN0KCdBKQopCgpub2RlIGNvbnMoCiAgaGVhZDogJ0EsCiAgdGFpbDogTGlzdCgnQSkKICAtLS0tLS0tLQogIHZhbHVlITogTGlzdCgnQSkKKQoKbm9kZSBhcHBlbmQoCiAgdGFyZ2V0ITogTGlzdCgnQSksCiAgcmVzdDogTGlzdCgnQSkKICAtLS0tLS0tLQogIHJlc3VsdDogTGlzdCgnQSkKKQoKcnVsZSBhcHBlbmQodGFyZ2V0ISwgcmVzdCwgcmVzdWx0KSBudWxsKHZhbHVlISkgewogIEBjb25uZWN0KHJlc3QsIHJlc3VsdCkKfQoKcnVsZSBhcHBlbmQodGFyZ2V0ISwgcmVzdCwgcmVzdWx0KSBjb25zKGhlYWQsIHRhaWwsIHZhbHVlISkgewogIGNvbnMoaGVhZCwgYXBwZW5kKHRhaWwsIHJlc3QpLCByZXN1bHQpCn0KCi8vIFRFU1QKCnR5cGUgVHJpdmlhbAoKbm9kZSBzb2xlKC0tIHZhbHVlITogVHJpdmlhbCkKCmZ1bmN0aW9uIHNpeFNvbGVzKCk6IExpc3QoVHJpdmlhbCkgewogIHJldHVybiBhcHBlbmQoCiAgICBjb25zKHNvbGUoKSwgY29ucyhzb2xlKCksIGNvbnMoc29sZSgpLCBudWxsKCkpKSksCiAgICBjb25zKHNvbGUoKSwgY29ucyhzb2xlKCksIGNvbnMoc29sZSgpLCBudWxsKCkpKSksCiAgKQp9CgpldmFsIEBpbnNwZWN0KEBydW4oc2l4U29sZXMoKSkpCmV2YWwgQGluc3BlY3Qoc2l4U29sZXMoKSk) ]

```inet
type List(Element: @Type)

node null(
  --------
  value!: List('A)
)

node cons(
  head: 'A,
  tail: List('A)
  --------
  value!: List('A)
)

node append(
  target!: List('A),
  rest: List('A)
  --------
  result: List('A)
)

rule append(target!, rest, result) null(value!) {
  @connect(rest, result)
}

rule append(target!, rest, result) cons(head, tail, value!) {
  cons(head, append(tail, rest), result)
}

// TEST

type Trivial

node sole(-- value!: Trivial)

function sixSoles(): List(Trivial) {
  return append(
    cons(sole(), cons(sole(), cons(sole(), null()))),
    cons(sole(), cons(sole(), cons(sole(), null()))),
  )
}

eval @inspect(@run(sixSoles()))
eval @inspect(sixSoles())
```

### DiffList

[ [Goto The Playground](https://inet.xieyuheng.com/playground/aW1wb3J0IHsgTGlzdCB9IGZyb20gImh0dHBzOi8vY29kZS1vZi1pbmV0LWpzLnhpZXl1aGVuZy5jb20vZXhhbXBsZXMvZGF0YXR5cGVzL0xpc3QuaSIKCi8vIENvbmNhdGVuYXRpb24gb2YgbGlzdHMgaXMgcGVyZm9ybWVkIGluIGxpbmVhciB0aW1lCi8vIHdpdGggcmVzcGVjdCB0byBpdHMgZmlyc3QgYXJndW1lbnQuCi8vIENvbnN0YW50IHRpbWUgY29uY2F0ZW5hdGlvbiBpcyBwb3NzaWJsZQovLyB3aXRoIGRpZmZlcmVuY2UtbGlzdHM6IHRoZSBpZGVhIGNvbnNpc3RzIGluCi8vIHBsdWdnaW5nIHRoZSBmcm9udCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50Ci8vIGF0IHRoZSBiYWNrIG9mIHRoZSBmaXJzdCBvbmUuCgp0eXBlIERpZmZMaXN0KEVsZW1lbnQ6IEBUeXBlKQoKbm9kZSBkaWZmKAogIGZyb250OiBMaXN0KCdBKSwKICAtLS0tLS0tCiAgYmFjazogTGlzdCgnQSksCiAgdmFsdWUhOiBEaWZmTGlzdCgnQSksCikKCm5vZGUgZGlmZkFwcGVuZCgKICB0YXJnZXQhOiBEaWZmTGlzdCgnQSksCiAgcmVzdDogRGlmZkxpc3QoJ0EpCiAgLS0tLS0tLS0KICByZXN1bHQ6IERpZmZMaXN0KCdBKQopCgpub2RlIGRpZmZPcGVuKAogIHRhcmdldCE6IERpZmZMaXN0KCdBKSwKICBuZXdCYWNrOiBMaXN0KCdBKQogIC0tLS0tLS0tLS0KICBvbGRCYWNrOiBMaXN0KCdBKQopCgpydWxlIGRpZmZBcHBlbmQodGFyZ2V0ISwgcmVzdCwgcmVzdWx0KQogICAgIGRpZmYoZnJvbnQsIGJhY2ssIHZhbHVlISkgewogIGxldCBuZXdCYWNrLCB2YWx1ZSA9IGRpZmYoZnJvbnQpCiAgQGNvbm5lY3QodmFsdWUsIHJlc3VsdCkKICBkaWZmT3BlbihyZXN0LCBuZXdCYWNrLCBiYWNrKQp9CgpydWxlIGRpZmZPcGVuKHRhcmdldCEsIG5ld0JhY2ssIG9sZEJhY2spCiAgICAgZGlmZihmcm9udCwgYmFjaywgdmFsdWUhKSB7CiAgQGNvbm5lY3QoYmFjaywgbmV3QmFjaykKICBAY29ubmVjdChmcm9udCwgb2xkQmFjaykKfQoKLy8gVEVTVAoKaW1wb3J0IHsgY29ucyB9IGZyb20gImh0dHBzOi8vY29kZS1vZi1pbmV0LWpzLnhpZXl1aGVuZy5jb20vZXhhbXBsZXMvZGF0YXR5cGVzL0xpc3QuaSIKCnR5cGUgVHJpdmlhbAoKbm9kZSBzb2xlKC0tIHZhbHVlITogVHJpdmlhbCkKCmZ1bmN0aW9uIHR3b1R3b1NvbGVzKCk6IERpZmZMaXN0KFRyaXZpYWwpIHsKICBsZXQgZnJvbnQsIGJhY2ssIHZhbHVlMSA9IGRpZmYoKQogIEBjb25uZWN0KGZyb250LCBjb25zKHNvbGUoKSwgY29ucyhzb2xlKCksIGJhY2spKSkKICBsZXQgZnJvbnQsIGJhY2ssIHZhbHVlMiA9IGRpZmYoKQogIEBjb25uZWN0KGZyb250LCBjb25zKHNvbGUoKSwgY29ucyhzb2xlKCksIGJhY2spKSkKICByZXR1cm4gZGlmZkFwcGVuZCh2YWx1ZTEsIHZhbHVlMikKfQoKZXZhbCBAaW5zcGVjdChAcnVuKHR3b1R3b1NvbGVzKCkpKQpldmFsIEBpbnNwZWN0KHR3b1R3b1NvbGVzKCkp) ]

```inet
import { List } from "https://code-of-inet-js.xieyuheng.com/examples/datatypes/List.i"

// Concatenation of lists is performed in linear time
// with respect to its first argument.
// Constant time concatenation is possible
// with difference-lists: the idea consists in
// plugging the front of the second argument
// at the back of the first one.

type DiffList(Element: @Type)

node diff(
  front: List('A),
  -------
  back: List('A),
  value!: DiffList('A),
)

node diffAppend(
  target!: DiffList('A),
  rest: DiffList('A)
  --------
  result: DiffList('A)
)

node diffOpen(
  target!: DiffList('A),
  newBack: List('A)
  ----------
  oldBack: List('A)
)

rule diffAppend(target!, rest, result)
     diff(front, back, value!) {
  let newBack, value = diff(front)
  @connect(value, result)
  diffOpen(rest, newBack, back)
}

rule diffOpen(target!, newBack, oldBack)
     diff(front, back, value!) {
  @connect(back, newBack)
  @connect(front, oldBack)
}

// TEST

import { cons } from "https://code-of-inet-js.xieyuheng.com/examples/datatypes/List.i"

type Trivial

node sole(-- value!: Trivial)

function twoTwoSoles(): DiffList(Trivial) {
  let front, back, value1 = diff()
  @connect(front, cons(sole(), cons(sole(), back)))
  let front, back, value2 = diff()
  @connect(front, cons(sole(), cons(sole(), back)))
  return diffAppend(value1, value2)
}

eval @inspect(@run(twoTwoSoles()))
eval @inspect(twoTwoSoles())
```

## Development

```sh
npm install     # Install dependencies
npm run build   # Compile `src/` to `lib/`
npm run test    # Run test
```

## Implementations

- [inet-cute](https://github.com/xieyuheng/inet-cute)
- [inet-js](https://github.com/xieyuheng/inet-js)
- [inet-forth](https://github.com/xieyuheng/inet-forth)
- [inet-lisp](https://github.com/xieyuheng/inet-lisp)

## References

**Papers**:

- [Interaction Nets, Yves Lafont, 1990 (the founding paper)](./docs/references/1990-interaction-nets.pdf).
- [Interaction Combinators, Yves Lafont, 1997](./docs/references/1997-interaction-combinators.pdf).

**Books**:

- [Models of Computation -- An Introduction to Computability Theory, Maribel Fernández, 2009](./docs/references/2009-models-of-computation--maribel-fernández.pdf).
  - Chapter 7. Interaction-Based Models of Computation.

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

## License

[GPLv3](LICENSE)
