import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    container?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
    ({ className, container = true, children, ...props }, ref) => {
        return (
            <section
                ref={ref}
                className={cn("py-8 sm:py-12 md:py-16 lg:py-24 w-full", className)}
                {...props}
            >
                {container ? (
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">{children}</div>
                ) : (
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">{children}</div>
                )}
            </section>
        );
    }
);
Section.displayName = "Section";

export { Section };
