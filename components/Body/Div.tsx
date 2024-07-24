export const Div = ({
  attribute,
  children,
}: {
  attribute: Record<string, string>;
  children: React.ReactNode;
}) => {
  return <div {...attribute}>{children}</div>;
};
