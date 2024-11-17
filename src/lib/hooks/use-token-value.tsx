import { useState, useCallback } from "react";

// type TokenValueResult = {
//   baseTokenValueUSD: number | null; // USD value for the base token
//   quoteTokenValue: number | null; // Equivalent quote token amount
//   loading: boolean; // Indicates if data is being loaded
//   error: string | null; // Error message (if any)
// };

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

  const fetchTokenValues = useCallback(
    async (baseAmount: number, buyPrice: number = 0,baseToken: string, quoteToken: string) => {
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

      if (baseTokenUSD === 0 || quoteTokenUSD === 0) {
        throw new Error("Token price unavailable.");
      }

      // Convert base amount to USD and calculate equivalent quote token
      const baseValueInUSD = baseTokenUSD * baseAmount;
      const equivalentQuoteToken = baseValueInUSD / quoteTokenUSD;
      const equivalentQuoteTokenUSD = equivalentQuoteToken * quoteTokenUSD;

      // Convert buy price to USD and calculate equivalent base token
      const buyPriceInUSD = buyPrice * quoteTokenUSD;
      const equivalentBaseToken = buyPriceInUSD / baseTokenUSD;
      const equivalentBaseTokenUSD = equivalentBaseToken * baseTokenUSD;

      // Update state
      setBaseTokenValueUSD(baseValueInUSD);
      setQuoteTokenValue(equivalentQuoteToken);
      setQuoteTokenValueUSD(equivalentQuoteTokenUSD);
      setBaseTokenValue(equivalentBaseToken);
      if(buyPrice !== 0){
        setBaseTokenValueUSD(equivalentBaseTokenUSD);
      }
      } catch (err: any) {
        setError(
          err.message || "An error occurred while fetching token values."
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
    fetchTokenValues,
  };
};
