import Link from "next/link"
import { FileText } from "lucide-react"

export function MainNav() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <FileText className="h-6 w-6" />
          <span className="font-bold">LendFlow Pro</span>
        </Link>
        <nav className="flex items-center space-x-6 ml-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/loans"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Loans
          </Link>
          <Link
            href="/clients"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Clients
          </Link>
          <Link
            href="/documents"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Documents
          </Link>
        </nav>
      </div>
    </div>
  )
}