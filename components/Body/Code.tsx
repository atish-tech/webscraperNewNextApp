export const Code = ({
    attribute,
    children,
  }: {
    attribute: Record<string, string>;
    children: React.ReactNode;
  }) => {
    return <code {...attribute}>{children}</code>;
  };