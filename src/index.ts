import { Stack } from "@cyann/ts-commons"

const world = 'world';

class Context {

  private readonly _src: string
  private _cursor: number
  private readonly _parsingStack = new Stack<string>()

  constructor(src: string) {
    this._src = src
    this._cursor = 0
  }

  public get hasNext() {
    return this._cursor < this._src.length
  }

  public next() {
    this._cursor++
  }

  public get current() {
    return this._src[this._cursor]
  }

  public get isFinished() {
    return this._cursor >= this._src.length && this._parsingStack.length === 1
  }

  public shift(): boolean {
    if (!this.current) return false

    this._parsingStack.push(this.current)

    this.next()
    console.log(`shift [${this._parsingStack.join(', ')}]`);

    return true
  }

  public canReduce(...rules: string[]): boolean {
    if (this._parsingStack.length < rules.length) return false

    let i = rules.length
    for (const rule of rules) {
      if (this._parsingStack[this._parsingStack.length - i] !== rule) return false
      i--
    }

    for (const _ of rules) {
      this._parsingStack.pop()
    }
    return true
  }

  public reduce(ruleName: string) {
    this._parsingStack.push(ruleName)

    console.log(`reduce [${this._parsingStack.join(', ')}]`);
  }


}

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
function parseA(ctx: Context): boolean {
  if (ctx.canReduce('A', '+', 'N')) {
    ctx.reduce('A')
    return true
  } else if (ctx.canReduce('N')) {
    ctx.reduce('A')
    return true
  } else {
    return parseN(ctx)
  }
}

export function parse(src: string) {
  console.log(`Parsing expression: '${src}';`);

  const ctx = new Context(src)

  //for (let i = 0; i < 10; i++)

  while(parseA(ctx)){}

}

parse('2+2+2')
