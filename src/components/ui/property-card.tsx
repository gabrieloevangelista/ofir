import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

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
  /** Whether this property is in favorites / quotation */
  isFavorite?: boolean;
  /** Function to toggle favorite / quotation */
  onToggleFavorite?: (e: React.MouseEvent) => void;
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
      isFavorite = false,
      onToggleFavorite,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full flex-col overflow-hidden rounded-none border border-border bg-card text-card-foreground shadow-none relative group",
          className
        )}
        {...props}
      >
        {/* Property Image */}
        <div className="aspect-[16/10] overflow-hidden relative">
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Favorite / Add to Quotation Badge Button */}
          {onToggleFavorite && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(e);
              }}
              title={isFavorite ? "Remover da Cotação" : "Adicionar à Cotação"}
              className={cn(
                "absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-none border transition-all shadow-sm",
                isFavorite
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background/90 hover:bg-background text-foreground border-border/80 backdrop-blur-sm"
              )}
            >
              <Heart
                className={cn(
                  "size-3.5 transition-transform",
                  isFavorite ? "fill-current text-primary-foreground scale-110" : "text-muted-foreground"
                )}
              />
              <span className="text-[11px] uppercase tracking-wide">
                {isFavorite ? "Cotado" : "Cotar"}
              </span>
            </button>
          )}
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
              <div key={index} className="rounded-none bg-muted/50 p-2.5 text-center flex flex-col justify-center border border-border/40">
                <p className="text-[11px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <p className="text-sm sm:text-base font-bold text-foreground mt-0.5 line-clamp-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <Button onClick={onActionClick} className="w-full rounded-none shadow-none">
            {actionLabel}
          </Button>
        </div>
      </div>
    );
  }
);
PropertyCard.displayName = "PropertyCard";

export { PropertyCard };
