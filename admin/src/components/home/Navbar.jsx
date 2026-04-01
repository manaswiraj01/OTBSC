import React from "react"
import { Link } from "react-router-dom"
import { SignedOut, SignUpButton, SignInButton } from "@clerk/clerk-react"

const Navbar = () => {
  return (
    <div className="navbar bg-background text-foreground border-b shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-foreground">
          OTBSC ADMIN
        </a>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <SignedOut>
              <SignInButton className="text-foreground hover:bg-muted rounded-md btn btn-primary" />
            </SignedOut>
          </li>
          <li>
            <SignedOut>
              <SignUpButton className="text-foreground hover:bg-muted rounded-md btn btn-primary ml-2" />
            </SignedOut>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar