import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { TypeCount } from './dto';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const questionersLeft = functions.https.onRequest(async (req, res) => {
    const typeCountDoc = await admin.firestore()
        .collection('toCreate')
        .doc("typeCount")
        .get();

    const typeCount = typeCountDoc.data() as TypeCount;
    res.json(typeCount);
});

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
