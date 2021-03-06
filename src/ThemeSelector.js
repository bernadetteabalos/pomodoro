import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _ from 'lodash';
import { useTheme } from './theme/useTheme';
import { getFromLS } from './utils/storage';
import themesFromStore from './theme/schema.json';

const ThemedButton = styled.button`
    border: 0;
    display: inline-block;
    padding: 12px 24px;
    font-size: 14px;
    border-radius: 4px;
    margin-top: 5px;
    width: 100%;
    cursor: pointer;
`;

const Wrapper = styled.li`
    padding: 48px;
    text-align: center;
    border-radius: 4px;
    border: 0;
    list-style: none;
`;

const Container = styled.ul`
    display: flex;
    gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 1rem;
    padding: 10px;
`;

const Header = styled.h2`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3.5rem;
`;

const Divider = styled.hr`
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.text};
    border: 0;
    height: 1px;
    margin-top: 4em;
  
`

const ThemeSelector = (props) => {
    const themesFromStore = getFromLS('all-themes');
    const [data, setData] = useState(themesFromStore.data);
    const [themes, setThemes] = useState([]);
    const { setMode } = useTheme();

    const themeSwitcher = selectedTheme => {
        console.log(selectedTheme);
        setMode(selectedTheme);
        props.setter(selectedTheme);
    };

    useEffect(() => {
        setThemes(_.keys(data));
    }, [data]);

    useEffect(() => {
        const updateThemeCard = theme => {
            const key = _.keys(theme)[0];
            const updated = { ...data, [key]: theme[key] };
            setData(updated);
        }
        props.newTheme &&
            updateThemeCard(props.newTheme);
    }, [props.newTheme, data])


    const ThemeCard = props => {
        return (
            <Wrapper style={{
                backgroundColor: `${data[_.camelCase(props.theme.name)].colors.background}`,
                color: `${data[_.camelCase(props.theme.name)].colors.text}`,
                fontFamily: `${data[_.camelCase(props.theme.name)].font}`
            }}>

                <ThemedButton onClick={(theme) => themeSwitcher(props.theme)}
                    style={{
                        backgroundColor: `${data[_.camelCase(props.theme.name)].colors.button.background}`,
                        color: `${data[_.camelCase(props.theme.name)].colors.button.text}`,
                        fontFamily: `${data[_.camelCase(props.theme.name)].font}`
                    }}>
                    {props.theme.name}
                </ThemedButton>
            </Wrapper>
        )
    }

    return (
        <div>
            <Divider />
            <Header>theme selection</Header>
            <Container>
                {
                    themes.length > 0 &&
                    themes.map(theme => (
                        <ThemeCard theme={data[theme]} key={data[theme].id} />
                    ))
                }
            </Container>
        </div>
    )
}

export default ThemeSelector