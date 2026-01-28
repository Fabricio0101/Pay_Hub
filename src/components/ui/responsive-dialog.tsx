"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

interface ResponsiveDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    trigger: React.ReactNode;
    title: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    contentClassName?: string;
}

export const ResponsiveDialog = ({
    open,
    onOpenChange,
    trigger,
    title,
    description,
    children,
    footer,
    contentClassName,
}: ResponsiveDialogProps) => {
    const isMobile = useIsMobile();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Durante SSR e primeiro render, sempre renderiza Dialog para evitar hydration mismatch
    if (!mounted) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent className={cn("p-0", contentClassName)}>
                    <DialogHeader className="px-6 pt-6">
                        <DialogTitle>{title}</DialogTitle>
                        {description && <DialogDescription>{description}</DialogDescription>}
                    </DialogHeader>
                    <div className="overflow-y-auto px-6">{children}</div>
                    {footer && <DialogFooter className="px-6 pb-6">{footer}</DialogFooter>}
                </DialogContent>
            </Dialog>
        );
    }

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerTrigger asChild>{trigger}</DrawerTrigger>
                <DrawerContent className={contentClassName}>
                    <DrawerHeader className="p-4 pb-0">
                        <DrawerTitle>{title}</DrawerTitle>
                        {description && <DrawerDescription>{description}</DrawerDescription>}
                    </DrawerHeader>
                    <div className="overflow-y-auto px-4">{children}</div>
                    {footer && <DrawerFooter className="p-4 pt-4">{footer}</DrawerFooter>}
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className={cn("p-0", contentClassName)}>
                <DialogHeader className="px-6 pt-6">
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                <div className="overflow-y-auto px-6">{children}</div>
                {footer && <DialogFooter className="px-6 pb-6">{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    );
};
