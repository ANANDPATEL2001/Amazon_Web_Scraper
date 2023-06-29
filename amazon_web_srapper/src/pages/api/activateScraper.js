import * as admin from 'firebase-admin';

import { adminDb } from "../../../firebaseAdmin";

export default async function handler(req, res) {
    try {
        const { search } = req.body;
        console.log("SEARCH IS >>", search);

        // Below we have used 'trigger-url' from BRIHGTDATA API url containing collection of jobs for the given response
        // The response given back by the 'trigger-url' is  specific to a job-id
        const response = await fetch(`https://api.brightdata.com/dca/trigger?collector=c_liiho0mr2fhn62r4aa&queue_next=1`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                search,
            }),
        })

        const data = await response.json();
        console.log("DATA IS >>", data);

        const { collection_id, start_eta } = data;

        await adminDb
            .collection("searches")
            .doc(collection_id)
            .set(
                {
                    search,
                    start_eta,
                    status: "pending",
                    updatedAt: admin.firestore.Timestamp.now(),
                    // We can even use 'start_eta' in the place of 'admin.firestore.Timestamp.now()'
                }
            )

        return res.status(200).json({
            collection_id,
            start_eta
        })
    } catch (err) {
        console.log("RRROR IS :", err);
        return res.status(500).json({ error: err.message });
    }
}