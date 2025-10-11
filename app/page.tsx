import { Container, Main, Section } from "@/components/craft";
import React from "react";
import ProfileCard from "@/components/home-page/profile-card";
import LinksCard from "@/components/home-page/links-card";
import ProjectPoster from "@/components/home-page/project-poster";
import TechStackCard from "@/components/home-page/tech-stack-card";
import ToolsBoard from "@/components/home-page/tools-board";

const IndexPage = () => {
  return (
    <Main className="min-h-screen bg-zinc-950 relative">
      <Section>
        <Container className="w-full max-w-[1400px] mx-auto px-2 md:px-8 py-2 md:py-6">
          <div className="flex flex-col md:grid md:grid-cols-[1fr_2fr_1fr] gap-8">
            {/* Left column - Tech stack */}
            <div className="order-3 md:order-1">
              <TechStackCard />
            </div>

            {/* Center column - Profile + Tools board */}
            <div className="order-1 md:order-2 flex flex-col gap-6 w-full h-full">
              <div className="flex-grow w-full">
                <ProfileCard />
              </div>
              <div className="flex-grow w-full">
                <ToolsBoard />
              </div>
            </div>

            {/* Right column - Links + Project poster */}
            <div className="order-2 md:order-3 flex flex-col gap-6 md:items-end">
              <div className="w-full md:w-auto">
                <LinksCard />
              </div>
              <div className="w-full md:w-auto">
                <ProjectPoster />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Main>
  );
};

export default IndexPage;
