import parseLR from "./algo2";

export function parse(src: string) {
  console.log(`Parsing expression: '${src}';`);
  parseLR(src)
}

parse('2+2+2')
