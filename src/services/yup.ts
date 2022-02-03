import * as yup from 'yup';

export const schemaYup = yup.object().shape({
  newTaskBody: yup.string().min(1).max(200).required()
});