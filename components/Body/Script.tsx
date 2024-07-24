import Script from "next/script";

export const NextScript = ({
  attribute,
  children,
  key,
}: {
  attribute: Record<string, string>;
  children?: React.ReactNode;
  key: number;
}) => {
  return (
    <>
      <Script defer={true} {...attribute}>
        {children}
      </Script>
    </>
  );
};
