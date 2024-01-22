// // FacebookLoginButton.tsx

// import React from 'react';
// import FacebookLogin, { ReactFacebookLoginProps } from 'react-facebook-login';

// interface FacebookLoginButtonProps extends ReactFacebookLoginProps {
//   onLoginSuccess: (response: any) => void;
//   onLoginFailure: (response: any) => void;
// }

// const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
//   onLoginSuccess,
//   onLoginFailure,
//   ...props
// }) => {
//   const responseFacebook = async (response: any) => {
//     console.log("RES");

//     if (response.accessToken) {
//       console.log("Access");
//       onLoginSuccess(response);
//     } else {
//       console.log("NOp");
//       onLoginFailure(response);
//     }
//   };

//   return (
//     <FacebookLogin
//       appId="789637846262329"
//       autoLoad={false}
//       fields="name,email,picture"
//       callback={responseFacebook}
//       render={(renderProps: any) => (
//         <button style={{ display: "none" }} onClick={renderProps.onClick} />
//       )}
//       {...props}
//     />
//   );
// };

// export default FacebookLoginButton;
