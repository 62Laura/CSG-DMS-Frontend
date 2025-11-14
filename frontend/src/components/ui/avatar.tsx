import * as React from "react"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    className?: string
  }
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))

Avatar.displayName = "Avatar"

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode
    className?: string
  }
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  >
    <span className="text-sm font-medium text-muted-foreground">
      {children}
    </span>
  </div>
))

AvatarFallback.displayName = "AvatarFallback"

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & {
    src: string
    alt: string
  }
>(({ className, alt, ...props }, ref) => {
  const [imgError, setImgError] = React.useState(false)

  if (imgError) return null

  return (
    <img
      ref={ref}
      alt={alt}
      className={cn("aspect-square h-full w-full object-cover", className)}
      onError={() => setImgError(true)}
      {...props}
    />
  )
})

AvatarImage.displayName = "AvatarImage"

export { Avatar, AvatarImage, AvatarFallback }
