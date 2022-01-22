// The way this project uses firestore is unsafe and defiantly NOT RECOMMENDED.
// I would much rather secure api with cloud functions but the client is cheap and doesn't want to pay for them :(

import { firestore, toCreateCollection } from './../index';
import { TypeCount } from '../../../functions/src/dto/TypeCount';
import { doc, getDocFromServer } from '@firebase/firestore';

export const questionersLeft = async (): Promise<TypeCount> => {
    const docRef = doc(firestore, toCreateCollection.id, "typeCount");
    const docSnap = await getDocFromServer(docRef);
    if (!docSnap.exists())
        throw new Error("No required document found");

    return docSnap.data() as TypeCount;
}