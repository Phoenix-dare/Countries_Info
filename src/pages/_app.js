import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ColorModeContextProvider } from "@/context/ColorModeContext";
import Layout from "@/components/Layout";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ColorModeContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
