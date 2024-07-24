export const Rect = ({
    attribute,
    children,
  }: {
    attribute: Record<string, string>;
    children: React.ReactNode;
  }) => {
    return <rect {...attribute}>{children}</rect>;
  };