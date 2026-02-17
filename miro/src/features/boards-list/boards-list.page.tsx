import { ROUTES } from "@/shared/model/routes";
import { Link, href } from "react-router-dom";
import { CONFIG } from "@/shared/model/config";
import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";

function BoardsListPage() {
  console.log(CONFIG.API_BASE_URL)

  const queryClient = useQueryClient();
  const boardsQuery = rqClient.useQuery('get', '/boards');
  const createBoardMutation = rqClient.useMutation('post', '/boards', {
    onSettled: async () => {
      await queryClient.invalidateQueries(rqClient.queryOptions('get', '/boards'));
    },
  });
  const deleteBoardMutation = rqClient.useMutation('delete', '/boards/{boardId}', {
    onSettled: async () => {
      await queryClient.invalidateQueries(rqClient.queryOptions('get', '/boards'));
    },
  });
  return (
    <div>
      <h1>Boards list</h1>
      <form action=""
           onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const name = formData.get('name') as string;
             createBoardMutation.mutate({ body: { name } });
            e.target.reset();
          }}
      >
        <input type="text" name="name" />
        <button type="submit" disabled={createBoardMutation.isPending}>
          Create Board
        </button>
      </form>
      {boardsQuery.data?.map((board) => (
        <div>
          <Link to={href(ROUTES.BOARD, { boardId: board.id })}>{board.name}_{board.id}</Link>
          <button
            disabled={deleteBoardMutation.isPending}
            onClick={() => 
            deleteBoardMutation.mutate({ 
              params: { path: { boardId: board.id }},
            })
          }
            >
              Delete Board
          </button>
        </div>
      ))}
      <div>CONFIG.API_BASE_URL: {CONFIG.API_BASE_URL} </div>
      <button onClick={() => createBoardMutation.mutate({ body: { name: "New Board" } })}>Create Board</button>
      </div>
  );
}

export const Component = BoardsListPage;
