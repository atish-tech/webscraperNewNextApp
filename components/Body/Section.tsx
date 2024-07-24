export const Section = ({ attribute, children }: { attribute: Record<string, string>; children: React.ReactNode }) => {
    return <section {...attribute}>{children}</section>;
    };