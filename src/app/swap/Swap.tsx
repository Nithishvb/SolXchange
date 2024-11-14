"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useModal } from "@/context/ModalContext";
import { ArrowDownUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Swap() {

    const [sellFocus, setSellFocus] = useState<boolean>(true);
    const [buyFocus, setBuyFocus] = useState<boolean>(false);

    const { openModal } = useModal();

  return (
    <div className="w-full flex items-center justify-center p-4 relative overflow-hidden mt-10">
      <Card className="w-full max-w-md mx-auto backdrop-blur-xl bg-background/60 border-muted/40 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Swap
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Sell
            </label>
            <div className="space-y-3">
              <div className={`p-4 space-y-2 border border-1 rounded-2xl ${sellFocus ? 'bg-white' : 'bg-gray-100'}`}>
                <Input
                  type="number"
                  placeholder="0"
                  className="text-2xl font-semibold border-none h-auto p-0 shadow-none focus-visible:ring-0"
                  onFocus={() => setSellFocus(true)}
                  onBlur={() => setSellFocus(false)}
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">-</span>
                  <div onClick={openModal} className="flex items-center gap-2 bg-white cursor-pointer border border-gray-300 p-1 rounded-full">
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
              <div className={`p-4 space-y-2 border border-1 rounded-2xl ${!sellFocus ? 'bg-white' : 'bg-gray-100'}`}>
                <Input
                  type="number"
                  placeholder="0"
                  className="text-2xl font-semibold bg-transparent shadow-none border-none h-auto p-0 focus-visible:ring-0"
                  onFocus={() => setBuyFocus(true)}
                  onBlur={() => setBuyFocus(false)}
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">-</span>
                  <div onClick={openModal} className="flex items-center gap-2 bg-white cursor-pointer border border-gray-300 p-1 rounded-full">
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
                    <ChevronDown className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full bg-rebeccapurple hover:bg-rebeccapurple-600 text-white h-12 rounded-lg text-lg font-semibold	">
            Connect wallet
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
