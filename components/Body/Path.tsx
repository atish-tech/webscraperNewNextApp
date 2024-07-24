export const Path = ({ attribute, children }: { attribute: Record<string, string>; children: React.ReactNode }) => {
    return <path {...attribute}>{children}</path>;
    };