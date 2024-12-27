import Navbar from "@/components/Navbar";

export default function Layuout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
        <Navbar />
        
        {children}
    </main>
  )
}