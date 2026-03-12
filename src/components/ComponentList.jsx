// Display all components for the selected project
export default function ComponentList({ components }) {
  return (
    <section style={styles.wrapper}>
      <h2>Components</h2>

      {components.map((component) => (
        <div key={component.id} style={styles.card}>
          <h3>{component.name}</h3>
          <p style={styles.notes}>{component.notes}</p>

          <table style={styles.table}>
            <thead>
              <tr>
                <th align="left">Qty</th>
                <th align="left">Unit</th>
                <th align="left">Material</th>
                <th align="left">Length</th>
              </tr>
            </thead>
            <tbody>
              {component.parts.map((part) => (
                <tr key={part.id}>
                  <td>{part.quantity}</td>
                  <td>{part.unit}</td>
                  <td>{part.material}</td>
                  <td>{part.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </section>
  );
}

const styles = {
  wrapper: {
    flex: 1,
    padding: "24px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "16px",
    background: "white",
  },
  notes: {
    color: "#666",
    marginTop: "0",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};