export function Validation(values) {
  let errors = {};

  // const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values?.name) {
    if (values.name === "") {
      errors.name = "Name Should Not Be Empty";
    } else if (values.name.length < 3 || values.name.length > 30) {
      errors.name = "Name Must Be Between 3 and 30 Characters";
    } else {
      errors.name = "";
    }
  }
  if (values.email === "") {
    errors.email = "Email Should Not Be Empty";
    // } else if (!email_pattern.test(values.email)) {
    //   errors.email = "Invalid Email!!!";
  } else {
    errors.email = "";
  }

  if (values.password === "") {
    errors.password = "Password Should Not Be Empty";
    // } else if (!password_pattern.test(values.password)) {
    //   errors.password =
    //     "Password Must Contain At Least One Small Character, One Capital Character, and One Number, and Be At Least 8 Characters Long";
  } else {
    errors.password = "";
  }

  return errors;
}
