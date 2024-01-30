import Context from "./Context"

// N = 2
function parseN(ctx: Context): boolean {
  if (ctx.canReduce('2')) {
    ctx.reduce('N')
    return true
  } else {
    return ctx.shift()
  }
}

// A = A '+' A | N
export default function parseA(ctx: Context): boolean {
  if (ctx.canReduce('A', '+', 'N')) {
    ctx.reduce('A')
    return parseA(ctx)
  } else if (ctx.canReduce('N')) {
    ctx.reduce('A')
    return true
  } else {
    return parseN(ctx)
  }
}