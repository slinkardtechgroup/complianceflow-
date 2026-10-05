import { supabase } from "../../lib/supabase";

export default async function AlertsPage() {
  const { data: documents } = await supabase
    .from("documents")
    .select("*");

  const today = new Date();

  const alerts =
    documents?.filter((doc) => {
      if (!doc.expiration_date) return false;

      const expirationDate = new Date(
        doc.expiration_date
      );

      const daysRemaining = Math.ceil(
        (expirationDate.getTime() -
          today.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      return daysRemaining <= 30;
    }) || [];

  return (
    <main style={{ padding: "40px" }}>
      <h1>Compliance Alerts</h1>

      {alerts.length === 0 ? (
        <p>✅ No expiring documents.</p>
      ) : (
        alerts.map((doc) => {
          const expirationDate = new Date(
            doc.expiration_date
          );

          const daysRemaining = Math.ceil(
            (expirationDate.getTime() -
              today.getTime()) /
              (1000 * 60 * 60 * 24)
          );

          return (
            <div
              key={doc.id}
              style={{
                border: "1px solid orange",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              <h3>{doc.document_type}</h3>

              <p>
                Expires:
                {" "}
                {doc.expiration_date}
              </p>

              <p
                style={{
                  color: "orange",
                  fontWeight: "bold",
                }}
              >
                ⚠ Expires in {daysRemaining} days
              </p>
            </div>
          );
        })
      )}
    </main>
  );
}
``