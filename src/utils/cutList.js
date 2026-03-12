// Build a readable key for grouping matching cut list items
export function buildPartKey(part) {
  return `${part.material}__${part.length}__${part.unit}`;
}

// Combine matching parts into one total cut list
export function aggregateCutList(componentsWithQuantities) {
  const totals = new Map();

  componentsWithQuantities.forEach(({ component, buildQuantity }) => {
    component.parts.forEach((part) => {
      const key = buildPartKey(part);

      if (!totals.has(key)) {
        totals.set(key, {
          material: part.material,
          length: part.length,
          unit: part.unit,
          quantity: 0,
        });
      }

      const current = totals.get(key);
      current.quantity += part.quantity * buildQuantity;
    });
  });

  return Array.from(totals.values());
}