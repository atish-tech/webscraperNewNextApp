export const Strong = ({
  attribute,
  children,
}: {
  attribute: Record<string, string>;
  children: React.ReactNode;
}) => {
  return <strong {...attribute}>{children}</strong>;
};
