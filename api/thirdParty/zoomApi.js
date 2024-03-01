require("dotenv").config();
const axios = require("axios");

const ZOOM_OAUTH_ENDPOINT = 'https://zoom.us/oauth/token';
const ZOOM_API_BASE_URL = 'https://api.zoom.us/v2';

const getToken = async () => {
    const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;

    try {
        const params = new URLSearchParams({
            grant_type: 'account_credentials',
            account_id: ZOOM_ACCOUNT_ID
        }).toString();
        const request = await axios.post(
            ZOOM_OAUTH_ENDPOINT,
            params,
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64')}`,
                },
            },
        );

        const { access_token } = request.data;
        return access_token;
    } catch (error) {
        console.error("Error fetching access token:", error);
        throw error;
    }
};

const createZoomMeeting = async (schedule) => {
    try {
        const token = await getToken(); // Attendez le jeton

        const meetingDate = new Date('05 March 2023 14:48 UTC');

        // @todo: validate all fields
        const topic = schedule.meetingObject;

        const startTime = new Date(schedule.startDate);
        const endTime = new Date(schedule.endDate);

        const diff = endTime.getTime() - startTime.getTime();
        const duration = diff / (1000 * 60);

        const response = await axios.post(`${ZOOM_API_BASE_URL}/users/me/meetings`, {
            topic: topic,
            type: 2,
            start_time: meetingDate.toISOString(),
            duration: duration,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data; // Retournez les données de la réunion créée
    } catch (error) {
        console.error("Error creating Zoom meeting:", error);
        throw error;
    }
};

exports.createZoomMeeting = createZoomMeeting;
