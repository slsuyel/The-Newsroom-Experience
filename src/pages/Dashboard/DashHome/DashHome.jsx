import Chart from "./Chart";
import PieChartPage from "./PieChartPage";
const DashHome = () => {
    return (
        <>

            <div className="row w-100 mx-auto">
                <div className="col-md-9 col-sm-12">
                    <Chart />
                </div>
                <div className="col-md-3">
                    <PieChartPage />
                </div>
            </div>
        </>
    );
};

export default DashHome;