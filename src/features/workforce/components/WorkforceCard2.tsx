import styles from './WorkforceCard2.module.css';

import { MoreVertical, Share, Trash2, Plus, Search } from "lucide-react";
import { MoreVerticalIcon, ShareIcon } from "@/components/icons/icons";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
// import { MoreOptionsMenu } from "@/components/custom/MoreOptionsMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy } from "lucide-react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";


export function WorkforceCard2({
  id,
  title,
  description

}) {
  return (
    <>
      <Card className="flex flex-col gap-4 p-5 relative overflow-hidden bg-white rounded-xl border border-solid border-neutral-200 w-[calc((100%/3)-10px)]  w-xl-[calc(100%/3)] max-md:w-[calc(50%_-_8px)] max-sm:w-full">


        <CardHeader className="flex gap-3 items-start w-full p-0 flex-row">
          <div className="flex items-center gap-3 flex-1">
            <Image
              src={`/images/agents/agent${id}.png`}
              alt={`${title} avatar`}
              width={48}
              height={48}
              className="rounded-full"
            />
            <h3 className="text-base font-semibold text-neutral-800">{title}</h3>
          </div>
          <div className="z-10" >


            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end"  >
                <DropdownMenuItem className="text-destructive" onClick={(e) => { e.stopPropagation(); alert("Removed from workforce") }}>
                  <Trash2 className="mr-2 h-4 w-4" /> <span>Remove  </span>
                </DropdownMenuItem>

                {/* <DropdownMenuItem className="text--destructive">

                  <Dialog >
                    <DialogTrigger asChild>

                      <div className="flex">
                        <ShareIcon className="mr-2 h-4 w-4" />
                        <span>Share</span>
                      </div>

                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Share link</DialogTitle>
                        <DialogDescription>
                          Anyone who has this link will be able to view this.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                          <Label htmlFor="link" className="sr-only">
                            Link {id}
                          </Label>
                          <Input
                            id="link"
                            defaultValue="https://ui.shadcn.com/docs/installation"
                            readOnly
                          />
                        </div>
                        <Button type="submit" size="sm" className="px-3">
                          <span className="sr-only">Copy</span>
                          <Copy />
                        </Button>
                      </div>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        {/* <div className="w-full h-px bg-neutral-100" /> */}

        <Separator className="my-5" />

        <CardContent className="flex gap-3 items-start p-0">
          <p className="flex-1 text-sm leading-5 text-neutral-500">
            {description}
          </p>
          {/* <Button
            variant="ghost"
            className="flex gap-1 justify-center items-center h-10 text-sm rounded-xl cursor-pointer text-neutral-500" >
            <ShareIcon className="text-neutral-500" />
            <span>Share</span>
          </Button> */}
          <div className="z-10">
            <Dialog >
              <DialogTrigger asChild>
                <Button variant="outline">
                  <ShareIcon className="text-neutral-500 mx-1" />
                  <span>Share</span></Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Share link {id}</DialogTitle>
                  <DialogDescription>
                    Anyone who has this link will be able to view this. 
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input
                      id="link"
                      defaultValue="https://ui.shadcn.com/docs/installation"
                      readOnly
                    />
                  </div>
                  <Button type="submit" size="sm" className="px-3">
                    <span className="sr-only">Copy</span>
                    <Copy />
                  </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>

        <Link className={styles.clickable_card} href={`/workforce/${id}/`}> </Link>
      </Card>


    </>
  );
}
