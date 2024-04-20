import { Inter } from "next/font/google";
// import "./globals.css";
import "@/assets/scss/themes.scss";
import { AuthProvider } from "./Providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chat App-MQTT",
  description: "Chat Application using MQTT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-center" richColors closeButton />
        </AuthProvider>
      </body>
    </html>
  );
}
