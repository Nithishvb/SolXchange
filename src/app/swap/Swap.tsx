"use client";

import { Token } from "@/components/TokenSelector";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SpinningLoader from "@/components/ui/SpinningLoader";
import { useModal } from "@/context/ModalContext";
import { useTokenValue } from "@/lib/hooks/use-token-value";
import { ArrowDownUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Swap() {
  const [sellFocus, setSellFocus] = useState<boolean>(true);
  const [baseToken, setBaseToken] = useState<Token>({
    name: "solana",
    symbol: "sol",
    image:
      "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
    balance: "0",
  });
  const [quoteToken, setQuoteToken] = useState<Token>();
  const [sellPrice, setSellPrice] = useState<string>(""); // Change to string
  const [buyPrice, setBuyPrice] = useState<string>(""); // Change to string

  const {
    fetchBaseTokenValues,
    fetchQuoteTokenValues,
    loading,
    baseTokenValueUSD,
    quoteTokenValue,
    quouteTokenValueUSD,
    baseTokenValue,
  } = useTokenValue();

  const { openModal } = useModal();

  const handleBaseTokenSelect = () => {
    openModal(async (selectedToken: Token) => {
      setBaseToken(selectedToken);
      if (sellPrice && baseToken.name) {
        await fetchBaseTokenValues(
          parseFloat(sellPrice),
          baseToken.name,
          quoteToken?.name || ""
        );
      }
    });
  };

  const handleQuoteTokenSelect = () => {
    openModal(async (selectedToken: Token) => {
      setQuoteToken(selectedToken);
      if (buyPrice && quoteToken && quoteToken.name) {
        await fetchQuoteTokenValues(
          parseFloat(buyPrice),
          baseToken.name,
          quoteToken?.name || ""
        );
      }
    });
  };

  useEffect(() => {
    if (quoteTokenValue) {
      setBuyPrice(quoteTokenValue.toString()); // Convert to string
    }
    if (baseTokenValue) {
      setSellPrice(baseTokenValue.toString()); // Convert to string
    }
  }, [quoteTokenValue, baseTokenValue]);

  const handleSellToken = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSellPrice(value); // Set value directly
    const sellPriceNumber = parseFloat(value);

    if (!isNaN(sellPriceNumber) && baseToken.name) {
      await fetchBaseTokenValues(
        sellPriceNumber,
        baseToken.name,
        quoteToken?.name || ""
      );
    }
  };

  const handleBuyToken = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setBuyPrice(value); // Set value directly
    const buyPriceNumber = parseFloat(value);

    if (!isNaN(buyPriceNumber) && quoteToken && quoteToken.name) {
      await fetchQuoteTokenValues(
        buyPriceNumber,
        baseToken.name,
        quoteToken?.name || ""
      );
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4 relative overflow-hidden mt-10">
      <Card className="w-full max-w-md mx-auto backdrop-blur-xl bg-background/60 border-muted/40 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Swap</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Sell
            </label>
            <div className="space-y-3">
              <div
                className={`p-4 space-y-2 border border-1 rounded-2xl ${
                  sellFocus ? "bg-white" : "bg-gray-100"
                }`}
              >
                <Input
                  type="number"
                  placeholder="0"
                  value={sellPrice}
                  onChange={handleSellToken}
                  className="text-2xl font-semibold border-none h-auto p-0 shadow-none focus-visible:ring-0"
                  onFocus={() => setSellFocus(true)}
                  onBlur={() => setSellFocus(false)}
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {loading ? (
                      <SpinningLoader />
                    ) : baseTokenValueUSD ? (
                      "$" + baseTokenValueUSD.toFixed(2)
                    ) : (
                      "-"
                    )}
                  </span>
                  <div
                    onClick={handleBaseTokenSelect}
                    className="flex items-center gap-2 bg-white cursor-pointer border border-gray-300 p-1 rounded-full"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#627EEA] flex items-center justify-center">
                      <Image
                        src={baseToken?.image}
                        alt="ETH"
                        width={16}
                        height={16}
                        className="rounded-full"
                      />
                    </div>
                    <span className="font-medium">{baseToken?.symbol}</span>
                    <ChevronDown className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-background/50 hover:bg-background/80"
                >
                  <ArrowDownUp className="h-4 w-4" />
                </Button>
              </div>

              <label className="text-sm font-medium text-muted-foreground">
                Buy
              </label>
              <div
                className={`p-4 space-y-2 border border-1 rounded-2xl ${
                  !sellFocus ? "bg-white" : "bg-gray-100"
                }`}
              >
                <Input
                  type="number"
                  placeholder="0"
                  value={buyPrice}
                  onChange={handleBuyToken}
                  className="text-2xl font-semibold bg-transparent shadow-none border-none h-auto p-0 focus-visible:ring-0"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {loading ? (
                      <SpinningLoader />
                    ) : quouteTokenValueUSD ? (
                      "$" + quouteTokenValueUSD.toFixed(2)
                    ) : (
                      "-"
                    )}
                  </span>
                  <div
                    onClick={handleQuoteTokenSelect}
                    className={`flex items-center gap-2 ${
                      quoteToken?.image ? "bg-white" : "bg-[#627EEA]"
                    } cursor-pointer border border-gray-300 p-1 rounded-full`}
                  >
                    {quoteToken?.image ? (
                      <div className="w-6 h-6 rounded-full bg-[#627EEA] flex items-center justify-center">
                        <Image
                          src={quoteToken?.image}
                          alt="SUSHI"
                          width={16}
                          height={16}
                          className="rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="pl-2 rounded-full flex items-center text-sm justify-center text-white">
                        Select token
                      </div>
                    )}
                    <span className="font-medium">{quoteToken?.symbol}</span>
                    <ChevronDown
                      className={`${
                        quoteToken?.name ? "text-gray-400" : "text-white"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            onClick={() => {
              console.log(baseToken, quoteToken);
            }}
            className="w-full bg-rebeccapurple hover:bg-rebeccapurple-600 text-white h-12 rounded-lg text-lg font-semibold	"
          >
            Connect wallet
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
