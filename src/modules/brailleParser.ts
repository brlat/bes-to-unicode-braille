export interface ParsedBraille {
  docTitle: string | false;
  title: string[];
  body: string[][];
}

// 既存テストや外部参照との互換性のために残す。
// ページ本文の解析では使用せず、見出しによるページ加工は行わない。
export function isHeader(line: string): boolean {
  if (line.split('⠒').length > 5) return false
  if (line.length < 5) return false
  return true
}

export function splitbraille(str: string): ParsedBraille {
  // ページ区切りと行区切りだけを使い、元データの全ページ・全行を保持する。
  // 見出し判定による加工は行わない。
  const body = str.split('@PB@').map(page => page.split('@LB@'))
  return { docTitle: false, title: [], body }
}
