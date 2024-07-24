export const Svg = ({ attribute, children }: { attribute: Record<string, string>; children: React.ReactNode }) => {
    return <svg {...attribute}>{children}</svg>;
    };