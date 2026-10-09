
export const checkValidData = (email, password, name, isSignInForm) => {

    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    if(!isSignInForm && name.length < 2) return 'Full name is not valid';
    if(!isEmailValid) return 'Email ID is not valid';
    if(!isPasswordValid) return 'Password is not valid';

    return null;
}

export const shuffleArray = (array) => {
    array = array == null? []: array

    const newArray = [...array];


  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};