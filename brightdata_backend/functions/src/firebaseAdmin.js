import * as admin from "firebase-admin"
import { getApps } from "firebase-admin/app"
const serviceAccount = require("../serviceAccountKey.json")

// Below if getApps().length results to false value i.e. we don't have any application, it will initialize the application with serviceAccount details
// serviveAccount id the key to access & modify all the firebase features
if (!getApps().length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
}

const adminDb = admin.firestore()

export { adminDb }
