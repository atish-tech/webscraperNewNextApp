export const Span = ({ attribute, children }: { attribute: Record<string, string>; children: React.ReactNode }) => {
    return <span {...attribute}>{children}</span>;
    };