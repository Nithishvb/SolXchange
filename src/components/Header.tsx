"use client";

import { useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Header() {
  const pathname = usePathname();

  const isActive = useCallback(
    (path: string) => {
      return pathname === path ? "text-purple-600" : "text-foreground/60";
    },
    [pathname]
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-10">
      <div className="flex h-16 items-center justify-between w-[100%]">
        <div className="mr-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              SolXchange
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 items-center justify-center gap-10 text-sm font-medium text-[17px]">
          <Link
            href="/swap"
            className={`transition-colors ${isActive("/swap")}`}
          >
            Swap
          </Link>
          <Link
            href="/pools"
            className={`transition-colors ${isActive("/pools")}`}
          >
            Liquidity
          </Link>
          <Link
            href="/portfolio"
            className={`transition-colors ${isActive("/portfolio")}`}
          >
            Portfolio
          </Link>
        </nav>

        <div className="flex items-center justify-end space-x-4">
          <WalletMultiButton
            className="bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-500 hover:to-purple-700 text-white font-medium"
            style={{
              backgroundImage: "linear-gradient(to right, #06b6d4, #a855f7)",
              color: "#ffffff",
              fontWeight: 500,
              transition: "background-image 0.3s ease",
              borderRadius: "10px",
            }}
          />
          {/* <Button
            onClick={async () => {
              setIsPending(true);
              await connect();
            }}
            disabled={isPending}
            className="bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-500 hover:to-purple-700 text-white font-medium"
          >
            {isPending ? "Connecting..." : "Connect Wallet"}
          </Button> */}
        </div>
      </div>
    </header>
  );
}
