"use client"
// Here we are using 'use client' which tells to a perticular component that it need to be rendered on the browser(client) rather than on the server which allows us to mount these 'event handlers' which won't work otherwise
import { useRef } from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

const Header = () => {
    // Below <HTMLInputElement> signifies the 'reference type' of 'inputRef'
    // const inputRef = useRef <HTMLInputElement> (null) //for typescript
    const inputRef = useRef(null)
    const router = useRouter()

    const handleSearch = async (
        e /** e: FormElement<HTMLFormElement> for typescript */
    ) => {
        e.preventDefault()

        const input = inputRef.current?.value
        if (!input) return

        const notification = toast.loading(`Starting the Scraper for ${input}`);

        if (inputRef.current?.value) {
            inputRef.current.value = ""
        }

        try {
            // Calling the API to activate the scraper
            const response = await fetch('/api/activateScraper', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ search: input }),
            });

            const { collection_id, start_eta } = await response.json();
            toast.success("Scraper Started Successfully", {
                id: notification,
            });
            router.push(`/search/${collection_id}`);

        } catch (error) {
            // Handling the error(if any)
            toast.error("whooops... Something went wrong!", {
                id: notification,
            });
        }
    }

    return (
        <header>
            <form
                className="flex items-center space-x-2 justify-center rounded-full py-2 px-4 bg-indigo-200/60 max-w-md mx-auto"
                onSubmit={handleSearch}
            >
                <input
                    ref={inputRef}
                    type="text"
                    className="flex-1 outline-none bg-transparent text-indigo-500 placeholder:text-indigo-400"
                    placeholder="Search..."
                />

                <button hidden>Search</button>
                <MagnifyingGlassIcon className="h-6 w-6 text-indigo-300" />
            </form>
        </header>
    )
}

export default Header
