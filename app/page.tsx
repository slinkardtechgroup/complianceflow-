import { supabase } from "../lib/supabase";

export default async function Home() {
  const { count: companyCount } = await supabase
    .from("companies")
    .select("*", {
      count: "exact",
      head: true,
    });

  const { count: projectCount } = await supabase
    .from("projects")
    .select("*", {
      count: "exact",
      head: true,
    });

  const { count: vendorCount } = await supabase
    .from("vendors")
    .select("*", {
      count: "exact",
      head: true,
    });

  return (
    <main style={{ padding: "40px" }}>
      <h1>ComplianceFlow Dashboard</h1>

      <div style={{ display: "flex", gap: "40px" }}>
        <div>
          <h2>Companies</h2>
          <h3>{companyCount ?? 0}</h3>
        </div>

        <div>
          <h2>Projects</h2>
          <h3>{projectCount ?? 0}</h3>
        </div>

        <div>
          <h2>Vendors</h2>
          <h3>{vendorCount ?? 0}</h3>
        </div>
      </div>

      <hr />

      <h2>Pages</h2>

      <p>/vendors</p>
      <p>/projects</p>
      <p>/alerts</p>
    </main>
  );
}