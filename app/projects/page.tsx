import { supabase } from "../../lib/supabase";

export default async function ProjectsPage() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*");

  return (
    <main style={{ padding: "40px" }}>
      <h1>Projects</h1>

      {error && (
        <p style={{ color: "red" }}>
          Error: {error.message}
        </p>
      )}

      {projects?.length === 0 && (
        <p>No projects found.</p>
      )}

      {projects?.map((project) => (
        <div
          key={project.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h2>{project.project_name}</h2>

          <p>
            Project Number: {project.project_number}
          </p>

          <p>
            Location: {project.location}
          </p>

          <p>
            Status: {project.status}
          </p>
        </div>
      ))}
    </main>
  );
}