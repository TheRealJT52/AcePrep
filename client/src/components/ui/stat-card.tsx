import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <Card className="p-6 rounded-lg shadow-sm text-center border border-neutral-200">
      <CardContent className="p-0">
        <p className="text-4xl font-heading font-bold text-primary mb-2">
          {value}
        </p>
        <p className="text-neutral-400">{label}</p>
      </CardContent>
    </Card>
  );
}
