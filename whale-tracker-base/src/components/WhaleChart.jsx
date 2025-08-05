import { Line } from "react-chartjs-2";

export default function WhaleChart({ data }) {
  return (
    <Line
      data={{
        labels: data.map(tx => new Date(tx.timestamp).toLocaleTimeString()),
        datasets: [{
          label: "Whale Transactions (USD)",
          data: data.map(tx => tx.amount_usd),
          borderColor: "#3b82f6",
        }],
      }}
    />
  );
}
