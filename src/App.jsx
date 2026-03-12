import { useMemo, useState } from "react";
import { sampleProjects } from "./data/sampleData";
import ProjectSidebar from "./components/ProjectSidebar";
import ComponentList from "./components/ComponentList";
import { aggregateCutList } from "./utils/cutList";

// Main application shell for the greenhouse cut list app
export default function App() {
  // Top-level application state for all projects
  const [projects, setProjects] = useState(sampleProjects);

  // Track which project is currently selected
  const [selectedProjectId, setSelectedProjectId] = useState(sampleProjects[0].id);

  // Create a new project and switch to it
  function handleAddProject(projectName) {
    const newProject = {
      id: crypto.randomUUID(),
      name: projectName,
      notes: "New greenhouse project",
      units: ["pcs", "boards", "sheets", "ft", "in"],
      components: [],
    };

    setProjects((currentProjects) => [...currentProjects, newProject]);
    setSelectedProjectId(newProject.id);
  }

  // Find the active project from the project list
  const selectedProject = useMemo(() => {
    return projects.find((project) => project.id === selectedProjectId);
  }, [projects, selectedProjectId]);

  // Update fields on a selected component
  function handleUpdateComponent(componentId, updates) {
    setProjects((currentProjects) =>
      currentProjects.map((project) => {
        if (project.id !== selectedProjectId) return project;

        return {
          ...project,
          components: project.components.map((component) =>
            component.id === componentId
              ? { ...component, ...updates }
              : component
          ),
        };
      })
    );
  }

  // Update fields on a specific part row
  function handleUpdatePart(componentId, partId, updates) {
    setProjects((currentProjects) =>
      currentProjects.map((project) => {
        if (project.id !== selectedProjectId) return project;

        return {
          ...project,
          components: project.components.map((component) => {
            if (component.id !== componentId) return component;

            return {
              ...component,
              parts: component.parts.map((part) =>
                part.id === partId ? { ...part, ...updates } : part
              ),
            };
          }),
        };
      })
    );
  }

  // Add a blank component to the selected project
  function handleAddComponent() {
    const newComponent = {
      id: crypto.randomUUID(),
      name: "New Component",
      notes: "",
      buildQuantity: 1,
      parts: [
        {
          id: crypto.randomUUID(),
          material: "",
          length: "",
          unit: selectedProject.units[0] ?? "pcs",
          quantity: 1,
        },
      ],
    };

    setProjects((currentProjects) =>
      currentProjects.map((project) => {
        if (project.id !== selectedProjectId) return project;

        return {
          ...project,
          components: [...project.components, newComponent],
        };
      })
    );
  }

  // Duplicate an existing component so it can be modified independently
  function handleDuplicateComponent(componentId) {
    const componentToDuplicate = selectedProject.components.find(
      (component) => component.id === componentId
    );

    if (!componentToDuplicate) return;

    const duplicatedComponent = {
      ...componentToDuplicate,
      id: crypto.randomUUID(),
      name: `${componentToDuplicate.name} Copy`,
      parts: componentToDuplicate.parts.map((part) => ({
        ...part,
        id: crypto.randomUUID(),
      })),
    };

    setProjects((currentProjects) =>
      currentProjects.map((project) => {
        if (project.id !== selectedProjectId) return project;

        return {
          ...project,
          components: [...project.components, duplicatedComponent],
        };
      })
    );
  }

  // Add a new part row to a component
  function handleAddPart(componentId) {
    const newPart = {
      id: crypto.randomUUID(),
      material: "",
      length: "",
      unit: selectedProject.units[0] ?? "pcs",
      quantity: 1,
    };

    setProjects((currentProjects) =>
      currentProjects.map((project) => {
        if (project.id !== selectedProjectId) return project;

        return {
          ...project,
          components: project.components.map((component) =>
            component.id === componentId
              ? { ...component, parts: [...component.parts, newPart] }
              : component
          ),
        };
      })
    );
  }

  // Generate the current cut list preview from build quantities
  const cutList = useMemo(() => {
    const componentsWithQuantities = selectedProject.components.map((component) => ({
      component,
      buildQuantity: component.buildQuantity ?? 0,
    }));

    return aggregateCutList(componentsWithQuantities);
  }, [selectedProject]);

  return (
    <div style={styles.app}>
      <ProjectSidebar
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        onAddProject={handleAddProject}
      />

      <main style={styles.main}>
        <h1>Greenhouse Cut List</h1>
        <p style={styles.subtitle}>
          Project: <strong>{selectedProject.name}</strong>
        </p>

        <ComponentList
          components={selectedProject.components}
          units={selectedProject.units}
          onAddComponent={handleAddComponent}
          onDuplicateComponent={handleDuplicateComponent}
          onUpdateComponent={handleUpdateComponent}
          onUpdatePart={handleUpdatePart}
          onAddPart={handleAddPart}
        />

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