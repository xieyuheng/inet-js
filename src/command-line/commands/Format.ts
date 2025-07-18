import { Command, CommandRunner } from "@xieyuheng/command-line"
import { ParsingError } from "@xieyuheng/partech"
import ty from "@xieyuheng/ty"
import fs from "node:fs"
import { relative } from "node:path"
import process from "node:process"
import { Fetcher } from "../../fetcher/index.ts"
import { Report } from "../../lang/errors/Report.ts"
import { formatStmt } from "../../lang/stmt/index.ts"
import { parseStmts } from "../../lang/syntax/index.ts"
import { createURL } from "../../utils/createURL.ts"

type Args = { path: string }
type Opts = {}

export class Format extends Command<Args, Opts> {
  name = "format"

  description = "Format an inet program"

  args = { path: ty.string() }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `Format a file:`,
      ``,
      blue(`  ${runner.name} ${this.name} examples/datatypes/Nat.test.i`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const fetcher = new Fetcher()

    fetcher.register("file", {
      async fetchText(url) {
        if (process.platform === "win32") {
          return await fs.promises.readFile(url.pathname.slice(1), "utf8")
        } else {
          return await fs.promises.readFile(url.pathname, "utf8")
        }
      },

      formatURL(url) {
        if (process.platform === "win32") {
          return relative(process.cwd(), url.pathname.slice(1)).replaceAll(
            "\\",
            "/",
          )
        } else {
          return relative(process.cwd(), url.pathname)
        }
      },
    })

    const url = createURL(argv.path)
    const text = await fetcher.fetchText(url)

    try {
      const stmts = parseStmts(text)
      for (const stmt of stmts) {
        console.log(formatStmt(stmt))
        console.log()
      }
    } catch (error) {
      if (error instanceof ParsingError) {
        console.error(error.report(text))
        process.exit(1)
      } else if (error instanceof Report) {
        console.error(error.format())
        process.exit(1)
      } else {
        throw error
      }
    }
  }
}
