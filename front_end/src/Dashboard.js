import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [insights, setInsights] = useState(null);
  const [sinceDate, setSinceDate] = useState("");
  const [untilDate, setUntilDate] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("accessToken");
    const name = params.get("name");
    const picture = params.get("picture");

    if (token) {
      setAccessToken(token);
      setUser({ name, picture });
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      axios.get(`http://localhost:5000/facebook/pages?access_token=${accessToken}`)
        .then((res) => setPages(res.data.data))
        .catch((err) => console.error(err));
    }
  }, [accessToken]);

  const fetchInsights = (page, sinceDate, untilDate) => {
    axios.get(`http://localhost:5000/facebook/page-insights`, {
        params: {
          page_id: page.id,
          access_token: page.access_token,
          since: sinceDate,
          until: untilDate,
          period: "total_over_range",
        },
      })
      .then((res) => {
        const insightsData = res.data.data;
        const formattedInsights = {
          fans: insightsData.find(i => i.name === "page_fan_adds")?.values[0].value || 0,
          engagement: insightsData.find(i => i.name === "page_post_engagements")?.values[0].value || 0,
          impressions: insightsData.find(i => i.name === "page_impressions")?.values[0].value || 0,
          reactions: insightsData.find(i => i.name === "page_reactions_total")?.values[0].value || 0,
        };
        setInsights(formattedInsights);
  })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {user && (
        <>
          <h2>Welcome, {user.name}</h2>
          <img src={`${user.picture}&height=50&width=50&ext=1742455340&hash=AbYHkieDWod4FHBR7OcRj7aQ`} alt="Profile" style={{ borderRadius: "50%", width: "100px" }} />
        </>
      )}
      
      <h3>Select a Facebook Page</h3>
      <select onChange={(e) => setSelectedPage(e.target.value)}  style={cardStyle1}>
        <option value="">Select a Page</option>
        {pages.map((page) => (
          <option key={page.id} value={page.id}>
            {page.name}
          </option>
        ))}
      </select>
      <h3>Select a Date Range</h3>
    <input type="date" onChange={(e) => setSinceDate(e.target.value)} style={cardStyle1}/>
    <input type="date" onChange={(e) => setUntilDate(e.target.value)} style={cardStyle1}/>
      <button 
  onClick={() => {
    const pageObj = pages.find((p) => p.id === selectedPage);
    if (pageObj) fetchInsights(pageObj,sinceDate, untilDate);
  }}
  disabled={!selectedPage} 
  style={cardStyle1}
>
  Fetch Insights
</button>

{insights && (
  <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
    <div style={cardStyle}>
      <h3>Total Followers</h3>
      <p>{insights.fans}</p>
    </div>
    <div style={cardStyle}>
      <h3>Total Engagement</h3>
      <p>{insights.engagement}</p>
    </div>
    <div style={cardStyle}>
      <h3>Total Impressions</h3>
      <p>{insights.impressions}</p>
    </div>
    <div style={cardStyle}>
      <h3>Total Reactions</h3>
      <p>{insights.reactions}</p>
    </div>
  </div>
)}

    </div>
  );
};
const cardStyle = {
    width: "200px",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
  };
  const cardStyle1 = {
    // width: "100px",
    padding: "7px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    marginLeft: "10px"
  };
export default Dashboard;
