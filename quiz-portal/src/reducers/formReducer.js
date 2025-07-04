import React from "react";
// import MultiChoice from "../components/Forms/FormElements/MultiChoice";

export const initialState = {
  title: "",
  duration: "",
  category: "",
  elements: [],
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ELEMENT":
  return {
    ...state,
    elements: [
      ...state.elements,
      action.payload === "multiChoice"
        ? {
            id: Date.now(),
            type: action.payload,
            value: null,
            options: [],
          }
        : {
            id: Date.now(),
            type: action.payload,
            value: null,
          },
    ],
  };
    case "DELETE_ELEMENT":
      return {
        ...state,
        elements: state.elements.filter((el) => el.id !== action.payload),
      };
    case "UPDATE_ELEMENT":
      return {
        ...state,
        elements: state.elements.map((el) =>
          el.id === action.payload.id
            ? { ...el, value: action.payload.value }
            : el
        ),
      };
    case "UPDATE_ELEMENT_LABEL":
      return {
        ...state,
        elements: state.elements.map((el) =>
          el.id === action.payload.id
            ? { ...el, label: action.payload.label }
            : el
        ),
      };
    case "UPDATE_TITLE":
      return {
        ...state,
        title: action.payload,
      };
    case "UPDATE_ELEMENT_OPTIONS":
      return {
        ...state,
        elements: state.elements.map((el) =>
          el.id === action.payload.id
            ? { ...el, options: action.payload.options }
            : el
        ),
      };
    case "UPDATE_DURATION":
      return {
        ...state,
        duration: action.payload,
      };
    case "UPDATE_CATEGORY":
      return { ...state, category: action.payload };
    // case "multiChoice":
      // return (
      //   <MultiChoice
      //     label={action.payload.label}
      //     onLabelChange={action.payload.onLabelChange}
      //     options={action.payload.options}
      //     onOptionsChange={action.payload.onOptionsChange}
      //   />
      // );
    default:
      return state;
  }
};
