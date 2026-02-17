import { ROUTES } from "@/shared/model/routes";
import { Link, href } from "react-router-dom";
import { CONFIG } from "@/shared/model/config";
import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardAction, CardHeader, CardFooter } from "@/shared/ui/kit/card";
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Boards list</h1>
      <form action=""
           onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const name = formData.get('name') as string;
             createBoardMutation.mutate({ body: { name } });
            e.target.reset();
          }}
      >
        <input type="text" name="name" className="w-20 mr-4 border border-gray-300 rounded-md p-2" />
        
        <Button variant="default" size="sm">Create Board</Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {boardsQuery.data?.map((board) => (
        <Card key={board.id} className="p-4 mt-4">
          <CardHeader >
            <Button variant="link" size="sm" asChild>
              <Link to={href(ROUTES.BOARD, { boardId: board.id })}>{board.name}</Link>
              </Button>
         
          </CardHeader>
          <CardFooter>
            <CardAction>
            <Button
           variant="destructive" 
           size="sm"
           disabled={deleteBoardMutation.isPending}
            onClick={() => 
            deleteBoardMutation.mutate({ 
              params: { path: { boardId: board.id }},
            })}
            >
              Delete Board
            </Button>
            </CardAction>
         
          </CardFooter>
         
        </Card>
      ))}
      </div>
     
     </div>
  );
}

export const Component = BoardsListPage;
