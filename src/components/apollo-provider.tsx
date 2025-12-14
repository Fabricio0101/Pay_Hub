"use client";

import { ApolloProvider } from "@apollo/client/react";
import createApolloClient from "@/lib/apollo-client";
import { ReactNode, useMemo } from "react";

interface ApolloProviderWrapperProps {
    children: ReactNode;
}

export const ApolloProviderWrapper = ({ children }: ApolloProviderWrapperProps) => {
    const client = useMemo(() => createApolloClient(), []);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

