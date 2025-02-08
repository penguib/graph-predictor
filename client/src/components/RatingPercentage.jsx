
function RatingPercentage({ percent }) {
    return (
        <div className="text-2xl sm:text-3xl font-bold text-white bg-green-500 px-4 py-2 rounded-lg shadow-md">
            Positive Rating {parseInt(percent)}%
        </div>
    );
}

export default RatingPercentage;
