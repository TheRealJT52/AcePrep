import { Button } from "@/components/ui/button";

interface TopicPillProps {
  topic: string;
  onClick: () => void;
}

export function TopicPill({ topic, onClick }: TopicPillProps) {
  return (
    <Button
      variant="outline"
      className="bg-neutral-200 hover:bg-primary-light text-neutral-500 hover:text-primary rounded-full text-sm transition-colors border-0"
      onClick={onClick}
    >
      {topic}
    </Button>
  );
}
