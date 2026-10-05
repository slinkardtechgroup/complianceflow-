import { supabase } from "../../../lib/supabase";

export default async function VendorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: vendor } = await supabase
    .from("vendors")
    .select("*")
    .eq("id", id)
    .single();

  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("vendor_id", id);

  if (!vendor) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Vendor Not Found</h1>
      </main>
    );
  }

  const validDocuments =
    documents?.filter(
      (doc) => doc.status === "valid"
    ).length ?? 0;

  const totalDocuments =
    documents?.length ?? 0;

  const complianceScore =
    totalDocuments === 0
      ? 0
      : Math.round(
          (validDocuments / totalDocuments) * 100
        );

  const vendorCleared =
    complianceScore === 100 &&
    totalDocuments > 0;

  return (
    <main style={{ padding: "40px" }}>
      <h1>{vendor.trade_type}</h1>

      <p>{vendor.contact_name}</p>

      <p>{vendor.contact_email}</p>

      <p>Status: {vendor.compliance_status}</p>

      <hr />

      <h2>Compliance Score</h2>

      <div
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        {complianceScore}%
      </div>

{documents?.map((doc) => {
  const expirationDate = new Date(doc.expiration_date);
  const today = new Date();

  const daysRemaining = Math.ceil(
    (expirationDate.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  let expirationMessage = "";
  let expirationColor = "green";

  if (daysRemaining < 0) {
    expirationMessage = `🔴 Expired ${Math.abs(
      daysRemaining
    )} days ago`;
    expirationColor = "red";
  } else if (daysRemaining <= 30) {
    expirationMessage = `🟡 Expires in ${daysRemaining} days`;
    expirationColor = "orange";
  } else {
    expirationMessage = `🟢 ${daysRemaining} days remaining`;
    expirationColor = "green";
  }

  return (
    <div
      key={doc.id}
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "8px",
      }}
    >
      <h3>{doc.document_type}</h3>

      <p
        style={{
          color:
            doc.status === "valid"
              ? "green"
              : doc.status === "expiring"
              ? "orange"
              : "red",
          fontWeight: "bold",
        }}
      >
        Status: {doc.status}
      </p>

      <p>Expires: {doc.expiration_date}</p>

      <p
        style={{
          color: expirationColor,
          fontWeight: "bold",
        }}
      >
        {expirationMessage}
      </p>
    </div>
  );
})}

      <hr />

      <h2>Mobilization Status</h2>

      <div
        style={{
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: vendorCleared
            ? "#e8f5e9"
            : "#ffebee",
          border: vendorCleared
            ? "2px solid green"
            : "2px solid red",
          fontWeight: "bold",
        }}
      >
        {vendorCleared
          ? "✅ CLEARED TO MOBILIZE"
          : "🚫 NOT CLEARED TO MOBILIZE"}
      </div>
    </main>
  );
}
