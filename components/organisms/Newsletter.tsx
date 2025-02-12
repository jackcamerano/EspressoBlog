import React from 'react'

export const Newsletter = () => {
    return (
        <section>
            <div className="mx-auto my-16 w-full max-w-7xl bg-secondary px-5 py-16 md:px-10 md:py-20">
                <div className="grid justify-items-center gap-4 bg-red-300 p-8 sm:p-10 lg:grid-cols-[1.5fr_1fr] lg:justify-items-start lg:p-16">
                    <div className="text-center md:text-start">
                        <h2 className="mb-2 text-3xl font-bold md:text-4xl">
                            Get the latest Article Update in your inbox.
                        </h2>
                        <p className="sm:test-base max-w-md text-sm">
                            Lorem ipsum dolor sit amet, consectetur.
                        </p>
                    </div>
                    <div className="w-full max-w-md sm:max-w-full">
                        <form
                            name="email-form"
                            method="get"
                            className="relative mx-auto mb-4 flex w-full flex-col items-center justify-center sm:flex-row"
                        >
                            <input
                                type="email"
                                className="h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black placeholder:text-foreground"
                                placeholder="Enter your email"
                            />
                            <input
                                type="submit"
                                value="Notify me"
                                className="relative right-0 top-2 w-full cursor-pointer rounded-md bg-black px-3 py-2 text-sm font-semibold text-white sm:absolute sm:right-2 sm:top-auto sm:w-24 lg:w-28 lg:text-base"
                            />
                        </form>
                        <p className="text-sm sm:text-base">
                            Join a community of over{' '}
                            <span>5000+ Webflow Developers</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
