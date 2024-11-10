"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, Search, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LiquidityPool() {
//   const pools = [
//     {
//       token1: "USDT",
//       token2: "WBNB",
//     //   chain: "BNB SMART CHAIN",
//       version: "V3",
//       fee: "0.01%",
//       apr: 90.44,
//       prevApr: 83.24,
//       tvl: 6327026.7,
//       volume: 131000000,
//       type: "v3",
//     },
//     {
//       token1: "USDT",
//       token2: "WBNB",
//     //   chain: "BNB SMART CHAIN",
//       version: "V3",
//       fee: "0.05%",
//       apr: 12.49,
//       prevApr: 11.37,
//       tvl: 50001970,
//       volume: 28056110,
//       type: "v3",
//     },
//     // Add more pool data as needed
//   ];

  const [pools, setPools] = useState([]);

  const poolsData = async () => {
    const data = await fetch("");
    const res = await data.json();
    console.log(res.data.data);
    setPools([...res.data.data]);
  }

  useEffect(() => {
    poolsData();
  }, []);

  const router = useRouter();

  return (
    <div className="flex justify-center w-full">
      <div className="w-[80%] p-4 space-y-4 bg-gradient-to-b from-purple-50 rounded-lg to-white dark:from-purple-950 dark:to-gray-950">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <input
                type="text"
                placeholder="All tokens"
                className="pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-gray-900 w-[400px]"
              />
            </div>
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
            {pools.map((pool, i) => (
              <TableRow key={i} className="cursor-pointer h-[60px]">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-teal-500">
                        <Image src={pool.mintA.logoURI} height={100} width={100} alt="imgae" />
                      </div>
                      <div className="absolute -right-1 -bottom-1 w-4 h-4 rounded-full bg-purple-500">
                        <Image src={pool.mintB.logoURI} height={100} width={100} alt="imgae" />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">
                        {pool.mintA.symbol} / {pool.mintB.symbol}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                    {pool.feeRate}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500">Up to {pool.apr}%</span>
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    <span className="text-gray-500 line-through">
                      {pool.prevApr}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>$ {pool.mintAmountA + pool.mintAmountB}</TableCell>
                <TableCell>$ {pool.day.volume}</TableCell>
                <TableCell>
                  <span className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                    <button className="text-emerald-500" onClick={() => router.push(`/pools/${pool.id}`)}>Deposit</button>
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
