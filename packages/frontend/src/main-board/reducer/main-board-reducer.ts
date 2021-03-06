import { BoardKind, BoardValueInfos } from '@picsou/shared';
import isToday from 'date-fns/isToday';
import { AuthLogoutAction } from '../../auth/reducer/auth-actions';
import { createRichReducer } from '../../main/create-rich-reducer';
import { NormalizeArray, NormalizeObject } from '../../util/normalize';
import { MainBoardEditSuccessAction, MainBoardHistorySuccessAction, MainBoardRefreshAction, MainBoardValueSelectAction } from './main-board-actions';


export type MainBoardState = {
    values: NormalizeObject<BoardValueInfos>;
    valuesList: {
        [ k in BoardKind ]: NormalizeArray<BoardValueInfos>;
    };
    status: {
        [ k in BoardKind ]: {
            loading: boolean;
            selectedValue?: number;
            lastFetchTime?: number;
            lastHistoryFetchTimes: { [ k in number ]?: number };
        };
    };
    settings: {
        [ k in BoardKind ]: {
            editable?: boolean;
        };
    };
};

const getInitialState = (): MainBoardState => ({
    values: {},
    valuesList: {
        cash: [],
        gold: [],
        market: [],
    },
    status: {
        cash: {
            loading: true,
            lastHistoryFetchTimes: {}
        },
        market: {
            loading: true,
            lastHistoryFetchTimes: {}
        },
        gold: {
            loading: true,
            lastHistoryFetchTimes: {}
        },
    },
    settings: {
        cash: {},
        market: {
            editable: true,
        },
        gold: {
            editable: true,
        },
    },
});

export const mainBoardReducer = createRichReducer(getInitialState(), () => ({
    [ AuthLogoutAction.type ]: getInitialState,
    [ MainBoardRefreshAction.type ]: (state, { payload }: MainBoardRefreshAction) => {
        payload.data.forEach(({ id, currentValue }) => {
            const { price } = currentValue;
            state.values[ id ].currentValue = price;
        });
        const status = state.status[ payload.board ];
        status.lastFetchTime = Date.now();
    },
    [ MainBoardEditSuccessAction.type ]: (state, { payload }: MainBoardEditSuccessAction) => {
        const { board, data } = payload;

        const previousIds = state.valuesList[ board ];
        const ids = Object.keys(data).map(Number);
        const removedIds = previousIds.filter(prevId => !ids.includes(prevId));

        state.valuesList[ board ] = ids;

        removedIds.forEach(id => {
            delete state.values[ id ];
        });

        Object.entries(data).forEach(([ k, v ]) => {
            state.values[ +k ] = { ...v };
        });

        const status = state.status[ board ];
        status.loading = false;
        status.lastFetchTime = Date.now();
    },
    [ MainBoardValueSelectAction.type ]: (state, { payload }: MainBoardValueSelectAction) => {
        const { board, valueId } = payload;
        const status = state.status[ board ];
        status.selectedValue = valueId ?? undefined;

        const { lastHistoryFetchTimes } = state.status[ board ];
        status.loading = !!valueId && !isToday(lastHistoryFetchTimes[ valueId ]!);
    },
    [ MainBoardHistorySuccessAction.type ]: (state, { payload }: MainBoardHistorySuccessAction) => {
        const { valueId, history } = payload;

        const value = state.values[ valueId ];
        value.history = history.history;
        value.currentValue = history.history[ 0 ].price;

        const status = state.status[ value.board ];
        status.loading = false;
        status.lastFetchTime = Date.now();
        status.lastHistoryFetchTimes[ valueId ] = status.lastFetchTime;
    }
}));
