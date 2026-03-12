import { useMemo, useState } from "react";
import { sampleProjects } from "./data/sampleData";
import ProjectSidebar from "./components/ProjectSidebar";
import ComponentList from "./components/ComponentList";
import { aggregateCutList } from "./utils/cutList";

// Main application shell for the greenhouse cut list app
export default function App() {
  // Top-level application state for all projects
  const [projects] = useState(sampleProjects);

  // Track which project is currently selected
  const [selectedProjectId, setSelectedProjectId] = useState(sampleProjects[0].id);

  // Find the active project from the project list
  const selectedProject = useMemo(() => {
    return projects.find((project) => project.id === selectedProjectId);
  }, [projects, selectedProjectId]);

  // Temporary build quantities for demo purposes
  const componentsWithQuantities = useMemo(() => {
    return selectedProject.components.map((component) => ({
      component,
      buildQuantity: 1,
    }));
  }, [selectedProject]);

  // Generate the current cut list preview
  const cutList = useMemo(() => {
    return aggregateCutList(componentsWithQuantities);
  }, [componentsWithQuantities]);

  return (
    <div style={styles.app}>
      <ProjectSidebar
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
      />

      <main style={styles.main}>
        <h1>Greenhouse Cut List</h1>
        <p style={styles.subtitle}>
          Project: <strong>{selectedProject.name}</strong>
        </p>

        <ComponentList components={selectedProject.components} />

        <section style={styles.cutListSection}>
          <h2>Cut List Preview</h2>

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
              {cutList.map((item, index) => (
                <tr key={index}>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td>{item.material}</td>
                  <td>{item.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

const styles = {
  app: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    background: "#fafafa",
  },
  main: {
    flex: 1,
    padding: "24px",
  },
  subtitle: {
    color: "#555",
  },
  cutListSection: {
    marginTop: "24px",
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};