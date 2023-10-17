import { toast, Toaster } from "react-hot-toast";
import ReportContext from "./reportContext";
import { Account, Client, Databases, ID, Query, Storage } from "appwrite";
import { useState } from "react";

const ReportState = (props) => {

    const [reportData, setReportData] = useState([]);

    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

    const storage = new Storage(client);
    const databases = new Databases(client);
    const account = new Account(client);

    const fileUpload = async (files) => {
        try {
            const uploadedFiles = await Promise.all(
                Array.from(files).map(async (imageFile) => {
                    const result = await storage.createFile(
                        process.env.NEXT_PUBLIC_BUCKET_ID,
                        ID.unique(),
                        imageFile,
                    );
                    return result.$id;
                })
            );
            if (uploadedFiles.length !== 0) {
                toast.success("File uploaded successfully");
            }
            const uploadedFileUrls = uploadedFiles.map((fileId) =>
                (storage.getFileView(process.env.NEXT_PUBLIC_BUCKET_ID, fileId)).href
            );
            return uploadedFileUrls;
        } catch (error) {
            toast.error(error.message);
        }
    };

    const documentUpload = async (reportDetail) => {
        const imageUrl = await fileUpload(reportDetail.file);
        let newDescription = reportDetail.description.map(arr => JSON.stringify(arr));
        try {
            const user = await account.get();
            if (user && user.$id) {
                const userId = user.$id;
                const res = await databases.createDocument(
                    process.env.NEXT_PUBLIC_DATABASE_ID,
                    process.env.NEXT_PUBLIC_REPORTS_COLLECTION_ID,
                    ID.unique(),
                    {
                        name: reportDetail.name,
                        dateTime: reportDetail.dateTime,
                        imageUrl: imageUrl,
                        description: newDescription,
                        userId: userId, // Associate the report with the user's unique identifier
                    }
                );

                if (res.$id) {
                    toast.success("Report uploaded successfully");
                }
            }
            return "success"
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getReports = async () => {
        try {
            const userId = (await account.get()).$id;
            const res = await databases.listDocuments(
                process.env.NEXT_PUBLIC_DATABASE_ID,
                process.env.NEXT_PUBLIC_REPORTS_COLLECTION_ID,
                [Query.equal('userId', userId)]
            );
            setReportData(res.documents);
            return res.documents;
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <Toaster />
            <ReportContext.Provider value={{
                fileUpload, documentUpload, getReports, reportData
            }}>
                {props.children}
            </ReportContext.Provider>
        </>
    )
}

export default ReportState;