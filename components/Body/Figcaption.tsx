export const Figcaption = ({
    attribute,
    children,
  }: {
    attribute: Record<string, string>;
    children: React.ReactNode;
  }) => {
    return <figcaption {...attribute}>{children}</figcaption>;
  };