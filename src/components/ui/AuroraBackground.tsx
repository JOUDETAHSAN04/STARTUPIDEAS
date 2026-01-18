export default function AuroraBackground({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`aurora-root relative h-screen w-screen overflow-hidden ${className || ""}`}>
            <div className="aurora-layer" aria-hidden="true" />
            <div className="aurora-layer two" aria-hidden="true" />
            {children}
        </div>
    );
}
