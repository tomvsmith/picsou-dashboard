import { Box } from '@material-ui/core';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { ValueLine, ValueLineProps } from './value-line';

export default {
    title: 'UI components/Value Line',
    component: ValueLine
} as Meta;

const Template: Story<ValueLineProps> = props => <Box width={400}>
    <ValueLine {...props} />
</Box>;

export const Default = Template.bind({});
Default.args = {
    id: 1234,
    name: 'Euro stoxx 300',
    currentValue: 174.23,
    quantityUnit: 'unit',
    oldValueList: [
        {
            oldValue: 171.86,
            quantity: 8,
        }
    ],
};
