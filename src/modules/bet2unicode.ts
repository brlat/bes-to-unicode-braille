import { decodeBrailleBytes } from './bes2unicode'

// BET形式は512バイトのヘッダーの後に点字データが続く。
// 先頭のFDはデータ開始を示すため、表示用の改ページにはしない。
export default function bet2unicode(bytes: Uint8Array): string {
  return decodeBrailleBytes(bytes, 512, true)
}
