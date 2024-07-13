import { backendConfig } from "@/configs/backendConfig";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const apps = getApps();

if (apps.length === 0) {
  initializeApp({
    credential: cert({
      clientEmail: backendConfig.firestore.clientEmail,
      privateKey: backendConfig.firestore.privateKey,
      projectId: backendConfig.firestore.projectId,
    }),
  });
}

const db = getFirestore();

export const usersCollection = db.collection("users");
