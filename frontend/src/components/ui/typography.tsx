import React from "react";
import { cn } from "../../lib/utils"

interface TypographyProps {
    className?: string,
    children?: React.ReactNode
}

export function H1({ className, children }: TypographyProps) {
    return (
        <h1 className={cn(className, "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl")}>
            {children}
        </h1>
    )
}

export function H2({ className, children }: TypographyProps) {
    return (
        <h2 className={cn(className, "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0")}>
            {children}
        </h2>
    )
}


export function H3({ className, children }: TypographyProps) {
    return (
        <h3 className={cn(className, "scroll-m-20 text-2xl font-semibold tracking-tight")}>
            {children}
        </h3>
    )
}

export function H4({ className, children }: TypographyProps) {
    return (
        <h4 className={cn(className, "scroll-m-20 text-xl font-semibold tracking-tight")}>
            {children}
        </h4>
    )
}

export function P({ className, children }: TypographyProps) {
    return (
        <p className={cn(className, "leading-7 [&:not(:first-child)]:mt-6")}>
            {children}
        </p>
    )
}

export function Blockquote({ className, children }: TypographyProps) {
    return (
        <blockquote className={cn(className, "mt-6 border-l-2 pl-6 italic")}>
            {children}
        </blockquote>
    )
}

export function InlineCode({ className, children }: TypographyProps) {
    return (
        <code className={cn(className, "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold")}>
            {children}
        </code>
    )
}


export function Lead({ className, children }: TypographyProps) {
    return (
        <p className={cn(className, "text-xl text-muted-foreground")}>
            {children}
        </p>
    )
}


export function Large({ className, children }: TypographyProps) {
    return <div className={cn(className, "text-lg font-semibold")}>{children}</div>
}


export function Small({ className, children }: TypographyProps) {
    return (
        <small className={cn(className, "text-sm font-medium leading-none")}>{children}</small>
    )
}


export function Muted({ className, children }: TypographyProps) {
    return (
        <p className={cn(className, "text-sm text-muted-foreground")}>{children}</p>
    )
}
