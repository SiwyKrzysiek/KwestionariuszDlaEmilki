import { templatesCollection, responsesCollection } from './../index';
// The way this project uses firestore is unsafe and defiantly NOT RECOMMENDED.
// I would much rather secure api with cloud functions but the client is cheap and doesn't want to pay for them :(

import { firestore, toCreateCollection } from './../index';
import { TypeCount } from '../../../functions/src/dto/TypeCount';
import { doc, getDocFromServer, increment, setDoc, updateDoc, addDoc } from '@firebase/firestore';
import A from "../../forms/A.json"
import B from "../../forms/B.json"
import C from "../../forms/C.json"

export const uploadMyForms = async (): Promise<void> => {
    await setDoc(doc(firestore, templatesCollection.id, "A"), A);
    await setDoc(doc(firestore, templatesCollection.id, "B"), B);
    await setDoc(doc(firestore, templatesCollection.id, "C"), C);
}

export const questionersLeft = async (): Promise<TypeCount> => {
    const docRef = doc(firestore, toCreateCollection.id, "typeCount");
    const docSnap = await getDocFromServer(docRef);
    if (!docSnap.exists())
        throw new Error("No required document found");

    return docSnap.data() as TypeCount;
}

export const getQuestionerId = async () : Promise<string | null> => {
    const lefCount = await questionersLeft();
    const counts = Object.values(lefCount) as number[];

    if (counts.every(c => c <= 0))
        return null;

    const takeOne = async (key: string): Promise<string> => {
        const document = doc(firestore, toCreateCollection.id, "typeCount");
        const update = {} as any;
        update[key] = increment(-1);
        await updateDoc(document, update);
        return key;
    }

    const maxValue = Math.max(...counts);
    for (const [k, v] of Object.entries(lefCount)) {
        if (v === maxValue) {
            return await takeOne(k)
        }
    }

    return null;
}

export const loadQuestioner = async (id: string): Promise<unknown> => {
    const docRef = doc(firestore, templatesCollection.id, id);
    const docSnap = await getDocFromServer(docRef);
    return docSnap.data();
};

export const saveResponse = (response: unknown) => {
    return addDoc(responsesCollection, response);
}
