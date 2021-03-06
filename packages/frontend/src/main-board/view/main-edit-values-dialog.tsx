import { BoardKind } from '@picsou/shared';
import React from 'react';
import { useSelector } from 'react-redux';
import { createMainFetcher } from '../../data-fetcher/main-fetcher';
import { EditSearchData, EditValuesDialog, EditValuesDialogProps } from '../../ui-components/dialog/edit-values-dialog';

export type MainEditValuesDialogProps = Omit<EditValuesDialogProps, 'boardInfos' | 'fetchNameSearch'>;

let mainFetcher: ReturnType<typeof createMainFetcher> | null = null;

const boardProps: Record<BoardKind, Partial<EditValuesDialogProps>> = {
    cash: {},
    market: {
        fetchNameSearch: async (search) => {
            if (!mainFetcher) {
                mainFetcher = createMainFetcher();
            }
            const fetcher = mainFetcher.market;
        
            const { data } = await fetcher.fetchStockSearch(search);
        
            return data.map(({ pairId, name, pair_type, flag, symbol }): EditSearchData => ({
                id: pairId,
                name,
                secondary: symbol + ' - ' + pair_type.toUpperCase(),
                extra: flag.substr(0, 3).toUpperCase(),
            }));
        },
    },
    gold: {
        hideNameAndId: true
    }
};

export const MainEditValuesDialog: React.FC<MainEditValuesDialogProps> = props => {

    const listIds = useSelector(state => state.mainBoard.valuesList[ props.board ]);
    const values = useSelector(state => state.mainBoard.values);

    const boardInfos = listIds.map(id => values[ id ]);

    return <EditValuesDialog
        boardInfos={boardInfos}
        {...boardProps[props.board]}
        {...props}
    />;
};
