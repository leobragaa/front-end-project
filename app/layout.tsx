import { Provider } from "@/components/ui/provider";
import { Outfit, Audiowide } from "next/font/google";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
