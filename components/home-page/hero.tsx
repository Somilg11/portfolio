import React from "react";
import { AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, LinkedinIcon, Mail, Paperclip, Twitter } from "lucide-react";
import WordPullUp from "@/components/ui/word-pull-up";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const Hero = () => {
  return (
    <main className="w-full rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 shadow-xl border border-zinc-800 px-4 py-3 relative backdrop-blur-md">
      <div className="absolute left-4 top-3 flex gap-1">
        <span className="inline-block w-2 h-2 rounded-full bg-red-400"></span>
        <span className="inline-block w-2 h-2 rounded-full bg-yellow-400"></span>
        <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 pb-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Avatar className="w-20 h-20 border-2 border-zinc-700 shadow cursor-pointer">
              <AvatarImage src="/myprofileimage.jpg" alt="@shadcn" />
              <AvatarFallback>SG</AvatarFallback>
            </Avatar>
          </AlertDialogTrigger>
          <AlertDialogContent className="p-4 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 shadow-2xl rounded-2xl">
            <div className="flex gap-4 items-center">
              <Image
                src="/myprofileimage.jpg"
                height={100}
                width={115}
                alt="Profile image"
                className="rounded-xl border border-zinc-800 shadow"
              />
              <div>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-base font-semibold text-zinc-100 mb-1">Somil Gupta</AlertDialogTitle>
                  <span className="text-xs text-zinc-400">- 3rd yr student at IIIT-Bhagalpur | SIH 2024 Finalist</span>
                  <AlertDialogDescription className="text-xs text-zinc-300 mt-2">
                    Full Stack Web Developer & Backend Lead at DevC.<br />
                    Former SWE Intern at Creova.in. Winner of NMIT Hacks 25 and SIH 2024 Finalist.<br />
                    Open source contributor passionate about building scalable web applications.
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel className="mt-4 bg-zinc-900 text-zinc-200 border border-zinc-700 rounded-full px-4 py-1 hover:bg-zinc-800 transition">Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className="flex flex-col items-center md:items-start">
          <AlertTitle className="font-semibold tracking-wide text-center md:text-left text-zinc-100 text-lg">Somil Gupta</AlertTitle>
          <AlertDescription className="text-base text-zinc-300 tracking-wide text-center md:text-left">
            <WordPullUp
              className="text-xs font-extralight tracking-[-0.02em] text-zinc-100 md:text-xs"
              words="Full Stack Developer | SIH Finalist | DevC Lead"
            />
          </AlertDescription>
        </div>
        <div className="flex gap-2 cursor-pointer flex-wrap justify-center md:justify-end w-full md:w-auto mt-4 md:mt-0">
          <a
            href="/resume.pdf"
            download="somil_resume.pdf"
            className="flex items-center gap-2 text-zinc-100 hover:text-blue-400 transition-colors"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-pointer">
                    <Paperclip size={20} />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="bg-zinc-900 text-zinc-100 px-3 py-2 rounded-md shadow-lg">
                  <p>resume</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </a>
          <a
            href="https://www.linkedin.com/in/somil-1101s/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-100 hover:text-blue-400 transition-colors"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="https://twitter.com/somil_1101"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-100 hover:text-blue-400 transition-colors"
          >
            <Twitter size={20} />
          </a>
          <a
            href="mailto:gsomil93@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-100 hover:text-blue-400 transition-colors"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://github.com/Somilg11"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-100 hover:text-blue-400 transition-colors"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </main>
  );
};

export default Hero;
