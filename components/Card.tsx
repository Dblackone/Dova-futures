import { cn } from '@/lib/cn';

// Signature device 3 — white card on cream: 1.5px #DDDDDD border, 16px radius,
// 48px padding, warm shadow <=10% opacity.
export function Card({
  children,
  className,
  as: Tag = 'div',
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  interactive?: boolean;
}) {
  return (
    <Tag
      className={cn(
        'rounded-card border-hair border-hairline bg-white p-8 shadow-card sm:p-12',
        interactive &&
          'transition-[transform,box-shadow] duration-500 ease-spring hover:-translate-y-1 hover:shadow-card-hover',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
