"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { credentials } from "@/content/credentials";
import { education } from "@/content/education";
import { experiences } from "@/content/experiences";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";
import { volunteering } from "@/content/volunteering";
import {
  DOMAINS,
  KIND_LABEL,
  buildGraph,
  buildTrails,
  nodeInDomain,
  type Domain,
  type GraphEdge,
  type GraphNode,
  type NodeKind,
} from "./graph-data";

const KIND_COLOR: Record<NodeKind, string> = {
  skill: "#7f1d1d",
  experience: "#141412",
  project: "#37455a",
  credential: "#6b5a2e",
  education: "#4a5d3a",
  volunteering: "#2f5d5a",
};

const COLUMNS: { kind: NodeKind; x: number; label: string }[] = [
  { kind: "skill", x: 70, label: "Skills" },
  { kind: "experience", x: 230, label: "Experience" },
  { kind: "project", x: 390, label: "Projects" },
  { kind: "credential", x: 550, label: "Credentials" },
  { kind: "education", x: 710, label: "Education" },
  { kind: "volunteering", x: 870, label: "Community" },
];

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(max-width: 860px)");
    const update = () => setMobile(q.matches);
    update();
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);
  return mobile;
}

function neighbors(ref: string, edges: GraphEdge[]): Set<string> {
  const set = new Set<string>([ref]);
  for (const e of edges) {
    if (e.source === ref) set.add(e.target);
    if (e.target === ref) set.add(e.source);
  }
  return set;
}

function truncate(label: string, max = 22) {
  return label.length <= max ? label : `${label.slice(0, max - 1)}…`;
}

function monogram(label: string) {
  const words = label.split(/\s+/).filter(Boolean);
  return ((words[0]?.[0] ?? "") + (words[1]?.[0] ?? "")).toUpperCase();
}

function rangeOf(start: string, end?: string, current?: boolean) {
  if (current) return `${start} – Present`;
  if (end) return `${start} – ${end}`;
  return start;
}

export function EvidenceGraph() {
  const { nodes, edges } = useMemo(() => buildGraph(), []);
  const trails = useMemo(() => buildTrails(nodes, edges), [nodes, edges]);
  const byRef = useMemo(() => new Map(nodes.map((n) => [n.ref, n])), [nodes]);
  const defaultRef = useMemo(
    () => nodes.find((n) => n.kind === "project")?.ref ?? null,
    [nodes]
  );
  const [domain, setDomain] = useState<Domain>("all");
  const [selected, setSelected] = useState<string | null>(defaultRef);
  const isMobile = useIsMobile();

  const visible = useMemo(
    () => new Set(nodes.filter((n) => nodeInDomain(domain, n.ref)).map((n) => n.ref)),
    [nodes, domain]
  );
  const focus = useMemo(
    () => (selected ? neighbors(selected, edges) : null),
    [selected, edges]
  );
  const selectedNode = selected ? byRef.get(selected) : undefined;
  const related = useMemo(() => {
    if (!selected) return [];
    const set = neighbors(selected, edges);
    set.delete(selected);
    return Array.from(set)
      .map((ref) => byRef.get(ref))
      .filter((n): n is GraphNode => Boolean(n));
  }, [selected, edges, byRef]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, GraphEdge[]>();
    for (const e of edges) {
      const list = map.get(e.source) ?? [];
      list.push(e);
      map.set(e.source, list);
    }
    return Array.from(map.entries());
  }, [edges]);

  if (isMobile) {
    return (
      <div>
        <div className="filter-row" role="group" aria-label="Filter trails">
          {DOMAINS.map((d) => (
            <button
              key={d.id}
              type="button"
              className={domain === d.id ? "filter-btn is-active" : "filter-btn"}
              aria-pressed={domain === d.id}
              onClick={() => setDomain(d.id)}
            >
              {d.label}
            </button>
          ))}
        </div>
        <p className="section-lede">
          Evidence trails, top to bottom: the work, the capabilities it
          drew on, and the case study. Readable without the network view.
        </p>
        {trails.map((t) => {
          const show =
            nodeInDomain(domain, t.project.ref) ||
            t.experiences.some((e) => nodeInDomain(domain, e.ref)) ||
            t.skills.some((s) => nodeInDomain(domain, s.ref));
          if (!show) return null;
          return (
            <article className="card" key={t.project.ref} style={{ marginBottom: 16 }}>
              {t.experiences.map((e) => (
                <div key={e.ref}>
                  <p className="meta" style={{ margin: 0 }}>
                    {KIND_LABEL.experience}
                  </p>
                  <p style={{ margin: "0 0 4px", fontWeight: 600 }}>{e.label}</p>
                  {e.blurb ? <p className="meta" style={{ margin: "0 0 8px" }}>{e.blurb}</p> : null}
                </div>
              ))}
              <p aria-hidden="true" style={{ margin: "4px 0", color: "var(--accent)" }}>↓</p>
              <p className="meta" style={{ margin: 0 }}>
                <span className="sr-only">Capabilities applied: </span>
                Capabilities
              </p>
              <div className="tag-row" style={{ marginTop: 4 }}>
                {t.skills.map((s) => (
                  <span className="tag" key={s.ref}>
                    {s.label}
                  </span>
                ))}
              </div>
              <p aria-hidden="true" style={{ margin: "4px 0", color: "var(--accent)" }}>↓</p>
              <p className="meta" style={{ margin: 0 }}>{KIND_LABEL.project}</p>
              <p style={{ margin: "0 0 4px", fontWeight: 600 }}>{t.project.label}</p>
            </article>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <div className="filter-row" role="group" aria-label="Filter graph">
        {DOMAINS.map((d) => (
          <button
            key={d.id}
            type="button"
            className={domain === d.id ? "filter-btn is-active" : "filter-btn"}
            aria-pressed={domain === d.id}
            onClick={() => setDomain(d.id)}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="graph-legend" aria-label="Legend">
        {(Object.keys(KIND_LABEL) as NodeKind[]).map((k) => (
          <span key={k} className="legend-item">
            <span
              className="legend-dot"
              style={{ background: KIND_COLOR[k] }}
              aria-hidden="true"
            />
            {KIND_LABEL[k]}
          </span>
        ))}
        <span className="legend-item">
          <span
            className="legend-ring"
            aria-hidden="true"
          />
          Selected
        </span>
      </div>

      <div className="evidence-layout">
        <div className="graph-frame">
          <svg
            viewBox="0 0 1040 780"
            role="img"
            aria-label={`Evidence graph with ${nodes.length} nodes and ${edges.length} connections. Select a node to emphasize its direct connections.`}
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            {COLUMNS.map((c) => (
              <text key={c.kind} x={c.x} y={34} textAnchor="middle" className="graph-col-label">
                {c.label}
              </text>
            ))}
            {edges.map((e, i) => {
              const a = byRef.get(e.source);
              const b = byRef.get(e.target);
              if (!a || !b) return null;
              const hot =
                focus !== null && focus.has(e.source) && focus.has(e.target);
              const dim =
                focus !== null
                  ? !hot
                  : !visible.has(e.source) || !visible.has(e.target);
              return (
                <line
                  key={i}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={hot ? "#7f1d1d" : "#d8d0bf"}
                  strokeWidth={hot ? 1.6 : 1}
                  opacity={dim ? 0.2 : hot ? 0.95 : 0.55}
                />
              );
            })}
            {nodes.map((n) => {
              const inFocus = focus === null || focus.has(n.ref);
              const inFilter = visible.has(n.ref);
              const dimmed = !inFocus || !inFilter;
              const isSel = selected === n.ref;
              const lastCol = n.kind === "volunteering";
              const color = KIND_COLOR[n.kind];
              const inSelSet = focus !== null && focus.has(n.ref) && !isSel;
              return (
                <g
                  key={n.ref}
                  transform={`translate(${n.x},${n.y})`}
                  onClick={() => setSelected(isSel ? null : n.ref)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected(isSel ? null : n.ref);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSel}
                  aria-label={`${KIND_LABEL[n.kind]}: ${n.label}${
                    n.blurb ? `. ${n.blurb}` : ""
                  }`}
                  style={{ cursor: "pointer", opacity: dimmed ? 0.45 : 1 }}
                >
                  <title>{`${n.label}${n.blurb ? ` — ${n.blurb}` : ""}`}</title>
                  {isSel ? (
                    <circle r={14} fill="none" stroke="#7f1d1d" strokeWidth={1.6} />
                  ) : null}
                  <circle
                    r={isSel ? 10 : 8}
                    fill={isSel ? color : inSelSet ? color : "#ffffff"}
                    fillOpacity={isSel ? 1 : inSelSet ? 0.22 : 1}
                    stroke={color}
                    strokeWidth={isSel ? 0 : 1.4}
                  />
                  <text
                    x={lastCol ? -14 : 14}
                    y={4}
                    textAnchor={lastCol ? "end" : "start"}
                    className="graph-label"
                  >
                    {truncate(n.label)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <EvidenceDrawer
          node={selectedNode}
          related={related}
          onSelect={setSelected}
          onClose={() => setSelected(null)}
        />
      </div>
      <p className="meta">
        {selectedNode
          ? `Selected: ${selectedNode.label}. Press Escape or select again to clear.`
          : "Select a node to emphasize its direct connections. Unrelated nodes de-emphasize."}
      </p>

      <details style={{ marginTop: 16 }}>
        <summary style={{ cursor: "pointer", fontSize: 14 }}>
          All {edges.length} connections as text
        </summary>
        <ul className="body-list" style={{ marginTop: 10 }}>
          {grouped.map(([src, list]) => (
            <li key={src}>
              <strong>{byRef.get(src)?.label ?? src}</strong> →{" "}
              {list
                .map((e) => byRef.get(e.target)?.label ?? e.target)
                .join("; ")}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

function DrawerSection({ label, children }: { label: string; children: React.ReactNode }) {
  if (!children) return null;
  return (
    <>
      <p className="drawer-label">{label}</p>
      {children}
    </>
  );
}

function EvidenceDrawer({
  node,
  related,
  onSelect,
  onClose,
}: {
  node: GraphNode | undefined;
  related: GraphNode[];
  onSelect: (ref: string) => void;
  onClose: () => void;
}) {
  if (!node) {
    return (
      <div className="card drawer" aria-live="polite">
        <h3 style={{ margin: "0 0 4px" }}>Evidence Drawer</h3>
        <p className="section-lede" style={{ margin: 0 }}>
          Select any node in the map to inspect it here.
        </p>
      </div>
    );
  }

  const [kind, id] = node.ref.split(/:(.+)/);
  const relatedByKind = (k: NodeKind) => related.filter((r) => r.kind === k);

  let body: React.ReactNode = null;
  let footer: React.ReactNode = null;

  if (kind === "project") {
    const p = projects.find((x) => x.id === id);
    const exp = experiences.find((e) => e.id === p?.relatedExperiences?.[0]);
    const did = exp?.bullets?.slice(0, 3) ?? [];
    body = (
      <>
        {exp ? (
          <p className="drawer-meta">
            {exp.role} · {exp.company} · {rangeOf(exp.startDate, exp.endDate, exp.current)}
          </p>
        ) : null}
        <DrawerSection label="Problem">
          {p?.problem ? <p style={{ margin: 0 }}>{p.problem}</p> : null}
        </DrawerSection>
        <DrawerSection label="What I did">
          {did.length > 0 ? (
            <ul className="body-list">
              {did.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          ) : p?.approach ? (
            <p style={{ margin: 0 }}>{p.approach}</p>
          ) : null}
        </DrawerSection>
        <DrawerSection label="Evidence">
          {p?.evidence ? <p style={{ margin: 0 }}>{p.evidence}</p> : null}
        </DrawerSection>
        <DrawerSection label="Outcome">
          {p?.outcome ? <p style={{ margin: 0 }}>{p.outcome}</p> : null}
        </DrawerSection>
        <DrawerSection label="Skills demonstrated">
          {(p?.skills?.length ?? 0) > 0 ? (
            <div className="tag-row">
              {(p?.skills ?? []).map((s) => (
                <span className="tag" key={s}>
                  {s}
                </span>
              ))}
            </div>
          ) : null}
        </DrawerSection>
      </>
    );
    footer = (
      <div className="actions" style={{ marginTop: 16 }}>
        <Link className="btn btn-accent" href={`/projects/${id}`}>
          View full case study →
        </Link>
      </div>
    );
  } else if (kind === "experience") {
    const e = experiences.find((x) => x.id === id);
    const metric = e?.bullets?.filter((b) => /\d/.test(b)) ?? [];
    body = (
      <>
        {e ? (
          <p className="drawer-meta">
            {e.role} · {rangeOf(e.startDate, e.endDate, e.current)}
            {e.location ? ` · ${e.location}` : ""}
          </p>
        ) : null}
        <DrawerSection label="What I did">
          {(e?.bullets?.slice(0, 3) ?? []).length > 0 ? (
            <ul className="body-list">
              {(e?.bullets ?? []).slice(0, 3).map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          ) : e?.summary ? (
            <p style={{ margin: 0 }}>{e.summary}</p>
          ) : null}
        </DrawerSection>
        <DrawerSection label="Evidence">
          {metric.length > 0 ? (
            <ul className="body-list">
              {metric.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          ) : null}
        </DrawerSection>
        <DrawerSection label="Skills demonstrated">
          {(e?.skills?.length ?? 0) + (e?.tags?.length ?? 0) > 0 ? (
            <div className="tag-row">
              {(e?.skills ?? []).map((s) => (
                <span className="tag" key={s}>
                  {s}
                </span>
              ))}
              {(e?.tags ?? []).map((t) => (
                <span className="tag tag-muted" key={t}>
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </DrawerSection>
      </>
    );
    const featured = e?.featured ? (
      <div className="actions" style={{ marginTop: 16 }}>
        <Link className="btn btn-secondary" href={`/work/${id}`}>
          View detail →
        </Link>
      </div>
    ) : null;
    footer = featured;
  } else if (kind === "skill") {
    const s = skills.find((x) => x.id === id);
    body = (
      <>
        {s?.description ? <p style={{ margin: 0 }}>{s.description}</p> : null}
        <DrawerSection label="Demonstrated by">
          {relatedByKind("experience").length + relatedByKind("volunteering").length > 0 ? (
            <div className="tag-row">
              {[...relatedByKind("experience"), ...relatedByKind("volunteering")].map((r) => (
                <button key={r.ref} type="button" className="tag tag-btn" onClick={() => onSelect(r.ref)}>
                  {r.label}
                </button>
              ))}
            </div>
          ) : null}
        </DrawerSection>
        <DrawerSection label="Applied in">
          {relatedByKind("project").length > 0 ? (
            <div className="tag-row">
              {relatedByKind("project").map((r) => (
                <button key={r.ref} type="button" className="tag tag-btn" onClick={() => onSelect(r.ref)}>
                  {r.label}
                </button>
              ))}
            </div>
          ) : null}
        </DrawerSection>
      </>
    );
  } else {
    const record =
      kind === "credential"
        ? credentials.find((x) => x.id === id)
        : kind === "education"
          ? education.find((x) => x.id === id)
          : volunteering.find((x) => x.id === id);
    const blurb =
      record && "description" in record
        ? (record.description as string | undefined)
        : undefined;
    body = (
      <>
        {node.blurb ? <p style={{ margin: 0 }}>{node.blurb}</p> : null}
        {blurb && blurb !== node.blurb ? <p style={{ margin: "8px 0 0" }}>{blurb}</p> : null}
        <DrawerSection label="Connected">
          {related.length > 0 ? (
            <div className="tag-row">
              {related.map((r) => (
                <button key={r.ref} type="button" className="tag tag-btn" onClick={() => onSelect(r.ref)}>
                  {r.label}
                </button>
              ))}
            </div>
          ) : (
            <p className="section-lede" style={{ margin: 0 }}>
              No connections recorded yet.
            </p>
          )}
        </DrawerSection>
      </>
    );
  }

  return (
    <div className="card drawer" aria-live="polite">
      <div className="card-top">
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span className="card-mark" aria-hidden="true">
            {monogram(node.label)}
          </span>
          <div>
            <h3 style={{ margin: 0 }}>
              {node.label}
              <span className="drawer-picked">Selected</span>
            </h3>
            <p className="meta" style={{ margin: 0 }}>
              {KIND_LABEL[node.kind]}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="drawer-close"
          onClick={onClose}
          aria-label="Clear selection and close drawer"
        >
          ×
        </button>
      </div>
      <div style={{ marginTop: 4 }}>{body}</div>
      {footer}
    </div>
  );
}
