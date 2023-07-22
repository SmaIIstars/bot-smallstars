import cqCode, { CQCodeObj, CQCodeType } from "./bot/cq-code";

const cqMsgRegex = /\[CQ:(.*?)\]/g;

export const cqMsgFormat = <T extends CQCodeType>(
  text: string
): CQCodeObj<T>[] => {
  let splitIdx = 0;
  const parts: CQCodeObj<any>[] = [];
  while (true) {
    const match = cqMsgRegex.exec(text);
    if (!match) {
      const msgTextFragment1 = text.slice(splitIdx);
      if (msgTextFragment1) parts.push(cqCode.text(msgTextFragment1));
      break;
    }

    const [, cqProps] = match;
    const [type, ...dataFragments] = cqProps?.split(",") ?? [];

    const data = dataFragments.reduce<Record<string, any>>((pre, cur) => {
      const [key, val] = cur.split("=");
      Reflect.set(pre, key.trim(), val.trim());
      return pre;
    }, {});

    const msgTextFragment2 = text.slice(splitIdx, match.index);
    if (msgTextFragment2) parts.push(cqCode.text(msgTextFragment2));
    // Maybe the type has not yet implemented
    parts.push({ type, data });
    splitIdx = cqMsgRegex.lastIndex;
  }

  return parts.length ? parts : [cqCode.text(text)];
};
