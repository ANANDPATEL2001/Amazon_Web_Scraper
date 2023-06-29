import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
// Route Handlers are only available inside the app directory. You do not need to use API Routes (pages) and Route Handlers (app) together, as Route Handlers should be able to handle all use cases.

export default function Home() {
  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        {/* Below 'text-indigo-600/20' signifies color shade as 600 and opacity of 20% as /20 */}
        <DocumentMagnifyingGlassIcon className="h-64 w-64 text-indigo-600/30" />

        <h1 className="text-3xl text-center mt-2 text-black font-bold mb-5">Welcome to the Amazon Web Scraper</h1>

        <h1 className="text-lg text-center italic text-black/50">Join Our Zero to Hero Programme</h1>

      </div>
    </>
  )
}
