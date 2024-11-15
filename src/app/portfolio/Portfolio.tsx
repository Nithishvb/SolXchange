import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Portfolio() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold">Positions</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button className="bg-rebeccapurple hover:bg-rebeccapurple-600">
            + New position
          </Button>
        </div>
      </div>

      <Card className="border rounded-lg">
        <CardContent className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="mb-4 p-4 rounded-full bg-muted">
            <Inbox className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-6">
            Your active V3 liquidity positions will appear here.
          </h2>
        </CardContent>
      </Card>
    </div>
  );
}
