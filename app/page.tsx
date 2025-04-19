import Cooking from "@/components/cooking/cooking";
import { Container, Main, Section } from "@/components/craft";
import Experience from "@/components/experience/experience";
import Hero from "@/components/home-page/hero";
import Projects from "@/components/projects/project";
import { Coffee } from "lucide-react";
import React from "react";

const IndexPage = () => {
  return (
    <Main>
      <Section>
        <Container className="w-full sm:w-[80%] max-w-2xl mx-auto">
          <Hero />
          <Cooking />
          <Projects />
          <Experience />
        </Container>
        <div className="flex flex-end fixed right-0 bottom-0 p-3 z-10">
          <span className="border border-slate-500 p-3 rounded-full cursor-pointer bg-slate-950">
            <a
              href="http://buymeacoffee.com/gsomil93q"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Coffee />
            </a>
          </span>
        </div>
      </Section>
    </Main>
  );
};

export default IndexPage;
