import { PostType, CQEvent, CQMessage } from "../types/cq";

export const messageFilter = (
  data: CQEvent | CQMessage,
  whiteList?: PostType[],
  blackList?: PostType[]
) => {
  const postType = Reflect.get(data, "post_type");
  if (blackList?.includes(postType)) return false;

  return !whiteList?.length || whiteList.includes(postType);
};
