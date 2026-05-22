"use client";

import { useState } from "react";

export interface FieldDef {
  name: string;
  label: string;
  type?: "text" | "number" | "checkbox" | "textarea";
  wide?: boolean;
}

interface Props {
  prefix: string;
  fields: FieldDef[];
  initialItems: Record<string, string | number | boolean>[];
}

export function DynamicList({ prefix, fields, initialItems }: Props) {
  const [items, setItems] = useState<Record<string, string | number | boolean>[]>(
    initialItems.length > 0 ? initialItems : [emptyItem(fields)]
  );

  function add() {
    setItems((prev) => [...prev, emptyItem(fields)]);
  }

  function remove(idx: number) {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }

  function update(idx: number, field: string, value: string | boolean) {
    setItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    );
  }

  return (
    <div className="dynlist">
      <input type="hidden" name={`${prefix}__count`} value={items.length} />
      {items.map((item, idx) => (
        <div key={idx} className="dynlist__item">
          <div className="dynlist__fields">
            {fields.map((f) => (
              <label
                key={f.name}
                className="admin__field"
                style={f.wide ? { gridColumn: "1 / -1" } : undefined}
              >
                <span>{f.label}</span>
                {f.type === "textarea" ? (
                  <textarea
                    name={`${prefix}__${idx}__${f.name}`}
                    value={String(item[f.name] ?? "")}
                    onChange={(e) => update(idx, f.name, e.target.value)}
                    rows={3}
                  />
                ) : f.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    name={`${prefix}__${idx}__${f.name}`}
                    checked={Boolean(item[f.name])}
                    onChange={(e) => update(idx, f.name, e.target.checked)}
                  />
                ) : (
                  <input
                    type={f.type ?? "text"}
                    name={`${prefix}__${idx}__${f.name}`}
                    value={String(item[f.name] ?? "")}
                    onChange={(e) => update(idx, f.name, e.target.value)}
                  />
                )}
              </label>
            ))}
          </div>
          <button
            type="button"
            className="btn btn--ghost btn--sm dynlist__remove"
            onClick={() => remove(idx)}
            aria-label="Remover item"
          >
            ×
          </button>
        </div>
      ))}
      <button type="button" className="btn btn--ghost btn--sm" onClick={add}>
        + Adicionar
      </button>
    </div>
  );
}

function emptyItem(fields: FieldDef[]): Record<string, string | number | boolean> {
  return Object.fromEntries(
    fields.map((f) => [f.name, f.type === "checkbox" ? false : f.type === "number" ? 0 : ""])
  );
}
