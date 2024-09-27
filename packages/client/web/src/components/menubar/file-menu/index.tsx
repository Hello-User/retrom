import {
  MenubarTrigger,
  MenubarMenu,
  MenubarContent,
  MenubarSeparator,
} from "@/components/ui/menubar";
import { ConfigMenuItem } from "./config-menu-item";
import { CloseMenuItem } from "./close-menu-item";

export function FileMenu() {
  return (
    <MenubarMenu>
      <MenubarTrigger className="py-2 px-2 cursor-pointer h-auto">
        File
      </MenubarTrigger>

      <MenubarContent>
        <ConfigMenuItem />

        <MenubarSeparator className="bg-border/50 w-[95%] px-2 mx-auto" />

        <CloseMenuItem />
      </MenubarContent>
    </MenubarMenu>
  );
}
