import { useState, useEffect } from "react";
import WhaleChart from "../components/WhaleChart";
import WhaleTable from "../components/WhaleTable";

export default function Home() {
  const [whales, setWhales] = useState([]);

  useEffect(() => {
    fetch("/api/whales")
      .then(res => res.json())
      .then(setWhales);
  }, []);

  return (
    <div className="container">
      <h1>Base Network Whale Tracker</h1>
      <WhaleChart data={whales} />
      <WhaleTable data={whales} />
    </div>
  );
}
