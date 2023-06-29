import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import { adminDb } from "./src/firebaseAdmin"

const fetchResults = async id => {
    const api_key = process.env.BRIGHTDATA_API_KEY

    const res = await fetch(`https://api.brightdata.com/dca/dataset?id=${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${api_key}`
        }
    })

    const data = await res.json()

    if (data.status === "building" || data.status === "collecting") {
        console.log("NOT COMPLETED YET, TRYING AGAIN ...")
        return fetchResults(id)
    }

    return data
}

const { onRequest } = require("firebase-functions/v2/https")
const logger = require("firebase-functions/logger")

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

export const onScraperCompelete = functions.https.onRequest(
    async (request, response) => {
        console.log("Scrap-Complete >>", request.body)

        const { success, id, finished } = request.body
        if (!success) {
            await adminDb
                .collection("searches")
                .doc(id)
                .set(
                    {
                        status: "error",
                        updatedAt: admin.firestore.Timestamp.now()
                        // We can even use 'finished' in the place of 'admin.firestore.Timestamp.now()'
                    },
                    {
                        merge: true
                    }
                )
        }

        const data = fetchResults(id)

        await adminDb
            .collection("searches")
            .doc(id)
            .set(
                {
                    status: "complete",
                    updatedAt: admin.firestore.Timestamp.now(),
                    // We can even use 'finished' in the place of 'admin.firestore.Timestamp.now()'
                    results: data
                },
                {
                    merge: true
                }
            )

        console.log("Web Scraping Completed !!")
        response.send("Web Scraping Completed !!")
    }
)

// Following is the End-ppoint where our Back-end is Hosted
// http://127.0.0.1:5001/web-scrapper-3f21b/us-central1/onScraperCompelete

// Following is the End-ppoint where our Back-end is Live through ngrok
// https://e2f0-47-31-165-78.ngrok-free.app/web-scrapper-3f21b/us-central1/onScraperCompelete
