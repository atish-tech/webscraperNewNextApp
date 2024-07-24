export const Pre = ({
    attribute,
    children,
  }: {
    attribute: Record<string, string>;
    children: React.ReactNode;
  }) => {
    return <pre {...attribute}>{children}</pre>;
  };