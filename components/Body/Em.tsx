export const Em = ({
    attribute,
    children,
  }: {
    attribute: Record<string, string>;
    children: React.ReactNode;
  }) => {
    return <em {...attribute}>{children}</em>;
  };