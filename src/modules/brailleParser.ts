export interface ParsedBraille {
  docTitle: string | false;
  title: string[];
  body: string[][];
}

export function splitbraille(str: string): ParsedBraille {
  // ページ区切りと行区切りだけを使い、元データの全ページ・全行を保持する。
  // 見出し判定による加工は行わない。
  const body = str.split('@PB@').map(page => page.split('@LB@'))
  return { docTitle: false, title: [], body }
}
