export const H1 = ({
  attribute,
  children,
}: {
  attribute: Record<string, string>;
  children: React.ReactNode;
}) => {
  return <h1 {...attribute}>{children}</h1>;
};

export const H2 = ({
  attribute,
  children,
}: {
  attribute: Record<string, string>;
  children: React.ReactNode;
}) => {
  return <h2 {...attribute}>{children}</h2>;
};

export const H3 = ({
  attribute,
  children,
}: {
  attribute: Record<string, string>;
  children: React.ReactNode;
}) => {
  return <h3 {...attribute}>{children}</h3>;
};

export const H4 = ({
  attribute,
  children,
}: {
  attribute: Record<string, string>;
  children: React.ReactNode;
}) => {
  return <h4 {...attribute}>{children}</h4>;
};

export const H5 = ({
  attribute,
  children,
}: {
  attribute: Record<string, string>;
  children: React.ReactNode;
}) => {
  return <h5 {...attribute}>{children}</h5>;
};

export const H6 = ({
  attribute,
  children,
}: {
  attribute: Record<string, string>;
  children: React.ReactNode;
}) => {
  return <h6 {...attribute}>{children}</h6>;
};
