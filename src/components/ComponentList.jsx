// Display and edit components for the selected project
export default function ComponentList({
  components,
  units,
  onAddComponent,
  onDuplicateComponent,
  onUpdateComponent,
  onUpdatePart,
  onAddPart,
}) {
  return (
    <section style={styles.wrapper}>
      <div style={styles.headerRow}>
        <h2>Components</h2>
        <button onClick={onAddComponent} style={styles.primaryButton}>
          Add Component
        </button>
      </div>

      {components.map((component) => (
        <div key={component.id} style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardHeaderLeft}>
              <input
                value={component.name}
                onChange={(event) =>
                  onUpdateComponent(component.id, { name: event.target.value })
                }
                placeholder="Component name"
                style={styles.titleInput}
              />

              <input
                value={component.notes}
                onChange={(event) =>
                  onUpdateComponent(component.id, { notes: event.target.value })
                }
                placeholder="Component notes"
                style={styles.notesInput}
              />
            </div>

            <div style={styles.cardActions}>
              <button
                onClick={() => onDuplicateComponent(component.id)}
                style={styles.secondaryButton}
              >
                Duplicate
              </button>
            </div>
          </div>

          <div style={styles.buildQuantityRow}>
            <label style={styles.label}>Build Quantity</label>
            <input
              type="number"
              min="0"
              value={component.buildQuantity ?? 0}
              onChange={(event) =>
                onUpdateComponent(component.id, {
                  buildQuantity: Number(event.target.value),
                })
              }
              style={styles.smallInput}
            />
          </div>

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
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={part.quantity}
                      onChange={(event) =>
                        onUpdatePart(component.id, part.id, {
                          quantity: Number(event.target.value),
                        })
                      }
                      style={styles.smallInput}
                    />
                  </td>
                  <td>
                    <select
                      value={part.unit}
                      onChange={(event) =>
                        onUpdatePart(component.id, part.id, {
                          unit: event.target.value,
                        })
                      }
                      style={styles.select}
                    >
                      {units.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      value={part.material}
                      onChange={(event) =>
                        onUpdatePart(component.id, part.id, {
                          material: event.target.value,
                        })
                      }
                      style={styles.input}
                    />
                  </td>
                  <td>
                    <input
                      value={part.length}
                      onChange={(event) =>
                        onUpdatePart(component.id, part.id, {
                          length: event.target.value,
                        })
                      }
                      style={styles.input}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={() => onAddPart(component.id)}
            style={styles.secondaryButton}
          >
            Add Part
          </button>
        </div>
      ))}
    </section>
  );
}

const styles = {
  wrapper: {
    marginTop: "24px",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "16px",
    background: "white",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "16px",
  },
  cardHeaderLeft: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  cardActions: {
    display: "flex",
    alignItems: "flex-start",
  },
  buildQuantityRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginBottom: "16px",
  },
  label: {
    fontWeight: "bold",
  },
  titleInput: {
    fontSize: "18px",
    fontWeight: "bold",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  notesInput: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  smallInput: {
    width: "80px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  select: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  primaryButton: {
    padding: "10px 14px",
    border: "1px solid #222",
    background: "#222",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
  secondaryButton: {
    padding: "8px 12px",
    border: "1px solid #777",
    background: "#fff",
    color: "#222",
    borderRadius: "6px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "12px",
  },
};