import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Define the structure for each stat to be displayed
export interface Stat {
  label: string;
  value: string | number;
}

// Define the props for the PropertyCard component
export interface PropertyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The URL of the property image. */
  imageUrl: string;
  /** An accessible label for the image. */
  imageAlt?: string;
  /** The main title or name of the property. */
  title: string;
  /** The price of the property. */
  price: number | string;
  /** The pricing period, e.g., "per night". */
  pricePeriod?: string;
  /** A short description of the property. */
  description: string;
  /** An array of stats to display, like rating, days, etc. */
  stats: Stat[];
  /** The label for the main action button. */
  actionLabel: string;
  /** The function to call when the action button is clicked. */
  onActionClick?: () => void;
}

const PropertyCard = React.forwardRef<HTMLDivElement, PropertyCardProps>(
  (
    {
      className,
      imageUrl,
      imageAlt,
      title,
      price,
      pricePeriod = "per night",
      description,
      stats,
      actionLabel,
      onActionClick,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        {/* Property Image */}
        <div className="aspect-[16/10] overflow-hidden relative">
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Card Content */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight line-clamp-1">{title}</h3>
            <p className="mt-1 text-base font-semibold text-foreground">
              {price} <span className="text-xs font-normal text-muted-foreground">{pricePeriod}</span>
            </p>
            <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">{description}</p>
          </div>

          {/* Stats Section */}
          <div className="my-4 grid grid-cols-2 gap-2 sm:gap-3">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-lg bg-muted/50 p-2.5 text-center flex flex-col justify-center">
                <p className="text-[11px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <p className="text-sm sm:text-base font-bold text-foreground mt-0.5 line-clamp-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <Button onClick={onActionClick} className="w-full">
            {actionLabel}
          </Button>
        </div>
      </div>
    );
  }
);
PropertyCard.displayName = "PropertyCard";

export { PropertyCard };
