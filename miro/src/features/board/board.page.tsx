import { useParams } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import type { PathParams as PathParamsType } from "@/shared/model/routes";
function BoardPage() {
  const params = useParams<PathParamsType[typeof ROUTES.BOARD]>()
  return <div>Board page {params?.boardId}</div>;
}

export const Component = BoardPage;
