export const Source = ({
  attribute,
}: {
  attribute: Record<string, string>;
}) => {
  return <source {...attribute} />;
};
