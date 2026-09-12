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
  /** View layout mode */
  layout?: "grid" | "list";
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
      layout = "grid",
      ...props
    },
    ref
  ) => {
    const isList = layout === "list";

    return (
      <div
        ref={ref}
        className={cn(
          "w-full overflow-hidden rounded-none border border-border bg-card text-card-foreground shadow-none relative group transition-all",
          isList ? "flex flex-col sm:flex-row items-stretch" : "flex flex-col",
          className
        )}
        {...props}
      >
        {/* Property Image */}
        <div
          className={cn(
            "overflow-hidden relative shrink-0",
            isList ? "w-full sm:w-72 md:w-84 aspect-[16/10] sm:aspect-auto min-h-[200px]" : "aspect-[16/10] w-full"
          )}
        >
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
        <div className={cn("flex flex-1 flex-col p-4 sm:p-5", isList ? "justify-between" : "")}>
          <div className="flex-1">
            <div className={cn(isList ? "flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1" : "")}>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight line-clamp-1">{title}</h3>
              <p className="text-base font-semibold text-foreground whitespace-nowrap">
                {price} {pricePeriod ? <span className="text-xs font-normal text-muted-foreground">{pricePeriod}</span> : null}
              </p>
            </div>
            <p className={cn("text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2", isList ? "line-clamp-3" : "line-clamp-2")}>
              {description}
            </p>
          </div>

          {/* Stats & Action Section */}
          <div className={cn(isList ? "mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-border/40 pt-3" : "mt-4")}>
            {/* Stats Section */}
            <div className={cn("grid gap-2 sm:gap-3", isList ? "grid-cols-2 sm:flex sm:flex-wrap" : "grid-cols-2 my-2")}>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={cn(
                    "rounded-none bg-muted/50 p-2 text-center flex flex-col justify-center border border-border/40",
                    isList ? "sm:px-3 sm:py-1.5 sm:text-left" : ""
                  )}
                >
                  <p className="text-[10px] sm:text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <p className="text-xs sm:text-sm font-bold text-foreground mt-0.5 line-clamp-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className={cn(isList ? "sm:w-44 shrink-0" : "w-full mt-2")}>
              <Button onClick={onActionClick} className="w-full rounded-none shadow-none font-semibold">
                {actionLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
PropertyCard.displayName = "PropertyCard";

export { PropertyCard };
