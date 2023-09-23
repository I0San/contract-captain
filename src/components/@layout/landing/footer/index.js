export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">{new Date().getFullYear()} <a href="/" className="hover:underline">Contract Captain</a>
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="https://github.com/I0San/contract-captain" alt="" target="_blank" rel="noreferrer" >GitHub</a>
                </li>
            </ul>
        </footer>
    )
}