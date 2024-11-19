import { useState, useCallback } from "react";

export const useTokenValue = () => {
  const [baseTokenValueUSD, setBaseTokenValueUSD] = useState<number | null>(
    null
  );
  const [quoteTokenValue, setQuoteTokenValue] = useState<number | null>(null);
  const [quouteTokenValueUSD, setQuoteTokenValueUSD] = useState<number | null>(
    null
  );
  const [baseTokenValue, setBaseTokenValue] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function safeDivide(numerator: number, denominator: number) {
    return denominator === 0 ? 0 : numerator / denominator;
  }

  const fetchBaseTokenValues = useCallback(
    async (
      baseAmount: number,
      baseToken: string,
      quoteToken: string
    ) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          ``
        );

        if (!response.ok) {
          throw new Error("Failed to fetch token prices.");
        }

        const data = await response.json();
        const baseTokenUSD = data[baseToken.toLowerCase()]?.usd || 0;
        const quoteTokenUSD = data[quoteToken.toLowerCase()]?.usd || 0;

        const baseValueInUSD = baseTokenUSD * baseAmount;
        const equivalentQuoteToken = safeDivide(baseValueInUSD, quoteTokenUSD);
        const equivalentQuoteTokenUsd = equivalentQuoteToken * quoteTokenUSD;

        // Update state
        setBaseTokenValueUSD(baseValueInUSD);
        setQuoteTokenValue(equivalentQuoteToken);
        setQuoteTokenValueUSD(equivalentQuoteTokenUsd);
        
      } catch (err) {
        setError(
          (err as Error).message || "An error occurred while fetching token values."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchQuoteTokenValues = useCallback(
    async (
      quoteAmount: number,
      baseToken: string,
      quoteToken: string
    ) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${baseToken},${quoteToken}&vs_currencies=usd`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch token prices.");
        }

        const data = await response.json();
        const baseTokenUSD = data[baseToken.toLowerCase()]?.usd || 0;
        const quoteTokenUSD = data[quoteToken.toLowerCase()]?.usd || 0;

        const equivalentBaseToken = safeDivide(quoteAmount * quoteTokenUSD, baseTokenUSD);
        // Update state

        setBaseTokenValueUSD(equivalentBaseToken * baseTokenUSD);
        setBaseTokenValue(equivalentBaseToken);
        setQuoteTokenValueUSD(quoteAmount * quoteTokenUSD);
        
      } catch (err) {
        setError(
          (err as Error).message || "An error occurred while fetching token values."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    baseTokenValueUSD,
    quoteTokenValue,
    quouteTokenValueUSD,
    baseTokenValue,
    loading,
    error,
    fetchBaseTokenValues,
    fetchQuoteTokenValues
  };
};
