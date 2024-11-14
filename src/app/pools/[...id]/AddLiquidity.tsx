"use client";

import {
  ArrowLeft,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AddLiquidity() {

  const router = useRouter();

  return (
    <div className="max-w-xl mx-auto bg-background shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/pools")} >
            <ArrowLeft className="h-5 w-5"/>
          </Button>
        </div>
        <h1 className="text-xl font-semibold">Add liquidity</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* <div className="space-y-3">
          <h2 className="text-lg font-medium">Select pair</h2>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1 h-14 justify-between bg-background hover:bg-background rounded-2xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#627EEA] flex items-center justify-center">
                  <Image
                    src="https://img-v1.raydium.io/icon/7BgBvyjrZX1YKz4oh9mjb8ZScatkkwb8DzFx7LoiVkM3.png"
                    alt="ETH"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                </div>
                <span className="font-semibold">ETH</span>
              </div>
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-14 justify-between bg-background hover:bg-background rounded-2xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#D65454] flex items-center justify-center">
                  <Image
                    src="https://img-v1.raydium.io/icon/7BgBvyjrZX1YKz4oh9mjb8ZScatkkwb8DzFx7LoiVkM3.png"
                    alt="SUSHI"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                </div>
                <span className="font-semibold">SUSHI</span>
              </div>
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div> */}

        {/* Fee Tier */}
        <div className="p-2 bg-muted/50 rounded-md">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">0.30% fee tier</h2>
            <Button variant="link" className="text-primary">
              Edit
            </Button>
          </div>
          <div className="rounded-lg">
            <span className="text-sm text-muted-foreground">100% select</span>
          </div>
        </div>

        {/* Deposit Amounts */}
        <div className="space-y-3">
          <h2 className="text-lg font-medium">Deposit amounts</h2>
          <div className="space-y-3">
            <div className="bg-muted/50 p-4 space-y-2 border border-1 rounded-2xl">
              <Input
                type="number"
                placeholder="0"
                className="text-2xl font-semibold border-none h-auto p-0 shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">-</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#627EEA] flex items-center justify-center">
                    <Image
                      src="https://img-v1.raydium.io/icon/7BgBvyjrZX1YKz4oh9mjb8ZScatkkwb8DzFx7LoiVkM3.png"
                      alt="ETH"
                      width={16}
                      height={16}
                      className="rounded-full"
                    />
                  </div>
                  <span className="font-medium">ETH</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2 border border-1 rounded-2xl">
              <Input
                type="number"
                placeholder="0"
                className="text-2xl font-semibold bg-transparent shadow-none border-none h-auto p-0 focus-visible:ring-0"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">-</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#D65454] flex items-center justify-center">
                    <Image
                      src="https://img-v1.raydium.io/icon/7BgBvyjrZX1YKz4oh9mjb8ZScatkkwb8DzFx7LoiVkM3.png"
                      alt="SUSHI"
                      width={16}
                      height={16}
                      className="rounded-full"
                    />
                  </div>
                  <span className="font-medium">SUSHI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full bg-rebeccapurple hover:bg-rebeccapurple-600 text-white h-12 rounded-lg text-lg font-semibold	">
          Connect wallet
        </Button>
      </div>
    </div>
  );
}
