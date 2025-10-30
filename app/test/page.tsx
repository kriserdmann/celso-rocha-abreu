import { Header } from "@/components/header"

export default function TestPage() {
  return (
    <div>
      <Header />
      <main className="mt-24 p-6">
        <h1 className="text-2xl font-bold">Test Page</h1>
        <p>If this renders, the issue is in LandingPage content.</p>
      </main>
    </div>
  )
}