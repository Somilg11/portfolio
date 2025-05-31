import { MagicCard } from "@/components/ui/magic-card";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import NumberTicker from "@/components/ui/number-ticker";
import React from "react";
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
import { SquareChevronRight } from "lucide-react";

const Cooking = () => {
  return (
    <main>
      <div className="flex justify-between items-center">
        <h1 className="mt-5 py-2 inline-flex gap-2">currently cooking 🍳</h1>
        <h1 className="py-2">
          <span className="border border-slate-800 rounded-md p-2 cursor-pointer">
            <AlertDialog>
              <AlertDialogTrigger>cp</AlertDialogTrigger>
              <AlertDialogContent className="p-2">
                <AlertDialogHeader>
                  <AlertDialogTitle>cp ratings</AlertDialogTitle>
                  <AlertDialogDescription>
                    <p className="inline-flex gap-2 text-base">
                      <SquareChevronRight className="text-red-500" />
                      <a
                        href="https://www.codechef.com/users/coding_bear_x"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        codechef: 
                        <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
      <NumberTicker value={1676} />
    </p>
                      </a>
                    </p>
                    <br />
                    <p className="inline-flex gap-2 text-base">
                      <SquareChevronRight className="text-purple-600" />
                      <a
                        href="https://codeforces.com/profile/coding_bear"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        codeforces: 
                        <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
      <NumberTicker value={1195} />
    </p>
                      </a>
                    </p>
                    <br />
                    <p className="inline-flex gap-2 text-base">
                      <SquareChevronRight className="text-yellow-500" />
                      <a
                        href="https://leetcode.com/u/strangecode93/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        leetcode: 
                        <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
      <NumberTicker value={1791} />
    </p>
                      </a>
                    </p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>x</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </span>
        </h1>
      </div>
      <hr />
      <div className="text-sm mb-4">
        <h1 className="mt-3">Automation</h1>
        <p className="text-slate-500">I&apos;m diving deep into automation tools and frameworks to streamline repetitive tasks and improve efficiency in my projects.</p>
        <h1 className="mt-3">Web3 & Decentralized Technologies</h1>
        <p className="text-slate-500">I&apos;m learning about the Web3 ecosystem, focusing on blockchain integration and building decentralized applications (dApps).</p>
      </div>
      <h1>services 🛠️</h1>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 mb-5">
        <MagicCard
          className="h-[80px] mt-4 cursor-pointer flex-col p-4 shadow-2xl whitespace-nowrap text-xl"
          gradientColor={"#D9D9D955"}
        >
          <div className="text-sm tracking-wide">👨🏻‍💻Full Stack</div>
          <div className="text-xs text-slate-400 text-wrap">Complete web solutions from design to deployment, both frontend & backend.</div>
        </MagicCard>
        <MagicCard
          className="h-[80px] lg:mt-4 cursor-pointer flex-col p-4 shadow-2xl whitespace-nowrap text-xl"
          gradientColor={"#D9D9D955"}
        >
          <div className="text-sm tracking-wide">💬Custom Web Applications</div>
          <div className="text-xs text-slate-400 text-wrap">Developing tailor-made web applications based on specific client requirements.</div>
        </MagicCard>
        <MagicCard
          className="h-[80px] cursor-pointer flex-col p-4 shadow-2xl whitespace-nowrap text-xl"
          gradientColor={"#D9D9D955"}
        >
          <div className="text-sm tracking-wide">🎥SEO Optimization</div>
          <div className="text-xs text-slate-400 text-wrap">Improving website visibility with on-page SEO techniques and optimizations.</div>
        </MagicCard>
      </div>
      <div className="mb-5">
        <h1>tools 🧰</h1>
        <VelocityScroll
          text="Typescript ⭕ React ⭕ Next.js ⭕ Tailwind CSS ⭕ Vercel ⭕ Node ⭕ Express ⭕ MongoDB ⭕ Postgres ⭕ Prisma ⭕ Docker ⭕ Redis ⭕ Github ⭕ CI/CD ⭕ Socket.io ⭕ AWS ⭕"
          default_velocity={5}
          className="font-display text-center text-xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-xl leading-[-5rem]"
        />
      </div>
    </main>
  );
};

export default Cooking;
