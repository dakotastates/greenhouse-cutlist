// Sidebar for selecting a project
export default function ProjectSidebar({
  projects,
  selectedProjectId,
  onSelectProject,
}) {
  return (
    <aside style={styles.sidebar}>
      <h2>Projects</h2>

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