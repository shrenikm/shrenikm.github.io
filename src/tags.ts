// Single source of truth for post tags.
//
// The content schema validates every post's frontmatter against this list
// (see src/content.config.ts), so a tag that is not declared here fails the
// build instead of silently creating a stray entry in the taxonomy. Keep the
// list alphabetical when adding new tags.

export const TAGS = [
  "behavior_cloning",
  "concept",
  "control",
  "drake",
  "experiment",
  "generalist_policies",
  "generative_policies",
  "implementation",
  "jax",
  "learnings",
  "legged",
  "linear_algebra",
  "machine_learning",
  "manipulation",
  "math",
  "motion_planning",
  "numerical_analysis",
  "numerical_optimization",
  "paper",
  "reference",
  "robotics",
  "simulation",
  "trajectory_optimization",
  "tutorial",
  "VLA",
] as const;

export type Tag = (typeof TAGS)[number];
