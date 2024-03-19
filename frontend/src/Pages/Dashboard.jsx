import { Link } from "react-router-dom";
import '../Styles/Dashboard.css'
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [clearanceStats, setClearanceStats] = useState(0)
    const [incidentStats, setIncidentStats] = useState(0)
    // const [casesStats, setCasesStats] = useState(0)
    const [convictionStats, setConvictionStats] = useState(0)
    // const [suspectsStats, setSuspectsStats] = useState(0)
    

    useEffect(()=>{
        const fetchStats = async () => {
            try {
                const res = await fetch(`/api/stats/summary`)
                const json = await res.json()
                if (res.ok) {
                    setClearanceStats(json.totalClearances)
                    setIncidentStats(json.totalIncidents)
                    setConvictionStats(json.totalCriminals)
                }
            } catch (e) {
                console.log('Error fetching stats summary: ', e)
            }
        }
        fetchStats()
    },[])
    return (
        <div className="page">
            <div className="page-contents">
                <div className="highlight">
                    <h3>Dashboard</h3>
                </div>
                <div className="dash-links">
                    <Link>
                        <div className="icon"><img src="/assets/icons/clearances.png" alt="" /></div>
                        <div className="pagelink">
                            <div>Clearances</div>
                            <div className="total">{clearanceStats}</div>
                        </div>
                    </Link>
                    <Link>
                        <div className="icon"><img src="/assets/icons/incidents.png" alt="" /></div>
                        <div className="pagelink">
                            <div>Incidents</div>
                            <div className="total">{incidentStats}</div>
                        </div>
                    </Link>
                    <Link>
                        <div className="icon"><img src="/assets/icons/active-case.png" alt="" /></div>
                        <div className="pagelink">
                            <div>Active Cases</div>
                            <div className="total">0</div>
                        </div>
                    </Link>
                    <Link>
                        <div className="icon"><img src="/assets/icons/convict.png" alt="" /></div>
                        <div className="pagelink">
                            <div>Convictions</div>
                            <div className="total">{convictionStats}</div>
                        </div>
                    </Link>
                    <Link>
                        <div className="icon"><img src="/assets/icons/suspect.png" alt="" /></div>
                        <div className="pagelink">
                            <div>Suspects</div>
                            <div className="total">0</div>
                        </div>
                    </Link>
                </div>
                <div className="chart"></div>
            </div>
        </div>
    );
}
 
export default Dashboard;