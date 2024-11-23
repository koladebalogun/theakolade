import { getProject } from "@theatre/core";

// Cache to store project instances by project ID
const projectCache = {};

// Utility function to get a project, ensuring only one instance per project ID
export function getTheatreProject(projectId, config) {
  if (!projectCache[projectId]) {
    projectCache[projectId] = getProject(projectId, config);
  }
  return projectCache[projectId];
}