import React, { useRef, useState } from 'react'
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { getPointsFromGraph } from '../services/cv/graphAnalyzer';
import PlotGraph from '../components/PlotGraph';
import { submitGraphToServer, submitRatingToServer } from '../services/api/apiConnectors';
import ReactConfetti from 'react-confetti';

function GraphSubmission() {
    const imgRef = useRef(null);

    const [image, setimage] = useState(null)
    const [xAxis, setxAxis] = useState("")
    const [yAxis, setyAxis] = useState("")
    const [name, setname] = useState("")
    const [points, setpoints] = useState(null)
    const [loading, setloading] = useState(false)
    const [predictedPoints, setpredictedPoints] = useState(null)
    const [id, setid] = useState(null)
    const [invalidX, setinvalidX] = useState(false)
    const [invalidY, setinvalidY] = useState(false)
    const [reasoning, setreasoning] = useState("")
    const [rated, setrated] = useState(false)


    function handleTakePhoto(dataUri) {
        setimage(dataUri);
    }

    async function handleSubmission() {

        let invalid = false;

        if (yAxis.trim() == "") {
            setinvalidY(true)
            invalid = true;
        }

        if (xAxis.trim() == "") {
            setinvalidX(true)
            invalid = true;
        }

        if (invalid) return;

        setloading(true)
        const newpoints = await getPointsFromGraph(imgRef.current);
        let newpointsarr = newpoints.map((point) => [point.x, point.y])
        if (newpointsarr.length > 10) {
            let step = Math.ceil(newpointsarr.length / 10);
            newpointsarr = newpointsarr.filter((_, index) => index % step === 0).slice(0, 100);
        }
        const response = await submitGraphToServer(xAxis, yAxis, newpointsarr, image, name)
        setloading(false)
        console.log(response.data.Graph.Reasoning)

        const predictedPoints = response.data.Graph.Points;
        const newPredictedPoints = predictedPoints.map((point) => ({ x: point[0], y: point[1] }))
        console.log(points)
        setpoints(newpoints)
        setpredictedPoints(newPredictedPoints)
        setreasoning(response.data.Graph.Reasoning);
        setid(response.data.ID)
    }

    function handleChangeX(e) {
        setinvalidX(false)
        setxAxis(e.target.value)
    }
    function handleChangeY(e) {
        setinvalidY(false)
        setyAxis(e.target.value)
    }

    function handleRatingSubmission(rating) {
        setrated(true);
        submitRatingToServer(id, rating)
    }

    return (
        <div className={`${!image || loading || rated ? "h-[80vh]" : ""} w-screen flex flex-col gap-2 items-center justify-center`}>
            <div
                className='w-4/5 flex flex-col items-center'
            >
                {!rated &&
                    <>
                        <h1 className="font-bold text-2xl">Capture Your Graph!</h1>
                        {!image &&
                            <div className="flex w-fit items-center justify-center bg-gray-200 rounded-lg p-3">
                                <Camera
                                    className="m-0 rounded-lg"
                                    onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
                                    idealFacingMode='environment'
                                    isFullscreen={false}
                                    idealResolution={{ width: 500, height: 500 }}
                                />

                            </div>
                        }

                        {image &&
                            <div className='flex flex-col items-center justify-center'>
                                <div className={`w-fit flex justify-center ${loading ? "bg-blue-300 animate-pulse" : points ? "bg-green-400" : "bg-amber-200"} rounded-lg p-3`}>
                                    <img ref={imgRef} src={image} />
                                </div>

                                {!points && !loading &&
                                    <div className='flex flex-col gap-1 mt-5'>
                                        <label className='font-medium'>Y-Axis</label>
                                        <input
                                            className={`py-1 px-3 bg-gray-200 mb-2 rounded-lg ${invalidY ? "border-2 border-red-500" : "outline-blue-300"}`}
                                            type="text"
                                            placeholder="Grass height"
                                            value={yAxis}
                                            onChange={handleChangeY}
                                        />

                                        <label className='font-medium'>X-Axis</label>
                                        <input
                                            className={`py-1 px-3 bg-gray-200 rounded-lg outline-blue-300 ${invalidX ? "border-2 border-red-500" : "outline-blue-300"}`}
                                            type="text"
                                            placeholder="Time"
                                            value={xAxis}
                                            onChange={handleChangeX}
                                        />

                                        <label className='font-medium'>Name 
                                    <span className='ml-3 text-sm italic'>*optional</span>
                                    </label>
                                        <input
                                            className={`py-1 px-3 bg-gray-200 rounded-lg outline-blue-300`}
                                            type="text"
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setname(e.target.value)}
                                        />


                                        <button
                                            className=' py-2 px-3 text-white my-5 text-md bg-green-500 hover:bg-green-600 rounded-lg outline-blue-300'
                                            onClick={handleSubmission}
                                        >
                                            Predict Future!
                                        </button>
                                    </div>
                                }
                            </div>


                        }

                        {points && predictedPoints &&
                            <>
                                <label>Your graph:</label>
                                <PlotGraph
                                    points={points}
                                    newPoints={predictedPoints}
                                />
                            </>
                        }

                        {reasoning &&
                            <p className="text-center text-[12pt] py-4">{reasoning}</p>
                        }

                        {id &&
                            <div className='flex flex-col gap-2 justify-center items-center'>
                                <p>Rate prediction:</p>
                                <div className='flex flex-row justify-center gap-4 items-center'>
                                    <button onClick={() => { handleRatingSubmission(1) }}>
                                        <img src="/up_icon.svg" alt="" />
                                    </button>
                                    <button onClick={() => { handleRatingSubmission(-1) }}>
                                        <img src="/down_icon.svg" alt="" />
                                    </button>
                                </div>
                            </div>
                        }
                    </>
                }

                {rated &&

                    <div className="flex flex-col gap-5 w-fit items-center justify-center rounded-lg p-3">
                        <ReactConfetti />
                        <div className="z-10 relative flex text-center flex-col gap-5 w-fit items-center justify-center bg-white border  rounded-lg p-6 shadow-lg animate-fadeIn">
                            <h1 className="text-3xl font-semibold">Thank you for rating!</h1>
                            <p className="text-lg text-center">You’re awesome! Check out more amazing submissions at the <a href="/feed" className="text-blue-300 underline">Graph Feed</a>.</p>
                            <p className="text-lg text-center mt-2">Feel like submitting another graph? Let’s do it!</p>
                            <button className='px-4 py-1 rounded-lg bg-green-500 text-white font-bold hover:bg-green-400'
                                onClick={() => { location.reload() }}
                            >Try again!
                            </button>
                        </div>
                    </div>
                }
            </div>

        </div >
    )
}

export default GraphSubmission
