import React, { useState } from 'react'
import PlotGraph from './PlotGraph'

function GraphFeedCard(props) {
    const [front, setfront] = useState(true)
    return (
        <>
            {front &&
                <div
                    className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200"
                    onClick={() => { setfront(false) }}
                >
                    {/* Image */}
                    <div className="w-full h-80 bg-gray-100">
                        <img
                            src={props.image}
                            alt="Graph Preview"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <p className='text-sm text-gray-600 mt-1 text-center'>Click/tap the image to flip</p>

                    {/* Description */}
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800">Y-Axis: {props.description_y}</h3>
                        <p className="text-sm text-gray-600 mt-1">X-Axis: {props.description_x}</p>
                        <p className="text-sm text-gray-600 mt-1">Name: {!props.name ? "Anonymous" : props.name}</p>
                        <p className="text-sm text-gray-600 mt-1">AI's Reasoning: <br /> {props.reasoning}</p>
                        {
                            props.rating &&
                            <>
                                {props.rating == 1 ?
                                    <p className="text-sm w-fit text-white font-semibold p-2 bg-green-500 rounded-md mt-1">Rating: Good</p>
                                    :
                                    <p className="text-sm w-fit text-white font-semibold p-2 bg-red-500 rounded-md mt-1">Rating: Bad</p>
                                }
                            </>
                        }
                    </div>
                </div>
            }
            {!front &&
                <div
                    className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200"
                    onClick={() => { setfront(true) }}
                >
                    {/* Image */}
                    <div className="w-full h-80 gap-3 bg-gray-100 flex flex-col justify-center items-center">
                        <h1>AI Graph Prediction:</h1>
                        <PlotGraph
                            points={props.points.map((point) => ({ x: point[0], y: point[1] }))}
                            newPoints={props.newPoints.map((point) => ({ x: point[0], y: point[1] }))}
                        />
                        <p className='text-sm text-center'>Note: Far fewer points shown than collected</p>
                    </div>

                    <p className='text-sm text-gray-600 mt-1 text-center'>Click/tap the image to flip</p>

                    {/* Description */}
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800">Y-Axis: {props.description_y}</h3>
                        <p className="text-sm text-gray-600 mt-1">X-Axis: {props.description_x}</p>
                        <p className="text-sm text-gray-600 mt-1">Name: {!props.name ? "Anonymous" : props.name}</p>
                        <p className="text-sm text-gray-600 mt-1">AI's Reasoning: <br /> {props.reasoning}</p>
                        {
                            props.rating &&
                            <>
                                {props.rating == 1 ?
                                    <p className="text-sm w-fit text-white font-semibold p-2 bg-green-500 rounded-md mt-1">Rating: Good</p>
                                    :
                                    <p className="text-sm w-fit text-white font-semibold p-2 bg-red-500 rounded-md mt-1">Rating: Bad</p>
                                }
                            </>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default GraphFeedCard
