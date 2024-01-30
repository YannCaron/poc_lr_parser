import Context from "./Context";
import parseA from "./algo2";

export function parse(src: string) {
  console.log(`Parsing expression: '${src}';`);

  const ctx = new Context(src)

  //for (let i = 0; i < 10; i++)

  parseA(ctx)

}

parse('2+2+2')
