"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
interface Token {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
  address: string;
}
interface TokenSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: (val: boolean) => void;
}

export default function TokenSelector({
  isOpen,
  onClose,
  setIsOpen,
}: TokenSelectorProps) {
  const [search, setSearch] = useState("");
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    fetchTokenList();
  }, []);

  const filteredTokens = useMemo(() => {
    return tokens.filter(
      (token) =>
        token.symbol.toLowerCase().includes(search.toLowerCase()) ||
        token.name.toLowerCase().includes(search.toLowerCase()) ||
        token.address.toLowerCase().includes(search.toLowerCase())
    );
  }, [tokens, search]);

  const fetchTokenList = async () => {
    try {
      const response = await fetch("");
      const res = await response.json();
      if (res && res.data) {
        const tokens: Token[] = res.data.mintList.map((val: any) => {
          return {
            symbol: val.symbol,
            name: val.name,
            icon: val.logoURI,
            balance: "0",
            address: val.programId,
          };
        });
        setTokens(tokens);
      }
    } catch (err) {
      console.log(err);
      setTokens([]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[460px] bg-[#1a1b23] text-white border-slate-800 h-[530px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-normal">
            Select a token
          </DialogTitle>
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
              {tokens.slice(0, 4).map((token) => (
                token && token.name && 
                <Button
                  key={token.symbol}
                  variant="outline"
                  className="bg-[#0d0e12] hover:bg-slate-800 border-slate-700 text-white"
                  onClick={onClose}
                >
                  {token.icon && (
                    <Image src={token.icon} alt="" height={20} width={20} />
                  )}
                  {token.symbol}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-400">
              <span>Token</span>
            </div>
            <ScrollArea className="h-[200px] pr-4">
              {filteredTokens.length > 0 ? (
                filteredTokens.map(
                  (token, index) =>
                    token &&
                    token.name && (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-between hover:bg-slate-800 p-2 py-7"
                        onClick={onClose}
                      >
                        <span className="flex items-center gap-2">
                          {token.icon && (
                            <Image
                              src={token.icon}
                              alt=""
                              height={20}
                              width={20}
                            />
                          )}
                          <div className="flex flex-col items-start">
                            <span className="text-white">{token.symbol}</span>
                            <span className="text-xs text-slate-400">
                              {token.name}
                            </span>
                          </div>
                        </span>
                      </Button>
                    )
                )
              ) : (
                <div className="p-4 text-center text-sm text-slate-400 bg-[#0d0e12] rounded-lg">
                  Can&apos;t find the token you&apos;re looking for? Try
                  entering the mint address or check token list settings below.
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
