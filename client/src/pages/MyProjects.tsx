import React, { useEffect, useState } from "react";
import type { Project } from "../types";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dummyProjects } from "../assets/assets";

const MyProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    setProjects(dummyProjects);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="px-4 md:px-16 lg:px-24 xl:px-32">
      {loading ? (
        <div className="flex items-center justify-center h-[80vh]">
          <Loader2Icon className="size-7 animate-spin text-indigo-200" />
        </div>
      ) : projects.length > 0 ? (
        <div className="py-10 min-h-[80vh]">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-2xl font-medium text-white">
              My Projects
            </h1>

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white px-3 sm:px-6 py-1 sm:py-2 rounded bg-gradient-to-br from-indigo-500 to-indigo-600 hover:opacity-90 active:scale-95 transition-all"
            >
              <PlusIcon size={18} />
              Create New
            </button>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => navigate(`/project/${project.id}`)}
                className="group cursor-pointer bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700/50 hover:border-indigo-500/50 hover:bg-gray-800/70 transition-all flex flex-col"
              >
                {/* ✅ FIXED PREVIEW AREA (NO GAP EVER) */}
                <div className="relative w-full aspect-video bg-gray-900 overflow-hidden border-b border-gray-800">
                  {project.current_code ? (
                    <iframe
                      srcDoc={project.current_code}
                      sandbox="allow-scripts allow-same-origin"
                      className="absolute top-0 left-0 w-[1700px] h-[800px] origin-top-left pointer-events-none"
                      style={{
                        transform: "scale(0.25)",
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      No Preview
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-4 text-white bg-linear-180 from-transparent group-hover:from-indigo-950 to-transparent transition-colors">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium line-clamp-2">{project.name}</h2>
                    <button className="px-2.5 py-0.5 mt-1 ml-2 text-xs bg-gray-800 border-gray-700 rounded-full">Website</button>
                    </div>
                    <p className="text-gray-400 mt-1 text-sem line-clamp-2">{project.initial_prompt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 h-[80vh]">
          <h1 className="text-3xl font-semibold text-gray-300">
            You have no projects yet!
          </h1>

          <button
            onClick={() => navigate("/")}
            className="text-white px-5 py-2 mt-5 rounded-md bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all"
          >
            <PlusIcon size={18} />
            Create New
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProjects;