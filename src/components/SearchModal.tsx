import SearchForm from "./SearchForm"

function SearchModal() {
    return (
        <div id="search-modal" className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-[80] opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none" role="dialog"  aria-labelledby="hs-basic-modal-label">
            <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto ">
                    <div className="flex flex-col bg-black text-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                        <h3 id="hs-basic-modal-label" className="font-bold  dark:text-white">
                            Search For A User
                        </h3>
                    </div>
                    <div className="p-4 overflow-y-auto">
                        <SearchForm/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchModal
