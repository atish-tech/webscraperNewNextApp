export const Figure = ({
    attribute,
    children,
  }: {
    attribute: Record<string, string>;
    children: React.ReactNode;
  }) => {
    return <figure {...attribute}>{children}</figure>;
  };