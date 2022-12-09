import { useContext, useEffect, useState } from "react";
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from "google-spreadsheet";

import { StateContext } from "reducer/constants";

const spreadsheetId = "105MZ252jzyf53ncgMrCxNjeTAVmlpZAMwqZWo3tDQck";
const rowCount = 70;

export const useGoogleDocXP = () => {
    const { currentAddress } = useContext(StateContext);
    const [xp, setXP] = useState(0);
    const [sheet, setSheet] = useState<GoogleSpreadsheetWorksheet>();
    const doc = new GoogleSpreadsheet(spreadsheetId);

    const auth = async () => {
        try {
            await doc.useServiceAccountAuth({
                client_email: process.env.REACT_APP_CLIENT_EMAIL as string,
                private_key: process.env.REACT_APP_PRIVATE_KEY?.replace(/\\n/gm, "\n") as string,
            });
            await doc.loadInfo();
            const currentSheet = doc.sheetsByIndex[0];
            await currentSheet.loadCells(`A1:B${rowCount}`);
            setSheet(currentSheet);
        } catch (e) {
            setSheet(undefined);
        }
    };

    useEffect(() => {
        auth();
    }, []);

    const updateData = async () => {
        if (currentAddress && sheet) {
            for (let i = 1; i < rowCount; i += 1) {
                const cell = sheet.getCell(i, 0);
                if (cell.value?.toString().toLowerCase() === currentAddress.toLowerCase()) {
                    setXP(+sheet.getCell(i, 1).value);
                }
            }
        } else {
            setXP(0);
        }
    };

    useEffect(() => {
        updateData();
    }, [currentAddress, sheet]);

    return xp;
};
