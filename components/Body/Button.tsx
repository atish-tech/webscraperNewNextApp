export const Button = ({ attribute, children }: { attribute: Record<string, string>; children: React.ReactNode }) => {
    return <button {...attribute}>{children}</button>;
    };