import { supabase } from "../lib/supabase";

export default async function VendorsPage() {
  const { data: vendors } = await supabase
    .from("vendors")
    .select("*");

  return (
    <main style={{ padding: "40px" }}>
      <h1>Vendors</h1>

      {vendors?.map((vendor) => (
        <div
          key={vendor.id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>{vendor.trade_type}</h2>

          <p>{vendor.contact_name}</p>

          <p>{vendor.contact_email}</p>

          <p>Status: {vendor.compliance_status}</p>

          <p>ID: {vendor.id}</p>
        </div>
      ))}
    </main>
  );
}