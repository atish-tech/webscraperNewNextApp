export const P = ({ attribute, children }: { attribute: Record<string, string>; children: React.ReactNode }) => {
    return <p {...attribute}>{children}</p>;
    };