import { useState } from "react";

// Sidebar for selecting and creating projects
export default function ProjectSidebar({
  projects,
  selectedProjectId,
  onSelectProject,
  onAddProject,
}) {
  // Local input state for new project name
  const [newProjectName, setNewProjectName] = useState("");

  // Submit a new project to the parent app
  function handleAddProject() {
    const trimmedName = newProjectName.trim();

    if (!trimmedName) return;

    onAddProject(trimmedName);
    setNewProjectName("");
  }

  return (
    <aside style={styles.sidebar}>
      <h2>Projects</h2>

      <div style={styles.newProjectRow}>
        <input
          value={newProjectName}
          onChange={(event) => setNewProjectName(event.target.value)}
          placeholder="New project name"
          style={styles.input}
        />
        <button onClick={handleAddProject} style={styles.addButton}>
          Add
        </button>
      </div>

      {projects.map((project) => {
        const isActive = project.id === selectedProjectId;

        return (
          <button
            key={project.id}
            onClick={() => onSelectProject(project.id)}
            style={{
              ...styles.projectButton,
              ...(isActive ? styles.activeProjectButton : {}),
            }}
          >
            <strong>{project.name}</strong>
            <div style={styles.smallText}>{project.notes}</div>
          </button>
        );
      })}
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "280px",
    borderRight: "1px solid #ddd",
    padding: "16px",
    background: "#fff",
  },
  newProjectRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  addButton: {
    padding: "8px 12px",
    border: "1px solid #222",
    background: "#222",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
  projectButton: {
    display: "block",
    width: "100%",
    textAlign: "left",
    marginBottom: "12px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "white",
    cursor: "pointer",
  },
  activeProjectButton: {
    border: "2px solid #222",
    background: "#f3f3f3",
  },
  smallText: {
    fontSize: "12px",
    color: "#555",
    marginTop: "4px",
  },
};