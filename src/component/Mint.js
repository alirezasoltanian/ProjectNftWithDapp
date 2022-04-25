import React from 'react'

export default function Mint({handleMint}) {
  return (
    <div>
        <div>
            <div class=" w-full rounded-xl sm:w-auto shadow-lg mx-auto p-4 border border-gray-200 shadow-md sm:p-6 lg:p-8 bg-gray-800 border-yellow-700">
                <form class="space-y-9" onSubmit={handleMint}>
                    <h3 class="text-xl font-medium text-gray-900 dark:text-white">Mint your nft</h3>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Amount </label>
                        <input type="text" name="amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="amount" />
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">mint</button>
                </form>
            </div>
        </div>
    </div>
  )
}