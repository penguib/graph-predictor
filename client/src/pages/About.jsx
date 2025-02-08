import React from 'react'

function About() {
    return (
        <div className="overflow-hidden min-h-screen flex flex-col justify-center">
            <section className="container mx-auto px-6 py-12">
                {/* Heading Section */}
                <div className="text-center flex flex-col items-center justify-center mb-12">
                    <img className="w-32" src="/photo_icon.svg" alt="" />
                    <h1 className="text-4xl font-bold mb-4">graph.pics</h1>
                    <p className="text-xl font-light max-w-2xl mx-auto">
                        Predict the outcome of <em>any</em> situation.
                    </p>
                </div>

                {/* Main Content Section */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                    {/* Left Column with Text */}
                    <div className="md:w-1/2">
                        <h1 className="text-2xl font-bold mb-4">Purpose</h1>
                        <p className='text-[13pt]'>Traditional statistical predictions cannot the meanings axis labels</p>
                        <p className='text-[13pt] mt-2'>
                            By leveraging large language models, we can achieve novel statistical predictions
                            accounting for the nuances of the axis labels.
                        </p>
                        <p className='text-[13pt] mt-2'>
                            Using labels, you can hand draw a graph about anything, and get a realistic prediction on the
                            outcome of the graph
                        </p>

                        <h1 className="text-2xl font-bold my-4">How it works?</h1>
                        <ol className='text-[13pt]'>
                            <li>1. Draw a picture of a graph</li>
                            <li>2. Snap a picture of it</li>
                            <li>3. Provide the graph labels</li>
                            <li>4. Receive a prediction on your data!</li>
                        </ol>

                        <h1 className="text-2xl font-bold my-4">Outcomes</h1>
                        <p className='text-[13pt]'>It really works!</p>
                        <p className='text-[13pt] mt-2'>
                            The LLM is able to make interesting predictions and discoveries about data that traditional statistical
                            models could never make.
                        </p>
                        <p className='text-[13pt] mt-2'>
                            This technology could revolutionize the way that we think about statistical predictions.
                        </p>

                        <h1 className="text-2xl font-bold my-4">Hackathon Tracks</h1>
                        <ol className='text-[13pt]'>
                            <li>1. Best Use of Computer Vision</li>
                            <li>2. Best Content Creation Hack</li>
                            <li>3. Best Domain Name from GoDaddy</li>
                            <li>4. Best use of AI</li>
                        </ol>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
