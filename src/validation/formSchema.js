import * as yup from 'yup';

export default yup.object().shape({
    name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least two chars'),
    specialInstructions: yup
    .string()
    .max(200, 'Cannot have more than 200 characters'),
    size: yup
    .string()
    .oneOf(['personal', 'medium', 'large'], 'Size is required.'),
    pepperoni: yup.boolean(),
    bacon: yup.boolean(),
    caramelizedOnions: yup.boolean(),
    mushrooms: yup.boolean(),
})