/* Full capster directory with branch filtering. */

import React from "react";
import { CapsterCard } from "../components/CapsterCard";
import { Page, Stagger } from "../components/Common";
import { BRANCHES, CAPSTERS } from "../data/barbershop";

export function CapstersPage({ branch, setBranch, go }) {
  const list = CAPSTERS.filter((c) => c.branch === branch);
  const branchObj = BRANCHES.find((b) => b.id === branch);
  return (
    <Page className="kc-section">
      <div className="kc-section-head"><span className="kc-kicker">Capster</span><h2 className="kc-h2">TIM CAPSTER — {branchObj.name.toUpperCase()}</h2></div>
      <div className="kc-branch-pills">
        {BRANCHES.map((b) => (
          <button key={b.id} className={"kc-pill dark" + (b.id === branch ? " active" : "")} onClick={() => setBranch(b.id)}>{b.name}</button>
        ))}
      </div>
      <div className="kc-capster-grid">
        <Stagger>{list.map((c) => <CapsterCard key={c.id} capster={c} onClick={() => go("capsterDetail", { capster: c })} />)}</Stagger>
      </div>
    </Page>
  );
}

