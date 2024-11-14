import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreatePool() {
  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            First, select tokens & fee tier
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Tokens</h3>
            <div className="grid grid-cols-2 gap-4">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Base token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ray">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-500 mr-2" />
                      RAY
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Quote token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usdt">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-500 mr-2" />
                      USDT
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Fee Tier</h3>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select fee tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.03">0.03%</SelectItem>
                <SelectItem value="0.05">0.05%</SelectItem>
                <SelectItem value="0.1">0.1%</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full bg-rebeccapurple text-white hover:bg-rebeccapurple-600">
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
