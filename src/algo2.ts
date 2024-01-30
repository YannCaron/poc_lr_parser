import Context from "./Context"

// N = 2
function parseN(ctx: Context): boolean {
  if (ctx.canReduce('2')) {
    ctx.reduce('N')
    return true
  }

  return false
}

// A = A '+' N | N
function parseA(ctx: Context): boolean {

  if (ctx.canReduce('A', '+', 'N')) {
    ctx.reduce('A')
    return true
  } else if (ctx.canReduce('N')) {
    ctx.reduce('A')
    return true
  }

  return false

}

export default function parseLR(src: string) {
  const ctx = new Context(src)

  while (ctx.hasNext) {
    ctx.shift()

    let r = false

    do {
      r = false
      if (parseA(ctx)) r = true
      if (parseN(ctx)) r = true
    } while (r)
  }

}