import React from "react";
import { projects } from "../../../utils/data";

export default function Projects({ setActiveMenu }) {
  return (
    <>
      <div className="project_list_title">
        <div className="notif-wrapper">
          <div className="notif">
            <p>Want to see something cool? Hover over the link titles</p>
          </div>
        </div>
        <ul
          onMouseLeave={() => {
            setActiveMenu(null);
          }}
        >
          {projects.map((project, i) => {
            return (
              <li
                onMouseOver={() => {
                  setActiveMenu(i);
                }}
                key={project.title}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.title}
                </a>
              </li>
            );
          })}
        </ul>

        {/* <div className="projectlist-scroll-indicator-wrapper">
          <p>Scroll Down</p>
          <div className="projectlist-indicator"></div>
        </div> */}
      </div>
    </>
  );
}
