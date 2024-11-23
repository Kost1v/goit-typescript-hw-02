import { Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";

import css from "./SearchBar.module.css";
import { initialValues, SearchBarProps } from "../../type";

const INITIAL_VALUES: initialValues = {
  searchTerm: "",
};

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (values: initialValues, actions: any) => {
    if (values.searchTerm === "") {
      toast.error("Please enter a search term");
    } else {
      onSubmit(values.searchTerm);
      actions.resetForm();
    }
  };

  return (
    <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <label className={css.label}>
          <Field
            type="text"
            name="searchTerm"
            className={css.input}
            placeholder="Enter search term"
          />
        </label>
        <button type="submit">Search photo</button>
        <Toaster />
      </Form>
    </Formik>
  );
};

export default SearchBar;
