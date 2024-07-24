export const Footer = ({ attribute, children }: { attribute: Record<string, string>; children: React.ReactNode }) => {
    return <footer {...attribute}>{children}</footer>;
    };