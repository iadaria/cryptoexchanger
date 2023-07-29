import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'About'
};

export default function About() {
    return (

      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
            About us
        </div>
    )
}