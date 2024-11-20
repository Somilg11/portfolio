import React from "react";
import ProjectCard from "@/components/ui/project-card";

const Projects = () => {
  // Array of project data with image URLs and project URLs
  const projectData = [
    {
      image: "/codeweb.png",
      title: "codeweb",
      description: "coding IDE web application",
      url: "https://github.com/strangecode93/codewebfrontend", // URL of the project
    },
    {
      image: "https://github.com/Somilg11/bithub/raw/main/bithubss.png",
      title: "bithub",
      description: "a place to make github more easy to use",
      url: "https://github.com/Somilg11/bithub", // URL of the project
    },
    {
      image: "/erasor.png",
      title: "Erasor",
      description: "when you combine notion type editor with excali draw canva, you get what it's build",
      url: "https://github.com/Somilg11/erasor_clone", // URL of the project
    },
    {
      image: "/fikc.png",
      title: "fikc.",
      description: "traffic control optimization using Reinforced Learning, simulating in SUMO (landing interface)",
      url: "https://github.com/Somilg11/fikc.", // URL of the project
    },
    {
      image: "https://github.com/Somilg11/rentwheel/raw/main/ss1.png",
      title: "rentwheel",
      description: "vehicle renting application",
      url: "https://github.com/Somilg11/rentwheel", // URL of the project
    },
    {
      image: "https://github.com/Somilg11/recipieFinder/raw/main/public/eatIT_screenshot.png",
      title: "Recipe Finder",
      description: "don't know what to cook with the ingredients, i got you covered mate!!",
      url: "https://github.com/Somilg11/recipieFinder", // URL of the project
    },
  ];

  return (
    <main>
      <div>projects 🏗️</div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 mb-10">
        {projectData.map((project, index) => (
          <ProjectCard
            key={index}
            image={project.image}
            title={project.title}
            description={truncateDescription(project.description, 8)}
            url={project.url}  // Pass the URL to the card
          />
        ))}
        
      </div>
      <div className="text-center">
      <a
            href="https://github.com/Somilg11"
            target="_blank"
            rel="noopener noreferrer"
          >
        <span className="bg-zinc-700 py-1 px-4 text-white font-bold rounded-full text-sm">more</span>
        </a>
      </div>
    </main>
  );
};

const truncateDescription = (text: string, wordLimit: number) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + " ..."
    : text;
};

export default Projects;
