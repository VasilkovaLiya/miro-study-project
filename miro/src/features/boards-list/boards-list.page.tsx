import { ROUTES } from "@/shared/model/routes";
import { Link, href } from "react-router-dom";
import { CONFIG } from "@/shared/config";

function BoardsListPage() {
  console.log(import.meta.env.VITE_API_URL);
  return (
    <div>
      <h1>Boards list</h1>
      <div>CONFIG.VITE_API_BASE_URL: {CONFIG.VITE_API_BASE_URL} </div>
      <Link to={href(ROUTES.BOARD, { boardId: "1" })}>Board 1</Link>
    </div>
  );
}

export const Component = BoardsListPage;
