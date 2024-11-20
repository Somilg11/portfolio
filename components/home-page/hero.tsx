import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
    <main>
      <Alert className="flex justify-between items-center py-5 rounded-md">
        {" "}
        {/* Removed width, max-width, and centering classes */}
        <div className="flex items-center justify-start gap-2">
          <AlertDialog>
            <AlertDialogTrigger>
              <Avatar>
                <AvatarImage src="/myprofileimage.jpg" alt="@shadcn" />
                <AvatarFallback>SG</AvatarFallback>
              </Avatar>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-3">
              <div className="flex gap-4">
                <Image
                  src="/myprofileimage.jpg"
                  height={100}
                  width={115}
                  alt="Profile image"
                  className="rounded-lg"
                />
                <div>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-sm mb-0">
                      Somil Gupta
                    </AlertDialogTitle>
                    <span className="text-xs text-slate-400">
                      - 2nd yr student at IIIT-Bhagalpur
                    </span>
                    <AlertDialogDescription className="text-xs">
                      Aspiring Full Stack Web Developer, can create flawless
                      looking designs and translate them into real coded
                      websites. Used various frameworks and libraries.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>X</AlertDialogCancel>
                </AlertDialogFooter>
              </div>
            </AlertDialogContent>
          </AlertDialog>
          <span>
            <AlertTitle className="font-semibold tracking-wide">
              Somil Gupta
            </AlertTitle>
            <AlertDescription className="text-base text-slate-200 tracking-wide">
              
              <WordPullUp
      className="text-xs font-extralight tracking-[-0.02em] text-black dark:text-white md:text-xs"
      words="Full Stack Developer"
    />
            </AlertDescription>
          </span>
        </div>
        <div className="flex gap-2 cursor-pointer">
          <a
            href="/resume.pdf" // Path to the resume file (could be in public folder)
            download="somil_resume.pdf" // Custom filename for the downloaded file
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-pointer">
                    <Paperclip size={20} />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-900 text-white px-3 py-2 rounded-md shadow-lg">
                  <p>resume</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </a>
          <a
            href="https://www.linkedin.com/in/somil-1101s/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="https://twitter.com/somil_1101"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter size={20} />
          </a>
          <a
            href="mailto:gsomil93@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://github.com/Somilg11"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={20} />
          </a>
        </div>
      </Alert>
    </main>
  );
};

export default Hero;
