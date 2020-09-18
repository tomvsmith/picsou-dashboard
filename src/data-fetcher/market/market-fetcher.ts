import { format as dateFnsFormat } from 'date-fns';
import firebase from 'firebase';
import { BoardValueInfos } from '../../../shared/types/board-types';
import { FetchStockHistoryValuesProps, StockHistoryReqParams, StockHistoryValue } from '../../../shared/types/get-stock-history';

const dateToStr = (date: Date) => dateFnsFormat(date, 'MM/dd/yyyy');

export const createMarketFetcher = () => {
    const fbFunctions = firebase.functions();

    const requestStockHistory = fbFunctions.httpsCallable('requestStockHistory');
    const requestInitialMarketData = fbFunctions.httpsCallable('requestInitialMarketData');

    return {

        fetchInitialMarketData: async (): Promise<{
            data: BoardValueInfos[];
        }> => {

            return requestInitialMarketData();
        },

        // TODO fetchStockCurrentValue

        fetchStockHistoryValues: async ({
            pairId, startDate, endDate, interval
        }: FetchStockHistoryValuesProps): Promise<{
            data: { history: StockHistoryValue[]; };
        }> => {

            const params: StockHistoryReqParams = {
                pairId: pairId.toString(),
                startDate: dateToStr(startDate),
                endDate: dateToStr(endDate),
                interval,
            };

            return requestStockHistory(params);
        },

        // TODO fetchStockSearch
    };
};
