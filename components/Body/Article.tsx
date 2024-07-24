export const Article = ({ attribute, children }: { attribute: Record<string, string>; children: React.ReactNode }) => {
    return <article {...attribute}>{children}</article>;
    };