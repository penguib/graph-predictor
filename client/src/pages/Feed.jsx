import React, { useEffect, useState } from 'react'
import { getGraphsFromServer } from '../services/api/apiConnectors'
import GraphFeedCard from '../components/GraphFeedCard';
import RatingPercentage from '../components/RatingPercentage';

function Feed() {
    const [graphs, setgraphs] = useState(null)
    const [percent, setpercent] = useState(null)


    async function getGraphs() {
        const response = await getGraphsFromServer();
        setgraphs(response.data.graphs)
        setpercent(response.data.like_average)
        console.log(response)
    }

    useEffect(() => {
        getGraphs()
    }, [])

    return (
        <div className='m-5 flex flex-col gap-3 justify-center items-center'>
            <h1 className="font-bold text-2xl">Submitted Graphs</h1>
            {percent && <RatingPercentage percent={percent} />}
            {graphs &&
                <div className='w-full flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center'>
                    {
                        graphs.map((graph, i) => (
                            <div className="w-full sm:w-fit" key={i}>
                                <GraphFeedCard
                                    image={graph.image}
                                    description_x={graph.description_x}
                                    description_y={graph.description_y}
                                    rating={graph.rating}
                                    reasoning={graph.reasoning}
                                    points={graph.Points}
                                    newPoints={graph.generated_points}
                                    name={graph.name}
                                />
                            </div>
                        ))
                    }
                </div>
            }

            {!graphs &&
                <div className="w-full flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center">
                    {[...Array(10)].map((_, i) => (
                        <div className="w-full sm:w-fit animate-pulse" key={i}>
                            <div className="w-full max-w-sm bg-gray-200 rounded-2xl shadow-lg border border-gray-300 overflow-hidden">
                                {/* Skeleton Image */}
                                <div className="w-full sm:w-[500px] h-80 bg-gray-300"></div>

                                {/* Skeleton Text */}
                                <div className="p-4 flex flex-col gap-2">
                                    <div className="w-3/4 h-6 bg-gray-300 rounded-md"></div>
                                    <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
                                    <div className="w-full h-16 bg-gray-300 rounded-md"></div>
                                    <div className="w-1/3 h-8 bg-gray-300 rounded-md"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Feed
