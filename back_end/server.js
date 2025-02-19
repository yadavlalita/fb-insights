const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Step 1: Redirect user to Facebook Login
app.get("/auth/facebook", (req, res) => {
    const authUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=public_profile,email,pages_show_list,pages_read_engagement`;
    res.redirect(authUrl);
});

// Step 2: Handle Facebook Callback
app.get("/auth/facebook/callback", async (req, res) => {
    const { code } = req.query;
    console.log("code---", code);
    if (!code) return res.status(400).send("Authorization code missing");

    try {
        const tokenRes = await axios.get(`https://graph.facebook.com/v12.0/oauth/access_token`, {
            params: {
                client_id: FACEBOOK_APP_ID,
                client_secret: FACEBOOK_APP_SECRET,
                redirect_uri: REDIRECT_URI,
                code,
            },
        });
        const accessToken = tokenRes.data.access_token;

        // Fetch user details
        const userRes = await axios.get(`https://graph.facebook.com/me?fields=id,name,picture&access_token=${accessToken}`);
        const userData = userRes.data;
        console.log("userData---",  userData);
        res.redirect(`http://localhost:3001/dashboard?accessToken=${accessToken}&name=${userData.name}&picture=${userData.picture.data.url}`);
    } catch (error) {
        res.status(500).send("Error fetching access token");
    }
});

// Step 3: Fetch Facebook Pages
app.get("/facebook/pages", async (req, res) => {
    const { access_token } = req.query;
    if (!access_token) return res.status(400).send("Missing access token");

    try {
        const pagesRes = await axios.get(`https://graph.facebook.com/me/accounts?access_token=${access_token}`);
        res.json(pagesRes.data);
    } catch (error) {
        res.status(500).send("Error fetching pages");
    }
});

// Step 4: Fetch Page Insights
app.get("/facebook/page-insights", async (req, res) => {
    console.log("query data-- ",req.query);
    const { page_id, access_token, since, until, period } = req.query;
    if (!page_id || !access_token) return res.status(400).send("Missing parameters");

    try {
        const insightsRes = await axios.get(`https://graph.facebook.com/v12.0/${page_id}/insights`, {
            params: {
                // metric: "page_fan_adds,page_engaged_users,page_impressions,page_reactions_total",
                metric: "page_fan_adds,page_post_engagements,page_impressions",
                period: period || "total_over_range",
                since: since,
                until: until,
                access_token,
            },
        });
        console.log("insightsRes---",insightsRes);
        res.json(insightsRes.data);
    } catch (error) {
        console.log("error--", error);
        res.status(500).send("Error fetching insights");
    }
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
