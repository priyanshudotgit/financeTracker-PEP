import { useState, useEffect } from 'react';
import { 
    collection, 
    addDoc, 
    query, 
    where, 
    onSnapshot, 
    deleteDoc, 
    doc, 
    orderBy,
    updateDoc
} from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { useAuthContext } from '../context/AuthContext';

export const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        if (!user) return;

        const q = query(
        collection(db, "transactions"),
        where("userId", "==", user.uid),
        orderBy("date", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setTransactions(data);
        });

        return () => unsubscribe();
    }, [user]);

    const addTransaction = async (transactionData) => {
        try {
        await addDoc(collection(db, "transactions"), {
            ...transactionData,
            userId: user.uid,
            createdAt: new Date()
        });
        } catch (err) {
        console.error("Error adding transaction:", err);
        }
    };

    const deleteTransaction = async (id) => {
        try {
        await deleteDoc(doc(db, "transactions", id));
        } catch (err) {
        console.error("Error deleting transaction:", err);
        }
    };

    const updateTransaction = async (id, updatedData) => {
        try {
            const docRef = doc(db, "transactions", id);
            await updateDoc(docRef, updatedData);
        } catch (err) {
            console.error("Error updating:", err);
        }
    };

    return { transactions, addTransaction, deleteTransaction, updateTransaction };
};