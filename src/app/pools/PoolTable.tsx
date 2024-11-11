import { TableCell, TableRow } from "@/components/ui/table";
import { TrendingUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PoolsTableProps {
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

export const PoolTable = ({
  id,
  tokenALogo,
  tokenBLogo,
  tokenASymbool,
  tokenBSymbool,
  apr,
  tvl,
  volume,
  feeRate,
}: PoolsTableProps) => {
  const router = useRouter();

  return (
    <TableRow className="cursor-pointer h-[60px]">
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-teal-500">
              <Image src={tokenALogo} height={100} width={100} alt="imgae" />
            </div>
            <div className="absolute -right-1 -bottom-1 w-4 h-4 rounded-full bg-purple-500">
              <Image src={tokenBLogo} height={100} width={100} alt="imgae" />
            </div>
          </div>
          <div>
            <div className="font-medium">
              {tokenASymbool} / {tokenBSymbool}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <span className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
          {feeRate}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="text-emerald-500">Up to {apr}%</span>
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          <span className="text-gray-500 line-through">
            {volume.toLocaleString()}%
          </span>
        </div>
      </TableCell>
      <TableCell>$ {tvl.toLocaleString()}</TableCell>
      <TableCell>$ {volume.toLocaleString()}</TableCell>
      <TableCell>
        <span className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
          <button
            className="text-emerald-500"
            onClick={() => router.push(`/pools/${id}`)}
          >
            Deposit
          </button>
        </span>
      </TableCell>
    </TableRow>
  );
};
