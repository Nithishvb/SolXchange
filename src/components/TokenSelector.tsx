"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Token {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
  address: string;
}

const popularTokens: Token[] = [
  {
    symbol: "USDC",
    name: "USD Coin",
    icon: "○",
    balance: "0",
    address: "Ux3Duj...QrkX6R",
  },
  {
    symbol: "SOL",
    name: "Solana",
    icon: "◎",
    balance: "0",
    address: "Es9vMF...enwNYB",
  },
  {
    symbol: "RAY",
    name: "Raydium",
    icon: "◈",
    balance: "0",
    address: "4k3Duj...QrkX6R",
  },
  {
    symbol: "USDT",
    name: "Tether",
    icon: "₮",
    balance: "0",
    address: "Es9vMF...enwNYB",
  },
];

const allTokens: Token[] = [
  ...popularTokens,
  {
    symbol: "ETH",
    name: "Ethereum",
    icon: "⟠",
    balance: "0",
    address: "0x742d3...3894",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    icon: "₿",
    balance: "0",
    address: "bc1qxy...j5tc",
  },
];

export default function TokenSelector() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filteredTokens = allTokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(search.toLowerCase()) ||
      token.name.toLowerCase().includes(search.toLowerCase()) ||
      token.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Select a token</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#1a1b23] text-white border-slate-800">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-normal">
            Select a token
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-slate-400 hover:text-white"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by token or paste address"
            className="pl-9 bg-[#0d0e12] border-slate-800 text-slate-400 placeholder:text-slate-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Popular tokens</label>
            <div className="flex flex-wrap gap-2">
              {popularTokens.map((token) => (
                <Button
                  key={token.symbol}
                  variant="outline"
                  className="bg-[#0d0e12] hover:bg-slate-800 border-slate-700 text-white"
                  onClick={() => setOpen(false)}
                >
                  <span className="mr-2">{token.icon}</span>
                  {token.symbol}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-400">
              <span>Token</span>
              <span>Balance/Address</span>
            </div>
            <ScrollArea className="h-[200px] pr-4">
              {filteredTokens.length > 0 ? (
                filteredTokens.map((token) => (
                  <Button
                    key={token.symbol}
                    variant="ghost"
                    className="w-full justify-between hover:bg-slate-800"
                    onClick={() => setOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{token.icon}</span>
                      <div className="flex flex-col items-start">
                        <span className="text-white">{token.symbol}</span>
                        <span className="text-sm text-slate-400">
                          {token.name}
                        </span>
                      </div>
                    </span>
                    <span className="flex flex-col items-end">
                      <span className="text-white">{token.balance}</span>
                      <span className="text-sm text-slate-400">
                        {token.address}
                      </span>
                    </span>
                  </Button>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-slate-400 bg-[#0d0e12] rounded-lg">
                  Can&apos;t find the token you&apos;re looking for? Try
                  entering the mint address or check token list settings below.
                </div>
              )}
            </ScrollArea>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full bg-[#0d0e12] hover:bg-slate-800 border-slate-700 text-white"
        >
          View Token List
        </Button>
      </DialogContent>
    </Dialog>
  );
}
