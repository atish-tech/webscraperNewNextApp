export const A = ({ attribute, children }: { attribute: Record<string, string>; children: React.ReactNode }) => {
    return <a {...attribute}>{children}</a>;
    };