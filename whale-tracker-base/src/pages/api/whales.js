import { ethers } from "ethers";
import { supabase } from "../../utils/supabase";

export default async function handler(req, res) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_BASE_RPC_URL
  );

  // Fetch latest block
  const latestBlock = await provider.getBlockNumber();
  const block = await provider.getBlockWithTransactions(latestBlock);

  // Process transactions
  for (const tx of block.transactions) {
    if (!tx.to) continue; // Skip contract creations

    const value = parseFloat(ethers.utils.formatEther(tx.value));
    const ethPrice = await getTokenPrice("ethereum");
    const usdValue = value * ethPrice;

    if (usdValue >= 10000) {
      await supabase
        .from("whale_transactions")
        .insert([{
          tx_hash: tx.hash,
          from_address: tx.from,
          to_address: tx.to,
          token_symbol: "ETH",
          amount_usd: usdValue,
        }]);
    }
  }

  res.status(200).json({ success: true });
}

async function getTokenPrice(coingeckoId) {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`
  );
  return res.data[coingeckoId].usd;
}
