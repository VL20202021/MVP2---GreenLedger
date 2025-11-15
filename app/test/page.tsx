export default function TestPage() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Green Ledger - Test Page</h1>
      <p>If you can see this, the app is working!</p>
      <p>DATABASE_URL is set: {process.env.DATABASE_URL ? "Yes" : "No"}</p>
      <p>Environment: {process.env.NODE_ENV}</p>
    </div>
  );
}

