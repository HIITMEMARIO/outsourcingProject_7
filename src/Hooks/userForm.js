import { useState } from "react";

const useForm = (initialState = {}) => {
    const [formState, setFormState] = useState(initialState);
    console.log('폼이다', formState)
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        console.log('name', name)
        console.log('value', value)

        setFormState((prev) => ({ ...prev, [name]: value }));
    };
    const resetForm = () => {
        setFormState(initialState)
    }

    return { formState, onChangeHandler, resetForm }
}

export default useForm