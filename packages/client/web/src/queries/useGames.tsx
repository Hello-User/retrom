import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { GetGamesRequest, GetGamesResponse } from "@/generated/retrom/services";
import { useRetromClient } from "@/providers/retrom-client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

type SelectFn<S> = (data: GetGamesResponse) => S;

export function useGames<T = GetGamesResponse>(opts: {
  request?: Partial<GetGamesRequest>;
  selectFn?: SelectFn<T>;
}) {
  const { request = {}, selectFn } = opts;
  const { toast } = useToast();
  const navigate = useNavigate();
  const retromClient = useRetromClient();

  return useQuery({
    queryKey: [
      "games",
      "game-metadata",
      "game-files",
      request,
      retromClient,
      toast,
    ],
    queryFn: async () => {
      const data = await retromClient.gameClient.getGames(request);
      if (!data.games.length) {
        toast({
          title: "Your Library Is Empty",
          duration: Infinity,
          description: "Have you added any games to your library yet?",
          action: (
            <ToastAction
              altText="open update library modal"
              onClick={() =>
                navigate({ search: { updateLibraryModal: { open: true } } })
              }
            >
              Update Library
            </ToastAction>
          ),
        });
      }
      return data;
    },
    select: selectFn,
  });
}