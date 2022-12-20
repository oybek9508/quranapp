import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BasicTabs from "src/components/common/Tabs";
import { selectTheme, setTheme } from "src/redux/slices/theme";
import { ThemeTypes } from "src/styles/theme/modes";
import Section from "./Section";

const { Light, Dark, Main, Blue } = ThemeTypes;

const themes = [Light, Dark, Main, Blue].map((theme) => ({
  value: theme,
  label: theme,
}));

const ThemeSection = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme, shallowEqual);

  const handleChange = (event, newValue) => {
    dispatch(setTheme(newValue));
  };
  return (
    <Section>
      <Section.Title>Theme</Section.Title>
      <BasicTabs
        lists={themes}
        value={theme.type}
        handleChange={handleChange}
      />
    </Section>
  );
};

export default ThemeSection;
