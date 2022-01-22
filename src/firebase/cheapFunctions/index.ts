// The way this project uses firestore is unsafe and defiantly NOT RECOMMENDED.
// I would much rather secure api with cloud functions but the client is cheap and doesn't want to pay for them :(

import { firestore, toCreateCollection } from './../index';
import { TypeCount } from '../../../functions/src/dto/TypeCount';
import { doc, getDocFromServer, increment, updateDoc } from '@firebase/firestore';

export const questionersLeft = async (): Promise<TypeCount> => {
    const docRef = doc(firestore, toCreateCollection.id, "typeCount");
    const docSnap = await getDocFromServer(docRef);
    if (!docSnap.exists())
        throw new Error("No required document found");

    return docSnap.data() as TypeCount;
}

export const getQuestioner = async () : Promise<string | null> => {
    const lefCount = await questionersLeft();
    const counts = Object.values(lefCount) as number[];

    if (counts.every(c => c <= 0))
        return null;

    const takeOne = async (key: string): Promise<string> => {
        const document = doc(firestore, toCreateCollection.id, "typeCount");
        await updateDoc(document, {
            key: increment(-1)
        });
        return key;
    }

    const maxValue = Math.max(...counts);
    for (const [k, v] of Object.entries(lefCount)) {
        if (v === maxValue) {
            await takeOne(k)
        }
    }

    return null;
}
