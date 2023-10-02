import SearchBar from "@/components/header/header";
import "../app/globals.css";
import { Result } from "@/components/results/result";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1200000,
      cacheTime: 1200000,
    },
  },
});

const Home: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="finder">
          <header className="bg-gray-800 py-4">
            <div className="container mx-auto px-1">
              <h1 className="text-white text-3xl font-bold">Finder</h1>
            </div>
          </header>
          <main className="flex flex-col px-24 py-4">
            <div className="py-4 pb-12 px-4">
              <SearchBar></SearchBar>
            </div>

            <div className="py-4 px-4 bg-gray-50">
              <Result></Result>
            </div>
          </main>
        </div>
      </QueryClientProvider>
      <Analytics />
    </>
  );
};

export default Home;
