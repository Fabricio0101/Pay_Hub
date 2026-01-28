import { CodegenConfig } from '@graphql-codegen/cli';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  documents: ['src/graphql/**/*.ts'],
  generates: {
    './src/graphql/generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ],
      config: {
        withHooks: true,
        withResultType: true,
        withMutationFn: true,
        apolloClientVersion: 3,
      }
    }
  }
};

export default config;