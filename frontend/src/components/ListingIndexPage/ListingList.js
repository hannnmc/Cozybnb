import React from "react";
import BenchListItem from "./BenchListItem";

function BenchList({ benches, highlightedBench, setHighlightedBench }) {
  return (
    <div className="bench-list">
      <h1>Benches: </h1>
      {benches.map((bench) => (
        <BenchListItem
          key={bench.id}
          bench={bench}
          isHighlighted={highlightedBench === bench.id}
          setHighlightedBench={setHighlightedBench}
        />
      ))}
    </div>
  );
}

export default BenchList;
