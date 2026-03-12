// Sample starter data for the greenhouse cut list app
export const sampleProjects = [
  {
    id: "project-1",
    name: "Demo Greenhouse",
    notes: "Starter greenhouse project",
    units: ["pcs", "boards", "sheets", "ft", "in"],
    components: [
      {
        id: "component-1",
        name: "Panel",
        notes: "Standard wall panel",
        buildQuantity: 1,
        parts: [
          { id: "part-1", material: "2x4", length: "3 ft", unit: "pcs", quantity: 2 },
          { id: "part-2", material: "2x4", length: "5 ft", unit: "pcs", quantity: 2 },
        ],
      },
      {
        id: "component-2",
        name: "Frame",
        notes: "Standard frame",
        buildQuantity: 1,
        parts: [
          { id: "part-3", material: "2x4", length: "3 ft", unit: "pcs", quantity: 2 },
          { id: "part-4", material: "2x4", length: "10 ft", unit: "pcs", quantity: 2 },
        ],
      },
    ],
  },
];