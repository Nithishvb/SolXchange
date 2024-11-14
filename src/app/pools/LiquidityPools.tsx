"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, Search } from "lucide-react";
import { PoolTable } from "./PoolTable";
import { useRouter } from "next/navigation";
interface Pools {
  id: string;
  tokenALogo: string;
  tokenBLogo: string;
  tokenASymbool: string;
  tokenBSymbool: string;
  feeRate: number;
  apr: number;
  tvl: number;
  volume: number;
}

export default function LiquidityPool() {
  const [pools, setPools] = useState<Pools[]>([]);
  const [searcVal, setSearchVal] = useState<string>("");

  const router = useRouter();

  const poolsData = async () => {
    const data = await fetch(
      ""
    );
    const res = await data.json();
    const poolsData: Pools[] = res.data.data.map((e: any) => {
      return {
        id: e.id,
        tokenALogo: e.mintA.logoURI,
        tokenBLogo: e.mintB.logoURI,
        tokenASymbool: e.mintA.symbol,
        tokenBSymbool: e.mintB.symbol,
        feeRate: e.feeRate,
        apr: e.day.apr,
        tvl: e.tvl,
        volume: e.day.volume,
      };
    });
    setPools(poolsData);
  };

  useEffect(() => {
    poolsData();
  }, []);


  return (
    <div className="flex justify-center w-full">
      <div className="w-[90%] p-4 space-y-4 rounded-lg to-white dark:from-purple-950 dark:to-gray-950">
      <div className="mb-6">
        <h2 className="text-4xl mb-2 font-semibold">Liquidity Pools</h2>
        <span>Provide liquidity, earn yield.</span>
      </div>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <input
                type="text"
                value={searcVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="All tokens"
                className="pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-gray-900 w-[400px]"
              />
            </div>
          </div>
          <div>
          <button onClick={() => router.push("/pools/create")} className="px-4 py-2 text-black backdrop-blur-sm border border-black rounded-full hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200">
            Create pool
          </button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ALL POOLS</TableHead>
              <TableHead>FEE TIER</TableHead>
              <TableHead>
                APR
                <ChevronDown className="inline ml-1 h-4 w-4" />
              </TableHead>
              <TableHead>
                TVL
                <ChevronDown className="inline ml-1 h-4 w-4" />
              </TableHead>
              <TableHead>
                VOLUME 24H
                <ChevronDown className="inline ml-1 h-4 w-4" />
              </TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pools
              .filter(
                (val) =>
                  val.tokenASymbool
                    .toLocaleLowerCase()
                    .includes(searcVal?.toLocaleLowerCase()) ||
                  val.tokenBSymbool
                    .toLocaleLowerCase()
                    .includes(searcVal?.toLocaleLowerCase())
              )
              .map((pool, i) => (
                <PoolTable
                  key={i}
                  tokenALogo={pool.tokenALogo}
                  tokenBLogo={pool.tokenBLogo}
                  tokenASymbool={pool.tokenASymbool}
                  tokenBSymbool={pool.tokenBSymbool}
                  apr={pool.apr}
                  tvl={pool.tvl}
                  volume={pool.volume}
                  feeRate={pool.feeRate}
                  id={pool.id}
                />
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
