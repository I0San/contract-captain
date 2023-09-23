import React from 'react'
import LandingAddContract from '../../components/AddContract/landingAddContract'


const PageLanding = () => {
    return (
        <main className="-mt-32">
            <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                    <div className="rounded-lg border-4 border-dashed border-gray-200" >
                        <div className="flex items-center justify-center h-full px-4">
                            <div className="flex flex-col items-center justify-center gap-8 w-full md:w-1/2">
                                <div className="w-full">
                                    <LandingAddContract />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PageLanding
